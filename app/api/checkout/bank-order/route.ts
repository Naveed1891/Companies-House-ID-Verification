import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/server/auth";
import { json, routeError } from "@/lib/server/http";
import { createPendingOrder } from "@/lib/server/orders";

export const dynamic = "force-dynamic";

/**
 * Create an order to be paid by manual bank transfer. Unlike the Stripe route
 * this does not talk to any payment provider; the customer is sent to the bank
 * instructions page and uploads proof of payment for staff to confirm.
 */
export async function POST(request: Request) {
  try {
    const user = await requireUser();

    const body = (await request.json().catch(() => null)) as {
      packageSlug?: string;
      application?: Record<string, unknown>;
    } | null;
    const slug = body?.packageSlug?.trim();
    if (!slug) return json({ error: "A package must be selected." }, 400);
    if (
      body?.application !== undefined &&
      (!body.application || typeof body.application !== "object" || Array.isArray(body.application))
    ) {
      return json({ error: "Invalid application data." }, 400);
    }

    // Price and currency come from the database - never from the client.
    const pkg = await prisma.package.findFirst({
      where: { slug, active: true },
      select: { id: true, price: true, currency: true },
    });
    if (!pkg) return json({ error: "Package not found." }, 404);

    const amount = Number(pkg.price);
    if (!Number.isFinite(amount) || amount <= 0) {
      return json({ error: "This package is not purchasable." }, 400);
    }

    const order = await createPendingOrder({
      userId: user.id,
      packageId: pkg.id,
      amount: pkg.price,
      currency: pkg.currency,
      application: body?.application as Prisma.InputJsonValue | undefined,
    });

    return json({ orderReference: order.publicReference });
  } catch (error) {
    return routeError(error);
  }
}
