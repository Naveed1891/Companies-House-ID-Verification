import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/server/auth";
import { json, routeError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ orderRef: string }> }) {
  try {
    const user = await requireUser();
    const { orderRef } = await params;

    // Scoped by userId - a customer can never read another customer's order.
    const order = await prisma.order.findFirst({
      where: { publicReference: orderRef, userId: user.id },
      select: {
        publicReference: true,
        status: true,
        paymentStatus: true,
        amount: true,
        currency: true,
        personalCode: true,
        createdAt: true,
        package: { select: { slug: true, name: true } },
        application: { select: { status: true } },
      },
    });
    if (!order) throw new Error("NOT_FOUND");

    return json({
      order: {
        reference: order.publicReference,
        status: order.status,
        paymentStatus: order.paymentStatus,
        amount: Number(order.amount),
        currency: order.currency,
        personalCode: order.personalCode,
        createdAt: order.createdAt.toISOString(),
        packageSlug: order.package.slug,
        packageName: order.package.name,
        applicationStatus: order.application?.status ?? "NOT_STARTED",
      },
    });
  } catch (error) {
    return routeError(error);
  }
}
