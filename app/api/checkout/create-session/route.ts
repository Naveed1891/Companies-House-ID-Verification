import { prisma } from "@/lib/db";
import { getSiteUrl } from "@/lib/env";
import { requireUser } from "@/lib/server/auth";
import { json, routeError } from "@/lib/server/http";
import { createPendingOrder } from "@/lib/server/orders";
import { generateIntentReference } from "@/lib/server/reference";
import { resolvePaymentMethods } from "@/lib/server/settings";
import { getStripeClient, isStripeReady } from "@/lib/server/stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const user = await requireUser();

    if (!(await resolvePaymentMethods()).stripe) {
      return json({ error: "Card payment via Stripe is not available right now." }, 403);
    }
    if (!(await isStripeReady())) {
      return json({ error: "Payments are not configured." }, 503);
    }

    const body = (await request.json().catch(() => null)) as {
      packageSlug?: string;
      orderReference?: string;
    } | null;
    const orderReference = body?.orderReference?.trim();
    const slug = body?.packageSlug?.trim();

    const existingOrder = orderReference
      ? await prisma.order.findFirst({
          where: { publicReference: orderReference, userId: user.id },
          select: {
            id: true,
            publicReference: true,
            paymentStatus: true,
            amount: true,
            currency: true,
            package: { select: { id: true, slug: true, name: true, price: true, currency: true, active: true } },
          },
        })
      : null;
    if (orderReference && !existingOrder) throw new Error("NOT_FOUND");
    if (existingOrder?.paymentStatus === "PAID" || existingOrder?.paymentStatus === "PENDING") {
      return json({ error: "Payment has already been submitted for this application." }, 400);
    }

    // Price and currency always come from the owned order or package record.
    const pkg = existingOrder?.package ?? (slug
      ? await prisma.package.findFirst({
          where: { slug, active: true },
          select: { id: true, slug: true, name: true, price: true, currency: true, active: true },
        })
      : null);
    if (!pkg?.active) return json({ error: "Package not found." }, 404);

    const amount = Number(existingOrder?.amount ?? pkg.price);
    const currency = existingOrder?.currency ?? pkg.currency;
    if (!Number.isFinite(amount) || amount <= 0) {
      return json({ error: "This package is not purchasable." }, 400);
    }

    const order = existingOrder ?? await createPendingOrder({
      userId: user.id,
      packageId: pkg.id,
      amount: pkg.price,
      currency: pkg.currency,
    });

    const siteUrl = getSiteUrl();
    const stripe = await getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: currency.toLowerCase(),
            unit_amount: Math.round(amount * 100),
            product_data: { name: pkg.name },
          },
        },
      ],
      success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payment/cancel`,
      metadata: {
        orderId: order.id,
        orderReference: order.publicReference,
        userId: user.id,
        packageSlug: pkg.slug,
      },
    });

    await prisma.checkoutIntent.create({
      data: {
        publicReference: generateIntentReference(),
        userId: user.id,
        packageId: pkg.id,
        stripeSessionId: session.id,
        orderId: order.id,
        status: "REDIRECTED",
      },
    });

    return json({ url: session.url, orderReference: order.publicReference });
  } catch (error) {
    return routeError(error);
  }
}
