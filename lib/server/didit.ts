import { resolveDidit } from "@/lib/server/settings";

export type DiditSession = { sessionId: string; url: string; status: string | null };

/**
 * Create a Didit verification session for an order. Returns null when Didit is
 * not configured (so callers can degrade gracefully); throws on an API error so
 * best-effort callers can log it without breaking their own flow.
 */
export async function createDiditSession(input: {
  vendorData: string;
  callback: string;
}): Promise<DiditSession | null> {
  const cfg = await resolveDidit();
  if (!cfg.configured || !cfg.apiKey || !cfg.workflowId) return null;

  const res = await fetch(`${cfg.baseUrl}/v3/session/`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": cfg.apiKey },
    body: JSON.stringify({
      workflow_id: cfg.workflowId,
      vendor_data: input.vendorData,
      callback: input.callback,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Didit session creation failed (${res.status}): ${detail.slice(0, 300)}`);
  }

  const data = (await res.json()) as Record<string, unknown>;
  const url = String((data.verification_url ?? data.url ?? "") || "");
  const sessionId = String((data.session_id ?? data.id ?? "") || "");
  if (!url || !sessionId) {
    throw new Error("Didit session response did not include a verification URL / session id.");
  }
  return { sessionId, url, status: typeof data.status === "string" ? data.status : null };
}
