import Link from "next/link";
import { PageFrame } from "@/components/PageFrame";
import { checkoutReturnTo, DEFAULT_PACKAGE_SLUG } from "@/lib/checkout-redirect";

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const params = await searchParams;
  const packageSlug = params.package?.trim() || DEFAULT_PACKAGE_SLUG;

  return (
    <PageFrame>
      <div className="site-container flex min-h-[60vh] items-center justify-center py-16">
        <div className="w-full max-w-[560px] rounded-2xl border border-soft-border bg-white p-8 text-center">
          <h1 className="text-2xl font-extrabold">Payment was not completed</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-text">
            Payment was not completed. You can restart checkout when ready. No order was created in your dashboard.
          </p>
          <Link href={checkoutReturnTo(packageSlug)} className="button button-primary mt-6 inline-flex">
            Back to checkout
          </Link>
        </div>
      </div>
    </PageFrame>
  );
}
