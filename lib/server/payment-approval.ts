import { prisma } from "@/lib/db";
import { getSiteUrl } from "@/lib/env";
import { renderEmail } from "@/lib/server/email-templates";
import { sendMail } from "@/lib/server/mailer";

type ApprovePaymentInput = {
  orderId: string;
  actorId: string;
  documentId?: string;
  note: string;
};

/**
 * Keeps manual payment approval consistent across every admin entry point.
 * The database transition is idempotent; customer emails are only queued by
 * the request that first moves the payment into PAID.
 */
export async function approvePaymentAndStartProcessing({
  orderId,
  actorId,
  documentId,
  note,
}: ApprovePaymentInput): Promise<{ newlyApproved: boolean }> {
  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        userId: true,
        publicReference: true,
        status: true,
        paymentStatus: true,
        amount: true,
        currency: true,
        user: { select: { email: true, fullName: true } },
      },
    });
    if (!order) throw new Error("NOT_FOUND");

    if (documentId) {
      await tx.document.update({
        where: { id: documentId },
        data: {
          status: "APPROVED",
          rejectionReason: null,
          reviewedById: actorId,
          reviewedAt: new Date(),
        },
      });
    }

    const paymentClaim = await tx.order.updateMany({
      where: { id: order.id, paymentStatus: { not: "PAID" } },
      data: { paymentStatus: "PAID", status: "PROCESSING" },
    });
    const newlyApproved = paymentClaim.count === 1;
    const repairsExistingApproval =
      !newlyApproved && order.paymentStatus === "PAID" && order.status !== "PROCESSING";
    if (repairsExistingApproval) {
      await tx.order.update({ where: { id: order.id }, data: { status: "PROCESSING" } });
    }

    const bankPayment = await tx.payment.findFirst({
      where: { orderId: order.id, provider: "bank_transfer" },
      select: { id: true },
    });
    if (bankPayment) {
      await tx.payment.update({ where: { id: bankPayment.id }, data: { status: "PAID" } });
    } else {
      await tx.payment.create({
        data: {
          orderId: order.id,
          provider: "bank_transfer",
          amount: order.amount,
          currency: order.currency,
          status: "PAID",
        },
      });
    }

    if ((newlyApproved || repairsExistingApproval) && order.status !== "PROCESSING") {
      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          fromStatus: order.status,
          toStatus: "PROCESSING",
          note,
          actorId,
        },
      });
    }

    if (newlyApproved) {
      await tx.notification.createMany({
        data: [
          {
            userId: order.userId,
            title: "Your payment has been approved",
            body: `Your payment for ${order.publicReference} has been approved.`,
            href: `/dashboard/orders/${order.publicReference}`,
          },
          {
            userId: order.userId,
            title: "Your application is being processed",
            body: `Your application ${order.publicReference} is now being processed.`,
            href: `/dashboard/orders/${order.publicReference}`,
          },
        ],
      });
    }

    return { order, newlyApproved };
  });

  if (result.newlyApproved) {
    const orderUrl = `${getSiteUrl()}/dashboard/orders/${result.order.publicReference}`;
    const greeting = result.order.user.fullName || "there";

    const paymentEmail = renderEmail({
      preview: `Your payment for ${result.order.publicReference} has been approved.`,
      heading: "Your payment has been approved",
      intro: `Hi ${greeting}, your payment for order ${result.order.publicReference} has been reviewed and approved.`,
      rows: [
        ["Order reference", result.order.publicReference],
        ["Payment status", "Approved"],
      ],
      cta: { label: "View your order", url: orderUrl },
    });
    const processingEmail = renderEmail({
      preview: `Your application ${result.order.publicReference} is being processed.`,
      heading: "Your application is being processed",
      intro: `Hi ${greeting}, we have started processing your application for order ${result.order.publicReference}.`,
      rows: [
        ["Order reference", result.order.publicReference],
        ["Application status", "Processing"],
      ],
      cta: { label: "View your application", url: orderUrl },
    });

    void sendMail(
      {
        to: result.order.user.email,
        subject: `Your payment has been approved - ${result.order.publicReference}`,
        text: paymentEmail.text,
        html: paymentEmail.html,
      },
      "support",
    );
    void sendMail(
      {
        to: result.order.user.email,
        subject: `Your application is being processed - ${result.order.publicReference}`,
        text: processingEmail.text,
        html: processingEmail.html,
      },
      "support",
    );
  }

  return { newlyApproved: result.newlyApproved };
}
