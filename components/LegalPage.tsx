import { PageFrame, PageHero } from "@/components/PageFrame";

/** Shared shell for policy/legal pages: hero + a constrained reading column. */
export function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <PageFrame>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="bg-off-white">
        <div className="reading-container section">
          <p className="mb-8 text-[13.5px] font-semibold text-muted-text">Last updated: {updated}</p>
          <div className="rich">{children}</div>
        </div>
      </section>
    </PageFrame>
  );
}
