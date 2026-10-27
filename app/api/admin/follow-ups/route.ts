import { requireFollowUpAdmin } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { json, parseJson, routeError } from "@/lib/server/http";
import {
  resolveFollowUpSettings,
  saveSettings,
  SETTING_KEYS,
} from "@/lib/server/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireFollowUpAdmin();
    return json({ settings: await resolveFollowUpSettings() });
  } catch (error) {
    return routeError(error);
  }
}

export async function POST(request: Request) {
  try {
    const staff = await requireFollowUpAdmin();
    const body = await parseJson<{
      enabled?: boolean;
      templates?: Array<{ subject?: string; heading?: string; message?: string }>;
    }>(request);
    if (typeof body.enabled !== "boolean" || !Array.isArray(body.templates) || body.templates.length !== 3) {
      return json({ error: "Three valid follow-up templates are required." }, 400);
    }

    const templates = body.templates.map((template) => ({
      subject: String(template.subject ?? "").trim(),
      heading: String(template.heading ?? "").trim(),
      message: String(template.message ?? "").trim(),
    }));
    if (templates.some((item) => !item.subject || !item.heading || !item.message)) {
      return json({ error: "Subject, heading and message are required for every follow-up." }, 400);
    }
    if (templates.some((item) => item.subject.length > 191 || item.heading.length > 191 || item.message.length > 2000)) {
      return json({ error: "One or more template fields are too long." }, 400);
    }

    const K = SETTING_KEYS;
    await saveSettings(
      {
        [K.followUpEnabled]: String(body.enabled),
        [K.followUp1Subject]: templates[0].subject,
        [K.followUp1Heading]: templates[0].heading,
        [K.followUp1Message]: templates[0].message,
        [K.followUp2Subject]: templates[1].subject,
        [K.followUp2Heading]: templates[1].heading,
        [K.followUp2Message]: templates[1].message,
        [K.followUp3Subject]: templates[2].subject,
        [K.followUp3Heading]: templates[2].heading,
        [K.followUp3Message]: templates[2].message,
      },
      staff.id,
    );
    await recordAudit({
      actorId: staff.id,
      action: "follow-ups.settings.update",
      entity: "AppSetting",
      after: { enabled: body.enabled, templateCount: 3 },
      request,
    });
    return json({ ok: true, settings: await resolveFollowUpSettings() });
  } catch (error) {
    return routeError(error);
  }
}
