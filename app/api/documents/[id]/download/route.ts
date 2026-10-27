import { prisma } from "@/lib/db";
import { getCurrentStaff, getCurrentUser } from "@/lib/auth/session";
import { json, routeError } from "@/lib/server/http";
import { getDownloadUrl } from "@/lib/server/storage";

export const dynamic = "force-dynamic";

/**
 * Issues a short-lived URL for a document.
 *
 * Authorisation happens here, before any URL exists: the requester must either
 * own the document or hold a staff session.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const staff = await getCurrentStaff();
    const customer = staff ? null : await getCurrentUser();
    if (!staff && !customer) throw new Error("UNAUTHENTICATED");

    const document = await prisma.document.findFirst({
      where: {
        id,
        // Staff may read any document; a customer only their own.
        ...(staff ? {} : { userId: customer!.id }),
      },
      select: { storageKey: true, fileName: true, mimeType: true },
    });
    if (!document) throw new Error("NOT_FOUND");

    const url = await getDownloadUrl(document.storageKey);
    return json({ url, fileName: document.fileName, mimeType: document.mimeType });
  } catch (error) {
    return routeError(error);
  }
}
