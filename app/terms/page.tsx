import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using CompaniesHouseIDVerification.com identity verification service. Service scope, fees, refund policy and your obligations.",
  alternates: { canonical: "https://companieshouseidverification.com/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      description="The terms on which CompaniesHouseIDVerification.com provides its identity verification support service."
      updated="17 August 2026"
    >
      <p>
        These Terms &amp; Conditions govern your use of CompaniesHouseIDVerification.com and the identity verification
        support service we provide. By purchasing or using our service, you agree to these terms.
        Please read them carefully.
      </p>

      <h2>1. Our service</h2>
      <p>
        CompaniesHouseIDVerification.com provides guided identity verification for directors, persons with
        significant control (PSCs), LLP members and authorised filers. Service processing is
        completed via <strong>HopeTex Limited</strong>, an Authorised Corporate Service Provider
        (ACSP) approved and verified by Companies House.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old and legally able to enter into a contract. You must provide
        accurate, complete and genuine information and documents. Submitting false, altered or
        fraudulent documents is prohibited and may be reported to the relevant authorities.
      </p>

      <h2>3. Fees and payment</h2>
      <p>
        Our fee is displayed clearly before you pay and is charged per individual applicant. Payment
        is taken securely through our payment provider, Stripe, at the point of purchase. The service
        begins once payment is confirmed.
      </p>

      <h2>4. Your responsibilities</h2>
      <ul>
        <li>Provide accurate personal information and valid identity documents;</li>
        <li>Respond promptly to any request for additional information or documents;</li>
        <li>Ensure the documents you upload are clear, current and genuinely yours;</li>
        <li>Keep your account credentials secure and confidential.</li>
      </ul>
      <p>
        Delays or failures caused by inaccurate information, poor-quality documents or a lack of
        response are outside our control.
      </p>

      <h2>5. Our responsibilities</h2>
      <p>
        We will carry out the service with reasonable care and skill, handle your information
        securely, and keep you informed of progress. We will request further information only where
        it is genuinely needed to complete verification.
      </p>

      <h2>6. Refunds</h2>
      <p>
        Refunds are governed by our <Link href="/refund-policy">Refund Policy</Link>, which forms part
        of these terms.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, our liability is limited to the fee you paid for the
        service. We are not liable for delays caused by third parties or by inaccurate or incomplete
        information you provide, nor for indirect or consequential loss. Nothing in these terms
        limits liability that cannot be limited by law.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        All content on this website is owned by us or our licensors and may not be copied or reused
        without permission.
      </p>

      <h2>9. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The version in force is the one published on
        this page at the time you use the service.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the laws of England and Wales, and any dispute is subject to the
        exclusive jurisdiction of the courts of England and Wales.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any question about these terms, please <Link href="/contact">contact us</Link>.
      </p>
    </LegalPage>
  );
}
