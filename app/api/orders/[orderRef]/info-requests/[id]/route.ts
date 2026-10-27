import { prisma } from "@/lib/db";
import { getMaxUploadBytes } from "@/lib/env";
import { requireUser } from "@/lib/server/auth";
import { json, routeError } from "@/lib/server/http";
import { buildStorageKey, putObject } from "@/lib/server/storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
]);

/**
 * Customer response to a staff request.
 *
 * Accepts JSON (text answer) or multipart (document). Both resolve the request
 * and, once nothing is outstanding, hand the order back to the review queue.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ orderRef: string; id: string }> },
) {
  try {
    const user = await requireUser();
    const { orderRef, id } = await params;

    // Scoped by userId - a customer can only answer their own requests.
    const order = await prisma.order.findFirst({
      where: { publicReference: orderRef, userId: user.id },
      select: { id: true, status: true },
    });
    if (!order) throw new Error("NOT_FOUND");

    const infoRequest = await prisma.infoRequest.findFirst({
      where: { id, orderId: order.id, status: "OPEN" },
      select: { id: true, kind: true, documentKind: true, documentLabel: true },
    });
    if (!infoRequest) throw new Error("NOT_FOUND");

    const contentType = request.headers.get("content-type") ?? "";

    let responseText: string | null = null;
    let documentId: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      if (infoRequest.kind !== "DOCUMENT") {
        return json({ error: "This request expects a written answer." }, 400);
      }

      const form = await request.formData();
      const file = form.get("file");
      if (!(file instanceof File)) return json({ error: "A file is required." }, 400);
      if (!ALLOWED_TYPES.has(file.type)) throw new Error("UNSUPPORTED_TYPE");
      if (file.size > getMaxUploadBytes()) throw new Error("PAYLOAD_TOO_LARGE");

      const kind = infoRequest.documentKind ?? "additional_document";
      const buffer = Buffer.from(await file.arrayBuffer());
      const storageKey = buildStorageKey(order.id, kind, file.name);
      await putObject(storageKey, buffer, file.type);

      const document = await prisma.document.create({
        data: {
          orderId: order.id,
          userId: user.id,
          kind,
          fileName: file.name.slice(0, 255),
          mimeType: file.type,
          size: file.size,
          storageKey,
          status: "UPLOADED",
        },
        select: { id: true },
      });
      documentId = document.id;
      responseText = String(form.get("note") ?? "").trim() || null;
    } else {
      if (infoRequest.kind !== "INFORMATION") {
        return json({ error: "This request expects a document upload." }, 400);
      }
      const body = (await request.json().catch(() => null)) as { responseText?: string } | null;
      const text = String(body?.responseText ?? "").trim();
      if (!text) return json({ error: "Please enter your answer." }, 400);
      responseText = text;
    }

    await prisma.$transaction(async (tx) => {
      await tx.infoRequest.update({
        where: { id: infoRequest.id },
        data: { status: "RESOLVED", responseText, documentId, resolvedAt: new Date() },
      });

      const stillOpen = await tx.infoRequest.count({
        where: { orderId: order.id, status: "OPEN" },
      });

      // Only hand the order back once nothing is outstanding.
      if (stillOpen === 0 && order.status === "ADDITIONAL_INFO_REQUIRED") {
        await tx.order.update({ where: { id: order.id }, data: { status: "UNDER_REVIEW" } });
        await tx.orderStatusHistory.create({
          data: {
            orderId: order.id,
            fromStatus: order.status,
            toStatus: "UNDER_REVIEW",
            note: "Customer provided the requested items.",
            actorId: user.id,
          },
        });
      }
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
