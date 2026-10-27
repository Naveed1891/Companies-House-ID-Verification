"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { apiFetch } from "@/lib/api-client";
import {
  PASSWORD_REQUIREMENTS,
  passwordMeetsPolicy,
  passwordStrengthLabel,
} from "@/lib/password-policy";

function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-off-white" htmlFor={id}>
      {label}
      <div className="flex items-center gap-2 rounded-lg border border-slate bg-navy px-3 py-2.5 focus-within:border-emerald">
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete="new-password"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 border-0 bg-transparent text-white outline-none"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="shrink-0 text-xs font-bold text-off-white/80 hover:text-white"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {error ? <span className="text-xs font-normal text-orange-soft">{error}</span> : null}
    </label>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const strength = useMemo(() => passwordStrengthLabel(password), [password]);
  const meetsPolicy = passwordMeetsPolicy(password);
  const matches = password && password === confirm;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!meetsPolicy) {
      setError("Password does not meet requirements.");
      return;
    }
    if (!matches) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await apiFetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      setDone(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not reset password.");
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <PageFrame>
        <div className="site-container flex min-h-[70vh] items-center justify-center py-16">
          <div className="w-full max-w-[440px] rounded-2xl border border-slate bg-charcoal p-8 text-center shadow-xl">
            <h1 className="text-[22px] font-extrabold text-white">Invalid reset link</h1>
            <p className="mt-3 text-[14px] text-off-white">
              This reset link is missing or malformed. Start over from the forgot password page.
            </p>
            <Link
              href="/forgot-password"
              className="mt-6 inline-block rounded-lg bg-emerald px-4 py-3 text-[15px] font-bold text-white hover:bg-dark-emerald"
            >
              Request a new code
            </Link>
          </div>
        </div>
      </PageFrame>
    );
  }

  if (done) {
    return (
      <PageFrame>
        <div className="site-container flex min-h-[70vh] items-center justify-center py-16">
          <div className="w-full max-w-[440px] rounded-2xl border border-slate bg-charcoal p-8 text-center shadow-xl">
            <h1 className="text-[22px] font-extrabold text-emerald">Password updated</h1>
            <p className="mt-3 text-[14px] text-off-white">
              Redirecting you to sign in...
            </p>
          </div>
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <div className="site-container flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-[440px] rounded-2xl border border-slate bg-charcoal p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h1 className="text-[26px] font-extrabold text-white">Set a new password</h1>
            <p className="mt-2 text-[14px] text-off-white">
              Choose a strong password you have not used before.
            </p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={submit}>
            <PasswordField id="password" label="New password" value={password} onChange={setPassword} />
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
                <li className={matches ? "text-emerald" : undefined}>
                  {matches ? "✓" : "○"} Passwords match
                </li>
              </ul>
            </div>
            <PasswordField id="confirm" label="Confirm password" value={confirm} onChange={setConfirm} />
            {error && (
              <p role="alert" className="form-alert form-alert--error">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting || !meetsPolicy || !matches}
              className="rounded-lg bg-emerald px-4 py-3 text-[15px] font-bold text-white hover:bg-dark-emerald disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </PageFrame>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
