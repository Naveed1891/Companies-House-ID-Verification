import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { PageFrame, PageHero } from "@/components/PageFrame";
import { faqs } from "@/components/data";

export const metadata: Metadata = {
  title: "FAQ - Companies House Verification & Personal Code",
  description:
    "Answers to common questions about Companies House identity verification under ECCTA: how to get your personal code, the November 2026 deadline, documents needed, costs, overseas applicants and GOV.UK One Login alternatives.",
  keywords: [
    "companies house verification FAQ",
    "companies house personal code",
    "where is my companies house personal code",
    "companies house personal code not received",
    "companies house verification failed",
    "companies house verification not working",
    "companies house unable to verify identity",
    "companies house identity verification deadline November 2026",
  ],
  alternates: { canonical: "https://companieshouseidverification.com/faq" },
  openGraph: {
    title: "Companies House Identity Verification FAQ",
    description:
      "Common questions answered: personal codes, the 2026 deadline, documents needed, costs and overseas applicants.",
    url: "https://companieshouseidverification.com/faq",
  },
};

export default function FaqPage() {
  return (
    <PageFrame>
      <FaqJsonLd items={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://companieshouseidverification.com" }, { name: "FAQ", url: "https://companieshouseidverification.com/faq" }]} />
      <PageHero eyebrow="FAQ" title="Frequently asked questions" description="Everything applicants ask us about Companies House identity verification." />
      <section className="bg-off-white">
        <div className="reading-container py-[clamp(3.5rem,7vw,6.5rem)]">
          <FaqAccordion items={faqs} />
          <div className="mt-10 rounded-xl border border-soft-border bg-warm-cream p-7 text-center">
            <h2 className="m-0 mb-2 text-lg font-extrabold">Still have a question?</h2>
            <p className="m-0 mb-[18px] text-[14.5px] leading-7 text-muted-text">Our compliance support team replies to every enquiry.</p>
            <Link href="/contact" className="button button-dark">Contact us</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
