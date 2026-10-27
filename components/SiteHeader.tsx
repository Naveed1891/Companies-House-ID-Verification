"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "./Logo";
import { AuthNav } from "./AuthNav";

const nav = [
  ["Services", "/services"],
  ["Who Needs to Verify", "/who-needs-to-verify"],
  ["How It Works", "/how-it-works"],
  ["Pricing", "/pricing"],
  ["Resources", "/blog"],
  ["About", "/about"],
] as const;

const SCROLL_TOP_THRESHOLD = 48;

export function SiteHeader() {
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const pathname = usePathname();

  const open = openForPath === pathname;
  const setOpen = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      setOpenForPath((current) => {
        const isOpen = current === pathname;
        const next = typeof value === "function" ? value(isOpen) : value;
        return next ? pathname : null;
      });
    },
    [pathname],
  );

  useEffect(() => {
    const onScroll = () => setAnnouncementVisible(window.scrollY < SCROLL_TOP_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className={`site-announcement bg-[#2e7d32] px-4 text-center text-[13px] font-medium leading-5 text-white ${announcementVisible ? "" : "site-announcement--hidden"}`}>
        Companies House identity verification is now a legal requirement.{" "}
        <Link href="/requirements" className="ml-1 font-bold underline underline-offset-3 text-white">
          Check requirements
        </Link>
      </div>

      {/* White header */}
      <div className="site-navbar-sticky" style={{ background: "#ffffff", borderBottom: "2px solid #2e7d32" }}>
        <header>
          <div className="site-container">
            <div className="flex h-[72px] items-center justify-between gap-4">
              <Logo />

              <nav className="hidden items-center gap-[clamp(12px,1.5vw,24px)] min-[1060px]:flex" aria-label="Primary navigation">
                {nav.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className={`whitespace-nowrap text-[14px] font-semibold no-underline transition-colors hover:text-[#1b5e20] ${
                      pathname === href
                        ? "text-[#2e7d32] underline underline-offset-4 decoration-2"
                        : "text-[#2e7d32]"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="hidden shrink-0 items-center gap-3 min-[1060px]:flex">
                <Link href="/login" className="text-[14px] font-semibold text-[#2e7d32] no-underline hover:underline">Sign in</Link>
                <Link href="/checkout" className="button button-primary text-[14px] px-5 py-2.5 min-h-0">
                  Start Verification
                </Link>
              </div>

              <button
                type="button"
                className="flex h-[44px] w-[44px] flex-col items-center justify-center gap-[5px] border border-[#2e7d32] bg-transparent min-[1060px]:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span className={`block h-0.5 w-5 bg-[#2e7d32] transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 bg-[#2e7d32] transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-[#2e7d32] transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </button>
            </div>

            {open && (
              <nav id="mobile-menu" className="border-t border-[#c8e6c9] min-[1060px]:hidden">
                <div className="flex flex-col py-3">
                  {nav.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className={`border-b border-[#c8e6c9] px-1 py-3 text-[15px] font-semibold no-underline hover:text-[#1b5e20] ${
                        pathname === href ? "text-[#2e7d32] font-bold" : "text-[#2e7d32]"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                  <div className="mt-4 flex flex-col gap-3 pb-2">
                    <Link href="/login" className="text-[15px] font-semibold text-[#2e7d32] no-underline">Sign in</Link>
                    <Link href="/checkout" className="button button-primary text-center">Start Verification</Link>
                  </div>
                </div>
              </nav>
            )}
          </div>
        </header>
      </div>
    </>
  );
}
