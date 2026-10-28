"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { useAuth } from "@/components/auth/AuthProvider";
import { apiFetch } from "@/lib/api-client";
import { safeReturnTo } from "@/lib/return-to";
import type { PublicUser } from "@/lib/auth/session";

const DEFAULT_RETURN = "/";

function destinationFor(user: PublicUser, returnTo: string): string {
  if (user.role !== "CUSTOMER") return "/dashboard/admin";
  if (returnTo && returnTo !== DEFAULT_RETURN) return returnTo;
  return "/dashboard";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = safeReturnTo(searchParams.get("returnTo") ?? searchParams.get("next"));
  const { user, loading: authLoading, setUser } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Never show a sign-in form to someone who is already signed in.
  useEffect(() => {
    if (user) router.replace(destinationFor(user, returnTo));
  }, [user, returnTo, router]);

  function land(signedIn: PublicUser) {
    setUser(signedIn);
    router.replace(destinationFor(signedIn, returnTo));
    router.refresh();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const result = await apiFetch<{ user: PublicUser }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
          rememberMe: form.get("rememberMe") === "on",
        }),
      });
      land(result.user);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Sign in failed.");
      setSubmitting(false);
    }
  }

  if (authLoading || user) {
    return (
      <PageFrame>
        <div className="site-container flex min-h-[70vh] items-center justify-center py-16 text-muted-text">
          {user ? "Taking you to your account…" : "Loading…"}
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <div className="site-container flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-[440px] rounded-2xl border border-slate bg-charcoal p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h1 className="text-[26px] font-extrabold text-white">Welcome back</h1>
            <p className="mt-2 text-[14px] text-off-white">Sign in to your Companies House Identity Verification account</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={submit}>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-off-white">
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-lg border border-slate bg-navy px-3 py-2.5 text-white outline-none focus:border-emerald"
                placeholder="you@example.com"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-off-white" htmlFor="password">
              Password
              <div className="flex items-center gap-2 rounded-lg border border-slate bg-navy px-3 py-2.5 focus-within:border-emerald">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="min-w-0 flex-1 border-0 bg-transparent text-white outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible((v) => !v)}
                  className="shrink-0 text-xs font-bold text-off-white/80 hover:text-white"
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </label>
            <div className="flex items-center justify-between text-[13px] text-off-white">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  defaultChecked
                  className="h-4 w-4 cursor-pointer accent-emerald"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="font-semibold text-emerald hover:underline">
                Forgot password?
              </Link>
            </div>
            {error && (
              <p role="alert" className="form-alert form-alert--error">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-emerald px-4 py-3 text-[15px] font-bold text-white hover:bg-dark-emerald disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="mt-6 border-t border-slate pt-5 text-center text-[13.5px] text-off-white">
            Don&apos;t have an account?{" "}
            <Link href={`/signup?returnTo=${encodeURIComponent(returnTo)}`} className="font-semibold text-emerald hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </PageFrame>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
