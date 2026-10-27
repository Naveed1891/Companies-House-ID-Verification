import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "Request received",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function RequestReceivedPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawRef = Array.isArray(params.ref) ? params.ref[0] : params.ref;
  // Only display a plausibly-safe public reference; never echo arbitrary input.
  const reference =
    rawRef && /^[A-Za-z0-9-]{4,40}$/.test(rawRef) ? rawRef : undefined;

  return (
    <PageFrame>
      <section className="bg-warm-cream">
        <div className="reading-container py-[clamp(3.5rem,7vw,7rem)]">
          <div className="rounded-2xl border border-soft-border bg-white p-[clamp(28px,5vw,48px)] shadow-panel">
            <span
              className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald text-2xl text-white"
              aria-hidden="true"
            >
              ✓
            </span>
            <h1 className="m-0 mb-3 font-serif text-[clamp(28px,4vw,40px)] font-medium leading-tight">
              Your request has been received
            </h1>
            <p className="m-0 mb-7 text-[clamp(1rem,1vw,1.125rem)] leading-[1.7] text-slate">
              Your identity verification request has been received. Our team
              will review your details and contact you shortly with the next
              steps.
            </p>

            {reference && (
              <div className="mb-7 rounded-xl border border-soft-border bg-off-white p-5">
                <p className="m-0 text-[12px] font-bold tracking-[0.12em] text-muted-text uppercase">
                  Your reference
                </p>
                <p className="mt-1 mb-0 font-serif text-2xl text-charcoal">{reference}</p>
                <p className="mt-2 mb-0 text-[13px] leading-6 text-muted-text">
                  Please quote this reference in any correspondence with our team.
                </p>
              </div>
            )}

            <div className="mb-7 flex flex-col gap-3">
              <StatusRow label="Request status" value="Request received" />
              <StatusRow label="Payment" value="Payment pending" />
              <StatusRow label="Next step" value="Our team will contact you" />
            </div>

            <div className="rounded-xl border border-soft-border bg-warm-cream p-5">
              <p className="eyebrow">What happens next</p>
              <p className="m-0 text-[14.5px] leading-7 text-muted-text">
                A member of our compliance team will review your request, confirm
                the right verification route for your role, and email you with
                payment and document instructions. No payment has been taken and
                nothing is charged until you are ready to proceed.
              </p>
            </div>

            <div className="button-row mt-8 flex flex-wrap gap-3.5">
              <Link href="/" className="button button-light">
                Back to home
              </Link>
              <Link href="/contact" className="button button-dark">
                Contact our team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-soft-border pb-3 last:border-b-0 last:pb-0">
      <span className="text-[13.5px] font-bold text-muted-text">{label}</span>
      <span className="rounded-full bg-warm-cream px-3 py-1 text-[13px] font-bold text-charcoal">
        {value}
      </span>
    </div>
  );
}
