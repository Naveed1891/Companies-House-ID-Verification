import { getPackageBySlug } from "@/lib/server/catalog";
import { json, routeError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    if (!slug?.trim()) throw new Error("NOT_FOUND");

    const pkg = await getPackageBySlug(slug.trim());
    if (!pkg) return json({ error: "Package not found." }, 404);

    return json({ package: pkg });
  } catch (error) {
    return routeError(error);
  }
}
