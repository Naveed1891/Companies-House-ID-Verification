import type { Metadata } from "next";
import { BreadcrumbJsonLd, HowToJsonLd } from "@/components/JsonLd";
import { FinalCta, PageFrame, PageHero } from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "How to Verify Your Identity with Companies House - Step by Step Guide",
  description:
    "How to get your Companies House personal code in four steps. Complete your ECCTA identity verification through our ACSP-approved process. Most directors finish in 15 minutes. Alternative to GOV.UK One Login.",
  keywords: [
    "how to verify identity with companies house",
    "how to complete companies house verification",
    "how to do companies house ID verification",
    "how does companies house verification work",
    "how long does companies house verification take",
    "companies house personal code application",
    "how to get companies house personal code",
    "GOV.UK One Login alternative",
  ],
  alternates: { canonical: "https://companieshouseidverification.com/how-it-works" },
  openGraph: {
    title: "How Companies House Identity Verification Works",
    description:
      "Four clear steps from start to personal code. Verify your identity through an ACSP, completed remotely from any country.",
    url: "https://companieshouseidverification.com/how-it-works",
  },
};

const steps = [
  ["01", "Select your verification type", "Tell us whether you are verifying as a company director, a person with significant control, an LLP member or an authorised filer. If you hold more than one role, we confirm the right route for you.", "Takes about 2 minutes"],
  ["02", "Complete your details", "Provide your personal information and the companies you are connected to through a short guided form. International applicants can enter overseas addresses and documents - the form is built for it.", "Takes about 10 minutes"],
  ["03", "Verify your identity and documents", "Photograph or scan your passport or national identity document and complete a short facial check from your phone or computer. Documents are handled through a secure, encrypted workflow.", "Completed remotely, from any country"],
  ["04", "Receive confirmation and personal-code guidance", "Once verification is complete you receive confirmation, together with clear guidance on your Companies House personal code and how to connect it to each of your company roles.", ""],
];

const needs = [
  ["🪪", "Identity document", "A current passport or national identity document from any country."],
  ["📱", "Phone or computer", "A device with a camera for the document and facial checks."],
  ["🏢", "Company details", "The names or numbers of the UK companies you are connected to."],
  ["⏱️", "Around 15 minutes", "Most applicants complete their part of the process in one sitting."],
];

export default function HowItWorksPage() {
  return (
    <PageFrame>
      <HowToJsonLd
        steps={steps.map(([, name, text, duration]) => ({
          name,
          text,
          duration: duration || undefined,
        }))}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://companieshouseidverification.com" }, { name: "How it works", url: "https://companieshouseidverification.com/how-it-works" }]} />
      <PageHero eyebrow="How it works" title="Four clear stages, from start to personal code" description="You always know where you are in the process, what we need from you, and what happens next." />
      <section className="bg-off-white">
        <div className="reading-container py-[clamp(3.5rem,7vw,6.5rem)]">
          <div className="space-y-5">
            {steps.map(([number, title, description, timing]) => (
              <article key={number} className="card responsive-grid grid grid-cols-1 gap-5 p-[clamp(1.5rem,4vw,2.25rem)] sm:grid-cols-[4rem_minmax(0,1fr)]">
                <span className="flex h-12 w-12 items-center justify-center bg-emerald text-[20px] font-extrabold text-white">{number}</span>
                <div>
                  <h2 className="m-0 mb-2.5 text-[21px] font-extrabold">{title}</h2>
                  <p className="m-0 text-[15px] leading-[1.75] text-muted-text">{description}</p>
                  {timing && <p className="mt-4 mb-0 text-[13px] font-bold text-emerald">{timing}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-soft-border bg-warm-cream">
        <div className="site-container section">
          <h2 className="section-title mb-7">What you will need</h2>
          <div className="responsive-grid grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {needs.map(([icon, title, description]) => <article key={title} className="card p-6"><span className="text-2xl">{icon}</span><h3 className="mb-2 text-base font-extrabold">{title}</h3><p className="m-0 text-sm leading-[1.7] text-muted-text">{description}</p></article>)}
          </div>
        </div>
      </section>
      <FinalCta title="Ready to begin?" description="Start your guided verification now, or review the full document requirements first." secondaryLabel="View Requirements" />
    </PageFrame>
  );
}
