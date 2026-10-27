import { json, parseJson, routeError } from "@/lib/server/http";
import { sendMail } from "@/lib/server/mailer";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { resolveSmtp } from "@/lib/server/settings";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PartnerBody = {
  companyName?: string;
  website?: string;
  businessType?: string;
  monthlyCustomers?: string;
  contactName?: string;
  email?: string;
  phoneCode?: string;
  phone?: string;
  country?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    if (!rateLimit(clientKey(request, "partner"), 5, 60_000)) {
      return json({ error: "Too many requests. Please wait a minute and try again." }, 429);
    }

    const body = await parseJson<PartnerBody>(request);
    const companyName = String(body.companyName ?? "").trim();
    const website = String(body.website ?? "").trim();
    const businessType = String(body.businessType ?? "").trim();
    const monthlyCustomers = String(body.monthlyCustomers ?? "").trim();
    const contactName = String(body.contactName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phoneCode = String(body.phoneCode ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const country = String(body.country ?? "").trim();
    const message = String(body.message ?? "").trim();
    const fullPhone = [phoneCode, phone].filter(Boolean).join(" ").trim();

    if (
      !companyName ||
      !website ||
      !businessType ||
      !monthlyCustomers ||
      !contactName ||
      !EMAIL_RE.test(email) ||
      !phone ||
      !country
    ) {
      return json(
        { error: "Please complete all required fields with a valid work email." },
        400,
      );
    }

    const smtp = await resolveSmtp("support");
    const to = smtp.supportInbox || smtp.from;
    if (!smtp.configured || !to) {
      return json(
        { error: "Partnership enquiries are not available right now. Please email us directly." },
        503,
      );
    }

    const internalText = [
      "New B2B partnership enquiry",
      "",
      `Company name:        ${companyName}`,
      `Website:             ${website}`,
      `Business type:       ${businessType}`,
      `Expected customers:  ${monthlyCustomers} per month`,
      `Country / region:    ${country}`,
      "",
      `Contact name:        ${contactName}`,
      `Work email:          ${email}`,
      `Phone:               ${fullPhone || "-"}`,
      "",
      "Partnership goals:",
      message || "-",
    ].join("\n");

    const sent = await sendMail(
      {
        to,
        subject: `Partnership enquiry - ${companyName}`,
        text: internalText,
      },
      "support",
    );
    if (!sent) return json({ error: "Your enquiry could not be sent. Please try again." }, 502);

    // Confirmation to the applicant. Best-effort: the enquiry has already been
    // recorded via the internal email, so a failed confirmation must not fail
    // the request.
    const confirmationText = [
      `Hi ${contactName},`,
      "",
      "Thanks for your interest in partnering with CompaniesHouseIDVerification.com. We have received your enquiry and our partnerships team will review it and get back to you within one working day.",
      "",
      "Here is a copy of the details you submitted:",
      "",
      `Company: ${companyName}`,
      `Website: ${website}`,
      `Business type: ${businessType}`,
      `Expected verifications per month: ${monthlyCustomers}`,
      `Phone: ${fullPhone || "-"}`,
      `Country / region: ${country}`,
      ...(message ? ["", "Partnership goals:", message] : []),
      "",
      "If any of these details are wrong, just reply to this email and let us know.",
      "",
      "Best regards,",
      "The CompaniesHouseIDVerification.com team",
    ].join("\n");

    await sendMail(
      {
        to: email,
        subject: "We have received your partnership enquiry - CompaniesHouseIDVerification.com",
        text: confirmationText,
      },
      "support",
    );

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
