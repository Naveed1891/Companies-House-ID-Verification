import { redirect } from "next/navigation";
import { PageHeading, Panel } from "@/components/dashboard/ui";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { PasswordForm } from "@/components/dashboard/PasswordForm";
import { getCurrentUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?returnTo=%2Fdashboard%2Fprofile");

  return (
    <>
      <PageHeading eyebrow="Profile" title="Your details" description="Keep your contact details up to date." />
      <Panel>
        <p className="eyebrow">Contact details</p>
        <ProfileForm
          initial={{
            fullName: user.fullName,
            email: user.email,
            whatsapp: user.whatsapp,
            country: user.country,
          }}
        />
      </Panel>
      <Panel>
        <p className="eyebrow">Password</p>
        <PasswordForm />
      </Panel>
    </>
  );
}
