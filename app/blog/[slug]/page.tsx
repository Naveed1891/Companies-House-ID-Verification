import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageFrame } from "@/components/PageFrame";
import { ARTICLE_AUTHOR, articleIsoDate, articleModifiedDate, articles, publishedArticles } from "@/components/data";
import { ARTICLE_CONTENT } from "./content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  const url = `https://companieshouseidverification.com/blog/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url,
      siteName: "Companies House ID Verification",
      publishedTime: articleIsoDate(article.date),
      modifiedTime: articleModifiedDate(article.slug, article.date),
      images: [{ url: article.image, alt: article.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <PageFrame>
      <ArticleJsonLd
        title={article.title}
        description={article.description}
        url={`https://companieshouseidverification.com/blog/${article.slug}`}
        image={`https://companieshouseidverification.com${article.image}`}
        datePublished={articleIsoDate(article.date)}
        dateModified={articleModifiedDate(article.slug, article.date)}
        authorName={ARTICLE_AUTHOR}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://companieshouseidverification.com" },
        { name: "Resources", url: "https://companieshouseidverification.com/blog" },
        { name: article.title, url: `https://companieshouseidverification.com/blog/${article.slug}` },
      ]} />
      <article>
        <header className="border-b border-soft-border bg-warm-cream">
          <div className="reading-container py-[clamp(3.5rem,7vw,6rem)] text-center">
            <p className="mb-4 text-[12.5px] font-bold tracking-[0.1em] text-orange-accent uppercase"><Link href="/blog" className="text-muted-text no-underline">Resources</Link> <span className="text-soft-border">/</span> {article.category}</p>
            <h1 className="display mb-5">{article.title}</h1>
            <p className="m-0 text-sm text-muted-text">By {ARTICLE_AUTHOR} · {article.date} · {article.time}</p>
          </div>
        </header>
        <div className="site-container pt-[clamp(2rem,5vw,3.5rem)]">
          <div className="relative mb-[clamp(2rem,5vw,3.5rem)] aspect-[16/9] overflow-hidden rounded-xl lg:aspect-[16/7]">
            <Image src={article.image} alt={article.alt} fill priority sizes="(max-width: 960px) 100vw, 880px" className="object-cover" />
          </div>
        </div>
        <div className="rich reading-container pb-[clamp(3.5rem,7vw,6.5rem)]">
          {ARTICLE_CONTENT[slug] ?? (
            <>
              <p>This article is coming soon.</p>
              <p>
                In the meantime, <Link href="/how-it-works">read how Companies House identity verification
                works</Link> or <Link href="/start">start your verification</Link>.
              </p>
            </>
          )}
        </div>
      </article>
      <section className="border-t border-soft-border bg-off-white">
        <div className="site-container section">
          <h2 className="section-title mb-6">Continue reading</h2>
          <div className="responsive-grid grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {publishedArticles.filter((item) => item.slug !== slug).slice(0, 3).map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="card card-hover p-6 text-inherit no-underline">
                <p className="eyebrow">{item.category}</p><h3 className="m-0 mb-2 text-lg font-extrabold leading-6">{item.title}</h3><p className="m-0 text-sm text-muted-text">{item.time}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
