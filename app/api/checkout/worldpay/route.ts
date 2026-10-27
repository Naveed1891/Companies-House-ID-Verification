import { prisma } from "@/lib/db";
import { getSiteUrl } from "@/lib/env";
import { requireUser } from "@/lib/server/auth";
import { json, parseJson, routeError } from "@/lib/server/http";
import { resolvePaymentMethods, resolveWorldpay } from "@/lib/server/settings";
import { createHostedPayment } from "@/lib/server/worldpay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Start a WorldPay Hosted Payment Pages session for an existing pending order
 * and return the Worldpay-hosted URL to redirect the customer to. The order is
 * only marked PAID after the outcome is confirmed server-side on return
 * (see /api/checkout/worldpay/status).
 */
export async function POST(request: Request) {
  try {
    const user = await requireUser();

    const methods = await resolvePaymentMethods();
    if (!methods.worldpay) return json({ error: "Card payment is not available right now." }, 403);

    const cfg = await resolveWorldpay();
    if (!cfg.configured) return json({ error: "Card payment is not configured." }, 503);

    const body = await parseJson<{ orderReference?: string }>(request);
    const orderRef = String(body.orderReference ?? "").trim();
    if (!orderRef) return json({ error: "Missing order reference." }, 400);

    const order = await prisma.order.findFirst({
      where: { publicReference: orderRef, userId: user.id },
      select: { id: true, paymentStatus: true, amount: true, currency: true, publicReference: true },
    });
    if (!order) throw new Error("NOT_FOUND");
    if (order.paymentStatus === "PAID") return json({ error: "This order is already paid." }, 400);

    const amountMinor = Math.round(Number(order.amount) * 100);
    // Unique per attempt so re-tries never collide in Payment Queries.
    const transactionReference = `${order.publicReference}-${Date.now()}`;
    const base = `${getSiteUrl()}/payment/card/${encodeURIComponent(order.publicReference)}`;

    const result = await createHostedPayment({
      transactionReference,
      amountMinor,
      currency: order.currency,
      description: "Companies House Identity Verification",
      resultURLs: {
        successURL: `${base}?wp=success`,
        pendingURL: `${base}?wp=pending`,
        failureURL: `${base}?wp=failure`,
        errorURL: `${base}?wp=error`,
        cancelURL: `${base}?wp=cancel`,
        expiryURL: `${base}?wp=expiry`,
      },
    });
    if (!result.ok || !result.url) {
      return json({ error: result.error ?? "Payment could not be started." }, 402);
    }

    // Track a PENDING card payment carrying this attempt's transaction reference
    // so the return page can confirm the outcome. Never touch a PAID payment.
    const existing = await prisma.payment.findFirst({
      where: { orderId: order.id, provider: "worldpay" },
      select: { id: true, status: true },
    });
    if (existing) {
      if (existing.status !== "PAID") {
        await prisma.payment.update({
          where: { id: existing.id },
          data: {
            providerPaymentId: transactionReference,
            status: "PENDING",
            amount: order.amount,
            currency: order.currency,
          },
        });
      }
    } else {
      await prisma.payment.create({
        data: {
          orderId: order.id,
          provider: "worldpay",
          providerPaymentId: transactionReference,
          amount: order.amount,
          currency: order.currency,
          status: "PENDING",
        },
      });
    }

    return json({ url: result.url });
  } catch (error) {
    return routeError(error);
  }
}
