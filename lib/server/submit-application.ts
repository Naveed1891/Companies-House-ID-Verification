import type { OrderStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getSiteUrl } from "@/lib/env";
import { createDiditSession } from "@/lib/server/didit";
import { qrDataUrl } from "@/lib/server/qr";

export type VerificationPayload = { url: string; qr: string };

export async function verificationFromUrl(
  url: string | null | undefined,
): Promise<VerificationPayload | null> {
  if (!url) return null;
  return { url, qr: await qrDataUrl(url) };
}

export async function attachDiditSession(
  orderId: string,
  orderRef: string,
): Promise<VerificationPayload | null> {
  try {
    const session = await createDiditSession({
      vendorData: orderRef,
      callback: `${getSiteUrl()}/dashboard/orders/${orderRef}`,
    });
    if (!session) return null;
    await prisma.order.update({
      where: { id: orderId },
      data: {
        diditSessionId: session.sessionId,
        diditStatus: session.status ?? "Not Started",
        diditUrl: session.url,
      },
    });
    return { url: session.url, qr: await qrDataUrl(session.url) };
  } catch (cause) {
    console.error(
      "[didit] session creation failed for",
      orderRef,
      cause instanceof Error ? cause.message : cause,
    );
    return null;
  }
}

async function persistSubmission(input: {
  userId: string;
  orderId: string;
  currentStatus: OrderStatus;
  answers: Prisma.InputJsonValue;
  note: string;
}) {
  const now = new Date();
  await prisma.$transaction(async (tx) => {
    await tx.application.upsert({
      where: { orderId: input.orderId },
      update: {
        answers: input.answers,
        declarationAccepted: true,
        status: "SUBMITTED",
        submittedAt: now,
      },
      create: {
        orderId: input.orderId,
        answers: input.answers,
        declarationAccepted: true,
        status: "SUBMITTED",
        submittedAt: now,
      },
    });
    await tx.order.update({
      where: { id: input.orderId },
      data: { status: "SUBMITTED" },
    });
    await tx.orderStatusHistory.create({
      data: {
        orderId: input.orderId,
        fromStatus: input.currentStatus,
        toStatus: "SUBMITTED",
        note: input.note,
        actorId: input.userId,
      },
    });
  });
  return now;
}

export async function submitCustomerApplication(input: {
  userId: string;
  orderId: string;
  orderRef: string;
  currentStatus: OrderStatus;
  answers: Prisma.InputJsonValue;
  existingDiditUrl?: string | null;
  note?: string;
}): Promise<{ submittedAt: string; verification: VerificationPayload | null }> {
  const submittedAt = await persistSubmission({
    userId: input.userId,
    orderId: input.orderId,
    currentStatus: input.currentStatus,
    answers: input.answers,
    note: input.note ?? "Application submitted by customer.",
  });
  const verification =
    (await verificationFromUrl(input.existingDiditUrl)) ??
    (await attachDiditSession(input.orderId, input.orderRef));
  return { submittedAt: submittedAt.toISOString(), verification };
}

/**
 * After payment proof is uploaded, submit the saved application and start
 * identity verification. Idempotent if the application is already submitted.
 */
export async function submitApplicationAfterPaymentProof(input: {
  userId: string;
  orderId: string;
  orderRef: string;
  currentStatus: OrderStatus;
  existingDiditUrl?: string | null;
}): Promise<{ submitted: boolean; verification: VerificationPayload | null }> {
  const application = await prisma.application.findUnique({
    where: { orderId: input.orderId },
    select: { status: true, answers: true },
  });
  if (!application) return { submitted: false, verification: null };

  if (application.status === "SUBMITTED" || application.status === "APPROVED") {
    const verification =
      (await verificationFromUrl(input.existingDiditUrl)) ??
      (await attachDiditSession(input.orderId, input.orderRef));
    return { submitted: true, verification };
  }

  const answers = (application.answers ?? {}) as Prisma.InputJsonValue;
  const result = await submitCustomerApplication({
    userId: input.userId,
    orderId: input.orderId,
    orderRef: input.orderRef,
    currentStatus: input.currentStatus,
    answers,
    existingDiditUrl: input.existingDiditUrl,
    note: "Application submitted automatically after payment proof.",
  });
  return { submitted: true, verification: result.verification };
}
