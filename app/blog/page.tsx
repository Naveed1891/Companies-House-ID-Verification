import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageFrame, PageHero } from "@/components/PageFrame";
import { publishedArticles } from "@/components/data";

export const metadata: Metadata = {
  title: "Guides & Resources - Companies House Identity Verification",
  description:
    "Practical guides on Companies House identity verification: how the process works, director and PSC requirements, using your personal code, and verifying from outside the UK.",
  alternates: { canonical: "https://companieshouseidverification.com/blog" },
  openGraph: {
    title: "Companies House Verification Guides & Resources",
    description: "Practical guides on director verification, PSC requirements, personal codes and overseas applicants.",
    url: "https://companieshouseidverification.com/blog",
  },
};

export default function BlogPage() {
  const featured = publishedArticles[0];
  return (
    <PageFrame>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://companieshouseidverification.com" }, { name: "Resources", url: "https://companieshouseidverification.com/blog" }]} />
      <PageHero eyebrow="Resources" title="Guides & insights" description="Plain-language guidance on Companies House identity verification and UK company compliance." />
      <section className="bg-off-white">
        <div className="site-container section">
          <Link href={`/blog/${featured.slug}`} className="card card-hover responsive-grid mb-7 grid grid-cols-1 overflow-hidden text-inherit no-underline lg:grid-cols-2">
            <div className="relative aspect-[16/10]">
              <Image src={featured.image} alt={featured.alt} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="flex min-w-0 flex-col justify-center p-[clamp(1.75rem,5vw,3.5rem)]">
              <p className="eyebrow">Featured guide</p>
              <h2 className="section-title mb-3.5">{featured.title}</h2>
              <p className="m-0 mb-5 text-[15px] leading-[1.7] text-muted-text">{featured.description}</p>
              <p className="m-0 text-[13px] font-semibold text-muted-text">{featured.date} · {featured.time}</p>
            </div>
          </Link>
          <div className="responsive-grid grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {publishedArticles.slice(1).map((article) => <ArticleCard key={article.slug} article={article} />)}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
