import type { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireStaffWrite } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { json, parseJson, routeError } from "@/lib/server/http";
import { sendMail } from "@/lib/server/mailer";
import { renderEmail } from "@/lib/server/email-templates";
import { getSiteUrl } from "@/lib/env";
import { approvePaymentAndStartProcessing } from "@/lib/server/payment-approval";

export const dynamic = "force-dynamic";

const ALLOWED: OrderStatus[] = [
  "PENDING_PAYMENT",
  "PAYMENT_CONFIRMED",
  "AWAITING_APPLICATION",
  "APPLICATION_IN_PROGRESS",
  "SUBMITTED",
  "UNDER_REVIEW",
  "AWAITING_CUSTOMER",
  "ADDITIONAL_INFO_REQUIRED",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
];

export async function PATCH(request: Request, { params }: { params: Promise<{ reference: string }> }) {
  try {
    const staff = await requireStaffWrite();
    const { reference } = await params;
    const body = await parseJson<{ status?: string; note?: string }>(request);

    const next = body.status as OrderStatus;
    if (!ALLOWED.includes(next)) return json({ error: "That status is not allowed." }, 400);

    const order = await prisma.order.findFirst({
      where: { publicReference: reference },
      select: { id: true, status: true, paymentStatus: true, userId: true, user: { select: { email: true, fullName: true } } },
    });
    if (!order) throw new Error("NOT_FOUND");

    if (next === "PROCESSING" && order.paymentStatus !== "PAID") {
      await approvePaymentAndStartProcessing({
        orderId: order.id,
        actorId: staff.id,
        note: body.note?.trim() || "Payment approved; application moved to processing.",
      });
      await recordAudit({
        actorId: staff.id,
        action: "order.status.update",
        entity: "Order",
        entityId: order.id,
        before: { status: order.status, paymentStatus: order.paymentStatus },
        after: { status: "PROCESSING", paymentStatus: "PAID" },
        request,
      });
      return json({ ok: true });
    }

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: next,
          ...(next === "COMPLETED" ? { completedAt: new Date() } : {}),
        },
      });
      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          fromStatus: order.status,
          toStatus: next,
          note: body.note?.trim() || null,
          actorId: staff.id,
        },
      });
      await tx.notification.create({
        data: {
          userId: order.userId,
          title: "Verification update",
          body: `Your request ${reference} is now: ${next.replace(/_/g, " ").toLowerCase()}.`,
          href: `/dashboard/orders/${reference}`,
        },
      });
    });

    // Best-effort styled email - never blocks the status change.
    const statusLabel = next.replace(/_/g, " ").toLowerCase();
    const email = renderEmail({
      preview: `Your verification ${reference} is now ${statusLabel}.`,
      heading: "Update on your verification",
      intro: `Hi ${order.user.fullName || "there"}, there's an update on your Companies House identity verification.`,
      rows: [
        ["Order reference", reference],
        ["New status", statusLabel.replace(/\b\w/g, (c) => c.toUpperCase())],
      ],
      ...(body.note?.trim() ? { paragraphs: [`Note from our team: ${body.note.trim()}`] } : {}),
      cta: { label: "View your order", url: `${getSiteUrl()}/dashboard/orders/${reference}` },
    });
    void sendMail(
      { to: order.user.email, subject: `Update on your verification ${reference}`, text: email.text, html: email.html },
      "support",
    );

    await recordAudit({
      actorId: staff.id,
      action: "order.status.update",
      entity: "Order",
      entityId: order.id,
      before: { status: order.status },
      after: { status: next },
      request,
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
