import type { DocumentStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireReviewAccess } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { json, parseJson, routeError } from "@/lib/server/http";
import { approvePaymentAndStartProcessing } from "@/lib/server/payment-approval";

export const dynamic = "force-dynamic";

const ALLOWED: DocumentStatus[] = ["IN_REVIEW", "APPROVED", "REJECTED", "NEEDS_REUPLOAD"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const staff = await requireReviewAccess();
    const { id } = await params;
    const body = await parseJson<{ status?: string; rejectionReason?: string }>(request);

    const next = body.status as DocumentStatus;
    if (!ALLOWED.includes(next)) return json({ error: "That status is not allowed." }, 400);

    const reason = String(body.rejectionReason ?? "").trim();
    if ((next === "REJECTED" || next === "NEEDS_REUPLOAD") && !reason) {
      return json({ error: "A reason is required so the customer knows what to fix." }, 400);
    }

    const document = await prisma.document.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        kind: true,
        userId: true,
        order: { select: { id: true, publicReference: true } },
      },
    });
    if (!document) throw new Error("NOT_FOUND");

    if (next === "APPROVED" && document.kind === "payment_proof") {
      await approvePaymentAndStartProcessing({
        orderId: document.order.id,
        actorId: staff.id,
        documentId: document.id,
        note: "Payment proof approved; application moved to processing.",
      });
    } else {
      await prisma.document.update({
        where: { id },
        data: {
          status: next,
          rejectionReason: next === "APPROVED" ? null : reason,
          reviewedById: staff.id,
          reviewedAt: new Date(),
        },
      });
    }

    if (next !== "APPROVED") {
      await prisma.notification.create({
        data: {
          userId: document.userId,
          title: "A document needs your attention",
          body: `Your ${document.kind.replace(/_/g, " ")} was not accepted: ${reason}`,
          href: `/dashboard/orders/${document.order.publicReference}`,
        },
      });
    }

    await recordAudit({
      actorId: staff.id,
      action: "document.review",
      entity: "Document",
      entityId: document.id,
      before: { status: document.status },
      after: { status: next },
      request,
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
