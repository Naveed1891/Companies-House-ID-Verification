import { prisma } from "@/lib/db";
import { requireRefundAccess } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { json, parseJson, routeError } from "@/lib/server/http";
import { getStripeClient } from "@/lib/server/stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const staff = await requireRefundAccess();
    const { id } = await params;
    const body = await parseJson<{ amount?: number; reason?: string }>(request);

    const reason = String(body.reason ?? "").trim();
    if (!reason) return json({ error: "A refund reason is required." }, 400);

    const payment = await prisma.payment.findUnique({
      where: { id },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        providerPaymentId: true,
        orderId: true,
        refunds: { select: { amount: true, status: true } },
      },
    });
    if (!payment) throw new Error("NOT_FOUND");
    if (payment.status !== "PAID") return json({ error: "Only a paid payment can be refunded." }, 400);
    if (!payment.providerPaymentId) return json({ error: "No Stripe payment to refund." }, 400);

    const alreadyRefunded = payment.refunds
      .filter((r) => r.status !== "FAILED" && r.status !== "CANCELLED")
      .reduce((sum, r) => sum + Number(r.amount), 0);
    const remaining = Number(payment.amount) - alreadyRefunded;

    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount <= 0 || amount > remaining + 1e-9) {
      return json({ error: `Enter an amount between 0 and ${remaining.toFixed(2)}.` }, 400);
    }

    const stripe = await getStripeClient();
    const stripeRefund = await stripe.refunds.create({
      payment_intent: payment.providerPaymentId,
      amount: Math.round(amount * 100),
    });

    const fully = amount >= remaining - 1e-9;

    await prisma.$transaction(async (tx) => {
      await tx.refund.create({
        data: {
          paymentId: payment.id,
          amount,
          reason,
          status: "COMPLETED",
          providerRefundId: stripeRefund.id,
          actorId: staff.id,
        },
      });
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: fully ? "REFUNDED" : "PARTIALLY_REFUNDED" },
      });
      await tx.order.update({
        where: { id: payment.orderId },
        data: {
          paymentStatus: fully ? "REFUNDED" : "PARTIALLY_REFUNDED",
          ...(fully ? { status: "REFUNDED" as const } : {}),
        },
      });
    });

    await recordAudit({
      actorId: staff.id,
      action: "payment.refund",
      entity: "Payment",
      entityId: payment.id,
      after: { amount, reason, stripeRefundId: stripeRefund.id },
      request,
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
