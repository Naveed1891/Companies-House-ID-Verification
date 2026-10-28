import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/JsonLd";
import { PageFrame, PageHero } from "@/components/PageFrame";
import { TrustpilotReviews } from "@/components/TrustpilotReviews";
import { PackagePanel, PackagePanelSkeleton } from "@/components/PackagePanel";
import { getActivePackages } from "@/lib/server/catalog";
import { formatPrice } from "@/lib/server/price-format";

export const metadata: Metadata = {
  title: "Companies House Identity Verification Cost - £19 Fixed Fee",
  description:
    "Companies House identity verification for £19 per person. One fixed fee covers the full ACSP-verified process, personal code delivery and international applicant support. No hidden extras.",
  keywords: [
    "companies house verification cost",
    "companies house identity verification price",
    "companies house id verification fee",
    "companies house verification £19",
    "cheapest companies house verification",
    "companies house verification fixed fee",
    "ACSP verification cost",
  ],
  alternates: { canonical: "https://companieshouseidverification.com/pricing" },
  openGraph: {
    title: "Companies House Verification Cost - £19 Fixed Fee",
    description:
      "Complete ACSP-verified identity verification for £19 per person. No hidden charges. UK and international applicants.",
    url: "https://companieshouseidverification.com/pricing",
  },
};
export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const packages = await getActivePackages();
  const pkg = packages[0];
  const priceLabel = formatPrice(pkg);

  return (
    <PageFrame>
      <ProductJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://companieshouseidverification.com" }, { name: "Pricing", url: "https://companieshouseidverification.com/pricing" }]} />
      <PageHero eyebrow="Pricing" title="Simple, fixed pricing" description="One service, one price. Every applicant receives the same complete verification support." />
      <section className="bg-off-white">
        <div className="reading-container py-[clamp(3.5rem,7vw,6.5rem)]">
          <Suspense fallback={<PackagePanelSkeleton />}>
            <PackagePanel footnote="All inclusive · nothing more to pay." />
          </Suspense>
          <p className="mt-6 border border-soft-border bg-warm-cream p-5 text-center text-sm leading-6 text-muted-text"><strong className="text-charcoal">Verifying several people?</strong> Each individual completes their own verification at the same fixed {priceLabel} - no volume tiers, no surprises.</p>
          <p className="mt-6 text-center text-sm leading-6 text-muted-text"><strong className="text-charcoal">No hidden extras.</strong> The fee covers the full guided process, document checks and confirmation. Nothing more to pay.</p>
        </div>
      </section>
      <TrustpilotReviews />
      <section className="border-t border-soft-border bg-warm-cream">
        <div className="reading-container py-[clamp(3.5rem,7vw,5.5rem)] text-center">
          <h2 className="section-title mb-4">Questions about the service?</h2>
          <p className="lead mb-7">See the FAQ, or talk to our compliance support team before you begin.</p>
          <div className="button-row flex flex-wrap justify-center gap-3"><Link href="/faq" className="button button-light">Read FAQ</Link><Link href="/contact" className="button button-dark">Contact us</Link></div>
        </div>
      </section>
    </PageFrame>
  );
}
