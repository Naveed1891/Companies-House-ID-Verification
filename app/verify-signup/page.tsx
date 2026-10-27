"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { OtpInput } from "@/components/OtpInput";
import { useAuth } from "@/components/auth/AuthProvider";
import { apiFetch } from "@/lib/api-client";
import { safeReturnTo } from "@/lib/return-to";
import type { PublicUser } from "@/lib/auth/session";

function VerifySignupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const returnTo = safeReturnTo(params.get("returnTo"));
  const { setUser } = useAuth();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const result = await apiFetch<{ user: PublicUser }>("/api/auth/verify-signup-otp", { method: "POST", body: JSON.stringify({ email, code }) });
      setUser(result.user); router.replace(returnTo === "/" ? "/dashboard" : returnTo); router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Verification failed."); setBusy(false); }
  }

  async function resend() {
    setBusy(true); setError(""); setMessage("");
    try { await apiFetch("/api/auth/resend-signup-otp", { method: "POST", body: JSON.stringify({ email }) }); setMessage("New code sent."); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not resend code."); }
    finally { setBusy(false); }
  }

  return <PageFrame><div className="site-container flex min-h-[70vh] items-center justify-center py-16"><div className="w-full max-w-[440px] rounded-2xl border border-slate bg-charcoal p-8 shadow-xl">
    <div className="mb-6 text-center"><h1 className="text-[26px] font-extrabold text-white">Verify your email</h1><p className="mt-2 text-[14px] text-off-white">Enter the 6-digit code sent to <strong>{email}</strong>.</p></div>
    <form className="flex flex-col gap-4" onSubmit={verify}>
      <div className="flex flex-col gap-2 text-sm font-semibold text-off-white">Verification code<OtpInput value={code} onChange={setCode} disabled={busy} /></div>
      {error && <p role="alert" className="form-alert form-alert--error">{error}</p>}{message && <p className="form-alert form-alert--success">{message}</p>}
      <button type="submit" disabled={busy || code.length !== 6} className="rounded-lg bg-emerald px-4 py-3 text-[15px] font-bold text-white disabled:opacity-60">{busy ? "Verifying…" : "Verify email"}</button>
      <button type="button" disabled={busy || !email} onClick={resend} className="text-[13px] font-semibold text-emerald disabled:opacity-60">Resend code</button>
    </form>
  </div></div></PageFrame>;
}

export default function VerifySignupPage() { return <Suspense><VerifySignupForm /></Suspense>; }
