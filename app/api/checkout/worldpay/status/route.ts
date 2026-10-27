import { prisma } from "@/lib/db";
import { getSiteUrl } from "@/lib/env";
import { requireUser } from "@/lib/server/auth";
import { INTERNAL_ORDER_ALERT_RECIPIENTS, renderEmail } from "@/lib/server/email-templates";
import { json, parseJson, routeError } from "@/lib/server/http";
import { sendMail } from "@/lib/server/mailer";
import { resolvePaymentMethods } from "@/lib/server/settings";
import { queryHostedPaymentOutcome } from "@/lib/server/worldpay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Confirm the outcome of a WorldPay hosted payment for the caller's order.
 * The order is marked PAID only when Payment Queries reports a success event -
 * the browser redirect (?wp=success) alone is never trusted, since a customer
 * could load that URL without paying.
 */
export async function POST(request: Request) {
  try {
    const user = await requireUser();

    if (!(await resolvePaymentMethods()).worldpay) {
      return json({ error: "Card payment is not available right now." }, 403);
    }

    const body = await parseJson<{ orderReference?: string }>(request);
    const orderRef = String(body.orderReference ?? "").trim();
    if (!orderRef) return json({ error: "Missing order reference." }, 400);

    const order = await prisma.order.findFirst({
      where: { publicReference: orderRef, userId: user.id },
      select: {
        id: true,
        status: true,
        paymentStatus: true,
        application: { select: { status: true } },
        amount: true,
        currency: true,
        publicReference: true,
        user: { select: { email: true, fullName: true } },
        payments: {
          where: { provider: "worldpay" },
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { id: true, status: true, providerPaymentId: true },
        },
      },
    });
    if (!order) throw new Error("NOT_FOUND");

    const orderUrl = `${getSiteUrl()}/dashboard/orders/${orderRef}`;

    // Already settled - nothing to query.
    if (order.paymentStatus === "PAID") {
      return json({ status: "paid", redirect: orderUrl });
    }

    const payment = order.payments[0];
    const transactionReference = payment?.providerPaymentId?.trim();
    if (!payment || !transactionReference) {
      return json({ status: "pending" });
    }

    const outcome = await queryHostedPaymentOutcome(transactionReference);

    if (outcome.outcome === "failed") {
      if (payment.status !== "PAID") {
        await prisma.payment.update({ where: { id: payment.id }, data: { status: "FAILED" } });
      }
      return json({ status: "failed" });
    }

    if (outcome.outcome !== "paid") {
      return json({ status: "pending" });
    }

    // Confirmed paid - finalise once, guarding against concurrent polls. This
    // is when a DRAFT (or legacy PENDING_PAYMENT) order becomes placed.
    const nextStatus =
      order.status === "DRAFT" || order.status === "PENDING_PAYMENT"
        ? order.application?.status === "IN_PROGRESS"
          ? "APPLICATION_IN_PROGRESS"
          : "AWAITING_APPLICATION"
        : order.status;
    const updated = await prisma.$transaction(async (tx) => {
      const fresh = await tx.order.findUnique({
        where: { id: order.id },
        select: { paymentStatus: true },
      });
      if (fresh?.paymentStatus === "PAID") return false;

      await tx.order.update({
        where: { id: order.id },
        data: { paymentStatus: "PAID", status: nextStatus },
      });
      await tx.payment.update({ where: { id: payment.id }, data: { status: "PAID" } });
      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          fromStatus: order.status,
          toStatus: nextStatus,
          note: "Card payment received (WorldPay hosted page).",
        },
      });
      await tx.notification.create({
        data: {
          userId: user.id,
          title: "Payment received",
          body: `Your card payment for ${orderRef} was successful. You can now complete your application.`,
          href: `/application/${orderRef}`,
        },
      });
      return true;
    });

    // Only email on the transition into PAID, not on repeat polls.
    if (updated) {
      const amountLabel = `${order.currency === "GBP" ? "£" : `${order.currency} `}${order.amount}`;
      const customer = renderEmail({
        preview: `Payment received for ${orderRef}.`,
        heading: "Payment received",
        intro: `Hi ${order.user.fullName || "there"}, thank you - your card payment for order ${orderRef} was successful.`,
        rows: [
          ["Order reference", orderRef],
          ["Service", "Companies House Identity Verification"],
          ["Amount", amountLabel],
          ["Payment", "Paid (card)"],
        ],
        paragraphs: ["You can complete your verification application now from your dashboard."],
        cta: { label: "Continue your application", url: `${getSiteUrl()}/application/${orderRef}` },
      });
      void sendMail(
        { to: order.user.email, subject: `Payment received - ${orderRef}`, text: customer.text, html: customer.html },
        "support",
      );

      const internal = renderEmail({
        heading: "New order paid (card)",
        intro: `A customer has paid by card (WorldPay) for order ${orderRef}.`,
        rows: [
          ["Order reference", orderRef],
          ["Customer", order.user.fullName || "-"],
          ["Email", order.user.email],
          ["Amount", amountLabel],
        ],
        cta: { label: "Open in admin", url: `${getSiteUrl()}/dashboard/admin/orders/${orderRef}` },
      });
      void sendMail(
        {
          to: INTERNAL_ORDER_ALERT_RECIPIENTS.join(", "),
          subject: `New order paid (card) - ${orderRef}`,
          text: internal.text,
          html: internal.html,
        },
        "support",
      );
    }

    return json({ status: "paid", redirect: orderUrl });
  } catch (error) {
    return routeError(error);
  }
}
