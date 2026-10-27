import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { WorldpayLaunch } from "@/components/WorldpayLaunch";
import { WorldpayReturn } from "@/components/WorldpayReturn";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { resolvePaymentMethods, resolveWorldpay } from "@/lib/server/settings";

export const dynamic = "force-dynamic";

function formatAmount(amount: number, currency: string): string {
  return `${currency === "GBP" ? "£" : `${currency} `}${amount}`;
}

export default async function CardPaymentPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderRef: string }>;
  searchParams: Promise<{ wp?: string }>;
}) {
  const { orderRef } = await params;
  const { wp } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?returnTo=${encodeURIComponent(`/payment/card/${orderRef}`)}`);

  const order = await prisma.order.findFirst({
    where: { publicReference: orderRef, userId: user.id },
    select: {
      publicReference: true,
      amount: true,
      currency: true,
      paymentStatus: true,
      package: { select: { name: true } },
    },
  });
  if (!order) notFound();

  const [methods, worldpay] = await Promise.all([resolvePaymentMethods(), resolveWorldpay()]);
  const amount = formatAmount(Number(order.amount), order.currency);
  const paid = order.paymentStatus === "PAID";
  const available = methods.worldpay && worldpay.configured;
  const returning = Boolean(wp);

  return (
    <PageFrame>
      <div className="site-container py-[clamp(2.5rem,6vw,4rem)]">
        <div className="mx-auto max-w-[560px] space-y-6">
          <div>
            <p className="eyebrow">Payment</p>
            <h1 className="display mt-2 text-[clamp(1.75rem,4vw,2.25rem)]">Pay by card</h1>
            <p className="body-copy mt-2">
              {order.package.name} · Reference {order.publicReference}
            </p>
          </div>

          {paid ? (
            <section className="card p-6 sm:p-8">
              <h2 className="m-0 text-lg font-extrabold text-emerald">Payment received</h2>
              <p className="mt-2 text-sm text-muted-text">
                Your payment is confirmed. You can now complete your verification application.
              </p>
              <Link href={`/application/${order.publicReference}`} className="button button-primary mt-5 inline-flex">
                Continue to application
              </Link>
            </section>
          ) : returning ? (
            <WorldpayReturn orderReference={order.publicReference} amountLabel={amount} wp={wp ?? ""} />
          ) : available ? (
            <section className="card p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="m-0 text-lg font-extrabold">Card payment</h2>
                <span className="text-sm font-bold text-charcoal">{amount}</span>
              </div>
              <WorldpayLaunch orderReference={order.publicReference} amountLabel={amount} />
            </section>
          ) : (
            <section className="card p-6 sm:p-8">
              <h2 className="m-0 text-lg font-extrabold">Card payment unavailable</h2>
              <p className="mt-2 text-sm text-muted-text">
                Card payment is not available right now. Please choose another payment method.
              </p>
              <Link href="/pricing" className="button button-primary mt-5 inline-flex">
                Back to pricing
              </Link>
            </section>
          )}

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
