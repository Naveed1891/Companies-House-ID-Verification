"use client";

import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";

/** Six single-character boxes for a 6-digit code: auto-advance, backspace,
 *  arrow-key navigation and full-code paste. Emits a digits-only string. */
export function OtpInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const chars = Array.from({ length: 6 }, (_, i) => value[i] ?? "");

  function focusBox(index: number) {
    inputs.current[Math.max(0, Math.min(5, index))]?.focus();
  }

  function setDigit(index: number, digit: string) {
    const arr = Array.from({ length: 6 }, (_, i) => value[i] ?? "");
    arr[index] = digit;
    onChange(arr.join("").replace(/\D/g, "").slice(0, 6));
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setDigit(index, digit);
    if (digit && index < 5) focusBox(index + 1);
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (value[index]) {
        setDigit(index, "");
      } else if (index > 0) {
        setDigit(index - 1, "");
        focusBox(index - 1);
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusBox(index - 1);
    } else if (event.key === "ArrowRight" && index < 5) {
      event.preventDefault();
      focusBox(index + 1);
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    event.preventDefault();
    onChange(pasted);
    focusBox(Math.min(pasted.length, 5));
  }

  return (
    <div className="flex justify-between gap-2" onPaste={handlePaste}>
      {chars.map((char, index) => (
        <input
          key={index}
          ref={(el) => {
            inputs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          value={char}
          autoFocus={index === 0}
          aria-label={`Digit ${index + 1}`}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={(e) => e.target.select()}
          className="h-14 w-full min-w-0 rounded-lg border border-slate bg-navy text-center text-xl font-bold text-white outline-none focus:border-emerald disabled:opacity-60"
        />
      ))}
    </div>
  );
}
