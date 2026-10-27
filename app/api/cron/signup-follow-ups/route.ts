import { timingSafeEqual } from "node:crypto";
import { json } from "@/lib/server/http";
import { processSignupFollowUps } from "@/lib/server/signup-follow-ups";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function matchesSecret(given: string, expected: string | undefined): boolean {
  if (!expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization") ?? "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (
    !matchesSecret(token, process.env.INTERNAL_CRON_TOKEN) &&
    !matchesSecret(token, process.env.CRON_SECRET) &&
    !matchesSecret(token, process.env.SESSION_SECRET)
  ) {
    return json({ error: "Not found." }, 404);
  }

  const result = await processSignupFollowUps();
  return json(result);
}
