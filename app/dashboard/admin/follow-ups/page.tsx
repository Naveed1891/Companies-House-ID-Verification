import { notFound } from "next/navigation";
import { FollowUpSettings } from "@/components/dashboard/FollowUpSettings";
import { PageHeading } from "@/components/dashboard/ui";
import { getCurrentStaff } from "@/lib/auth/session";
import { canManageFollowUps } from "@/lib/server/auth";
import { resolveFollowUpSettings } from "@/lib/server/settings";

export const dynamic = "force-dynamic";

export default async function FollowUpSettingsPage() {
  const staff = await getCurrentStaff();
  if (!staff || !canManageFollowUps(staff)) notFound();

  return (
    <>
      <PageHeading
        eyebrow="Admin"
        title="Signup follow-up emails"
        description="Manage the automatic three-email sequence for customers who create an account but do not place an order."
      />
      <FollowUpSettings initial={await resolveFollowUpSettings()} />
    </>
  );
}
