import type { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getMaxUploadBytes, getSiteUrl } from "@/lib/env";
import { requireUser } from "@/lib/server/auth";
import { INTERNAL_ORDER_ALERT_RECIPIENTS, renderEmail } from "@/lib/server/email-templates";
import { json, routeError } from "@/lib/server/http";
import { sendMail } from "@/lib/server/mailer";
import { resolvePaymentMethods } from "@/lib/server/settings";
import { buildStorageKey, putObject } from "@/lib/server/storage";
import {
  submitApplicationAfterPaymentProof,
  type VerificationPayload,
} from "@/lib/server/submit-application";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PAYMENT_PROOF_KIND = "payment_proof";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
]);

/**
 * Customer uploads a screenshot / PDF proving they made the bank transfer.
 * Unlike /api/documents/upload this is allowed BEFORE payment is confirmed
 * (that is the whole point). It moves the order's payment into PENDING so staff
 * can review the proof and confirm receipt.
 */
export async function POST(request: Request) {
  try {
    const user = await requireUser();

    if (!(await resolvePaymentMethods()).bank) {
      return json({ error: "Bank transfer is not available right now." }, 403);
    }

    const form = await request.formData();
    const orderRef = String(form.get("orderReference") ?? "").trim();
    const file = form.get("file");

    if (!orderRef) return json({ error: "Order reference is required." }, 400);
    if (!(file instanceof File)) return json({ error: "A file is required." }, 400);

    const order = await prisma.order.findFirst({
      where: { publicReference: orderRef, userId: user.id },
      select: {
        id: true,
        status: true,
        paymentStatus: true,
        amount: true,
        currency: true,
        diditUrl: true,
        application: { select: { status: true } },
        user: { select: { email: true, fullName: true } },
      },
    });
    if (!order) throw new Error("NOT_FOUND");
    if (order.paymentStatus === "PAID") {
      return json({ error: "This order is already paid." }, 400);
    }

    // Only alert / email on the first submission, not on re-uploads.
    const firstSubmission = order.paymentStatus !== "PENDING";

    if (!ALLOWED_TYPES.has(file.type)) throw new Error("UNSUPPORTED_TYPE");
    if (file.size > getMaxUploadBytes()) throw new Error("PAYLOAD_TOO_LARGE");

    const buffer = Buffer.from(await file.arrayBuffer());
    const storageKey = buildStorageKey(order.id, PAYMENT_PROOF_KIND, file.name);
    await putObject(storageKey, buffer, file.type);

    const nextStatus: OrderStatus =
      order.status === "DRAFT" || order.status === "PENDING_PAYMENT"
        ? "APPLICATION_IN_PROGRESS"
        : order.status;

    await prisma.$transaction(async (tx) => {
      await tx.document.create({
        data: {
          orderId: order.id,
          userId: user.id,
          kind: PAYMENT_PROOF_KIND,
          fileName: file.name.slice(0, 255),
          mimeType: file.type,
          size: file.size,
          storageKey,
          status: "UPLOADED",
        },
      });

      // Proof upload places the order. Staff confirm the transfer separately
      // (paymentStatus PENDING -> PAID); the application is submitted next.
      await tx.order.update({
        where: { id: order.id },
        data: { paymentStatus: "PENDING", status: nextStatus },
      });

      const existingPayment = await tx.payment.findFirst({
        where: { orderId: order.id, provider: "bank_transfer" },
        select: { id: true, status: true },
      });
      if (!existingPayment) {
        await tx.payment.create({
          data: {
            orderId: order.id,
            provider: "bank_transfer",
            amount: order.amount,
            currency: order.currency,
            status: "PENDING",
          },
        });
      } else if (existingPayment.status !== "PAID") {
        await tx.payment.update({ where: { id: existingPayment.id }, data: { status: "PENDING" } });
      }

      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          fromStatus: order.status,
          toStatus: nextStatus,
          note: "Bank transfer proof uploaded - payment awaiting confirmation.",
        },
      });
    });

    if (firstSubmission) {
      const amountLabel = `${order.currency === "GBP" ? "£" : `${order.currency} `}${order.amount}`;
      const orderUrl = `${getSiteUrl()}/dashboard/orders/${orderRef}`;

      // Styled confirmation to the customer.
      const customer = renderEmail({
        preview: `We've received your order ${orderRef}.`,
        heading: "We've received your order",
        intro: `Hi ${order.user.fullName || "there"}, thank you - your payment proof for order ${orderRef} has been received and is being confirmed by our team.`,
        rows: [
          ["Order reference", orderRef],
          ["Service", "Companies House Identity Verification"],
          ["Amount", amountLabel],
          ["Payment", "Awaiting confirmation"],
        ],
        paragraphs: [
          "Your application has been submitted. Please scan the QR code on your confirmation screen to complete identity verification. We usually confirm bank transfers within one working day.",
        ],
        cta: { label: "View your order", url: orderUrl },
        note: "If you have any questions, just reply to this email and our support team will help.",
      });
      void sendMail(
        { to: order.user.email, subject: `Order received - ${orderRef}`, text: customer.text, html: customer.html },
        "support",
      );

      // Silent internal alert.
      const internal = renderEmail({
        heading: "New order placed",
        intro: `A customer has uploaded payment proof for order ${orderRef}.`,
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
          subject: `New order placed - ${orderRef}`,
          text: internal.text,
          html: internal.html,
        },
        "support",
      );
    }

    let submitted: { submitted: boolean; verification: VerificationPayload | null } = {
      submitted: false,
      verification: null,
    };
    try {
      submitted = await submitApplicationAfterPaymentProof({
        userId: user.id,
        orderId: order.id,
        orderRef,
        currentStatus: nextStatus,
        existingDiditUrl: order.diditUrl,
      });
    } catch (cause) {
      console.error(
        "[payment-proof] application submit failed for",
        orderRef,
        cause instanceof Error ? cause.message : cause,
      );
    }

    return json({ ok: true, submitted: submitted.submitted, verification: submitted.verification });
  } catch (error) {
    return routeError(error);
  }
}
