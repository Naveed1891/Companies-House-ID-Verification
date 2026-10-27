"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/components/auth/AuthProvider";
import { apiFetch } from "@/lib/api-client";
import type { NavItem } from "@/lib/dashboard-nav";

export function DashboardShell({
  nav,
  areaLabel,
  children,
}: {
  nav: NavItem[];
  areaLabel: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Server clears the cookie on success; reset the UI regardless.
    }
    setUser(null);
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string): boolean {
    if (href === "/dashboard" || href === "/dashboard/admin") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="dash">
      <aside className={`dash__sidebar ${menuOpen ? "dash__sidebar--open" : ""}`}>
        <div className="dash__brand">
          {/* Logo renders its own link to "/" - do not wrap it in another. */}
          <Logo inverse />
          <p className="dash__area">{areaLabel}</p>
        </div>
        <nav className="dash__nav" aria-label={`${areaLabel} navigation`}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`dash__link ${isActive(item.href) ? "dash__link--active" : ""}`}
            >
              <span className="dash__link-icon" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="dash__sidebar-foot">
          <Link href="/" className="dash__back">
            ← Back to website
          </Link>
        </div>
      </aside>

      <div className="dash__main">
        <header className="dash__topbar">
          <button
            type="button"
            className="dash__burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="dash__topbar-spacer" />
          <div className="dash__user">
            <span className="dash__user-name">{user?.fullName ?? "…"}</span>
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className="dash__signout"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </header>
        <main className="dash__content">{children}</main>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="dash__scrim"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
