"use client";

import { DragEvent, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ACCEPT = "image/png,image/jpeg,image/webp,image/heic,application/pdf";
const ACCEPTED_TYPES = new Set(ACCEPT.split(","));

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PaymentProofUpload({ orderReference }: { orderReference: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function pick(next: File | null) {
    setError("");
    if (next && !ACCEPTED_TYPES.has(next.type)) {
      setError("Please upload a PNG, JPG, WEBP, HEIC or PDF file.");
      return;
    }
    setFile(next);
  }

  function onDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    setDragging(false);
    pick(event.dataTransfer.files?.[0] ?? null);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Please choose your payment screenshot first.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("orderReference", orderReference);
      body.append("file", file);
      const res = await fetch("/api/payment-proof", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Your proof could not be uploaded. Please try again.");
      router.push(`/application/${orderReference}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Upload failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-5">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={(e) => pick(e.target.files?.[0] ?? null)}
      />

      {file ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-soft-border bg-off-white p-4">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald/10 text-lg text-emerald"
              aria-hidden="true"
            >
              ✓
            </span>
            <div className="min-w-0">
              <p className="m-0 truncate text-[14px] font-bold text-charcoal">{file.name}</p>
              <p className="m-0 text-[12.5px] text-muted-text">{formatSize(file.size)}</p>
            </div>
          </div>
          <button
            type="button"
            className="text-[13px] font-bold text-emerald"
            onClick={() => inputRef.current?.click()}
          >
            Change file
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
            dragging
              ? "border-emerald bg-emerald/5"
              : "border-soft-border bg-off-white hover:border-emerald hover:bg-warm-cream"
          }`}
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-warm-cream text-xl text-orange-accent" aria-hidden="true">
            ↑
          </span>
          <span className="text-[14px] font-bold text-charcoal">
            Click to choose a file, or drag it here
          </span>
          <span className="text-[12.5px] text-muted-text">PNG, JPG, WEBP, HEIC or PDF</span>
        </button>
      )}

      {error && <p className="form-alert form-alert--error mt-3 mb-0">{error}</p>}

      <button type="submit" className="button button-primary mt-4" disabled={busy || !file}>
        {busy ? "Uploading…" : "Upload payment proof"}
      </button>
    </form>
  );
}
