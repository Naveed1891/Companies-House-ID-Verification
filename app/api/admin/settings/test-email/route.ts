import { requireStaffAdmin } from "@/lib/server/auth";
import { json, routeError } from "@/lib/server/http";
import { sendMail, verifySmtp } from "@/lib/server/mailer";
import { resolveSmtp } from "@/lib/server/settings";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await requireStaffAdmin();
    const body = (await request.json().catch(() => ({}))) as { profile?: "auth" | "support" };
    const profile = body.profile === "support" ? "support" : "auth";
    const verified = await verifySmtp(profile);
    if (!verified.ok) return json({ ok: false, error: verified.error }, 400);

    const smtp = await resolveSmtp(profile);
    const sent = await sendMail({
      to: profile === "support" ? smtp.supportInbox || smtp.from : smtp.from,
      subject: `Companies House ID Verification ${profile} SMTP test`,
      text: `This is a test email confirming your ${profile} SMTP settings are working.`,
    }, profile);
    return json({ ok: sent, error: sent ? undefined : "SMTP verified but the test message failed to send." });
  } catch (error) {
    return routeError(error);
  }
}
