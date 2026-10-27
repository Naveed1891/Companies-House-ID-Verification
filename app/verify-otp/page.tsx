"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { OtpInput } from "@/components/OtpInput";
import { apiFetch } from "@/lib/api-client";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [resentAt, setResentAt] = useState<number | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const result = await apiFetch<{ resetToken: string }>("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, code }),
      });
      router.push(`/reset-password?token=${encodeURIComponent(result.resetToken)}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Verification failed.");
      setSubmitting(false);
    }
  }

  async function resend() {
    setResending(true);
    setError("");
    try {
      await apiFetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setResentAt(Date.now());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not resend code.");
    } finally {
      setResending(false);
    }
  }

  return (
    <PageFrame>
      <div className="site-container flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-[440px] rounded-2xl border border-slate bg-charcoal p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h1 className="text-[26px] font-extrabold text-white">Enter your code</h1>
            <p className="mt-2 text-[14px] text-off-white">
              We&apos;ve emailed a 6-digit code to <strong>{email || "your inbox"}</strong>. It expires in 10 minutes.
            </p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={submit}>
            <div className="flex flex-col gap-2 text-sm font-semibold text-off-white">
              6-digit code
              <OtpInput value={code} onChange={setCode} disabled={submitting} />
            </div>
            {error && (
              <p role="alert" className="form-alert form-alert--error">
                {error}
              </p>
            )}
            {resentAt && !error && (
              <p className="m-0 text-[13.5px] font-bold text-emerald">
                New code sent. Check your inbox.
              </p>
            )}
            <button
              type="submit"
              disabled={submitting || code.length !== 6}
              className="rounded-lg bg-emerald px-4 py-3 text-[15px] font-bold text-white hover:bg-dark-emerald disabled:opacity-60"
            >
              {submitting ? "Verifying..." : "Verify code"}
            </button>
            <button
              type="button"
              onClick={resend}
              disabled={resending || !email}
              className="text-[13px] font-semibold text-emerald hover:underline disabled:opacity-60"
            >
              {resending ? "Sending..." : "Resend code"}
            </button>
          </form>
          <p className="mt-6 border-t border-slate pt-5 text-center text-[13.5px] text-off-white">
            <Link href="/login" className="font-semibold text-emerald hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </PageFrame>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense>
      <VerifyOtpForm />
    </Suspense>
  );
}
