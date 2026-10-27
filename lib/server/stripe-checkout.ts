import type Stripe from "stripe";
import { prisma } from "@/lib/db";

/** Idempotently records a Stripe Checkout payment and unlocks its application. */
export async function finalizePaidCheckout(session: Stripe.Checkout.Session): Promise<void> {
  if (session.payment_status !== "paid") return;
  const orderId = session.metadata?.orderId;
  if (!orderId) return;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      userId: true,
      publicReference: true,
      status: true,
      paymentStatus: true,
      amount: true,
      currency: true,
      application: { select: { status: true } },
    },
  });
  if (!order) return;

  const paymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
  await prisma.$transaction(async (tx) => {
    await tx.payment.upsert({
      where: { providerPaymentId: paymentIntentId ?? `session_${session.id}` },
      update: { status: "PAID" },
      create: { orderId: order.id, provider: "stripe", providerPaymentId: paymentIntentId ?? `session_${session.id}`, amount: order.amount, currency: order.currency, status: "PAID", rawPayload: { sessionId: session.id } },
    });
    const hasStartedApplication = order.application?.status === "IN_PROGRESS";
    const nextStatus = hasStartedApplication ? "APPLICATION_IN_PROGRESS" : "AWAITING_APPLICATION";
    const claimed = await tx.order.updateMany({
      where: { id: order.id, paymentStatus: { not: "PAID" } },
      data: { paymentStatus: "PAID", status: nextStatus },
    });
    await tx.application.upsert({ where: { orderId: order.id }, update: {}, create: { orderId: order.id, status: "NOT_STARTED" } });
    await tx.checkoutIntent.updateMany({ where: { stripeSessionId: session.id, orderId: order.id }, data: { status: "PAID" } });
    if (claimed.count === 1) {
      await tx.orderStatusHistory.create({ data: { orderId: order.id, fromStatus: order.status, toStatus: nextStatus, note: "Payment confirmed by Stripe." } });
      await tx.notification.create({ data: { userId: order.userId, title: "Payment confirmed", body: `Your payment for ${order.publicReference} was received. You can now complete your application.`, href: `/application/${order.publicReference}` } });
    }
  });
}
