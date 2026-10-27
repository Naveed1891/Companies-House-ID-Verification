import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/server/auth";
import { json, parseJson, routeError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

async function loadOwnedOrder(userId: string, orderRef: string) {
  const order = await prisma.order.findFirst({
    where: { publicReference: orderRef, userId },
    select: {
      id: true,
      status: true,
      paymentStatus: true,
      packageId: true,
      application: true,
    },
  });
  if (!order) throw new Error("NOT_FOUND");
  return order;
}

export async function GET(_request: Request, { params }: { params: Promise<{ orderRef: string }> }) {
  try {
    const user = await requireUser();
    const { orderRef } = await params;
    const order = await loadOwnedOrder(user.id, orderRef);

    const form = await prisma.formDefinition.findFirst({
      where: { packageId: order.packageId, active: true },
      orderBy: { version: "desc" },
      select: { schema: true, version: true },
    });

    return json({
      application: {
        status: order.application?.status ?? "NOT_STARTED",
        answers: order.application?.answers ?? {},
        declarationAccepted: order.application?.declarationAccepted ?? false,
        submittedAt: order.application?.submittedAt?.toISOString() ?? null,
        reviewNote: order.application?.reviewNote ?? null,
      },
      form: form?.schema ?? null,
    });
  } catch (error) {
    return routeError(error);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ orderRef: string }> }) {
  try {
    const user = await requireUser();
    const { orderRef } = await params;
    const order = await loadOwnedOrder(user.id, orderRef);

    if (order.application?.status === "SUBMITTED" || order.application?.status === "APPROVED") {
      throw new Error("ALREADY_SUBMITTED");
    }

    const body = await parseJson<{
      answers?: Record<string, unknown>;
      application?: Record<string, unknown>;
    }>(request);
    // Accept either key - the verification form posts `application`.
    const answers = (body.answers ?? body.application ?? {}) as Prisma.InputJsonValue;

    await prisma.application.upsert({
      where: { orderId: order.id },
      update: { answers, status: "IN_PROGRESS" },
      create: { orderId: order.id, answers, status: "IN_PROGRESS" },
    });

    // Unpaid applications remain DRAFT so they stay out of admin work queues.
    // Once payment has been submitted, saving advances the placed order.
    await prisma.order.updateMany({
      where: { id: order.id, status: "AWAITING_APPLICATION" },
      data: { status: "APPLICATION_IN_PROGRESS" },
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
