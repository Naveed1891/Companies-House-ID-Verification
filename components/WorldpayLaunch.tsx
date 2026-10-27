"use client";

import { useState } from "react";

/**
 * Starts a WorldPay Hosted Payment Pages session and redirects the customer to
 * Worldpay's secure page. Card details are entered on Worldpay, never here.
 */
export function WorldpayLaunch({
  orderReference,
  amountLabel,
}: {
  orderReference: string;
  amountLabel: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function start() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout/worldpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderReference }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Payment could not be started.");
      window.location.assign(data.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Payment could not be started.");
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="body-copy mt-0">
        You&rsquo;ll be taken to WorldPay&rsquo;s secure page to enter your card details, then brought
        straight back here.
      </p>
      {error && <p className="form-alert form-alert--error mt-4">{error}</p>}
      <button type="button" className="button button-primary mt-5 w-full" disabled={busy} onClick={start}>
        {busy ? "Starting…" : `Pay ${amountLabel} by card`}
      </button>
      <p className="mt-3 mb-0 text-center text-[12px] text-muted-text">
        Payments are processed securely by WorldPay. Your card details never touch our servers.
      </p>
    </div>
  );
}
