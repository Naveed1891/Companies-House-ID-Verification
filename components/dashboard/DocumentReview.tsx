"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-client";

export function DocumentReview({ documentId }: { documentId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  async function decide(status: "APPROVED" | "REJECTED" | "NEEDS_REUPLOAD") {
    if (status !== "APPROVED" && !reason.trim()) {
      setRejecting(true);
      return;
    }
    setBusy(true);
    setError("");
    try {
      await apiFetch(`/api/admin/documents/${encodeURIComponent(documentId)}`, {
        method: "PATCH",
        body: JSON.stringify({ status, rejectionReason: reason }),
      });
      setRejecting(false);
      setReason("");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Action failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="dash-btn" disabled={busy} onClick={() => decide("APPROVED")}>
          Approve
        </button>
        <button
          type="button"
          className="dash-btn dash-btn--danger"
          disabled={busy}
          onClick={() => setRejecting((open) => !open)}
        >
          Reject
        </button>
      </div>

      {rejecting && (
        <div className="flex flex-col gap-2">
          <input
            className="dash-input"
            placeholder="Reason shown to the customer"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="dash-btn dash-btn--danger"
              disabled={busy || !reason.trim()}
              onClick={() => decide("REJECTED")}
            >
              Confirm reject
            </button>
            <button
              type="button"
              className="dash-btn"
              disabled={busy || !reason.trim()}
              onClick={() => decide("NEEDS_REUPLOAD")}
            >
              Request re-upload
            </button>
          </div>
        </div>
      )}

      {error && <span className="text-[12.5px] text-[#b91c1c]">{error}</span>}
    </div>
  );
}
