import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getStripeClient, getWebhookSecret } from "@/lib/server/stripe";
import { finalizePaidCheckout } from "@/lib/server/stripe-checkout";

export const dynamic = "force-dynamic";
// The raw body is required for signature verification.
export const runtime = "nodejs";

/**
 * Stripe is the only authority that may mark an order paid. The redirect back
 * from Checkout proves nothing - it can be forged or simply never happen.
 */
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const rawBody = await request.text();
    const stripe = await getStripeClient();
    event = stripe.webhooks.constructEvent(rawBody, signature, await getWebhookSecret());
  } catch (error) {
    console.warn("[stripe] signature verification failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  // Idempotency: claim the event before doing any work. A duplicate delivery
  // hits the unique constraint and exits without reprocessing.
  try {
    await prisma.processedStripeEvent.create({
      data: { eventId: event.id, type: event.type },
    });
  } catch {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await finalizePaidCheckout(session);
        break;
      }
      case "payment_intent.payment_failed": {
        const intent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(intent);
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        await handleChargeRefunded(charge);
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("[stripe] handler failed", event.type, error);
    // Let the processed record stand but signal Stripe to retry.
    await prisma.processedStripeEvent.deleteMany({ where: { eventId: event.id } });
    return NextResponse.json({ error: "Handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handlePaymentFailed(intent: Stripe.PaymentIntent): Promise<void> {
  const orderId = intent.metadata?.orderId;
  if (!orderId) return;
  await prisma.order.updateMany({
    where: { id: orderId, paymentStatus: { not: "PAID" } },
    data: { paymentStatus: "FAILED" },
  });
}

async function handleChargeRefunded(charge: Stripe.Charge): Promise<void> {
  const paymentIntentId =
    typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
  if (!paymentIntentId) return;

  const payment = await prisma.payment.findUnique({
    where: { providerPaymentId: paymentIntentId },
    select: { id: true, orderId: true, amount: true },
  });
  if (!payment) return;

  const fullyRefunded = charge.amount_refunded >= charge.amount;

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: payment.id },
      data: { status: fullyRefunded ? "REFUNDED" : "PARTIALLY_REFUNDED" },
    });
    await tx.order.update({
      where: { id: payment.orderId },
      data: {
        paymentStatus: fullyRefunded ? "REFUNDED" : "PARTIALLY_REFUNDED",
        ...(fullyRefunded ? { status: "REFUNDED" as const } : {}),
      },
    });
  });
}
