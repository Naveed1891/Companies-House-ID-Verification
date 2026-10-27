export function checkoutReturnTo(packageSlug: string) {
  return `/checkout?package=${encodeURIComponent(packageSlug)}`;
}

export function loginRedirectForPackage(packageSlug: string) {
  return `/login?returnTo=${encodeURIComponent(checkoutReturnTo(packageSlug))}`;
}

export function signupRedirectForPackage(packageSlug: string) {
  return `/signup?returnTo=${encodeURIComponent(checkoutReturnTo(packageSlug))}`;
}

export const DEFAULT_PACKAGE_SLUG = "companies-house-id-verification";
