import Link from "next/link";
import { FloatingActions } from "./FloatingActions";
import { ScrollProgress } from "./ScrollProgress";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell">
      <ScrollProgress />
      <SiteHeader />
      <main className="page-main">{children}</main>
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-soft-border bg-emerald text-white">
      <div className="site-container py-[clamp(2.5rem,5vw,4rem)]">
        <div className="max-w-[640px]">
          <p className="m-0 mb-3 text-[13px] font-bold tracking-[0.1em] text-white/60 uppercase">{eyebrow}</p>
          <h1 className="display mb-4 text-white">{title}</h1>
          <p className="m-0 text-[clamp(1rem,0.3vw+0.9rem,1.1rem)] leading-[1.7] text-white/85">{description}</p>
        </div>
      </div>
    </section>
  );
}

export function FinalCta({
  title,
  description,
  primaryLabel = "Start Verification",
  primaryHref = "/checkout?package=companies-house-id-verification",
  secondaryLabel,
  secondaryHref = "/requirements",
  dark = false,
}: {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  dark?: boolean;
}) {
  return (
    <section className={dark ? "bg-charcoal text-white" : "bg-emerald text-white"}>
      <div className="site-container py-[clamp(3rem,6vw,5rem)] text-center">
        <div className="mx-auto max-w-[600px]">
          <h2 className="section-title mb-4 text-white">{title}</h2>
          <p className="m-0 mb-7 text-[16px] leading-[1.7] text-white/85">{description}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={primaryHref} className="button inline-flex items-center gap-2 border-0 bg-white text-charcoal shadow-[0_2px_0_#cecece] hover:bg-off-white">
              {primaryLabel}
            </Link>
            {secondaryLabel && (
              <Link href={secondaryHref} className="button border-white/40 bg-transparent text-white shadow-[0_2px_0_rgba(255,255,255,0.2)] hover:border-white hover:bg-white/10">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
