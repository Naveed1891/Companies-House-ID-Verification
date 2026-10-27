import Image from "next/image";
import Link from "next/link";
import type { Article } from "./data";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden border border-soft-border bg-white text-inherit no-underline transition-colors hover:border-emerald"
    >
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={article.image}
          alt={article.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="m-0 mb-2 text-xs font-bold tracking-[0.1em] text-emerald uppercase">
          {article.category}
        </p>
        <p className="m-0 mb-2 text-[16px] font-extrabold leading-[1.35]">
          {article.title}
        </p>
        <p className="m-0 text-sm leading-[1.65] text-muted-text">
          {article.description}
        </p>
      </div>
    </Link>
  );
}
