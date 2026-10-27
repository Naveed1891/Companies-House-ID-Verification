import { prisma } from "@/lib/db";
import { requireStaffWrite } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { json, parseJson, routeError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const staff = await requireStaffWrite();
    const body = await parseJson<{
      title?: string;
      detail?: string;
      assignedToId?: string | null;
      orderReference?: string | null;
    }>(request);

    const title = String(body.title ?? "").trim();
    if (!title) return json({ error: "A task title is required." }, 400);

    let orderId: string | null = null;
    if (body.orderReference) {
      const order = await prisma.order.findFirst({
        where: { publicReference: String(body.orderReference).trim() },
        select: { id: true },
      });
      if (!order) return json({ error: "That order reference was not found." }, 400);
      orderId = order.id;
    }

    const assignee = body.assignedToId?.trim() || null;
    if (assignee) {
      const target = await prisma.user.findFirst({
        where: { id: assignee, role: { not: "CUSTOMER" }, status: "ACTIVE", deletedAt: null },
        select: { id: true },
      });
      if (!target) return json({ error: "That staff member is not available." }, 400);
    }

    const task = await prisma.task.create({
      data: {
        title,
        detail: String(body.detail ?? "").trim() || null,
        assignedToId: assignee,
        orderId,
        status: "TODO",
      },
      select: { id: true },
    });

    await recordAudit({
      actorId: staff.id,
      action: "task.create",
      entity: "Task",
      entityId: task.id,
      request,
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
