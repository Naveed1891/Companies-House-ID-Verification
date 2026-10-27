"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-client";

export type CustomerInfoRequest = {
  id: string;
  kind: "DOCUMENT" | "INFORMATION";
  message: string;
  documentLabel: string | null;
  status: "OPEN" | "RESOLVED" | "CANCELLED";
  responseText: string | null;
  createdAt: string;
};

function OpenRequest({
  orderRef,
  request,
}: {
  orderRef: string;
  request: CustomerInfoRequest;
}) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const isDocument = request.kind === "DOCUMENT";

  async function submit() {
    setBusy(true);
    setError("");
    try {
      const url = `/api/orders/${encodeURIComponent(orderRef)}/info-requests/${encodeURIComponent(request.id)}`;

      if (isDocument) {
        if (!file) {
          setError("Choose a file to upload.");
          setBusy(false);
          return;
        }
        const form = new FormData();
        form.append("file", file);
        if (text.trim()) form.append("note", text.trim());
        // Let the browser set the multipart boundary - do not send JSON headers.
        const response = await fetch(url, { method: "POST", body: form });
        if (!response.ok) {
          const data = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(data.error ?? "Upload failed.");
        }
      } else {
        await apiFetch(url, { method: "POST", body: JSON.stringify({ responseText: text }) });
      }

      setText("");
      setFile(null);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not send your response.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="info-req info-req--open">
      <div className="info-req__head">
        <span className="dash-badge dash-badge--warn">
          {isDocument ? "Document needed" : "Information needed"}
        </span>
      </div>
      <p className="info-req__message">{request.message}</p>

      {isDocument ? (
        <div className="dash-form" style={{ maxWidth: "560px" }}>
          <label className="dash-label">
            {request.documentLabel ?? "Upload document"}
            <input
              className="dash-input"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <span className="text-[12.5px] font-normal text-[color:var(--muted)]">
              JPG, PNG, WEBP, HEIC or PDF.
            </span>
          </label>
          <label className="dash-label">
            Add a note (optional)
            <textarea
              className="dash-input"
              rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
        </div>
      ) : (
        <div className="dash-form" style={{ maxWidth: "560px" }}>
          <label className="dash-label">
            Your answer
            <textarea
              className="dash-input"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your response here…"
            />
          </label>
        </div>
      )}

      {error && <p className="dash-error m-0 mt-3">{error}</p>}

      <div className="dash-actions mt-3">
        <button
          type="button"
          className="dash-btn dash-btn--primary"
          disabled={busy || (isDocument ? !file : !text.trim())}
          onClick={submit}
        >
          {busy ? "Sending…" : isDocument ? "Upload document" : "Send response"}
        </button>
      </div>
    </div>
  );
}

export function InfoRequestPanel({
  orderRef,
  requests,
}: {
  orderRef: string;
  requests: CustomerInfoRequest[];
}) {
  const open = requests.filter((r) => r.status === "OPEN");
  const resolved = requests.filter((r) => r.status === "RESOLVED");

  if (requests.length === 0) return null;

  return (
    <>
      {open.map((request) => (
        <OpenRequest key={request.id} orderRef={orderRef} request={request} />
      ))}

      {resolved.length > 0 && (
        <div className="mt-4">
          {resolved.map((request) => (
            <div key={request.id} className="info-req">
              <div className="info-req__head">
                <span className="dash-badge dash-badge--ok">Provided</span>
              </div>
              <p className="info-req__message">{request.message}</p>
              {request.responseText && (
                <p className="m-0 mt-2 text-[13.5px] text-[color:var(--muted)] whitespace-pre-wrap">
                  Your answer: {request.responseText}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
