import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FinalCta, PageFrame, PageHero } from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "Identity Verification Requirements - Documents & ID Needed",
  description:
    "What you need for Companies House identity verification: a current passport or national ID, proof of address, and a device with a camera. Accepted documents for UK and international applicants.",
  keywords: [
    "companies house verification documents",
    "companies house identity verification documents",
    "companies house ID verification documents",
    "documents needed for companies house verification",
    "companies house verification passport",
    "companies house verification driving licence",
    "companies house proof of identity",
    "companies house ID check requirements",
    "companies house identity verification requirements",
  ],
  alternates: { canonical: "https://companieshouseidverification.com/requirements" },
  openGraph: {
    title: "Companies House Verification Requirements",
    description:
      "Documents and ID needed for Companies House identity verification. Passport, national ID, proof of address. UK and international documents accepted.",
    url: "https://companieshouseidverification.com/requirements",
  },
};

const extras = [
  ["A device with a camera", "For photographing your document and completing the facial check."],
  ["Your role details", "Whether you verify as a director, PSC, LLP member or authorised filer."],
  ["Company connections", "Names or registration numbers of the UK companies you are connected to."],
  ["An email address", "For confirmation and personal-code guidance after completion."],
];

export default function RequirementsPage() {
  return (
    <PageFrame>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://companieshouseidverification.com" }, { name: "Requirements", url: "https://companieshouseidverification.com/requirements" }]} />
      <PageHero eyebrow="Requirements" title="What you need to complete verification" description="The documents and information required - for UK residents and international applicants." />
      <section className="bg-off-white">
        <div className="site-container section">
          <div className="responsive-grid grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="card p-[clamp(26px,4vw,36px)]">
              <span className="text-3xl">🇬🇧</span><h2 className="mb-5 text-xl font-extrabold">UK residents</h2>
              {["Current UK or foreign passport, or", "UK photocard driving licence, or", "UK biometric residence permit", "Your personal and company details"].map((item) => <p key={item} className="text-[15px] text-slate"><span className="mr-2 text-emerald">✓</span>{item}</p>)}
            </article>
            <article className="card p-[clamp(26px,4vw,36px)]">
              <span className="text-3xl">🌍</span><h2 className="mb-5 text-xl font-extrabold">International applicants</h2>
              {["Current passport from your country, or", "National identity card with photo", "Overseas address accepted - no UK address needed", "Everything completed remotely"].map((item) => <p key={item} className="text-[15px] text-slate"><span className="mr-2 text-emerald">✓</span>{item}</p>)}
            </article>
          </div>
          <h2 className="section-title mt-[clamp(3rem,7vw,5rem)] mb-6">In every case, you will also need</h2>
          <div className="responsive-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
            {extras.map(([title, description]) => <article key={title} className="card p-6"><h3 className="m-0 mb-1.5 text-base font-extrabold">{title}</h3><p className="m-0 text-sm leading-6 text-muted-text">{description}</p></article>)}
          </div>
          <aside className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-xl border border-soft-border bg-warm-cream p-[clamp(24px,4vw,32px)]">
            <div><h2 className="m-0 mb-2 text-xl font-extrabold">Document expired or unavailable?</h2><p className="m-0 text-[15px] leading-6 text-muted-text">Contact us before starting - we will confirm which alternative documents can be used in your circumstances.</p></div>
            <Link href="/contact" className="button button-dark">Contact us</Link>
          </aside>
        </div>
      </section>
      <FinalCta dark title="Have your documents ready?" description="Complete your guided verification for a fixed £19." />
    </PageFrame>
  );
}
