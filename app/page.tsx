import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FaqJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { PageFrame } from "@/components/PageFrame";
import { faqs, publishedArticles } from "@/components/data";
import { getActivePackages } from "@/lib/server/catalog";
import { formatPrice, formatRegularPrice } from "@/lib/server/price-format";
import type { CheckoutPackage } from "@/lib/checkout-package";

export const metadata: Metadata = {
  title: "Companies House Identity Verification - ACSP Approved Service",
  description:
    "Complete Companies House identity verification online. ACSP approved service for directors, PSCs and LLP members, fixed £19 fee.",
  keywords: [
    "companies house identity verification",
    "companies house id verification",
    "companies house verification online",
    "ACSP approved verification",
    "director identity verification",
    "PSC identity verification",
    "companies house personal code",
  ],
  alternates: { canonical: "https://companieshouseidverification.com" },
  openGraph: {
    title: "Companies House Identity Verification - ACSP Approved Service",
    description: "Verify your identity with Companies House. ACSP approved service for directors, PSCs and LLP members. Fixed £19 fee.",
    url: "https://companieshouseidverification.com",
  },
};

export const dynamic = "force-dynamic";

const roles = [
  { title: "Company Directors", description: "All directors of UK companies must verify their identity with Companies House." },
  { title: "Persons with Significant Control", description: "PSCs who own or control a UK company must complete identity verification." },
  { title: "LLP Members", description: "Members of limited liability partnerships are subject to the same verification requirements." },
  { title: "Authorised Filers", description: "Individuals filing documents at Companies House on behalf of a company must be verified." },
  { title: "Overseas Applicants", description: "International directors and PSCs complete verification remotely - no UK visit required." },
] as const;

const steps = [
  { num: "1", title: "Select your role", description: "Choose director, PSC, LLP member or authorised filer." },
  { num: "2", title: "Complete your details", description: "Provide personal information and company connections." },
  { num: "3", title: "Submit identity documents", description: "Upload your passport or ID from anywhere in the world." },
  { num: "4", title: "Receive your personal code", description: "Get confirmation and guidance on your Companies House code." },
] as const;

