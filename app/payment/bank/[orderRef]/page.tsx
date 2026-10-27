import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { CopyValue } from "@/components/dashboard/CopyValue";
import { PaymentProofUpload } from "@/components/PaymentProofUpload";
import { BANK_TRANSFER_DETAILS } from "@/lib/bank-details";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function formatAmount(amount: number, currency: string): string {
  const symbol = currency === "GBP" ? "£" : `${currency} `;
  return `${symbol}${amount}`;
}

export default async function BankPaymentPage({
  params,
}: {
  params: Promise<{ orderRef: string }>;
}) {
  const { orderRef } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?returnTo=${encodeURIComponent(`/payment/bank/${orderRef}`)}`);

  const order = await prisma.order.findFirst({
    where: { publicReference: orderRef, userId: user.id },
    select: {
      publicReference: true,
      amount: true,
      currency: true,
      paymentStatus: true,
      package: { select: { name: true } },
      application: { select: { status: true } },
      documents: {
        where: { kind: "payment_proof" },
        orderBy: { uploadedAt: "desc" },
        select: { id: true, fileName: true, uploadedAt: true },
      },
    },
  });
  if (!order) notFound();

  const applicationStatus = order.application?.status ?? "NOT_STARTED";
  if (
    applicationStatus === "SUBMITTED" ||
    applicationStatus === "APPROVED" ||
    order.paymentStatus === "PAID"
  ) {
    redirect(`/application/${order.publicReference}`);
  }

  const amount = formatAmount(Number(order.amount), order.currency);
  const underReview = order.paymentStatus === "PENDING";

  return (
    <PageFrame>
      <div className="site-container py-[clamp(2.5rem,6vw,4rem)]">
        <div className="mx-auto max-w-[720px] space-y-6">
          <div>
            <p className="eyebrow">Payment</p>
            <h1 className="display mt-2 text-[clamp(1.75rem,4vw,2.25rem)]">Pay by bank transfer</h1>
            <p className="body-copy mt-2">
              {order.package.name} · Reference {order.publicReference}
            </p>
          </div>

          <section className="card p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="m-0 text-lg font-extrabold">Transfer {amount}</h2>
            </div>
            <p className="mt-2 mb-6 text-sm text-muted-text">
              Make a bank transfer for <strong className="text-charcoal">{amount}</strong> to the account
              below. Please use your order reference as the payment reference so we can match your payment
              quickly.
            </p>

            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-[12.5px] font-bold tracking-[0.06em] text-muted-text uppercase">Bank</dt>
                <dd className="m-0 mt-1 text-[15px] font-semibold text-charcoal">
                  {BANK_TRANSFER_DETAILS.bankName}
                </dd>
              </div>
              <div>
                <dt className="text-[12.5px] font-bold tracking-[0.06em] text-muted-text uppercase">
                  Account name
                </dt>
                <dd className="m-0 mt-1 text-[15px] font-semibold text-charcoal">
                  {BANK_TRANSFER_DETAILS.accountName}
                </dd>
              </div>
            </dl>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[12.5px] font-bold tracking-[0.06em] text-muted-text uppercase">
                  Account number
                </p>
                <CopyValue value={BANK_TRANSFER_DETAILS.accountNumber} />
              </div>
              <div>
                <p className="mb-2 text-[12.5px] font-bold tracking-[0.06em] text-muted-text uppercase">
                  Sort code
                </p>
                <CopyValue value={BANK_TRANSFER_DETAILS.sortCode} />
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[12.5px] font-bold tracking-[0.06em] text-muted-text uppercase">
                Payment reference
              </p>
              <CopyValue value={order.publicReference} />
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="m-0 text-lg font-extrabold">Upload your payment proof</h2>
            <p className="mt-2 mb-0 text-sm text-muted-text">
              Once you have made the transfer, upload a screenshot or PDF of the payment confirmation. Your
              application will then be submitted and you will get a QR code to scan for identity verification.
            </p>

            {underReview ? (
              <div className="mt-4 rounded-xl border border-soft-border bg-warm-cream p-5">
                <p className="m-0 font-bold text-charcoal">Thanks - we have received your payment proof.</p>
                <p className="mt-1 mb-0 text-sm text-muted-text">
                  If you need to, you can upload an updated file below.
                </p>
              </div>
            ) : null}

            {order.documents.length > 0 ? (
              <ul className="mt-4 mb-0 list-none space-y-1 p-0 text-[13.5px] text-muted-text">
                {order.documents.map((doc) => (
                  <li key={doc.id}>
                    <span className="text-emerald">✓</span> {doc.fileName}
                  </li>
                ))}
              </ul>
            ) : null}

            <PaymentProofUpload orderReference={order.publicReference} />
          </section>

          <div>
            <Link href="/dashboard/orders" className="text-[13.5px] font-bold text-emerald no-underline">
              ← Go to my requests
            </Link>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
