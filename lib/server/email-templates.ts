import { getSiteUrl } from "@/lib/env";

/** Internal recipients notified (silently) when a customer places an order. */
export const INTERNAL_ORDER_ALERT_RECIPIENTS = [
  "saqlain@hopetexx.com",
  "naveedaslamkhan167@gmail.com",
];

const BRAND_ORANGE = "#2e7d32";
const CHARCOAL = "#0B0C0C";
const INK = "#0B0C0C";
const MUTED = "#484949";
const BORDER = "#cecece";
const CREAM = "#f1f8f1";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type EmailContent = {
  preview?: string;
  heading: string;
  intro: string;
  code?: string;
  paragraphs?: string[];
  rows?: Array<[string, string]>;
  cta?: { label: string; url: string };
  note?: string;
};

export type FollowUpEmailContent = {
  sequence: 1 | 2 | 3;
  recipientName: string;
  heading: string;
  message: string;
  ctaUrl: string;
};

/** Dedicated conversion follow-up design with a complete support signature. */
export function renderFollowUpEmail(content: FollowUpEmailContent): { html: string; text: string } {
  const site = getSiteUrl();
  const year = new Date().getFullYear();
  const messageHtml = esc(content.message).replace(/\r?\n/g, "<br>");
  const sequenceLabel = `Reminder ${content.sequence} of 3`;
  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f1ed;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(content.heading)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f1ed;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;background:#ffffff;border:1px solid #eadfd7;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(31,24,20,.08);">
          <tr><td style="height:5px;background:#2e7d32;font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr>
            <td style="background:#222225;padding:24px 32px;">
              <img src="${site}/icon-512.png" alt="Companies House ID Verification" height="48" style="display:block;height:48px;width:auto;max-width:280px;border:0;" />
            </td>
          </tr>
          <tr>
            <td style="padding:34px 34px 30px;">
              <span style="display:inline-block;padding:7px 11px;border-radius:999px;background:#c8e6c9;color:#1b5e20;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">${sequenceLabel}</span>
              <h1 style="margin:18px 0 14px;color:#222225;font-size:26px;line-height:1.25;font-weight:800;">${esc(content.heading)}</h1>
              <p style="margin:0 0 16px;color:#33343a;font-size:15px;line-height:1.7;">Hi ${esc(content.recipientName || "there")},</p>
              <p style="margin:0 0 20px;color:#33343a;font-size:15px;line-height:1.7;">${messageHtml}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 24px;">
                <tr><td style="border-radius:10px;background:#2e7d32;">
                  <a href="${esc(content.ctaUrl)}" style="display:inline-block;padding:14px 25px;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none;border-radius:10px;">Start your verification&nbsp; →</a>
                </td></tr>
              </table>
              <div style="margin:0 0 22px;padding:15px 17px;border-left:4px solid #2e7d32;background:#f1f8f1;color:#484949;font-size:13px;line-height:1.6;">
                Once you place an order, the remaining automatic reminders stop immediately.
              </div>
              <p style="margin:0;color:#33343a;font-size:14px;line-height:1.7;">
                Kind regards,<br>
                <strong style="color:#222225;">The Companies House ID Verification Support Team</strong><br>
                <a href="mailto:support@companieshouseidverification.com" style="color:#1b5e20;text-decoration:none;">support@companieshouseidverification.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 34px;background:#222225;color:#aaa5a2;font-size:11px;line-height:1.7;">
              Companies House ID Verification provides secure Companies House identity-verification support through an approved ACSP workflow.<br>
              85 Dunstall Hill, Wolverhampton, United Kingdom, WV6 0SR<br>
              <a href="${site}" style="color:#2e7d32;text-decoration:none;">companieshouseidverification.com</a>
              <span style="color:#5c5957;"> &nbsp;·&nbsp; © ${year} Companies House ID Verification</span>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
  const text = [
    content.heading,
    "",
    `Hi ${content.recipientName || "there"},`,
    "",
    content.message,
    "",
    `Start your verification: ${content.ctaUrl}`,
    "",
    "Once you place an order, the remaining automatic reminders stop immediately.",
    "",
    "Kind regards,",
    "The Companies House ID Verification Support Team",
    "support@companieshouseidverification.com",
    "",
    "Companies House ID Verification · 85 Dunstall Hill, Wolverhampton, United Kingdom, WV6 0SR",
  ].join("\n");
  return { html, text };
}

