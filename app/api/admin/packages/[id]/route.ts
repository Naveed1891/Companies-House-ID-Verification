import { prisma } from "@/lib/db";
import { requireStaffWrite } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { json, parseJson, routeError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const staff = await requireStaffWrite();
    const { id } = await params;
    const body = await parseJson<{
      name?: string;
      description?: string;
      price?: number;
      compareAtPrice?: number | null;
      features?: string[];
      active?: boolean;
    }>(request);

    const existing = await prisma.package.findUnique({
      where: { id },
      select: { id: true, name: true, price: true, active: true },
    });
    if (!existing) throw new Error("NOT_FOUND");

    const name = String(body.name ?? "").trim();
    if (!name) return json({ error: "A package name is required." }, 400);

    const price = Number(body.price);
    if (!Number.isFinite(price) || price < 0) return json({ error: "Enter a valid price." }, 400);

    const compareAt =
      body.compareAtPrice == null || body.compareAtPrice === undefined
        ? null
        : Number(body.compareAtPrice);
    if (compareAt !== null && (!Number.isFinite(compareAt) || compareAt < 0)) {
      return json({ error: "Enter a valid compare-at price." }, 400);
    }

    const features = Array.isArray(body.features)
      ? body.features.filter((f): f is string => typeof f === "string" && f.trim() !== "")
      : [];

    await prisma.package.update({
      where: { id },
      data: {
        name,
        description: String(body.description ?? "").trim() || null,
        price,
        compareAtPrice: compareAt,
        features,
        active: Boolean(body.active),
      },
    });

    await recordAudit({
      actorId: staff.id,
      action: "package.update",
      entity: "Package",
      entityId: id,
      before: { name: existing.name, price: Number(existing.price), active: existing.active },
      after: { name, price, active: Boolean(body.active) },
      request,
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
