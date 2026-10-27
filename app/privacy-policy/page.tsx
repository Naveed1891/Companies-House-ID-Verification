import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Companies House ID Verification handles your personal data during Companies House identity verification. Data collection, storage, sharing and your rights explained.",
  alternates: { canonical: "https://companieshouseidverification.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="How CompaniesHouseIDVerification.com collects, uses and protects your personal information."
      updated="17 August 2026"
    >
      <p>
        This Privacy Policy explains how CompaniesHouseIDVerification.com (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects,
        uses, stores and protects the personal information you provide when using our Companies House
        identity verification support service. We are committed to handling your data lawfully,
        transparently and in accordance with the UK General Data Protection Regulation (UK GDPR) and
        the Data Protection Act 2018.
      </p>

      <h2>Information we collect</h2>
      <p>To provide our service, we collect the following categories of information:</p>
      <ul>
        <li><strong>Identity information</strong> - your full name, date of birth, nationality and residential address.</li>
        <li><strong>Contact information</strong> - your email address, WhatsApp or phone number, and country.</li>
        <li><strong>Verification documents</strong> - copies of identity documents such as a passport, national ID or driving licence, proof of address, and a facial likeness image for liveness checks.</li>
        <li><strong>Company information</strong> - the company you are connected with and your role (director, PSC, LLP member or authorised filer).</li>
        <li><strong>Payment information</strong> - processed securely by our payment provider, Stripe. We do not store your full card details on our servers.</li>
        <li><strong>Technical information</strong> - IP address, browser type and basic usage data collected to keep the service secure and functioning.</li>
      </ul>

      <h2>How we use your information</h2>
      <p>We use your information solely to:</p>
      <ul>
        <li>Carry out and support your Companies House identity verification;</li>
        <li>Communicate with you about your request and its progress;</li>
        <li>Take payment for the service;</li>
        <li>Meet our legal, regulatory and anti-money-laundering obligations;</li>
        <li>Protect the security and integrity of our service.</li>
      </ul>
      <p>
        We do not sell your personal information, and we do not use it for advertising.
      </p>

      <h2>Lawful basis for processing</h2>
      <p>
        We process your data on the basis of <strong>contract</strong> (to deliver the service you
        request), <strong>legal obligation</strong> (identity and anti-money-laundering
        requirements), and <strong>legitimate interests</strong> (keeping our service secure). Where
        required, we rely on your <strong>consent</strong>, which you may withdraw at any time.
      </p>

      <h2>How your data is shared</h2>
      <p>
        Verification and operational processing is carried out by the service team. Your
        information may also be shared with:
      </p>
      <ul>
        <li>Our payment processor (Stripe) to take payment;</li>
        <li>Secure cloud infrastructure and storage providers who host our systems;</li>
        <li>Authorised Corporate Service Providers (ACSPs) and relevant authorities where verification requires it;</li>
        <li>Professional advisers or authorities where we are legally required to disclose information.</li>
      </ul>
      <p>All third parties are bound to protect your data and use it only for the stated purpose.</p>

      <h2>Data storage and security</h2>
      <p>
        Your documents and personal data are encrypted in transit and at rest, and access is
        restricted to authorised personnel only. Documents are held in private, access-controlled
        storage and are never made publicly accessible. We retain your information only for as long
        as necessary to provide the service and to meet our legal and regulatory obligations, after
        which it is securely deleted.
      </p>

      <h2>Your rights</h2>
      <p>Under UK data protection law you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you;</li>
        <li>Request correction of inaccurate data;</li>
        <li>Request erasure of your data, subject to our legal retention obligations;</li>
        <li>Object to or restrict certain processing;</li>
        <li>Request a copy of your data in a portable format;</li>
        <li>Lodge a complaint with the Information Commissioner&rsquo;s Office (ICO).</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use essential cookies to keep you signed in and to keep the service secure. We ask for
        your consent before using any non-essential cookies. You can manage your preference at any
        time through your browser settings.
      </p>

      <h2>Contact us</h2>
      <p>
        For any privacy question or to exercise your rights, please{" "}
        <Link href="/contact">contact us</Link>. We will respond within the timeframes required by
        law.
      </p>
    </LegalPage>
  );
}
