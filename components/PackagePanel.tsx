import Link from "next/link";
import { checkoutReturnTo } from "@/lib/checkout-redirect";
import type { CheckoutPackage } from "@/lib/checkout-package";
import { getActivePackages } from "@/lib/server/catalog";

/** Loading skeleton shown while live package data is fetched. */
export function PackagePanelSkeleton() {
  return (
    <div
      className="border-2 border-emerald bg-charcoal p-[clamp(28px,4vw,38px)] text-white"
      aria-busy="true"
      aria-label="Loading package details"
    >
      <div className="h-3 w-2/3 bg-white/15" />
      <div className="mt-6 h-12 w-1/3 bg-white/15" />
      <div className="mt-6 flex flex-col gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3 w-full bg-white/10" />
        ))}
      </div>
      <div className="mt-7 h-[50px] w-full bg-white/15" />
    </div>
  );
}

function formatPrice(pkg: CheckoutPackage): string {
  const symbol = pkg.currency === "GBP" ? "£" : `${pkg.currency} `;
  return `${symbol}${pkg.price}`;
}

function PackageCard({ pkg, footnote }: { pkg: CheckoutPackage; footnote?: string }) {
  const checkoutHref = checkoutReturnTo(pkg.slug);
  const symbol = pkg.currency === "GBP" ? "£" : `${pkg.currency} `;

  return (
    <div className="border-2 border-emerald bg-charcoal p-[clamp(28px,4vw,38px)] text-white">
      <p className="m-0 text-[12.5px] font-bold tracking-[0.12em] text-white/50 uppercase">
        {pkg.name}
      </p>
      <p className="mt-4 mb-0 flex flex-wrap items-baseline gap-2">
        <span className="text-[clamp(48px,7vw,64px)] leading-none font-extrabold">
          {formatPrice(pkg)}
        </span>
        {pkg.regularPrice ? (
          <span className="text-sm text-muted-text">
            was{" "}
            <span className="line-through">
              {symbol}
              {pkg.regularPrice}
            </span>
          </span>
        ) : null}
        <span className="text-sm text-muted-text">per person</span>
      </p>
      {pkg.description && (
        <p className="mt-4 mb-6 text-[14.5px] leading-[1.7] text-off-white">{pkg.description}</p>
      )}
      <div className="mb-7 flex flex-col gap-2.5">
        {pkg.features.map((item) => (
          <p key={item} className="m-0 text-[14.5px]">
            <span className="mr-2 text-emerald">✓</span>
            {item}
          </p>
        ))}
      </div>
      <Link href={checkoutHref} className="button button-primary w-full">
        Start for {formatPrice(pkg)}
      </Link>
      <p className="mt-4 mb-0 text-center text-xs text-muted-text">No hidden fees. No upsells.</p>
      {footnote && <p className="mt-2 mb-0 text-center text-xs text-muted-text">{footnote}</p>}
    </div>
  );
}

/** Live Companies House ID Verification package card(s), read directly from the database. */
export async function PackagePanel({ footnote }: { footnote?: string }) {
  const packages = await getActivePackages();

  if (packages.length === 0) {
    return (
      <div className="border-2 border-emerald bg-charcoal p-[clamp(28px,4vw,38px)] text-white">
        <p className="m-0 text-[14.5px] text-off-white">
          Pricing is being updated. Please contact us and we will confirm the current fee.
        </p>
        <Link href="/contact" className="button button-primary mt-6 w-full">
          Contact us
        </Link>
      </div>
    );
  }

  if (packages.length === 1) {
    return <PackageCard pkg={packages[0]} footnote={footnote} />;
  }

  return (
    <div className="grid gap-6">
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
      {footnote ? <p className="m-0 text-center text-xs text-muted-text">{footnote}</p> : null}
    </div>
  );
}
