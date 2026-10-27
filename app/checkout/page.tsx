"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { StartRequestForm } from "@/components/StartRequestForm";
import { apiFetch } from "@/lib/api-client";
import { DEFAULT_PACKAGE_SLUG } from "@/lib/checkout-redirect";
import type { CheckoutPackage } from "@/lib/checkout-package";
import {
  clearApplicationDraft,
  readApplicationDraft,
  saveApplicationDraft,
  type ApplicationDraft,
} from "@/lib/application-draft";
import { useAuth } from "@/components/auth/AuthProvider";

function CheckoutFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageSlug = searchParams.get("package")?.trim() || DEFAULT_PACKAGE_SLUG;
  const hasDraftParam = searchParams.get("applicationDraft") === "1";
  const { user, loading: authLoading } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<CheckoutPackage | null>(null);
  const [draft, setDraft] = useState<ApplicationDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const placingRef = useRef(false);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const { package: pkg } = await apiFetch<{ package: CheckoutPackage }>(
          `/api/forms/${encodeURIComponent(packageSlug)}`,
        );
        if (active) setSelectedPackage(pkg);
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : "Selected package could not be loaded.");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [packageSlug]);

  const placeOrderAndPay = useCallback(
    async (nextDraft: ApplicationDraft) => {
      if (!selectedPackage || placingRef.current) return;
      placingRef.current = true;
      setSubmitting(true);
      setError("");
      try {
        const result = await apiFetch<{ orderReference: string }>("/api/checkout/bank-order", {
          method: "POST",
          body: JSON.stringify({ packageSlug: selectedPackage.slug, application: nextDraft.application }),
        });
        if (!result.orderReference) throw new Error("Your order could not be created. Please try again.");
        clearApplicationDraft();
        router.push(`/payment/bank/${result.orderReference}`);
      } catch (cause) {
        placingRef.current = false;
        setDraft(nextDraft);
        setSubmitting(false);
        setError(cause instanceof Error && cause.message ? cause.message : "Payment could not be started.");
      }
    },
    [router, selectedPackage],
  );

  useEffect(() => {
    if (!hasDraftParam || authLoading) return;
    const timer = window.setTimeout(() => {
      const saved = readApplicationDraft();
      if (!saved || saved.packageSlug !== packageSlug) {
        setError("Your saved application is no longer available. Please complete the form again.");
        setDraft(null);
        return;
      }
      if (!user) {
        setDraft(saved);
        return;
      }
      if (!selectedPackage) return;
      void placeOrderAndPay(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [authLoading, hasDraftParam, packageSlug, placeOrderAndPay, selectedPackage, user]);

  function handleDraftReady(nextDraft: { application: Record<string, unknown>; fullName: string }) {
    if (!selectedPackage) return;
    const saved: ApplicationDraft = {
      ...nextDraft,
      packageSlug: selectedPackage.slug,
      createdAt: Date.now(),
    };
    saveApplicationDraft(saved);
    if (user) {
      void placeOrderAndPay(saved);
      return;
    }
    setDraft(saved);
    const returnTo = `/checkout?package=${encodeURIComponent(selectedPackage.slug)}&applicationDraft=1`;
    router.push(`/signup?applicationDraft=1&returnTo=${encodeURIComponent(returnTo)}`);
  }

  const busy =
    loading ||
    authLoading ||
    submitting ||
    (hasDraftParam && Boolean(user) && !error);
  const packageMissing = Boolean(error) && !selectedPackage;
  const placeFailed = Boolean(selectedPackage) && Boolean(draft) && Boolean(user) && Boolean(error) && !submitting;
  const needsAccount = Boolean(selectedPackage) && Boolean(draft) && !user && !submitting;
  const showForm = Boolean(selectedPackage) && !draft && !submitting;

  let body: ReactNode = null;
  if (busy) {
    body = (
      <p className="py-20 text-center text-muted-text">
        {submitting || (hasDraftParam && user) ? "Taking you to payment…" : "Loading…"}
      </p>
    );
  } else if (packageMissing) {
    body = (
      <div className="rounded-2xl border border-soft-border bg-white p-8 text-center">
        <h1 className="text-xl font-extrabold">Package unavailable</h1>
        <p className="mt-3 text-sm text-muted-text">{error}</p>
        <Link href="/pricing" className="button button-primary mt-6 inline-flex">
          View pricing
        </Link>
      </div>
    );
  } else if (placeFailed && selectedPackage && draft) {
    body = (
      <div className="space-y-6">
        <div>
          <h1 className="display mt-2 text-[clamp(1.75rem,4vw,2.25rem)]">Continue to payment</h1>
          <p className="body-copy mt-2">Your application is saved. We could not start payment just now.</p>
        </div>
        <p role="alert" className="form-alert form-alert--error">
          {error}
        </p>
        <button type="button" className="button button-primary" onClick={() => void placeOrderAndPay(draft)}>
          Try again
        </button>
      </div>
    );
  } else if (needsAccount && selectedPackage) {
    body = (
      <div className="space-y-6">
        <div>
          <h1 className="display mt-2 text-[clamp(1.75rem,4vw,2.25rem)]">Create your account to continue</h1>
          <p className="body-copy mt-2">Your application is saved for {draft?.fullName}.</p>
        </div>
        {error ? (
          <p role="alert" className="form-alert form-alert--error">
            {error}
          </p>
        ) : null}
        <section className="card p-6">
          <p className="m-0 text-sm text-muted-text">Please create an account or sign in to continue to payment.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/signup?applicationDraft=1&returnTo=${encodeURIComponent(`/checkout?package=${selectedPackage.slug}&applicationDraft=1`)}`}
              className="button button-primary inline-flex"
            >
              Create account
            </Link>
            <Link
              href={`/login?returnTo=${encodeURIComponent(`/checkout?package=${selectedPackage.slug}&applicationDraft=1`)}`}
              className="button button-dark inline-flex"
            >
              Sign in
            </Link>
          </div>
        </section>
      </div>
    );
  } else if (showForm && selectedPackage) {
    body = (
      <div className="space-y-6">
        <div>
          <h1 className="display mt-2 text-[clamp(1.75rem,4vw,2.25rem)]">Complete your application</h1>
          <p className="body-copy mt-2">
            {selectedPackage.name} · £{selectedPackage.price}
          </p>
        </div>
        {error ? (
          <p role="alert" className="form-alert form-alert--error">
            {error}
          </p>
        ) : null}
        <div className="card p-[clamp(26px,4vw,40px)]">
          <StartRequestForm mode="draft" packageId={selectedPackage.slug} onDraftReady={handleDraftReady} />
        </div>
      </div>
    );
  }

  return (
    <PageFrame>
      <div className="site-container py-[clamp(2.5rem,6vw,4rem)]">
        <div className="mx-auto max-w-[920px]">{body}</div>
      </div>
    </PageFrame>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutFlow />
    </Suspense>
  );
}
