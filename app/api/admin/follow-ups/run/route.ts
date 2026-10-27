import { requireFollowUpAdmin } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { json, routeError } from "@/lib/server/http";
import { processSignupFollowUps } from "@/lib/server/signup-follow-ups";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const staff = await requireFollowUpAdmin();
    const result = await processSignupFollowUps();
    await recordAudit({
      actorId: staff.id,
      action: "follow-ups.run.manual",
      entity: "SignupFollowUp",
      after: result,
      request,
    });
    return json({ result });
  } catch (error) {
    return routeError(error);
  }
}
