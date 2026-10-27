"use client";

import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { CountrySelect } from "@/components/CountrySelect";
import { PhoneInput } from "@/components/PhoneInput";
import { ApiClientError, apiFetch } from "@/lib/api-client";
import {
  PASSWORD_REQUIREMENTS,
  passwordMeetsPolicy,
  passwordPolicyError,
  passwordStrengthLabel,
} from "@/lib/password-policy";
import { safeReturnTo } from "@/lib/return-to";
import { useAuth } from "@/components/auth/AuthProvider";
import { readApplicationDraft, type ApplicationDraft } from "@/lib/application-draft";

const DUPLICATE_EMAIL_MESSAGE = "Email already exists. Please sign in instead.";

function PasswordInput({
  id,
  label,
  value,
  onChange,
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  error?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-off-white" htmlFor={id}>
      {label}
      <div className="flex items-center gap-2 rounded-lg border border-slate bg-navy px-3 py-2.5 focus-within:border-emerald">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 border-0 bg-transparent text-white outline-none"
          aria-invalid={Boolean(error)}
        />
        <button
          type="button"
          className="shrink-0 text-xs font-bold text-off-white/80 hover:text-white"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {error ? <span className="text-xs font-normal text-orange-soft">{error}</span> : null}
    </label>
  );
}

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = safeReturnTo(searchParams.get("returnTo") ?? searchParams.get("next"));
  const applicationSignup = searchParams.get("applicationDraft") === "1";
  const { user, loading: authLoading } = useAuth();
  const [applicationDraft, setApplicationDraft] = useState<ApplicationDraft | null>(null);
  const [draftLoaded, setDraftLoaded] = useState(!applicationSignup);

  useEffect(() => {
    if (!applicationSignup) return;
    const timer = window.setTimeout(() => {
      setApplicationDraft(readApplicationDraft());
      setDraftLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [applicationSignup]);

  // Never show a signup form to someone who is already signed in.
  useEffect(() => {
    if (user) router.replace(returnTo);
  }, [user, returnTo, router]);

  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const loginHref = `/login?returnTo=${encodeURIComponent(returnTo)}`;
  const isDuplicateEmail =
    errorCode === "EMAIL_ALREADY_EXISTS" || /email already exists/i.test(error);

  const strength = useMemo(() => passwordStrengthLabel(password), [password]);
  const confirmMismatch = confirmPassword.length > 0 && confirmPassword !== password;
  const passwordError = password ? passwordPolicyError(password) : null;
  const canSubmit =
    passwordMeetsPolicy(password) &&
    confirmPassword === password &&
    confirmPassword.length > 0 &&
    !submitting;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setErrorCode(undefined);

    if (!passwordMeetsPolicy(password)) {
      setError(passwordPolicyError(password) ?? "Password does not meet requirements.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    try {
      console.info("[companieshouseidverification-signup] request started");
      const result = await apiFetch<{ email: string; verificationRequired: true }>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          fullName: form.get("fullName") || (applicationSignup ? applicationDraft?.fullName : ""),
          email: form.get("email"),
          whatsapp: applicationSignup ? "" : form.get("whatsapp"),
          country: applicationSignup ? "" : form.get("country"),
          password,
          confirmPassword,
          applicationSignup,
        }),
      });
      console.info("[companieshouseidverification-signup] verification code sent");
      router.replace(`/verify-signup?email=${encodeURIComponent(result.email)}&returnTo=${encodeURIComponent(returnTo)}`);
    } catch (cause) {
      if (cause instanceof ApiClientError) {
        const message =
          cause.code === "EMAIL_ALREADY_EXISTS"
            ? DUPLICATE_EMAIL_MESSAGE
            : cause.message.trim() || "Unable to create account. Please try again.";
        console.warn("[companieshouseidverification-signup] failed", message, cause.code);
        setError(message);
        setErrorCode(cause.code);
      } else {
        const message =
          cause instanceof Error && cause.message.trim()
            ? cause.message
            : "Unable to create account. Please try again.";
        console.warn("[companieshouseidverification-signup] failed", message);
        setError(message);
        setErrorCode(undefined);
      }
      setSubmitting(false);
    }
  }

  // Hold the form back until auth resolves, and while redirecting an
  // already-authenticated visitor away.
  if (authLoading || user || (applicationSignup && !draftLoaded)) {
    return (
      <PageFrame>
        <div className="site-container flex min-h-[70vh] items-center justify-center py-16 text-muted-text">
          {user ? "Taking you to your account…" : "Loading…"}
        </div>
      </PageFrame>
    );
  }

  if (applicationSignup && !applicationDraft) {
    return (
      <PageFrame>
        <div className="site-container flex min-h-[70vh] items-center justify-center py-16">
          <div className="max-w-md rounded-2xl border border-soft-border bg-white p-8 text-center">
            <h1 className="text-xl font-extrabold">Application details unavailable</h1>
            <p className="mt-3 text-sm text-muted-text">Please complete the application form again before creating your account.</p>
            <Link href="/checkout" className="button button-primary mt-6 inline-flex">Start application</Link>
          </div>
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <div className="site-container flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-[480px] rounded-2xl border border-slate bg-charcoal p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h1 className="text-[26px] font-extrabold text-white">Create your account</h1>
            <p className="mt-2 text-[14px] text-off-white">Track verification requests and documents</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={submit} noValidate>
            {error ? (
              <div
                role="alert"
                className="rounded-lg border border-orange-accent/50 bg-navy p-3 text-sm text-orange-soft"
              >
                <p className="m-0">{isDuplicateEmail ? DUPLICATE_EMAIL_MESSAGE : error}</p>
                {isDuplicateEmail ? (
                  <p className="mt-2 mb-0">
                    <Link href={loginHref} className="font-semibold text-emerald hover:underline">
                      Sign in
                    </Link>
                  </p>
                ) : null}
              </div>
            ) : null}
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-off-white">
              Full name
              <input
                name="fullName"
                autoComplete="name"
                required
                defaultValue={applicationSignup ? applicationDraft?.fullName ?? "" : ""}
                className="rounded-lg border border-slate bg-navy px-3 py-2.5 text-white outline-none focus:border-emerald"
              />
            </label>
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
            {!applicationSignup ? (
              <>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-off-white">
                  WhatsApp number
                  <PhoneInput name="whatsapp" required />
                  <span className="text-xs font-normal text-off-white/80">Pick your country code, then enter the number.</span>
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-off-white">
                  Country
                  <CountrySelect name="country" required />
                </label>
              </>
            ) : null}
            <PasswordInput
              id="password"
              label="Password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
              error={passwordError ?? undefined}
            />
            <div className="rounded-lg border border-slate/70 bg-navy/50 p-3">
              <p className="mb-2 text-xs font-bold text-off-white">
                Strength: {password ? strength : "-"}
              </p>
              <ul className="m-0 grid list-none gap-1 p-0 text-xs text-off-white/80">
                {PASSWORD_REQUIREMENTS.map((rule) => (
                  <li key={rule.id} className={rule.test(password) ? "text-emerald" : undefined}>
                    {rule.test(password) ? "✓" : "○"} {rule.label}
                  </li>
                ))}
                <li className={confirmPassword && !confirmMismatch ? "text-emerald" : undefined}>
                  {confirmPassword && !confirmMismatch ? "✓" : "○"} Passwords match
                </li>
              </ul>
            </div>
            <PasswordInput
              id="confirmPassword"
              label="Confirm password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              autoComplete="new-password"
              error={confirmMismatch ? "Passwords do not match." : undefined}
            />
            <button
              type="submit"
              disabled={!canSubmit}
              className="rounded-lg bg-emerald px-4 py-3 text-[15px] font-bold text-white hover:bg-dark-emerald disabled:opacity-60"
            >
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>
          <p className="mt-6 border-t border-slate pt-5 text-center text-[13.5px] text-off-white">
            Already have an account?{" "}
            <Link href={loginHref} className="font-semibold text-emerald hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </PageFrame>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
