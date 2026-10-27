import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { isPaymentSubmitted } from "@/lib/payment-status";
import { requireUser } from "@/lib/server/auth";
import { json, parseJson, routeError } from "@/lib/server/http";
import { submitCustomerApplication } from "@/lib/server/submit-application";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ orderRef: string }> }) {
  try {
    const user = await requireUser();
    const { orderRef } = await params;

    const order = await prisma.order.findFirst({
      where: { publicReference: orderRef, userId: user.id },
      select: { id: true, status: true, paymentStatus: true, diditUrl: true, application: true },
    });
    if (!order) throw new Error("NOT_FOUND");
    if (!isPaymentSubmitted(order.paymentStatus)) throw new Error("PAYMENT_REQUIRED");
    if (order.application?.status === "SUBMITTED" || order.application?.status === "APPROVED") {
      throw new Error("ALREADY_SUBMITTED");
    }

    const body = await parseJson<{
      answers?: Record<string, unknown>;
      application?: Record<string, unknown>;
      declarationAccepted?: boolean;
    }>(request);

    if (body.declarationAccepted !== true) {
      return json({ error: "You must accept the declaration before submitting." }, 400);
    }

    const answers = (body.answers ??
      body.application ??
      order.application?.answers ??
      {}) as Prisma.InputJsonValue;

    const result = await submitCustomerApplication({
      userId: user.id,
      orderId: order.id,
      orderRef,
      currentStatus: order.status,
      answers,
      existingDiditUrl: order.diditUrl,
    });

    return json({ ok: true, submittedAt: result.submittedAt, verification: result.verification });
  } catch (error) {
    return routeError(error);
  }
}
