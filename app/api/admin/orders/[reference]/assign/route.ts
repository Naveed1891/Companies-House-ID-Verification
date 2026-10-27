import { prisma } from "@/lib/db";
import { requireStaffWrite } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { json, parseJson, routeError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ reference: string }> }) {
  try {
    const staff = await requireStaffWrite();
    const { reference } = await params;
    const body = await parseJson<{ staffUserId?: string | null }>(request);

    const order = await prisma.order.findFirst({
      where: { publicReference: reference },
      select: { id: true, assignedToId: true },
    });
    if (!order) throw new Error("NOT_FOUND");

    const assignee = body.staffUserId?.trim() || null;
    if (assignee) {
      // Only an active staff member may be assigned work.
      const target = await prisma.user.findFirst({
        where: { id: assignee, role: { not: "CUSTOMER" }, status: "ACTIVE", deletedAt: null },
        select: { id: true },
      });
      if (!target) return json({ error: "That staff member is not available." }, 400);
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { assignedToId: assignee },
    });

    await recordAudit({
      actorId: staff.id,
      action: "order.assign",
      entity: "Order",
      entityId: order.id,
      before: { assignedToId: order.assignedToId },
      after: { assignedToId: assignee },
      request,
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
