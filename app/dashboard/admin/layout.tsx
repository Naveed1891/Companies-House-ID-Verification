import { notFound } from "next/navigation";
import { getCurrentStaff } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

/**
 * Admin-area gate.
 *
 * A signed-in customer gets 404 rather than 403 - confirming the route exists
 * tells an attacker where to aim.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const staff = await getCurrentStaff();
  if (!staff) notFound();
  return <>{children}</>;
}
