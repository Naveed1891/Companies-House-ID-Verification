"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "chidv_cookie_consent";

/**
 * Minimal, privacy-first consent banner. Essential cookies (the session) are
 * always required; this records the user's choice on non-essential cookies.
 * Nothing non-essential is loaded until a choice is stored.
 */
export function CookieConsent() {
  // Start hidden on both server and client (same first paint), then reveal
  // after mount if no choice is stored - avoids a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    // Defer past the commit so the reveal is a follow-up render, not a
    // synchronous cascade during the mount effect.
    const raf = requestAnimationFrame(() => {
      let stored = true;
      try {
        stored = Boolean(localStorage.getItem(STORAGE_KEY));
      } catch {
        stored = false;
      }
      setDismissed(stored);
      setMounted(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const visible = mounted && !dismissed;

  function choose(value: "accepted" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore storage failures; the banner simply reappears next visit.
    }
    setDismissed(true);
  }

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-label="Cookie consent" aria-live="polite">
      <div className="cookie-consent__inner">
        <p className="cookie-consent__text">
          We use essential cookies to keep you signed in and the service secure. With your consent we
          may also use non-essential cookies to improve the site. See our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
        <div className="cookie-consent__actions">
          <button type="button" className="cookie-consent__btn" onClick={() => choose("essential")}>
            Essential only
          </button>
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--primary"
            onClick={() => choose("accepted")}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
