import { prisma } from "@/lib/db";
import { recordAudit } from "@/lib/server/audit";
import { requireReviewAccess } from "@/lib/server/auth";
import { json, routeError } from "@/lib/server/http";
import { approvePaymentAndStartProcessing } from "@/lib/server/payment-approval";

export const dynamic = "force-dynamic";

/**
 * Staff confirm that a manual bank transfer has been received. Mirrors the
 * Payment-proof approval path: marks the payment PAID and starts processing.
 */
export async function POST(request: Request, { params }: { params: Promise<{ reference: string }> }) {
  try {
    const staff = await requireReviewAccess();
    const { reference } = await params;

    const order = await prisma.order.findFirst({
      where: { publicReference: reference },
      select: {
        id: true,
        userId: true,
        status: true,
        paymentStatus: true,
      },
    });
    if (!order) throw new Error("NOT_FOUND");
    await approvePaymentAndStartProcessing({
      orderId: order.id,
      actorId: staff.id,
      note: "Payment confirmed; application moved to processing.",
    });

    await recordAudit({
      actorId: staff.id,
      action: "order.payment.confirm",
      entity: "Order",
      entityId: order.id,
      before: { paymentStatus: order.paymentStatus },
      after: { paymentStatus: "PAID" },
      request,
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
