import { requireStaffAdmin } from "@/lib/server/auth";
import { getSiteUrl } from "@/lib/env";
import { createDiditSession } from "@/lib/server/didit";
import { json, routeError } from "@/lib/server/http";
import { resolveDidit } from "@/lib/server/settings";

export const dynamic = "force-dynamic";

/**
 * CEO-only connectivity check for Didit. Surfaces the exact reason a session
 * cannot be created (missing config, wrong key/mode, workflow not found) so the
 * credentials can be fixed without digging through server logs.
 */
export async function POST() {
  try {
    await requireStaffAdmin();
    const cfg = await resolveDidit();

    const missing: string[] = [];
    if (!cfg.apiKey) missing.push("API key");
    if (!cfg.workflowId) missing.push("Workflow ID");
    if (missing.length > 0) {
      return json({ ok: false, error: `Not saved yet: ${missing.join(", ")}.` }, 400);
    }

    try {
      const session = await createDiditSession({
        vendorData: "test-connection",
        callback: `${getSiteUrl()}/dashboard/admin/settings`,
      });
      if (!session) return json({ ok: false, error: "Didit is not configured." }, 400);
      return json({
        ok: true,
        message: `Success - a Didit ${cfg.mode} session was created and returned a verification URL.`,
      });
    } catch (cause) {
      return json(
        { ok: false, error: cause instanceof Error ? cause.message : "Didit request failed." },
        400,
      );
    }
  } catch (error) {
    return routeError(error);
  }
}
