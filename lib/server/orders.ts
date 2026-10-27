import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { formatOrderReference, nextOrderSequence } from "@/lib/server/order-reference";

/**
 * Filter that excludes DRAFT orders. A DRAFT order is a not-yet-placed
 * selection: the customer chose a package and reached the payment step, but has
 * not paid or uploaded payment proof yet. Such orders must never appear in the
 * customer's requests, the admin order lists, counts or reports - the order is
 * only "placed" once payment proof is uploaded (bank transfer) or payment is
 * confirmed (card / Stripe), at which point it leaves DRAFT.
 */
export const PLACED_ORDER_FILTER: Prisma.OrderWhereInput = {
  status: { not: "DRAFT" },
};

/**
 * Create a new order in DRAFT / UNPAID state with the next global sequential
 * reference. Shared by the bank-transfer checkout and the (currently disabled)
 * Stripe / WorldPay checkout so both mint references the same way.
 *
 * The order is intentionally created as DRAFT: it holds the reference and the
 * chosen package while the customer completes payment, but it is not yet a
 * placed order and stays hidden from every order list until payment proof is
 * uploaded (bank transfer) or payment is confirmed (card / Stripe).
 */
export async function createPendingOrder(input: {
  userId: string;
  packageId: string;
  amount: Prisma.Decimal | number;
  currency: string;
  application?: Prisma.InputJsonValue;
}): Promise<{ id: string; publicReference: string }> {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.order.findFirst({
      where: {
        userId: input.userId,
        packageId: input.packageId,
        status: "DRAFT",
        paymentStatus: "UNPAID",
      },
      select: { id: true, publicReference: true },
      orderBy: { createdAt: "desc" },
    });

    const declarationAccepted =
      input.application !== undefined &&
      typeof input.application === "object" &&
      !Array.isArray(input.application) &&
      (input.application as { nonRefundAcknowledgement?: unknown }).nonRefundAcknowledgement === true;

    if (existing) {
      if (input.application !== undefined) {
        await tx.application.upsert({
          where: { orderId: existing.id },
          update: { answers: input.application, status: "IN_PROGRESS", declarationAccepted },
          create: {
            orderId: existing.id,
            status: "IN_PROGRESS",
            answers: input.application,
            declarationAccepted,
          },
        });
      }
      return existing;
    }

    const sequenceNo = await nextOrderSequence(tx);
    const order = await tx.order.create({
      data: {
        publicReference: formatOrderReference(sequenceNo),
        sequenceNo,
        userId: input.userId,
        packageId: input.packageId,
        status: "DRAFT",
        paymentStatus: "UNPAID",
        amount: input.amount,
        currency: input.currency,
      },
      select: { id: true, publicReference: true },
    });
    if (input.application !== undefined) {
      await tx.application.create({
        data: {
          orderId: order.id,
          status: "IN_PROGRESS",
          answers: input.application,
          declarationAccepted,
        },
      });
    }
    return order;
  });
}
