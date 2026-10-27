import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/server/auth";
import { json, routeError } from "@/lib/server/http";
import { getStripeClient } from "@/lib/server/stripe";
import { finalizePaidCheckout } from "@/lib/server/stripe-checkout";

export const dynamic = "force-dynamic";

const UNLOCKED_STATUSES = [
  "PAYMENT_CONFIRMED",
  "AWAITING_APPLICATION",
  "APPLICATION_IN_PROGRESS",
  "SUBMITTED",
  "UNDER_REVIEW",
  "AWAITING_CUSTOMER",
  "ADDITIONAL_INFO_REQUIRED",
  "PROCESSING",
  "COMPLETED",
];

/**
 * Polled by the Stripe return page. Reports what the webhook has recorded -
 * it never marks anything paid itself.
 */
export async function GET(request: Request) {
  try {
    const user = await requireUser();
    const sessionId = new URL(request.url).searchParams.get("session_id")?.trim();
    if (!sessionId) return json({ error: "Stripe session id is required." }, 400);

    const intent = await prisma.checkoutIntent.findFirst({
      where: { stripeSessionId: sessionId, userId: user.id },
      select: { orderId: true },
    });
    if (!intent?.orderId) throw new Error("NOT_FOUND");

    let order = await prisma.order.findFirst({
      where: { id: intent.orderId, userId: user.id },
      select: {
        publicReference: true,
        status: true,
        paymentStatus: true,
        application: { select: { status: true } },
      },
    });
    if (!order) throw new Error("NOT_FOUND");

    // Webhooks remain authoritative, but reconcile the signed-in customer's
    // own session directly when Stripe already reports it paid. This removes
    // webhook delivery latency without trusting the browser redirect.
    if (order.paymentStatus !== "PAID") {
      const stripe = await getStripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid" && session.metadata?.orderId === intent.orderId) {
        await finalizePaidCheckout(session);
        order = await prisma.order.findFirst({
          where: { id: intent.orderId, userId: user.id },
          select: { publicReference: true, status: true, paymentStatus: true, application: { select: { status: true } } },
        });
        if (!order) throw new Error("NOT_FOUND");
      }
    }

    const paid = order.paymentStatus === "PAID";
    const unlocked = paid && UNLOCKED_STATUSES.includes(order.status);

    // "application_ready" is the signal the success page waits on before
    // forwarding the customer into their application.
    const status = !paid
      ? order.paymentStatus === "FAILED"
        ? "failed"
        : "pending"
      : unlocked
        ? "application_ready"
        : "paid";

    return json({
      status,
      paymentStatus: order.paymentStatus,
      orderReference: order.publicReference,
      applicationStatus: order.application?.status ?? "NOT_STARTED",
      applicationUnlocked: unlocked,
      nextUrl: unlocked ? `/application/${order.publicReference}` : null,
      message: paid
        ? "Payment confirmed."
        : "Waiting for payment confirmation from Stripe.",
    });
  } catch (error) {
    return routeError(error);
  }
}
