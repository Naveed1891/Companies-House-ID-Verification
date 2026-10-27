export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["ProfessionalService", "Organization"],
        "@id": "https://companieshouseidverification.com/#organization",
        name: "Companies House Identity Verification",
        alternateName: "Companies House ID Verification",
        url: "https://companieshouseidverification.com",
        logo: {
          "@type": "ImageObject",
          url: "https://companieshouseidverification.com/ch-logo.webp",
          width: 220,
          height: 66,
        },
        image: "https://companieshouseidverification.com/opengraph-image",
        description:
          "ACSP-approved Companies House identity verification service for directors, PSCs, LLP members and authorised filers. Fixed £19 fee, UK and international applicants welcome.",
        foundingDate: "2024",
        sameAs: [
          "https://find-and-update.company-information.service.gov.uk",
        ],
        address: {
          "@type": "PostalAddress",
          addressCountry: "GB",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@companieshouseidverification.com",
          availableLanguage: ["English"],
          areaServed: "Worldwide",
        },
        areaServed: { "@type": "Place", name: "Worldwide" },
        serviceType: "Identity Verification",
        priceRange: "£19",
        currenciesAccepted: "GBP",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Companies House Identity Verification Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Director Identity Verification",
                description: "Guided Companies House identity verification for UK company directors, including overseas applicants.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "PSC Identity Verification",
                description: "Identity verification for persons with significant control (PSCs) under Companies House requirements.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "LLP Member Identity Verification",
                description: "Identity verification for LLP members required under the Economic Crime and Corporate Transparency Act.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Authorised Filer Identity Verification",
                description: "Identity verification for authorised filers who submit documents on behalf of UK companies.",
              },
            },
          ],
        },
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Companies House ID Verification",
        url: "https://companieshouseidverification.com",
      }}
    />
  );
}

export function FaqJsonLd({ items }: { items: Array<{ q: string; a: string }> }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      }}
    />
  );
}

export function ServiceJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Companies House Identity Verification",
        provider: {
          "@type": "ProfessionalService",
          name: "Companies House ID Verification",
          url: "https://companieshouseidverification.com",
        },
        description:
          "Complete guided identity verification for UK company directors, PSCs, LLP members and authorised filers. One fixed fee, international applicants welcome.",
        areaServed: { "@type": "Place", name: "Worldwide" },
        serviceType: "Identity Verification",
        offers: {
          "@type": "Offer",
          price: "19",
          priceCurrency: "GBP",
          eligibleRegion: { "@type": "Place", name: "Worldwide" },
        },
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  /** ISO 8601 date, e.g. "2026-09-01". */
  datePublished: string;
  /** ISO 8601 date; defaults to datePublished when omitted. */
  dateModified?: string;
  /** Named person credited as the article author (E-E-A-T). */
  authorName: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image,
        datePublished,
        dateModified: dateModified ?? datePublished,
        author: {
          "@type": "Person",
          name: authorName,
          worksFor: {
            "@type": "Organization",
            name: "Companies House ID Verification",
            url: "https://companieshouseidverification.com",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "Companies House ID Verification",
          url: "https://companieshouseidverification.com",
          logo: {
            "@type": "ImageObject",
            url: "https://companieshouseidverification.com/ch-logo.webp",
            width: 220,
            height: 66,
          },
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function HowToJsonLd({
  steps,
}: {
  steps: Array<{ name: string; text: string; duration?: string }>;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to verify your identity with Companies House",
        description:
          "Complete your Companies House identity verification in four steps through an ACSP-approved service. Get your personal code remotely from any country.",
        totalTime: "PT20M",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "GBP",
          value: "19",
        },
        supply: [
          { "@type": "HowToSupply", name: "Valid passport or national identity document" },
          { "@type": "HowToSupply", name: "Companies House company number (if applicable)" },
        ],
        step: steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          ...(s.duration ? { timeRequired: s.duration } : {}),
        })),
      }}
    />
  );
}

export function ProductJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Companies House Identity Verification",
        description:
          "ACSP-approved identity verification for UK company directors, PSCs, LLP members and authorised filers. Covers UK and international applicants.",
        brand: {
          "@type": "Brand",
          name: "Companies House ID Verification",
        },
        offers: {
          "@type": "Offer",
          url: "https://companieshouseidverification.com/checkout",
          priceCurrency: "GBP",
          price: "19",
          priceValidUntil: "2027-01-01",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: {
            "@type": "Organization",
            name: "Companies House ID Verification",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "120",
          bestRating: "5",
          worstRating: "1",
        },
      }}
    />
  );
}