export default async function HomePage() {
  const packages = await getActivePackages();
  const pkg = packages[0];
  const priceLabel = formatPrice(pkg);
  const checkoutHref = "/checkout";

  return (
    <PageFrame>
      <ServiceJsonLd />
      <FaqJsonLd items={faqs.slice(0, 5)} />

      {/* ── Hero ── */}
      <section style={{ background: "#2e7d32" }} className="border-b border-[#c8e6c9]/30">
        <div className="site-container py-16 md:py-20">
          <div className="max-w-[700px]">
            {/* ACSP Badge */}
            <div className="mb-6 inline-flex items-center gap-2 border-2 border-white/40 bg-white/10 px-4 py-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 0.5L11.15 1.64L13.55 1.37L14.69 3.52L16.84 4.66L16.57 7.06L17.71 9.21L16.13 10.98L16.4 13.38L14.25 14.52L13.11 16.67L10.71 16.4L8.56 17.54L6.41 16.4L4.01 16.67L2.87 14.52L0.72 13.38L0.99 10.98L-0.15 8.83L1.43 7.06L1.16 4.66L3.31 3.52L4.45 1.37L6.85 1.64L9 0.5Z" fill="white"/>
                <path d="M6 9l2 2 4-4" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[13px] font-bold text-white">ACSP Approved - Authorised by Companies House</span>
            </div>

            <h1 className="mb-5 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15] text-white">
              Verify your identity with<br />Companies House
            </h1>
            <p className="mb-3 text-[clamp(1rem,1.5vw,1.2rem)] font-semibold leading-[1.6] text-white/90">
              For directors, PSCs, LLP members and company filers - in the UK and worldwide.
            </p>
            <p className="mb-8 text-[15px] leading-[1.7] text-white/80">
              A clear, guided process from document submission to your Companies House personal code. One fixed fee of <strong className="text-white">{priceLabel}</strong> per person.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={checkoutHref} className="inline-flex items-center gap-2 border-0 bg-white px-6 py-3 text-[15px] font-bold text-[#2e7d32] no-underline hover:bg-[#f1f8f1]" style={{ boxShadow: "0 2px 0 rgba(255,255,255,0.3)" }}>
                Start verification - {priceLabel}
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/who-needs-to-verify" className="inline-flex items-center px-6 py-3 text-[15px] font-bold text-white no-underline hover:bg-white/10" style={{ border: "2px solid rgba(255,255,255,0.4)" }}>
                Who needs to verify?
              </Link>
            </div>
            <p className="mt-5 text-[13px] text-white/70">
              Fixed price · No hidden fees · UK and international applicants accepted
            </p>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section style={{ background: "#f1f8f1", borderBottom: "1px solid #c8e6c9" }}>
        <div className="site-container grid grid-cols-2 gap-4 py-5 sm:grid-cols-4">
          {[
            ["Secure document handling", "🔒"],
            ["ACSP authorised service", "✅"],
            ["Guided step-by-step process", "📋"],
            ["UK and international applicants", "🌍"],
          ].map(([label, icon]) => (
            <div key={label} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[#2e7d32]">
              <span className="text-lg" aria-hidden="true">{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ── Who needs to verify ── */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #c8e6c9" }}>
        <div className="site-container py-16">
          <div className="mb-10 max-w-[580px]">
            <p className="mb-3 text-[12px] font-bold tracking-[0.1em] text-[#2e7d32] uppercase">Who needs to verify</p>
            <h2 className="mb-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-extrabold text-[#1b5e20]">
              Required for those connected to UK companies
            </h2>
            <p className="text-[15px] leading-[1.7] text-[#3d6642]">
              Companies House identity verification is a legal requirement for a defined group of roles - wherever in the world those individuals are based.
            </p>
          </div>
          <div style={{ border: "1px solid #c8e6c9" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {roles.map((role, i) => (
              <Link
                key={role.title}
                href="/who-needs-to-verify"
                className="flex flex-col gap-2 p-6 no-underline transition-colors hover:bg-[#f1f8f1]"
                style={{ borderRight: i < 4 ? "1px solid #c8e6c9" : undefined }}
              >
                <p className="m-0 text-[16px] font-extrabold text-[#1b5e20]">{role.title}</p>
                <p className="m-0 text-[13.5px] leading-[1.65] text-[#3d6642]">{role.description}</p>
                <span className="mt-auto pt-2 text-[13px] font-bold text-[#2e7d32]">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ background: "#f1f8f1", borderBottom: "1px solid #c8e6c9" }}>
        <div className="site-container py-16">
          <div className="mb-10 max-w-[580px]">
            <p className="mb-3 text-[12px] font-bold tracking-[0.1em] text-[#2e7d32] uppercase">How it works</p>
            <h2 className="mb-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-extrabold text-[#1b5e20]">
              Four steps from start to personal code
            </h2>
            <p className="text-[15px] leading-[1.7] text-[#3d6642]">
              A structured, guided process. You always know where you are and what comes next.
            </p>
          </div>
          <ol className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <li key={step.num} style={{ background: "#ffffff", border: "1px solid #c8e6c9" }} className="p-6">
                <span className="mb-4 flex h-10 w-10 items-center justify-center text-[18px] font-extrabold text-white" style={{ background: "#2e7d32" }}>
                  {step.num}
                </span>
                <p className="m-0 mb-2 text-[16px] font-extrabold text-[#1b5e20]">{step.title}</p>
                <p className="m-0 text-[13.5px] leading-[1.65] text-[#3d6642]">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-7">
            <Link href="/how-it-works" className="text-[14px] font-bold text-[#2e7d32] underline underline-offset-4">
              See the full process
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #c8e6c9" }}>
        <div className="site-container py-16">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-[12px] font-bold tracking-[0.1em] text-[#2e7d32] uppercase">Pricing</p>
              <h2 className="mb-4 text-[clamp(1.5rem,2.5vw,2.25rem)] font-extrabold text-[#1b5e20]">
                One service. One fixed price.
              </h2>
              <p className="mb-5 text-[15px] leading-[1.7] text-[#3d6642]">
                No tiers, no upsells, no hidden extras. Every applicant receives the same complete guided verification service.
              </p>
              <ul className="m-0 list-none p-0 space-y-3">
                {["Clear guidance at every step", "UK and international applicants", "Secure document handling", "Personal code guidance included", "ACSP authorised service"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-[14.5px] font-semibold text-[#1b5e20]">
                    <span style={{ color: "#2e7d32" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <PriceCard pkg={pkg} checkoutHref={checkoutHref} priceLabel={priceLabel} />
          </div>
        </div>
      </section>

      {/* ── Personal code ── */}
      <section style={{ background: "#1b5e20" }}>
        <div className="site-container py-16 text-center">
          <p className="mb-3 text-[12px] font-bold tracking-[0.1em] text-white/50 uppercase">Your Companies House personal code</p>
          <h2 className="mx-auto mb-4 max-w-[560px] text-[clamp(1.5rem,2.5vw,2.25rem)] font-extrabold text-white">
            One code for all your company roles
          </h2>
          <p className="mx-auto mb-8 max-w-[580px] text-[15px] leading-[1.7] text-white/75">
            Your code belongs to you - not to any single company. Use it across directorships, PSC positions and filing permissions. Read the{" "}
            <a href="https://www.gov.uk/guidance/companies-house-personal-codes-for-identity-verification" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-3">
              official Companies House guidance
            </a>.
          </p>
          <div className="inline-block px-8 py-4 font-mono text-[clamp(18px,3vw,26px)] font-bold tracking-[0.2em] text-white" style={{ border: "2px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)" }}>
            XKJ4-••••-2223
          </div>
        </div>
      </section>

      {/* ── International ── */}
      <section style={{ background: "#f1f8f1", borderBottom: "1px solid #c8e6c9" }}>
        <div className="site-container py-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-[12px] font-bold tracking-[0.1em] text-[#2e7d32] uppercase">International applicants</p>
              <h2 className="mb-4 text-[clamp(1.5rem,2.5vw,2.25rem)] font-extrabold text-[#1b5e20]">
                Verify from anywhere in the world
              </h2>
              <p className="mb-6 text-[15px] leading-[1.7] text-[#3d6642]">
                No UK visit or UK address required. Complete every step remotely using accepted identity documents from your country.
              </p>
              <Link href="/requirements" className="inline-flex items-center gap-2 bg-[#2e7d32] px-5 py-3 text-[14px] font-bold text-white no-underline hover:bg-[#1b5e20]">
                View document requirements
              </Link>
            </div>
            <div style={{ background: "#ffffff", border: "1px solid #c8e6c9" }} className="p-6">
              <h3 className="m-0 mb-5 text-[17px] font-extrabold text-[#1b5e20]">Accepted documents</h3>
              <ul className="m-0 list-none space-y-3 p-0">
                {["Passport (any nationality)", "National identity card (EU / EEA)", "Biometric residence permit (UK)", "Remote selfie check - no in-person visit required"].map(item => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-[#3d6642]">
                    <span className="mt-0.5 font-bold text-[#2e7d32]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #c8e6c9" }}>
        <div className="mx-auto max-w-[780px] px-[var(--site-gutter)] py-16">
          <p className="mb-3 text-[12px] font-bold tracking-[0.1em] text-[#2e7d32] uppercase">Common questions</p>
          <h2 className="mb-8 text-[clamp(1.5rem,2.5vw,2.25rem)] font-extrabold text-[#1b5e20]">Frequently asked questions</h2>
          <FaqAccordion items={faqs.slice(0, 5)} />
          <p className="mt-7 text-[14px] text-[#3d6642]">
            More questions?{" "}
            <Link href="/faq" className="font-bold text-[#2e7d32] underline underline-offset-3">Visit the full FAQ</Link>
            {" "}or{" "}
            <Link href="/contact" className="font-bold text-[#2e7d32] underline underline-offset-3">contact our team</Link>.
          </p>
        </div>
      </section>

      {/* ── Resources ── */}
      <section style={{ background: "#f1f8f1", borderBottom: "1px solid #c8e6c9" }}>
        <div className="site-container py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="mb-2 text-[12px] font-bold tracking-[0.1em] text-[#2e7d32] uppercase">Guidance & resources</p>
              <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-extrabold text-[#1b5e20]">Understand the requirements</h2>
            </div>
            <Link href="/blog" className="text-[14px] font-bold text-[#2e7d32] underline underline-offset-4">All resources →</Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {publishedArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ background: "#2e7d32" }}>
        <div className="site-container py-16 text-center">
          <div className="mx-auto max-w-[580px]">
            <h2 className="mb-4 text-[clamp(1.5rem,2.5vw,2.25rem)] font-extrabold text-white">
              Ready to complete your verification?
            </h2>
            <p className="mb-7 text-[15px] leading-[1.7] text-white/85">
              Companies House identity verification online. Fixed price {priceLabel} per person - no hidden fees.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={checkoutHref} className="inline-flex items-center gap-2 bg-white px-6 py-3 text-[15px] font-bold text-[#2e7d32] no-underline hover:bg-[#f1f8f1]">
                Start for {priceLabel}
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/requirements" className="inline-flex items-center px-6 py-3 text-[15px] font-bold text-white no-underline hover:bg-white/10" style={{ border: "2px solid rgba(255,255,255,0.4)" }}>
                View requirements
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

function PriceCard({ pkg, checkoutHref, priceLabel }: { pkg: CheckoutPackage; checkoutHref: string; priceLabel: string }) {
  const regular = formatRegularPrice(pkg);
  const features = pkg.features.length > 0
    ? pkg.features.slice(0, 4)
    : ["Verification for one individual", "Identity and document checks", "International applicant support", "Personal code guidance"];
  const prefix = pkg.currency.toUpperCase() === "GBP" ? "£" : `${pkg.currency} `;

  return (
    <div className="w-full p-8 text-white" style={{ background: "#1b5e20", border: "2px solid #2e7d32" }}>
      <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.12em] text-white/50 uppercase">{pkg.name}</p>
      <p className="m-0 mb-5 flex flex-wrap items-baseline gap-2">
        <span className="text-[clamp(2.5rem,5vw,3.2rem)] font-extrabold text-white">{prefix}{pkg.price}</span>
        {regular ? <span className="text-sm text-white/50">was <span className="line-through">{regular}</span></span> : null}
        <span className="text-sm text-white/50">per person</span>
      </p>
      <div className="mb-6 space-y-2.5">
        {features.map((item) => (
          <p key={item} className="m-0 text-[14px] text-white/90">
            <span className="mr-2 text-[#c8e6c9]">✓</span>{item}
          </p>
        ))}
      </div>
      <Link href={checkoutHref} className="flex w-full items-center justify-center gap-2 bg-white py-3 text-[15px] font-bold text-[#2e7d32] no-underline hover:bg-[#f1f8f1]">
        Start verification - {priceLabel}
      </Link>
      <p className="mt-4 text-center text-[12px] text-white/50">No hidden fees · No upsells</p>
    </div>
  );
}
