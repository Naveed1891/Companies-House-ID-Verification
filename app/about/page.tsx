import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FinalCta, PageFrame, PageHero } from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "About Us - ACSP Approved CH ID Verification",
  description:
    "Learn about CompaniesHouseIDVerification.com and its guided identity-verification service for directors, PSCs and LLP members worldwide.",
  keywords: [
    "Companies House ACSP",
    "companies house authorised corporate service provider",
    "ACSP Companies House",
    "companies house ACSP verification",
    "companies house identity verification ACSP",
    "find Companies House ACSP",
    "Companies House ACSP online",
  ],
  alternates: { canonical: "https://companieshouseidverification.com/about" },
  openGraph: {
    title: "About Companies House ID Verification - ACSP Approved Identity Verification",
    description:
      "Guided Companies House identity verification for UK and international directors, PSCs and LLP members.",
    url: "https://companieshouseidverification.com/about",
  },
};

const values = [
  ["Clarity first", "Plain language, honest pricing and a process you can follow without a legal dictionary."],
  ["Security by default", "Identity documents deserve careful handling. Our workflow is encrypted and access-controlled from start to finish."],
  ["Global by design", "Built for applicants everywhere. Overseas documents, any time zone, no UK visit required."],
];

const verifyGroups = [
  {
    icon: "🇬🇧",
    title: "UK Companies House",
    links: [
      {
        label: "Authorised Corporate Service Provider (ACSP)",
        desc: "Read the official Companies House guidance on authorised providers and identity verification.",
        href: "https://www.gov.uk/government/publications/list-of-authorised-corporate-service-providers-acsps",
      },
    ],
  },
  {
    icon: "🔒",
    title: "Data protection",
    links: [
      {
        label: "How we handle personal data",
        desc: "Review how information is collected, used, shared and protected throughout the service.",
        href: "/privacy-policy",
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <PageFrame>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://companieshouseidverification.com" }, { name: "About", url: "https://companieshouseidverification.com/about" }]} />
      <PageHero
        eyebrow="About"
        title="Compliance support, made straightforward"
        description="CompaniesHouseIDVerification.com helps the people behind UK companies meet their Companies House identity verification obligations clearly, securely and from anywhere in the world."
      />

      <section className="bg-off-white">
        <div className="site-container section responsive-grid grid grid-cols-1 items-center gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/images/about-compliance-team.jpg" alt="Warm, professional compliance team collaborating around a table" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <h2 className="section-title mb-[18px]">What CompaniesHouseIDVerification.com is</h2>
            <p className="text-[15px] leading-[1.75] text-muted-text">
              CompaniesHouseIDVerification.com is a dedicated identity verification service for people connected to UK companies. If you are
              a company director, a person with significant control, an LLP member or someone who files at Companies House,
              the law now requires you to prove who you are. We turn that requirement into a short, guided process you can
              finish from anywhere.
            </p>
            <p className="text-[15px] leading-[1.75] text-muted-text">
              Everyone pays the same fixed fee, sees the same clear steps, and can reach a real person if anything feels
              unclear. We support UK and international applicants alike, with no UK visit or UK address needed, and we guide
              you all the way through to receiving your Companies House personal code.
            </p>
            <p className="text-[15px] leading-[1.75] text-slate">
              We operate as an Authorised Corporate Service Provider (ACSP) approved and verified by Companies House, so your
              verification is delivered directly under that authorisation.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-soft-border bg-off-white">
        <div className="reading-container section">
          <h2 className="section-title mb-[18px]">How CompaniesHouseIDVerification.com works</h2>
          <p className="text-[15px] leading-[1.75] text-muted-text">
            CompaniesHouseIDVerification.com provides a focused, guided process for Companies House identity verification. Every applicant
            receives clear document guidance, secure identity checks and progress updates from submission through completion.
          </p>
          <p className="text-[15px] leading-[1.75] text-muted-text">
            The service is designed for UK and international applicants and is delivered through an approved Authorised
            Corporate Service Provider workflow. Legal processing details are set out in our terms and conditions.
          </p>
        </div>
      </section>

      <section id="verify" className="scroll-mt-24 border-t border-soft-border bg-warm-cream">
        <div className="site-container section">
          <div className="reading-copy mb-[clamp(1.75rem,4vw,3rem)]">
            <p className="eyebrow">Verify us</p>
            <h2 className="section-title mb-[18px]">Check the official guidance</h2>
            <p className="text-[15px] leading-[1.75] text-muted-text">
              You are trusting us with identity documents, so you should have clear information about the process. Use the
              official guidance and our privacy policy to understand the verification and data-protection requirements.
            </p>
          </div>

          <div className="responsive-grid grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            {verifyGroups.map((group) => (
              <div key={group.title} className="card p-[clamp(22px,3vw,30px)]">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="text-2xl" aria-hidden="true">{group.icon}</span>
                  <h3 className="m-0 text-lg font-extrabold">{group.title}</h3>
                </div>
                <ul className="m-0 flex list-none flex-col gap-4 p-0">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-[14.5px] font-bold text-emerald no-underline hover:underline"
                      >
                        {link.label}
                        <span aria-hidden="true"> ↗</span>
                      </a>
                      <p className="m-0 mt-1 text-[13.5px] leading-[1.6] text-muted-text">{link.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-soft-border bg-off-white">
        <div className="site-container section">
          <h2 className="section-title mb-7">What we stand for</h2>
          <div className="responsive-grid grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {values.map(([title, description]) => (
              <article key={title} className="card p-7">
                <h3 className="m-0 mb-2.5 text-lg font-extrabold">{title}</h3>
                <p className="m-0 text-[14.5px] leading-[1.7] text-muted-text">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title="Work with a team that knows the process" description="Start your verification, or get in touch with a question first." secondaryLabel="Contact us" secondaryHref="/contact" />
    </PageFrame>
  );
}
