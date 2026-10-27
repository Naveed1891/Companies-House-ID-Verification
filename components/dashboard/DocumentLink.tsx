"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-client";

/**
 * Requests a short-lived URL on click rather than embedding one in the page -
 * a rendered URL would outlive the authorisation check that produced it.
 */
export function DocumentLink({ documentId }: { documentId: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function open() {
    setBusy(true);
    setError("");
    try {
      const { url } = await apiFetch<{ url: string }>(
        `/api/documents/${encodeURIComponent(documentId)}/download`,
      );
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not open document.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" className="dash-btn" onClick={open} disabled={busy}>
        {busy ? "Opening…" : "View"}
      </button>
      {error && <span className="ml-2 text-[12.5px] text-[#b91c1c]">{error}</span>}
    </>
  );
}
