"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Phase = "checking" | "paid" | "pending" | "failed" | "cancelled";

const POLL_INTERVAL_MS = 3000;
const MAX_POLLS = 20; // ~60s, matching Worldpay's aggregation delay.

/**
 * Shown when Worldpay redirects the customer back from the hosted page. The
 * outcome is confirmed with our server (which queries Worldpay); the ?wp param
 * only decides the initial message and whether we bother polling.
 */
export function WorldpayReturn({
  orderReference,
  amountLabel,
  wp,
}: {
  orderReference: string;
  amountLabel: string;
  wp: string;
}) {
  const negative = wp === "cancel" || wp === "failure" || wp === "error" || wp === "expiry";
  const [phase, setPhase] = useState<Phase>(
    wp === "cancel" ? "cancelled" : negative ? "failed" : "checking",
  );

  useEffect(() => {
    if (negative) return;
    let cancelled = false;
    let polls = 0;
    let timer: ReturnType<typeof setTimeout>;

    async function poll() {
      try {
        const res = await fetch("/api/checkout/worldpay/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderReference }),
        });
        const data = (await res.json().catch(() => ({}))) as { status?: Phase };
        if (cancelled) return;
        if (data.status === "paid") return setPhase("paid");
        if (data.status === "failed") return setPhase("failed");
      } catch {
        // Network blip - keep trying until the poll budget is exhausted.
      }
      if (cancelled) return;
      polls += 1;
      if (polls >= MAX_POLLS) return setPhase("pending");
      timer = setTimeout(poll, POLL_INTERVAL_MS);
    }

    poll();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [negative, orderReference]);

  if (phase === "paid") {
    return (
      <section className="card p-6 sm:p-8">
        <h2 className="m-0 text-lg font-extrabold text-emerald">Payment received</h2>
        <p className="mt-2 text-sm text-muted-text">
          Your card payment is confirmed. You can now complete your verification application.
        </p>
        <Link href={`/application/${orderReference}`} className="button button-primary mt-5 inline-flex">
          Continue to application
        </Link>
      </section>
    );
  }

  if (phase === "checking") {
    return (
      <section className="card p-6 sm:p-8">
        <h2 className="m-0 text-lg font-extrabold">Confirming your payment…</h2>
        <p className="mt-2 text-sm text-muted-text">
          We&rsquo;re confirming your {amountLabel} card payment with WorldPay. This usually takes a few
          seconds - please don&rsquo;t close this page.
        </p>
      </section>
    );
  }

  if (phase === "pending") {
    return (
      <section className="card p-6 sm:p-8">
        <h2 className="m-0 text-lg font-extrabold">Payment is being confirmed</h2>
        <p className="mt-2 text-sm text-muted-text">
          Your payment has been submitted but WorldPay hasn&rsquo;t confirmed it yet. We&rsquo;ll email you
          and unlock your application as soon as it clears - you don&rsquo;t need to pay again.
        </p>
        <Link href={`/dashboard/orders/${orderReference}`} className="button button-primary mt-5 inline-flex">
          Go to my order
        </Link>
      </section>
    );
  }

  // cancelled / failed
  return (
    <section className="card p-6 sm:p-8">
      <h2 className="m-0 text-lg font-extrabold">
        {phase === "cancelled" ? "Payment cancelled" : "Payment not completed"}
      </h2>
      <p className="mt-2 text-sm text-muted-text">
        {phase === "cancelled"
          ? "You cancelled the payment before it completed. You can try again whenever you're ready."
          : "Your card payment could not be completed. No money has been taken - please try again or use another method."}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href={`/payment/card/${orderReference}`} className="button button-primary">
          Try again
        </Link>
        <Link href="/pricing" className="button hero-section__button-outline">
          Back to pricing
        </Link>
      </div>
    </section>
  );
}
