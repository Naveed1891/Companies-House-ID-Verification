"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES, type Country } from "@/lib/countries";

type Props = {
  id?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

/**
 * Searchable country picker. Emits the country NAME (e.g. "United Kingdom")
 * as the form value so it drops in wherever a plain text "Country" input
 * used to live.
 */
export function CountrySelect({
  id,
  name,
  value,
  defaultValue,
  required,
  disabled,
  onChange,
  placeholder = "Select country",
  className,
}: Props) {
  const [internal, setInternal] = useState<string>(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const current = value ?? internal;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dial.includes(q),
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

  function pick(country: Country) {
    if (value === undefined) setInternal(country.name);
    onChange?.(country.name);
    setOpen(false);
    setQuery("");
  }

  const selectedCountry = COUNTRIES.find((c) => c.name === current);

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <input type="hidden" name={name} value={current} required={required} />
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate bg-navy px-3 py-2.5 text-left text-white outline-none focus:border-emerald disabled:opacity-60"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedCountry ? (
            <>
              <span aria-hidden>{selectedCountry.flag}</span>
              <span className="truncate">{selectedCountry.name}</span>
            </>
          ) : (
            <span className="text-off-white/60">{placeholder}</span>
          )}
        </span>
        <span aria-hidden className="text-off-white/60">▾</span>
      </button>

      {open ? (
        <div className="absolute z-40 mt-1 w-full overflow-hidden rounded-lg border border-slate bg-charcoal shadow-xl">
          <input
            type="text"
            autoFocus
            placeholder="Search country or code..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-0 border-b border-slate bg-navy px-3 py-2 text-white outline-none"
          />
          <ul role="listbox" className="m-0 max-h-64 list-none overflow-y-auto p-0">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-off-white/70">No matches</li>
            ) : (
              filtered.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => pick(c)}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-white hover:bg-navy ${
                      current === c.name ? "bg-navy/60" : ""
                    }`}
                  >
                    <span aria-hidden>{c.flag}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-xs text-off-white/70">+{c.dial}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
