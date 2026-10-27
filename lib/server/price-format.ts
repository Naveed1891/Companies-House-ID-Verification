import type { CheckoutPackage } from "@/lib/checkout-package";

function symbolFor(currency: string): string {
  if (currency === "GBP") return "£";
  if (currency === "USD") return "$";
  if (currency === "EUR") return "€";
  return `${currency} `;
}

export function formatPrice(pkg: Pick<CheckoutPackage, "price" | "currency">): string {
  return `${symbolFor(pkg.currency)}${pkg.price}`;
}

export function formatRegularPrice(
  pkg: Pick<CheckoutPackage, "price" | "regularPrice" | "currency">,
): string | null {
  if (typeof pkg.regularPrice !== "number" || pkg.regularPrice <= pkg.price) return null;
  return `${symbolFor(pkg.currency)}${pkg.regularPrice}`;
}
