"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api-client";
import { websiteLoginHref } from "@/lib/return-to";
import { checkoutReturnTo, DEFAULT_PACKAGE_SLUG } from "@/lib/checkout-redirect";
import { useAuth } from "./auth/AuthProvider";
import { MagneticButton } from "./motion/MagneticButton";

interface AuthNavProps {
  variant: "desktop" | "mobile";
  isHero: boolean;
  onNavigate?: () => void;
}

function AuthNavSkeleton({ variant, isHero }: { variant: "desktop" | "mobile"; isHero: boolean }) {
  const pulse = isHero ? "bg-white/10" : "bg-slate/40";
  return variant === "desktop" ? (
    <span aria-hidden className={`h-9 w-[150px] animate-pulse rounded-lg ${pulse}`} />
  ) : (
    <>
      <span aria-hidden className={`h-11 animate-pulse rounded-lg ${pulse}`} />
      <span aria-hidden className={`h-11 animate-pulse rounded-lg ${pulse}`} />
    </>
  );
}

function AuthNavContent({ variant, isHero, onNavigate }: AuthNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loginHref = websiteLoginHref(
    pathname,
    searchParams.toString() ? `?${searchParams.toString()}` : "",
  );
  const { user, setUser } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Cookie cleared server-side on success; still reset UI.
    }
    setUser(null);
    setLoggingOut(false);
    onNavigate?.();
    router.push("/");
    router.refresh();
  }

  const linkClass = isHero
    ? "text-[14px] font-bold text-[#F7F7F7] no-underline hover:text-emerald"
    : "text-[14px] font-bold text-off-white no-underline hover:text-emerald";
  const ctaClass = isHero
    ? "rounded-lg bg-emerald px-5 py-[11px] text-[14.5px] font-bold text-white no-underline hover:bg-dark-emerald"
    : "rounded-lg bg-emerald px-5 py-[11px] text-[14.5px] font-bold text-white no-underline hover:bg-dark-emerald";
  const mobileBorder = isHero ? "border-white/20" : "border-slate";

  if (user === undefined) {
    return <AuthNavSkeleton variant={variant} isHero={isHero} />;
  }

  if (variant === "desktop") {
    return user ? (
      <>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className={`${linkClass} disabled:opacity-60`}
        >
          {loggingOut ? "Signing out…" : "Log out"}
        </button>
        <a href={"/dashboard"} className={linkClass}>
          Dashboard
        </a>
        <MagneticButton strength={0.3}>
          <a href={"/dashboard/orders"} className={ctaClass}>
            My requests
          </a>
        </MagneticButton>
      </>
    ) : (
      <>
        <Link href={loginHref} className={linkClass}>
          Sign in
        </Link>
        <MagneticButton strength={0.3}>
          <Link href={checkoutReturnTo(DEFAULT_PACKAGE_SLUG)} className={ctaClass}>
            Get Verified
          </Link>
        </MagneticButton>
      </>
    );
  }

  return user ? (
    <>
      <a
        href={"/dashboard"}
        onClick={onNavigate}
        className={`rounded-lg border p-3 text-center text-[15px] font-bold text-[#F7F7F7] no-underline ${mobileBorder}`}
      >
        Dashboard
      </a>
      <a
        href={"/dashboard/orders"}
        onClick={onNavigate}
        className="rounded-lg bg-emerald p-3 text-center text-[15px] font-bold text-white no-underline"
      >
        My requests
      </a>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        className={`rounded-lg border p-3 text-center text-[15px] font-bold text-[#F7F7F7] disabled:opacity-60 ${mobileBorder}`}
      >
        {loggingOut ? "Signing out…" : "Log out"}
      </button>
    </>
  ) : (
    <>
      <Link
        href={loginHref}
        onClick={onNavigate}
        className={`rounded-lg border p-3 text-center text-[15px] font-bold text-[#F7F7F7] no-underline ${mobileBorder}`}
      >
        Sign in
      </Link>
      <Link href={checkoutReturnTo(DEFAULT_PACKAGE_SLUG)} onClick={onNavigate} className="rounded-lg bg-emerald p-3 text-center text-[15px] font-bold text-white no-underline">
        Get Verified
      </Link>
    </>
  );
}

export function AuthNav(props: AuthNavProps) {
  return (
    <Suspense fallback={<AuthNavSkeleton variant={props.variant} isHero={props.isHero} />}>
      <AuthNavContent {...props} />
    </Suspense>
  );
}
