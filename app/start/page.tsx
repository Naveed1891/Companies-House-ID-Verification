import { redirect } from "next/navigation";
import { checkoutReturnTo, DEFAULT_PACKAGE_SLUG } from "@/lib/checkout-redirect";

export default function StartPage() {
  redirect(checkoutReturnTo(DEFAULT_PACKAGE_SLUG));
}
