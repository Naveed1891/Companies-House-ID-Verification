"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-client";

export function AdminReplyForm({
  customerId,
  orderReference,
}: {
  customerId: string;
  orderReference: string | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function send() {
    setBusy(true);
    setError("");
    try {
      await apiFetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ customerId, orderReference, body, subject: "Reply from Companies House ID Verification" }),
      });
      setBody("");
      setOpen(false);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not send reply.");
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button type="button" className="dash-btn mt-3" onClick={() => setOpen(true)}>
        Reply
      </button>
    );
  }

  return (
    <div className="mt-3 flex flex-col gap-2" style={{ maxWidth: "520px" }}>
      <textarea
        className="dash-input"
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your reply…"
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="dash-btn dash-btn--primary"
          disabled={busy || !body.trim()}
          onClick={send}
        >
          {busy ? "Sending…" : "Send reply"}
        </button>
        <button type="button" className="dash-btn" disabled={busy} onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
      {error && <span className="text-[12.5px] text-[#b91c1c]">{error}</span>}
    </div>
  );
}
