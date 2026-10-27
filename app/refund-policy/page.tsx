import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund policy for CompaniesHouseIDVerification.com identity verification service. When refunds are available, how to request one, and processing times.",
  alternates: { canonical: "https://companieshouseidverification.com/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      description="When you are entitled to a refund for our identity verification support service."
      updated="17 August 2026"
    >
      <p>
        We want you to be confident in using CompaniesHouseIDVerification.com. This Refund Policy explains when a
        refund is available and how to request one. It forms part of our{" "}
        <Link href="/terms">Terms &amp; Conditions</Link>.
      </p>

      <h2>Before work has started</h2>
      <p>
        If you have paid but we have not yet begun processing your verification, you may request a
        full refund. Because the service starts as soon as payment is confirmed, please contact us as
        soon as possible if you have changed your mind.
      </p>

      <h2>After work has started</h2>
      <p>
        Once we have begun reviewing your details or documents, the fee reflects work already carried
        out. In these cases a refund may not be available, or may be issued in part at our reasonable
        discretion, depending on how much of the service has been completed.
      </p>

      <h2>When a refund will be given</h2>
      <ul>
        <li>We are unable to provide the service for a reason within our control;</li>
        <li>You were charged in error or charged more than once for the same request;</li>
        <li>The service was not delivered as described.</li>
      </ul>

      <h2>When a refund will not be given</h2>
      <ul>
        <li>You provided inaccurate, incomplete or fraudulent information or documents;</li>
        <li>You did not respond to requests needed to complete your verification;</li>
        <li>Companies House reaches a decision that is outside our control;</li>
        <li>You changed your mind after the service had been substantially completed.</li>
      </ul>
      <p>
        Where a request cannot be completed because of information or documents that were
        inaccurate, incomplete or not provided, a refund is not available on that basis alone.
      </p>

      <h2>How refunds are processed</h2>
      <p>
        Approved refunds are returned to your original payment method through our payment provider,
        Stripe. Refunds are normally processed within a few working days, though your bank may take
        longer to show the funds.
      </p>

      <h2>How to request a refund</h2>
      <p>
        To request a refund, please <Link href="/contact">contact us</Link> with your order reference
        and the reason for your request. We will review it fairly and respond promptly.
      </p>
    </LegalPage>
  );
}
