import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclosure",
  description:
    "Disclosure notice for CompaniesHouseIDVerification.com: the official GOV.UK route is free, our service is optional and paid, and identity verification is carried out by HopeTex Limited (ACSP).",
  alternates: { canonical: "https://companieshouseidverification.com/disclosure" },
};

export default function DisclosurePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Disclosure"
      description="Important information about our service, the free official route, and who carries out your identity verification."
      updated="29 October 2026"
    >
      <h2>The official route is free</h2>
      <p>
        GOV.UK One Login is the official Companies House route for verifying your identity. It is free
        of charge and self-service: you can complete it yourself directly with Companies House without
        using CompaniesHouseIDVerification.com or any other provider. You can find the official
        guidance on{" "}
        <a
          href="https://www.gov.uk/guidance/verify-your-identity-for-companies-house"
          target="_blank"
          rel="noopener noreferrer"
        >
          GOV.UK
        </a>
        .
      </p>
      <p>
        CompaniesHouseIDVerification.com is an optional, paid, guided service. You are never required
        to use it to meet your Companies House identity verification obligations.
      </p>

      <h2>Who carries out your identity verification</h2>
      <p>
        Identity verification is carried out by <strong>HopeTex Limited</strong>, an Authorised
        Corporate Service Provider (ACSP) approved and verified by Companies House. HopeTex Limited is
        the parent company of CompaniesHouseIDVerification.com.
      </p>

      <h2>Company details</h2>
      <ul>
        <li>
          <strong>Parent Company:</strong> HopeTex Limited
        </li>
        <li>
          <strong>Registration Number:</strong> 14684061
        </li>
        <li>
          <strong>ACSP List:</strong>{" "}
          <a
            href="https://www.gov.uk/csv-preview/6adb73709223b6191dab3381/ACSP_Consent_List_21_October_2026.csv"
            target="_blank"
            rel="noopener noreferrer"
          >
            Companies House ACSP consent list (GOV.UK)
          </a>
        </li>
      </ul>

      <h2>More information</h2>
      <p>
        See our <Link href="/terms">Terms &amp; Conditions</Link> and{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>, or{" "}
        <Link href="/contact">contact us</Link> with any questions.
      </p>
    </LegalPage>
  );
}
