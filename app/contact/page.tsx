import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageFrame, PageHero } from "@/components/PageFrame";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Get Help with Identity Verification",
  description:
    "Questions about Companies House identity verification? Contact the Companies House Identity Verification support team. We reply to every enquiry promptly.",
  keywords: [
    "companies house verification help",
    "companies house verification support",
    "companies house identity check contact",
  ],
  alternates: { canonical: "https://companieshouseidverification.com/contact" },
  openGraph: {
    title: "Contact Companies House Identity Verification",
    description: "Get help with Companies House identity verification. Our support team replies to every enquiry.",
    url: "https://companieshouseidverification.com/contact",
  },
};

export default function ContactPage() {
  return (
    <PageFrame>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://companieshouseidverification.com" }, { name: "Contact", url: "https://companieshouseidverification.com/contact" }]} />
      <PageHero eyebrow="Contact" title="Talk to our support team" description="Questions about verification, documents or your circumstances - we reply to every enquiry." />
      <section className="bg-off-white">
        <div className="site-container section responsive-grid grid grid-cols-1 items-start gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
          <div className="card p-[clamp(26px,4vw,40px)]">
            <h2 className="m-0 mb-6 text-xl font-extrabold">Send us a message</h2>
            <ContactForm />
          </div>
          <aside className="space-y-5">
            <div className="card p-6"><p className="eyebrow">Email</p><a href="mailto:support@companieshouseidverification.com" className="font-bold text-emerald">support@companieshouseidverification.com</a></div>
            <div className="card p-6"><p className="eyebrow">Response time</p><p className="m-0 text-[14.5px] leading-7 text-muted-text">We aim to reply within one working day, in any time zone.</p></div>
            <div className="card p-6"><p className="eyebrow">Looking for quick answers?</p><p className="mt-0 text-sm leading-6 text-muted-text">Most common questions are covered in our FAQ.</p><Link href="/faq" className="text-sm font-bold text-emerald no-underline">Read the FAQ →</Link></div>
          </aside>
        </div>
      </section>
    </PageFrame>
  );
}
