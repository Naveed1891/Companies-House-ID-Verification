import { resolveSmtp } from "@/lib/server/settings";

type Mail = { to: string; subject: string; text: string; html?: string };
export type MailProfile = "auth" | "support";
export type MailResult = { ok: true } | { ok: false; error: string };

/**
 * Best-effort email. If SMTP is not configured, this is a no-op so the app
 * keeps working; callers must not depend on delivery for correctness.
 */
export async function sendMail(mail: Mail, profile: MailProfile = "auth"): Promise<boolean> {
  return (await sendMailWithResult(mail, profile)).ok;
}

export async function sendMailWithResult(
  mail: Mail,
  profile: MailProfile = "auth",
): Promise<MailResult> {
  let smtp: Awaited<ReturnType<typeof resolveSmtp>>;
  try {
    smtp = await resolveSmtp(profile);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "SMTP settings could not be loaded.";
    console.error("[mailer] resolveSmtp failed:", msg);
    return { ok: false, error: msg };
  }
  if (!smtp.configured) return { ok: false, error: `${profile} SMTP is not fully configured.` };

  try {
    const nodemailer = await import("nodemailer");
    const transport = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user: smtp.user!, pass: smtp.pass! },
    });
    await transport.sendMail({
      from: smtp.from,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html ?? `<p>${mail.text.replace(/\n/g, "<br>")}</p>`,
    });
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "SMTP delivery failed.";
    console.error("[mailer] send failed", message);
    return { ok: false, error: message };
  }
}

/** Verify credentials without sending a real message (used by the test button). */
export async function verifySmtp(profile: MailProfile = "auth"): Promise<{ ok: boolean; error?: string }> {
  const smtp = await resolveSmtp(profile);
  if (!smtp.configured) return { ok: false, error: "SMTP is not fully configured." };
  try {
    const nodemailer = await import("nodemailer");
    const transport = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user: smtp.user!, pass: smtp.pass! },
    });
    await transport.verify();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Verification failed." };
  }
}
