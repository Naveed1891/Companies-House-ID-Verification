import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getCurrentStaff, getCurrentUser } from "@/lib/auth/session";
import { ADMIN_NAV, CEO_NAV_ITEM, CUSTOMER_NAV, FOLLOW_UP_NAV_ITEM } from "@/lib/dashboard-nav";
import { canManageFollowUps } from "@/lib/server/auth";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Real authorisation boundary - middleware only checks a cookie is present.
  const staff = await getCurrentStaff();
  const customer = staff ? null : await getCurrentUser();

  if (!staff && !customer) {
    redirect("/login?returnTo=%2Fdashboard");
  }

  const isStaff = Boolean(staff);
  // The credentials panel (and its nav entry) is available to super admins.
  const adminNav = staff
    ? [
        ...ADMIN_NAV,
        ...(canManageFollowUps(staff) ? [FOLLOW_UP_NAV_ITEM] : []),
        ...(staff.role === "SUPER_ADMIN" ? [CEO_NAV_ITEM] : []),
      ]
    : ADMIN_NAV;

  return (
    <DashboardShell
      nav={isStaff ? adminNav : CUSTOMER_NAV}
      areaLabel={isStaff ? "Admin" : "Customer"}
    >
      {children}
    </DashboardShell>
  );
}
