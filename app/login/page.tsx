"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { OtpInput } from "@/components/OtpInput";
import { useAuth } from "@/components/auth/AuthProvider";
import { apiFetch } from "@/lib/api-client";
import { safeReturnTo } from "@/lib/return-to";
import type { PublicUser } from "@/lib/auth/session";

const DEFAULT_RETURN = "/";

/**
 * Where a signed-in user belongs.
 *
 * Staff always land in the admin area - a `returnTo` pointing at a customer
 * checkout must never drag an admin into a purchase flow. Customers keep their
 * returnTo so the package → login → Stripe journey survives.
 */
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
  const [step, setStep] = useState<"password" | "otp">("password");
  const [otpEmail, setOtpEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [code, setCode] = useState("");
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  // Never show a sign-in form to someone who is already signed in.
  useEffect(() => {
    if (user) router.replace(destinationFor(user, returnTo));
  }, [user, returnTo, router]);

  function land(signedIn: PublicUser) {
    // Publish the user before navigating so the destination renders signed in
    // on its first paint - no refetch race, no flash of the signed-out state.
    setUser(signedIn);
    router.replace(destinationFor(signedIn, returnTo));
    router.refresh();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const remember = form.get("rememberMe") === "on";
    try {
      const result = await apiFetch<{ user?: PublicUser; otpRequired?: boolean; email?: string }>(
        "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: form.get("email"),
            password: form.get("password"),
            rememberMe: remember,
          }),
        },
      );
      if (result.user) {
        land(result.user);
        return;
      }
      // Second factor required: switch to the code step.
      setRememberMe(remember);
      setOtpEmail(result.email ?? String(form.get("email") ?? ""));
      setStep("otp");
      setSubmitting(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Sign in failed.");
      setSubmitting(false);
    }
  }

  async function submitOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const result = await apiFetch<{ user: PublicUser }>("/api/auth/verify-login-otp", {
        method: "POST",
        body: JSON.stringify({ email: otpEmail, code: code.trim(), rememberMe }),
      });
      land(result.user);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Invalid or expired code.");
      setSubmitting(false);
    }
  }

  async function resendOtp() {
    setResending(true);
    setError("");
    setResendMessage("");
    try {
      await apiFetch("/api/auth/resend-login-otp", {
        method: "POST",
        body: JSON.stringify({ email: otpEmail }),
      });
      setCode("");
      setResendMessage("A new sign-in code has been sent. It expires in 10 minutes.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not send a new code.");
    } finally {
      setResending(false);
    }
  }

  function startOver() {
    setStep("password");
    setCode("");
    setError("");
    setResendMessage("");
  }

  // Hold the form back until auth resolves, and while redirecting an
  // already-authenticated visitor away.
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
          {step === "otp" ? (
            <>
              <div className="mb-6 text-center">
                <h1 className="text-[26px] font-extrabold text-white">Enter your code</h1>
                <p className="mt-2 text-[14px] text-off-white">
                  We&apos;ve emailed a 6-digit code to <span className="font-semibold">{otpEmail}</span>. It
                  expires in 10 minutes.
                </p>
              </div>
              <form className="flex flex-col gap-4" onSubmit={submitOtp}>
                <div className="flex flex-col gap-2 text-sm font-semibold text-off-white">
                  Sign-in code
                  <OtpInput value={code} onChange={setCode} disabled={submitting} />
                </div>
                {error && (
                  <p role="alert" className="form-alert form-alert--error">
                    {error}
                  </p>
                )}
                {resendMessage && (
                  <p role="status" className="form-alert form-alert--success">
                    {resendMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting || resending || code.length !== 6}
                  className="rounded-lg bg-emerald px-4 py-3 text-[15px] font-bold text-white hover:bg-dark-emerald disabled:opacity-60"
                >
                  {submitting ? "Verifying…" : "Verify and sign in"}
                </button>
                <p className="text-center text-[13px] text-off-white/80">
                  Didn&apos;t receive it or has it expired?{" "}
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={submitting || resending}
                    className="font-semibold text-emerald hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {resending ? "Sending…" : "Resend code"}
                  </button>
                </p>
                <button
                  type="button"
                  onClick={startOver}
                  disabled={submitting || resending}
                  className="text-[13px] font-semibold text-off-white/80 hover:text-white"
                >
                  ← Use a different account
                </button>
              </form>
            </>
          ) : (
          <>
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
          </>
          )}
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
