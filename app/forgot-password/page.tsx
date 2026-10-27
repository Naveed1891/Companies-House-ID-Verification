"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { apiFetch } from "@/lib/api-client";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await apiFetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not send code. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <PageFrame>
      <div className="site-container flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-[440px] rounded-2xl border border-slate bg-charcoal p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h1 className="text-[26px] font-extrabold text-white">Forgot your password?</h1>
            <p className="mt-2 text-[14px] text-off-white">
              Enter your email and we&apos;ll send you a 6-digit code.
            </p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={submit}>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-off-white">
              Email address
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-slate bg-navy px-3 py-2.5 text-white outline-none focus:border-emerald"
                placeholder="you@example.com"
              />
            </label>
            {error && (
              <p role="alert" className="form-alert form-alert--error">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting || !email}
              className="rounded-lg bg-emerald px-4 py-3 text-[15px] font-bold text-white hover:bg-dark-emerald disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send code"}
            </button>
          </form>
          <p className="mt-6 border-t border-slate pt-5 text-center text-[13.5px] text-off-white">
            Remembered your password?{" "}
            <Link href="/login" className="font-semibold text-emerald hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </PageFrame>
  );
}
