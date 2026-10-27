import { resolveWorldpay } from "@/lib/server/settings";

// Access Worldpay Hosted Payment Pages media type (versioned HAL+JSON).
const HPP_MEDIA = "application/vnd.worldpay.payment_pages-v1.hal+json";

function authHeader(username: string, password: string): string {
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

type ResultURLs = {
  successURL: string;
  pendingURL: string;
  failureURL: string;
  errorURL: string;
  cancelURL: string;
  expiryURL: string;
};

type SetupInput = {
  transactionReference: string;
  amountMinor: number;
  currency: string;
  description?: string;
  resultURLs: ResultURLs;
};

type SetupResult = { ok: boolean; url?: string; error?: string };

/**
 * Set up a Hosted Payment Pages session and return the Worldpay-hosted URL the
 * customer's browser should be redirected to. Card details are entered on
 * Worldpay's page, so no card data touches our servers.
 *
 * POST {base}/payment_pages -> { url, _links }.
 */
export async function createHostedPayment(input: SetupInput): Promise<SetupResult> {
  const cfg = await resolveWorldpay();
  if (!cfg.username || !cfg.password) {
    return { ok: false, error: "Card payments are not available right now." };
  }

  const body = {
    transactionReference: input.transactionReference,
    merchant: { entity: cfg.entity },
    narrative: { line1: "Companies House ID Verification" },
    value: { currency: input.currency, amount: input.amountMinor },
    ...(input.description ? { description: input.description.slice(0, 255) } : {}),
    resultURLs: input.resultURLs,
  };

  let res: Response;
  try {
    res = await fetch(`${cfg.baseUrl}/payment_pages`, {
      method: "POST",
      headers: {
        Authorization: authHeader(cfg.username, cfg.password),
        "Content-Type": HPP_MEDIA,
        Accept: HPP_MEDIA,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return { ok: false, error: "Could not reach the payment provider. Please try again." };
  }

  const data = (await res.json().catch(() => ({}))) as { url?: string; message?: string };
  if (!res.ok || !data.url) {
    return { ok: false, error: data.message || `Payment could not be started (${res.status}). Please try again.` };
  }
  return { ok: true, url: data.url };
}

export type WorldpayOutcome = "paid" | "failed" | "pending";

// Payment Queries reports the latest state in `lastEvent` (e.g. "Authorized",
// "Sent for Settlement", "Settled", "Refused", "Cancelled", "Error").
const SUCCESS_EVENTS = new Set(["authorized", "sentforsettlement", "settled", "charged"]);
const FAILURE_EVENTS = new Set(["refused", "cancelled", "canceled", "error", "expired", "failed"]);

function classifyEvent(lastEvent?: string): WorldpayOutcome {
  const key = (lastEvent ?? "").toLowerCase().replace(/[^a-z]/g, "");
  if (SUCCESS_EVENTS.has(key)) return "paid";
  if (FAILURE_EVENTS.has(key)) return "failed";
  return "pending";
}

type QueryResult = { ok: boolean; outcome: WorldpayOutcome; lastEvent?: string; error?: string };

/**
 * Authoritatively confirm a payment's outcome server-side via Payment Queries.
 *
 * GET {base}/payments/transactions/{transactionReference}. The service is a
 * data-aggregation layer with up to a 60s delay, so a 404 (or an unrecognised
 * event) is treated as "pending" and the caller should retry - never as paid.
 */
export async function queryHostedPaymentOutcome(transactionReference: string): Promise<QueryResult> {
  const cfg = await resolveWorldpay();
  if (!cfg.username || !cfg.password) {
    return { ok: false, outcome: "pending", error: "Card payments are not configured." };
  }

  let res: Response;
  try {
    res = await fetch(`${cfg.baseUrl}/payments/transactions/${encodeURIComponent(transactionReference)}`, {
      method: "GET",
      headers: { Authorization: authHeader(cfg.username, cfg.password), Accept: "application/json" },
      cache: "no-store",
    });
  } catch {
    return { ok: false, outcome: "pending", error: "Could not reach the payment provider." };
  }

  // Not aggregated yet - keep polling, do not treat as failed.
  if (res.status === 404) return { ok: true, outcome: "pending" };
  if (!res.ok) return { ok: false, outcome: "pending", error: `Could not confirm payment (${res.status}).` };

  const data = (await res.json().catch(() => ({}))) as { lastEvent?: string };
  return { ok: true, outcome: classifyEvent(data.lastEvent), lastEvent: data.lastEvent };
}

type TestResult = { ok: boolean; message: string };

/**
 * Validate the saved Worldpay Basic-auth credentials against the configured
 * environment without taking a payment. Posts an empty body to the Hosted
 * Payment Pages endpoint: bad credentials return 401/403, good credentials
 * reject the body with a 4xx that is not 401/403 - which still proves auth.
 */
export async function testWorldpayConnection(): Promise<TestResult> {
  const cfg = await resolveWorldpay();
  if (!cfg.username || !cfg.password) {
    return { ok: false, message: "Enter and save the API username and password first." };
  }

  let res: Response;
  try {
    res = await fetch(`${cfg.baseUrl}/payment_pages`, {
      method: "POST",
      headers: {
        Authorization: authHeader(cfg.username, cfg.password),
        "Content-Type": HPP_MEDIA,
        Accept: HPP_MEDIA,
      },
      body: "{}",
      cache: "no-store",
    });
  } catch {
    return { ok: false, message: `Could not reach Worldpay (${cfg.mode}). Check your network and try again.` };
  }

  // Surface Worldpay's own error text (safe to show an admin - no secrets) so
  // the failure can be diagnosed precisely.
  const raw = await res.text().catch(() => "");
  let providerMsg = "";
  try {
    const parsed = JSON.parse(raw) as { message?: string; errorName?: string; description?: string };
    providerMsg = parsed.message || parsed.errorName || parsed.description || "";
  } catch {
    providerMsg = raw.slice(0, 200);
  }
  const suffix = providerMsg ? ` Worldpay said: "${providerMsg}".` : "";

  // 401 = credentials rejected. 403 = credentials accepted but the account is
  // not entitled to this product. 404 = product/endpoint not provisioned.
  if (res.status === 401) {
    return {
      ok: false,
      message: `Authentication failed (401): Worldpay rejected these credentials for the ${cfg.mode} environment. Confirm the username/password pair (self-service: Reference ID = username, Credential = password) and that they are ${cfg.mode} credentials, not live.${suffix}`,
    };
  }
  if (res.status === 403) {
    return {
      ok: false,
      message: `Credentials are valid but not authorized (403): this Worldpay account may not have Hosted Payment Pages enabled. Ask Worldpay to enable HPP on the account.${suffix}`,
    };
  }
  if (res.status === 404) {
    return {
      ok: false,
      message: `Reached Worldpay ${cfg.mode} but Hosted Payment Pages was not found (404): the product may not be provisioned on this account.${suffix}`,
    };
  }

  return { ok: true, message: `Credentials accepted by Worldpay ${cfg.mode} (HTTP ${res.status}). Authentication is working.` };
}
