import { prisma } from "@/lib/db";
import { getCurrentStaff, getCurrentUser } from "@/lib/auth/session";
import { resolveStorageDriver } from "@/lib/server/settings";
import { routeError } from "@/lib/server/http";
import { readLocalObject } from "@/lib/server/storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Streams a locally-stored document. Development only - production uses S3
 * presigned URLs and never routes bytes through the app.
 *
 * The ownership check is repeated here because the storage key alone must
 * never be sufficient to read a file.
 */
export async function GET(request: Request) {
  try {
    if ((await resolveStorageDriver()) !== "local") throw new Error("NOT_FOUND");

    const key = new URL(request.url).searchParams.get("key")?.trim();
    if (!key) throw new Error("NOT_FOUND");

    const staff = await getCurrentStaff();
    const customer = staff ? null : await getCurrentUser();
    if (!staff && !customer) throw new Error("UNAUTHENTICATED");

    const document = await prisma.document.findFirst({
      where: {
        storageKey: key,
        ...(staff ? {} : { userId: customer!.id }),
      },
      select: { fileName: true, mimeType: true, storageKey: true },
    });
    if (!document) throw new Error("NOT_FOUND");

    const body = await readLocalObject(document.storageKey);
    return new Response(new Uint8Array(body), {
      headers: {
        "Content-Type": document.mimeType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(document.fileName)}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return routeError(error);
  }
}
