"use client";

import { useState } from "react";

export function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions; the value stays selectable.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <code className="rounded-xl border border-[color:var(--border)] bg-[color:var(--cream-soft)] px-5 py-3 font-mono text-[clamp(16px,2.5vw,22px)] font-bold tracking-[0.18em]">
        {value}
      </code>
      <button type="button" className="dash-btn" onClick={copy}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
