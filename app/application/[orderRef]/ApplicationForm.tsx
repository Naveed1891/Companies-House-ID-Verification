"use client";

import { useRouter } from "next/navigation";
import { PageFrame, PageHero } from "@/components/PageFrame";
import { StartRequestForm } from "@/components/StartRequestForm";

export function ApplicationForm({
  orderRef,
  packageSlug,
  initialAnswers,
}: {
  orderRef: string;
  packageSlug: string;
  initialAnswers: Record<string, unknown>;
}) {
  const router = useRouter();

  return (
    <PageFrame>
      <PageHero
        eyebrow="Verification application"
        title="Complete your identity verification"
        description={`Order reference: ${orderRef}`}
      />
      <section className="bg-off-white">
        <div className="site-container section">
          <div className="card mx-auto max-w-[920px] p-[clamp(26px,4vw,40px)]">
            <StartRequestForm
              mode="application"
              orderRef={orderRef}
              packageId={packageSlug}
              initialValues={initialAnswers}
              onSubmitted={() => router.refresh()}
            />
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
