"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Floating "Become a Partner" CTA on marketing pages.
 */
export function FloatingActions() {
  const pathname = usePathname();
  const showPartner = pathname !== "/become-partner";

  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-3 sm:bottom-6 sm:left-6">
      {showPartner && (
        <Link
          href="/become-partner"
          aria-label="Become a partner"
          className="inline-flex items-center gap-2 rounded-full bg-orange-accent py-3 pr-5 pl-4 font-bold text-white no-underline shadow-elevated transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            🤝
          </span>
          <span className="hidden text-[14px] sm:inline">Become a Partner</span>
          <span className="text-[14px] sm:hidden">Partner</span>
        </Link>
      )}
    </div>
  );
}