/**
 * Render a branded, email-client-safe HTML message (table layout + inline
 * styles) plus a plain-text fallback. Keep all user-supplied strings escaped.
 */
export function renderEmail(content: EmailContent): { html: string; text: string } {
  const site = getSiteUrl();
  const year = new Date().getFullYear();

  const rowsHtml = (content.rows ?? [])
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${BORDER};color:${MUTED};font-size:13px;">${esc(label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${BORDER};color:${INK};font-size:14px;font-weight:600;text-align:right;">${esc(value)}</td>
      </tr>`,
    )
    .join("");

  const paragraphsHtml = (content.paragraphs ?? [])
    .map((p) => `<p style="margin:0 0 14px;color:${INK};font-size:15px;line-height:1.65;">${esc(p)}</p>`)
    .join("");

  const ctaHtml = content.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;"><tr><td style="border-radius:9px;background:${BRAND_ORANGE};">
        <a href="${esc(content.cta.url)}" style="display:inline-block;padding:13px 26px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;border-radius:9px;">${esc(content.cta.label)}</a>
      </td></tr></table>`
    : "";

  const noteHtml = content.note
    ? `<p style="margin:18px 0 0;padding:14px 16px;background:${CREAM};border-radius:10px;color:${MUTED};font-size:13px;line-height:1.6;">${esc(content.note)}</p>`
    : "";

  const codeHtml = content.code
    ? `<div style="margin:6px 0 20px;padding:18px;background:${CREAM};border:1px solid ${BORDER};border-radius:12px;text-align:center;">
        <div style="font-size:32px;font-weight:800;letter-spacing:10px;color:${CHARCOAL};font-family:'Courier New',monospace;">${esc(content.code)}</div>
      </div>`
    : "";

  const previewHtml = content.preview
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(content.preview)}</div>`
    : "";

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f3f4f6;">
    ${previewHtml}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${BORDER};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:${CHARCOAL};padding:20px 28px;">
              <img src="${site}/icon-512.png" alt="CompaniesHouseIDVerification.com" height="40" style="height:40px;width:auto;max-width:260px;display:block;border:0;outline:none;text-decoration:none;" />
            </td>
          </tr>
          <tr>
            <td style="padding:30px 28px 28px;">
              <h1 style="margin:0 0 12px;color:${CHARCOAL};font-size:21px;font-weight:800;">${esc(content.heading)}</h1>
              <p style="margin:0 0 18px;color:${INK};font-size:15px;line-height:1.65;">${esc(content.intro)}</p>
              ${codeHtml}
              ${paragraphsHtml}
              ${rowsHtml ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 18px;">${rowsHtml}</table>` : ""}
              ${ctaHtml}
              ${noteHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px;background:#fafafa;border-top:1px solid ${BORDER};">
              <p style="margin:0 0 4px;color:${MUTED};font-size:12px;line-height:1.6;">
                CompaniesHouseIDVerification.com provides Companies House identity-verification support through an approved ACSP workflow.
              </p>
              <p style="margin:0;color:${MUTED};font-size:12px;line-height:1.6;">
                85 Dunstall Hill, Wolverhampton, United Kingdom, WV6 0SR ·
                <a href="${site}" style="color:${BRAND_ORANGE};text-decoration:none;">companieshouseidverification.com</a>
              </p>
              <p style="margin:10px 0 0;color:#9ca3af;font-size:11px;">© ${year} CompaniesHouseIDVerification.com. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  const textParts = [
    content.heading,
    "",
    content.intro,
    ...(content.code ? ["", `Code: ${content.code}`] : []),
    ...(content.paragraphs ?? []).flatMap((p) => ["", p]),
  ];
  if (content.rows?.length) {
    textParts.push("");
    for (const [label, value] of content.rows) textParts.push(`${label}: ${value}`);
  }
  if (content.cta) textParts.push("", `${content.cta.label}: ${content.cta.url}`);
  if (content.note) textParts.push("", content.note);
  textParts.push(
    "",
    "----",
    "CompaniesHouseIDVerification.com provides Companies House identity-verification support through an approved ACSP workflow.",
    "85 Dunstall Hill, Wolverhampton, United Kingdom, WV6 0SR",
  );

  return { html, text: textParts.join("\n") };
}
