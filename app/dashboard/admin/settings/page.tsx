import { notFound } from "next/navigation";
import { PageHeading } from "@/components/dashboard/ui";
import { SettingsPanels } from "@/components/dashboard/SettingsPanels";
import { getCurrentStaff } from "@/lib/auth/session";
import { settingsStatus } from "@/lib/server/settings";

export const dynamic = "force-dynamic";

export default async function CeoSettingsPage() {
  const staff = await getCurrentStaff();
  // Hard 404 for anyone who is not a super admin - the route must not reveal itself.
  if (!staff || staff.role !== "SUPER_ADMIN") notFound();

  const status = await settingsStatus();

  return (
    <>
      <PageHeading
        eyebrow="CEO"
        title="Platform credentials"
        description="Manage email, payment and storage credentials. Values saved here override the server environment and take effect immediately."
      />
      <SettingsPanels initial={status} />
    </>
  );
}
