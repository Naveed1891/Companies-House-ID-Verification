import { json, parseJson, routeError } from "@/lib/server/http";
import { sendMail } from "@/lib/server/mailer";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { resolveSmtp } from "@/lib/server/settings";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    if (!rateLimit(clientKey(request, "contact"), 5, 60_000)) {
      return json({ error: "Too many messages. Please wait a minute and try again." }, 429);
    }

    const body = await parseJson<{ name?: string; email?: string; role?: string; message?: string }>(request);
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const role = String(body.role ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !EMAIL_RE.test(email) || !message) {
      return json({ error: "Please provide your name, a valid email and a message." }, 400);
    }

    const smtp = await resolveSmtp("support");
    const to = smtp.supportInbox || smtp.from;
    if (!smtp.configured || !to) {
      return json(
        { error: "Messaging is not available right now. Please email us directly." },
        503,
      );
    }

    const sent = await sendMail({
      to,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nRole: ${role || "-"}\n\n${message}`,
    }, "support");
    if (!sent) return json({ error: "Your message could not be sent. Please try again." }, 502);

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
