"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-client";

export function RefundControl({ paymentId, maxAmount }: { paymentId: string; maxAmount: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(maxAmount.toFixed(2));
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setBusy(true);
    setError("");
    try {
      await apiFetch(`/api/admin/payments/${encodeURIComponent(paymentId)}/refund`, {
        method: "POST",
        body: JSON.stringify({ amount: Number(amount), reason }),
      });
      setOpen(false);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Refund failed.");
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button type="button" className="dash-btn dash-btn--danger" onClick={() => setOpen(true)}>
        Refund
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        className="dash-input"
        type="number"
        step="0.01"
        min="0.01"
        max={maxAmount}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        className="dash-input"
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <p className="m-0 text-[12px] text-[color:var(--muted)]">
        This issues a real Stripe refund and cannot be undone.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="dash-btn dash-btn--danger"
          disabled={busy || !reason.trim() || Number(amount) <= 0}
          onClick={submit}
        >
          {busy ? "Refunding…" : "Confirm refund"}
        </button>
        <button type="button" className="dash-btn" disabled={busy} onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
      {error && <span className="text-[12.5px] text-[#b91c1c]">{error}</span>}
    </div>
  );
}
