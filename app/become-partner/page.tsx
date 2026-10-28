import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageFrame, PageHero } from "@/components/PageFrame";
import { PartnerForm } from "@/components/PartnerForm";

export const metadata: Metadata = {
  title: "Partner Programme - Companies House Verification",
  description:
    "Partner with Companies House ID Verification to offer ACSP-approved Companies House identity verification to your clients. Referral and reseller partnerships for accountants, formation agents, law firms and corporate service providers. Volume pricing and dedicated support.",
  keywords: [
    "companies house verification partner",
    "ACSP verification reseller",
    "companies house verification for accountants",
    "companies house verification for formation agents",
    "companies house verification B2B",
  ],
  alternates: { canonical: "https://companieshouseidverification.com/become-partner" },
  openGraph: {
    title: "Become a Partner - Companies House ID Verification B2B Partnership",
    description:
      "Offer Companies House identity verification to your clients. Referral and reseller partnerships with volume pricing and dedicated support.",
    url: "https://companieshouseidverification.com/become-partner",
  },
};

const benefits = [
  {
    icon: "💷",
    title: "Volume pricing",
    body: "Preferential per-verification rates that scale with the number of clients you send - the more you refer, the better the price.",
  },
  {
    icon: "⚡",
    title: "Fast turnaround",
    body: "Most verifications are completed within two working hours, so your clients get their personal code without delay.",
  },
  {
    icon: "🌍",
    title: "Global coverage",
    body: "We verify UK and international directors and PSCs remotely - ideal if your client base spans multiple countries.",
  },
  {
    icon: "🤝",
    title: "Dedicated support",
    body: "A named partnerships contact, priority handling for your cases, and help resolving edge cases quickly.",
  },
  {
    icon: "🏷️",
    title: "White-glove options",
    body: "Refer clients to us, or resell verification under your own engagement - whichever fits your practice.",
  },
  {
    icon: "🛡️",
    title: "ACSP assurance",
    body: "Verification is delivered by an Authorised Corporate Service Provider approved and verified by Companies House.",
  },
];

const idealPartners = [
  "Accountancy and bookkeeping firms",
  "Company formation agents",
  "Law firms and solicitors",
  "Corporate and trust service providers",
  "Business consultancies and advisors",
];

const steps = [
  ["01", "Tell us about your business", "Complete the short form with your company details and expected volume."],
  ["02", "Partnership call", "We review your needs and agree the right model - referral or reseller - and pricing."],
  ["03", "Onboarding", "You get your partnerships contact and a simple process to send clients for verification."],
  ["04", "Start verifying", "Your clients get verified fast, and you get a reliable ACSP-approved service behind you."],
];

export default function BecomePartnerPage() {
  return (
    <PageFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://companieshouseidverification.com" },
          { name: "Become a Partner", url: "https://companieshouseidverification.com/become-partner" },
        ]}
      />
      <PageHero
        eyebrow="Partnerships"
        title="Become a partner"
        description="Offer ACSP-approved Companies House identity verification to your clients. Built for accountants, formation agents, law firms and corporate service providers."
      />

      {/* Benefits */}
      <section className="bg-off-white">
        <div className="site-container section">
          <div className="reading-copy mx-auto mb-[clamp(2rem,4vw,3.5rem)] text-center">
            <p className="eyebrow">Why partner with us</p>
            <h2 className="section-title">A verification service you can put your name behind</h2>
          </div>
          <div className="responsive-grid grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="card p-[clamp(24px,3vw,32px)]">
                <span className="text-3xl" aria-hidden="true">
                  {b.icon}
                </span>
                <h3 className="mt-4 mb-2 text-lg font-extrabold">{b.title}</h3>
                <p className="m-0 text-[14.5px] leading-[1.7] text-muted-text">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How partnership works */}
      <section className="border-t border-soft-border bg-warm-cream">
        <div className="site-container section">
          <div className="reading-copy mx-auto mb-[clamp(2rem,4vw,3.5rem)] text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="section-title">From enquiry to onboarded in four steps</h2>
          </div>
          <div className="responsive-grid grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map(([num, title, body]) => (
              <div key={num} className="card p-[clamp(24px,3vw,30px)]">
                <p className="m-0 font-serif text-3xl font-medium text-orange-accent">{num}</p>
                <h3 className="mt-3 mb-2 text-base font-extrabold">{title}</h3>
                <p className="m-0 text-sm leading-[1.7] text-muted-text">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="partner-form" className="scroll-mt-24 bg-off-white">
        <div className="site-container section responsive-grid grid grid-cols-1 items-start gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]">
          <div className="card p-[clamp(26px,4vw,40px)]">
            <h2 className="m-0 mb-2 text-xl font-extrabold">Apply to become a partner</h2>
            <p className="mt-0 mb-7 text-[14.5px] leading-7 text-muted-text">
              Share a few details and our partnerships team will be in touch within one working day.
            </p>
            <PartnerForm />
          </div>
          <aside className="space-y-5">
            <div className="card p-6">
              <p className="eyebrow">Who we partner with</p>
              <ul className="m-0 mt-1 flex list-none flex-col gap-2.5 p-0">
                {idealPartners.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[14.5px] leading-6 text-slate">
                    <span className="mt-0.5 text-emerald">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <p className="eyebrow">Prefer to email?</p>
              <a href="mailto:support@companieshouseidverification.com" className="font-bold text-emerald no-underline">
                support@companieshouseidverification.com
              </a>
              <p className="mt-2 mb-0 text-sm leading-6 text-muted-text">
                Send us your company details and expected volume and we will respond with next steps.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PageFrame>
  );
}
