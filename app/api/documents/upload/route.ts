import { prisma } from "@/lib/db";
import { getMaxUploadBytes } from "@/lib/env";
import { isPaymentSubmitted } from "@/lib/payment-status";
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

export async function POST(request: Request) {
  try {
    const user = await requireUser();

    const form = await request.formData();
    const orderRef = String(form.get("orderReference") ?? "").trim();
    const kind = String(form.get("documentType") ?? "").trim();
    const file = form.get("file");

    if (!orderRef || !kind) return json({ error: "Order and document type are required." }, 400);
    if (!(file instanceof File)) return json({ error: "A file is required." }, 400);

    const order = await prisma.order.findFirst({
      where: { publicReference: orderRef, userId: user.id },
      select: { id: true, paymentStatus: true },
    });
    if (!order) throw new Error("NOT_FOUND");
    if (!isPaymentSubmitted(order.paymentStatus)) throw new Error("PAYMENT_REQUIRED");

    if (!ALLOWED_TYPES.has(file.type)) throw new Error("UNSUPPORTED_TYPE");
    if (file.size > getMaxUploadBytes()) throw new Error("PAYLOAD_TOO_LARGE");

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
      select: { id: true, kind: true, fileName: true, status: true, uploadedAt: true },
    });

    return json({ document });
  } catch (error) {
    return routeError(error);
  }
}
