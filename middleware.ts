import { NextResponse, type NextRequest } from "next/server";

const CUSTOMER_COOKIE = "chidv_session";
const STAFF_COOKIE = "chidv_staff_session";

/**
 * First-pass gate only. The cookie's signature is NOT verified here — Edge
 * middleware cannot use node:crypto. Every route handler and server component
 * re-checks the session properly via getSessionUser(), which is the real
 * authorisation boundary. This exists to redirect anonymous visitors cheaply.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const hasCustomer = Boolean(request.cookies.get(CUSTOMER_COOKIE)?.value);
  const hasStaff = Boolean(request.cookies.get(STAFF_COOKIE)?.value);

  const isAdminArea = pathname === "/dashboard/admin" || pathname.startsWith("/dashboard/admin/");

  if (isAdminArea) {
    if (!hasStaff && !hasCustomer) return redirectToLogin(request, pathname, search);
    return pageResponse();
  }

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    if (!hasCustomer && !hasStaff) return redirectToLogin(request, pathname, search);
    return pageResponse();
  }

  return pageResponse();
}

function pageResponse() {
  const response = NextResponse.next();
  // Hostinger must revalidate documents/RSC payloads on every navigation.
  // Hashed files under /_next/static are excluded by the matcher and retain
  // their normal immutable caching.
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Pragma", "no-cache");
  response.headers.set(
    "Vary",
    "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Accept-Encoding",
  );
  return response;
}

function redirectToLogin(request: NextRequest, pathname: string, search: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = `?returnTo=${encodeURIComponent(`${pathname}${search}`)}`;
  const response = NextResponse.redirect(url);
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  response.headers.set("CDN-Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
