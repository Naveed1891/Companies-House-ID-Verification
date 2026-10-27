import { prisma } from "@/lib/db";
import { requireStaffWrite } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { json, parseJson, routeError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ reference: string }> }) {
  try {
    const staff = await requireStaffWrite();
    const { reference } = await params;
    const body = await parseJson<{ body?: string }>(request);

    const text = String(body.body ?? "").trim();
    if (!text) return json({ error: "A note is required." }, 400);

    const order = await prisma.order.findFirst({
      where: { publicReference: reference },
      select: { id: true },
    });
    if (!order) throw new Error("NOT_FOUND");

    const note = await prisma.internalNote.create({
      data: { orderId: order.id, authorId: staff.id, body: text },
      select: { id: true },
    });

    await recordAudit({
      actorId: staff.id,
      action: "order.note.create",
      entity: "InternalNote",
      entityId: note.id,
      request,
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
