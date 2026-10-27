import Link from "next/link";
import { PageFrame } from "@/components/PageFrame";

export function ApplicationSubmitted({
  orderRef,
  verification,
  approved = false,
}: {
  orderRef: string;
  verification: { url: string; qr: string } | null;
  approved?: boolean;
}) {
  return (
    <PageFrame>
      <div className="site-container flex min-h-[60vh] flex-col items-center justify-center py-16">
        <div className="w-full max-w-[560px] rounded-2xl border border-soft-border bg-white p-[clamp(24px,4vw,40px)] text-center shadow-elevated">
          <h1 className="text-2xl font-extrabold text-emerald">Your application has been submitted</h1>
          {approved ? (
            <p className="mt-3 text-sm text-muted-text">
              Your identity has already been verified. You can follow progress from your dashboard.
            </p>
          ) : verification ? (
            <>
              <p className="mt-3 text-sm text-muted-text">
                Please scan the QR code with your phone to complete identity verification. You can also
                open the secure verification link below.
              </p>
              <div className="mt-6 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={verification.qr}
                  alt="QR code for identity verification"
                  width={220}
                  height={220}
                  className="rounded-xl border border-soft-border p-2"
                />
              </div>
              <a
                href={verification.url}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary mt-6 inline-flex"
              >
                Open verification
              </a>
              <p className="mt-4 mb-0 text-[12.5px] break-all text-muted-text">
                Or copy this link: {verification.url}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-text">
              Your Companies House identity verification application has been submitted. Our team will
              send the next step for verifying your identity shortly.
            </p>
          )}
          <p className="mt-4 mb-0 text-[13px] text-muted-text">
            You can return to this any time from{" "}
            <Link href={`/dashboard/orders/${orderRef}`} className="font-bold text-emerald">
              your dashboard
            </Link>
            .
          </p>
        </div>
      </div>
    </PageFrame>
  );
}
