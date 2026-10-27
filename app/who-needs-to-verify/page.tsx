import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FinalCta, PageFrame, PageHero } from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "Who Needs Companies House Identity Verification Under ECCTA 2026",
  description:
    "Company directors, PSCs, LLP members and authorised filers must verify their identity before November 2026 under ECCTA. Acting as an unverified director after the deadline is a criminal offence. Check whether you need to verify.",
  keywords: [
    "companies house director verification",
    "companies house director id verification",
    "companies house PSC verification",
    "PSC identity verification",
    "person with significant control verification",
    "LLP member verification",
    "authorised filer verification",
    "companies house verification deadline",
    "companies house ID verification deadline",
    "companies house verification requirements 2026",
    "ECCTA identity verification",
  ],
  alternates: { canonical: "https://companieshouseidverification.com/who-needs-to-verify" },
  openGraph: {
    title: "Who Needs Companies House Identity Verification?",
    description:
      "Directors, PSCs, LLP members and authorised filers must verify before November 2026. Check if you need to verify.",
    url: "https://companieshouseidverification.com/who-needs-to-verify",
  },
};

const roles = [
  ["Company Directors", "Every director of a UK company must verify their identity with Companies House. This applies to newly appointed directors before their appointment is registered, and to existing directors within the transition timetable. It applies equally to UK-resident and overseas directors."],
  ["Persons with Significant Control (PSCs)", "Individuals who own more than 25% of a company’s shares or voting rights, can appoint or remove the majority of the board, or otherwise exercise significant influence, are registered as PSCs - and must verify their identity, wherever they are based."],
  ["LLP Members", "Members of limited liability partnerships are treated in the same way as company directors under the verification regime. Designated and non-designated members alike must complete identity verification."],
  ["Authorised Filers", "Anyone who delivers documents to Companies House on behalf of a company - including company secretaries, accountants and formation agents filing in a personal capacity - must be identity-verified before they can file."],
];

export default function WhoNeedsPage() {
  return (
    <PageFrame>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://companieshouseidverification.com" }, { name: "Who needs to verify", url: "https://companieshouseidverification.com/who-needs-to-verify" }]} />
      <PageHero eyebrow="Who needs to verify" title="Does Companies House identity verification apply to you?" description="Verification is a legal requirement for four groups of people connected to UK companies - wherever they live in the world." />
      <section className="bg-off-white">
        <div className="site-container section">
          <div className="responsive-grid grid grid-cols-1 gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2">
            {roles.map(([title, description]) => (
              <article key={title} className="card p-[clamp(24px,4vw,34px)]">
                <h2 className="m-0 mb-2.5 text-[22px] font-extrabold">{title}</h2>
                <p className="m-0 mb-5 text-[15px] leading-[1.75] text-muted-text">{description}</p>
                <p className="m-0 text-sm font-bold text-emerald">✓ Verification required by law</p>
              </article>
            ))}
          </div>
          <aside className="mt-6 rounded-xl border border-soft-border bg-warm-cream p-[clamp(24px,4vw,34px)]">
            <h2 className="m-0 mb-2.5 text-xl font-extrabold">Living outside the UK?</h2>
            <p className="m-0 text-[15px] leading-[1.75] text-muted-text">The requirement follows the role, not your address. Non-UK residents who hold any of the roles above must verify in the same way - and can complete the entire process remotely through CompaniesHouseIDVerification.com.</p>
          </aside>
        </div>
      </section>
      <FinalCta dark title="One of these roles apply to you?" description="Complete your verification with a guided process for £19." />
    </PageFrame>
  );
}
