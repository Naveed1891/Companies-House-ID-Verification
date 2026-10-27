"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES, findCountryByDial } from "@/lib/countries";

type Props = {
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
};

function splitPhone(raw: string): { dial: string; local: string } {
  const trimmed = (raw || "").trim();
  if (!trimmed) return { dial: "44", local: "" };
  if (trimmed.startsWith("+")) {
    // Try longest-match dial codes first (some are 3-4 digits like 1876).
    const digits = trimmed.slice(1).replace(/\D/g, "");
    for (let len = 4; len >= 1; len -= 1) {
      const guess = digits.slice(0, len);
      if (findCountryByDial(guess)) {
        return { dial: guess, local: digits.slice(len) };
      }
    }
    return { dial: "", local: digits };
  }
  return { dial: "44", local: trimmed.replace(/\D/g, "") };
}

/**
 * WhatsApp / phone input with dial-code dropdown.
 *
 * Emits a single form value (E.164-ish: `+<dial><local>`) under `name` so
 * the existing API contract keeps working. Users see two controls: a
 * country dial-code dropdown and a number input.
 */
export function PhoneInput({
  name,
  defaultValue = "",
  required,
  placeholder = "7700900123",
  autoComplete = "tel",
  className,
}: Props) {
  const initial = splitPhone(defaultValue);
  const [dial, setDial] = useState(initial.dial || "44");
  const [local, setLocal] = useState(initial.local);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const selected = findCountryByDial(dial);
  const combined = local ? `+${dial}${local.replace(/\D/g, "")}` : "";

  return (
    <div ref={rootRef} className={`relative flex gap-2 ${className ?? ""}`}>
      <input type="hidden" name={name} value={combined} required={required} />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate bg-navy px-3 py-2.5 text-white outline-none focus:border-emerald"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Country dial code"
      >
        <span aria-hidden>{selected?.flag ?? "🌍"}</span>
        <span className="text-sm">+{dial || "?"}</span>
        <span aria-hidden className="text-off-white/60">▾</span>
      </button>
      <input
        type="tel"
        inputMode="tel"
        autoComplete={autoComplete}
        value={local}
        onChange={(e) => setLocal(e.target.value.replace(/[^\d\s\-]/g, ""))}
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded-lg border border-slate bg-navy px-3 py-2.5 text-white outline-none focus:border-emerald"
      />

      {open ? (
        <div className="absolute left-0 top-full z-40 mt-1 w-full overflow-hidden rounded-lg border border-slate bg-charcoal shadow-xl">
          <input
            type="text"
            autoFocus
            placeholder="Search country or code..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-0 border-b border-slate bg-navy px-3 py-2 text-white outline-none"
          />
          <ul role="listbox" className="m-0 max-h-64 list-none overflow-y-auto p-0">
            {filtered.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => {
                    setDial(c.dial);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-white hover:bg-navy ${
                    dial === c.dial ? "bg-navy/60" : ""
                  }`}
                >
                  <span aria-hidden>{c.flag}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-xs text-off-white/70">+{c.dial}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
