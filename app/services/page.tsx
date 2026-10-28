import type { Metadata } from "next";
import { Suspense } from "react";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { FinalCta, PageFrame, PageHero } from "@/components/PageFrame";
import { PackagePanel, PackagePanelSkeleton } from "@/components/PackagePanel";
import { getActivePackages } from "@/lib/server/catalog";
import { formatPrice } from "@/lib/server/price-format";

export const metadata: Metadata = {
  title: "Companies House Verification Service - ACSP Approved",
  description:
    "ACSP-approved Companies House identity verification service. Get your personal code for your confirmation statement. Covers director, PSC, LLP member and authorised filer verification. Alternative to GOV.UK One Login for UK and overseas applicants.",
  keywords: [
    "companies house identity verification service",
    "companies house id verification service",
    "ACSP verification service",
    "companies house authorised agent",
    "companies house authorised corporate service provider",
    "ACSP identity verification",
    "companies house approved verification agent",
    "companies house identity verification agent",
    "companies house verification agent",
  ],
  alternates: { canonical: "https://companieshouseidverification.com/services" },
  openGraph: {
    title: "Companies House Identity Verification Service",
    description:
      "ACSP-approved verification service. Get your personal code, one fixed fee per person, international applicants welcome.",
    url: "https://companieshouseidverification.com/services",
  },
};
export const dynamic = "force-dynamic";

const coverage = [
  ["🗂️", "Role assessment", "We confirm which verification route applies to your role - director, PSC, LLP member or authorised filer."],
  ["🪪", "Identity and document checks", "Your passport or national ID is checked and your likeness confirmed through a secure workflow."],
  ["🌍", "International applicant support", "Guidance for non-UK residents, including accepted overseas documents and remote completion."],
  ["🔑", "Personal code guidance", "Confirmation once verification is complete, plus clear instructions for using your Companies House personal code."],
];

export default async function ServicesPage() {
  const packages = await getActivePackages();
  const pkg = packages[0];
  const priceLabel = formatPrice(pkg);

  return (
    <PageFrame>
      <ServiceJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://companieshouseidverification.com" }, { name: "Services", url: "https://companieshouseidverification.com/services" }]} />
      <PageHero
        eyebrow="Service package"
        title={pkg.name}
        description={`A complete, guided verification service for one individual - director, PSC, LLP member or authorised filer. One fixed fee of ${priceLabel}.`}
      />
      <section className="bg-off-white">
        <div className="site-container section responsive-grid grid items-start gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)]">
          <div>
            <h2 className="section-title mb-7">What the service covers</h2>
            <div className="responsive-grid grid grid-cols-1 gap-5 sm:grid-cols-2">
              {coverage.map(([icon, title, description]) => (
                <article key={title} className="card p-6">
                  <span className="mb-4 block text-2xl">{icon}</span>
                  <h3 className="m-0 mb-2 text-[17px] font-extrabold">{title}</h3>
                  <p className="m-0 text-[14.5px] leading-[1.7] text-muted-text">{description}</p>
                </article>
              ))}
            </div>
          </div>
          <Suspense fallback={<PackagePanelSkeleton />}>
            <PackagePanel />
          </Suspense>
        </div>
      </section>
      <FinalCta title="Not sure which role applies to you?" description="Check who needs to verify before you begin - it takes two minutes." primaryLabel="Check Who Needs to Verify" primaryHref="/who-needs-to-verify" />
    </PageFrame>
  );
}
