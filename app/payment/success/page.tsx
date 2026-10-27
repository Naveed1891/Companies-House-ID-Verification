"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { apiFetch } from "@/lib/api-client";

type CheckoutStatusResponse = {
  status: "pending" | "paid" | "application_ready" | "failed";
  orderReference?: string | null;
  nextUrl?: string | null;
  message?: string;
  order?: { reference?: string; packageName?: string; amount?: number; currency?: string } | null;
};

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  // Derived from the URL, not written in an effect: a missing session id is
  // knowable at first render.
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [error, setError] = useState(sessionId ? "" : "Stripe session id is missing.");
  const [orderRef, setOrderRef] = useState<string | null>(null);
  const [order, setOrder] = useState<CheckoutStatusResponse["order"]>(null);

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;
    let attempts = 0;

    async function poll() {
      attempts += 1;
      try {
        const result = await apiFetch<CheckoutStatusResponse>(
          `/api/checkout/status?session_id=${encodeURIComponent(sessionId!)}`,
        );
        if (cancelled) return;

        if (result.order) setOrder(result.order);
        if (result.orderReference) setOrderRef(result.orderReference);

        if (result.status === "application_ready" && result.nextUrl) {
          setLoading(false);
          window.setTimeout(() => {
            if (!cancelled) window.location.assign(result.nextUrl!);
          }, 1200);
          return;
        }

        if (result.status === "failed") {
          setLoading(false);
          setError(result.message ?? "This checkout session could not be completed.");
          return;
        }

        if (attempts >= 40) {
          setLoading(false);
          setError(
            result.message ??
              "Payment was received, but your application is still being prepared. Refresh this page shortly.",
          );
          return;
        }

        window.setTimeout(poll, 1500);
      } catch (cause) {
        if (cancelled) return;
        if (attempts < 40) {
          window.setTimeout(poll, 1500);
          return;
        }
        setLoading(false);
        setError(cause instanceof Error ? cause.message : "Unable to confirm your order.");
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <PageFrame>
      <div className="site-container flex min-h-[60vh] items-center justify-center py-16">
        <div className="w-full max-w-[640px] rounded-2xl border border-soft-border bg-white p-8 text-center shadow-elevated">
          {loading ? (
            <>
              <h1 className="text-2xl font-extrabold">Confirming your payment…</h1>
              <p className="mt-3 text-sm text-muted-text">
                Stripe is confirming payment. This usually takes a few seconds.
              </p>
            </>
          ) : error ? (
            <>
              <h1 className="text-2xl font-extrabold">Order not ready yet</h1>
              <p className="mt-3 text-sm text-muted-text">{error}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" className="button button-primary" onClick={() => window.location.reload()}>
                  Refresh
                </button>
                <Link href={"/dashboard/orders"} className="button button-dark">
                  My orders
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold text-emerald">Payment successful</h1>
              <p className="mt-3 text-sm text-muted-text">
                Your order is confirmed. Opening your verification application…
              </p>
              {order ? (
                <dl className="mt-6 rounded-xl bg-warm-cream p-4 text-left text-sm">
                  <div className="flex justify-between gap-4 py-2">
                    <dt className="text-muted-text">Reference</dt>
                    <dd className="font-bold">{order.reference ?? orderRef}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2">
                    <dt className="text-muted-text">Package</dt>
                    <dd className="font-bold">{order.packageName}</dd>
                  </div>
                </dl>
              ) : null}
              {orderRef ? (
                <Link href={`/application/${orderRef}`} className="button button-primary mt-6 inline-flex">
                  Continue to application
                </Link>
              ) : null}
            </>
          )}
        </div>
      </div>
    </PageFrame>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <PaymentSuccessContent />
    </Suspense>
  );
}
