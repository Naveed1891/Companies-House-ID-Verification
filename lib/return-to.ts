export const DEFAULT_RETURN_TO = "/";

export function safeReturnTo(
  value: string | null | undefined,
  fallback: string = DEFAULT_RETURN_TO,
): string {
  if (typeof value !== "string") return fallback;
  const candidate = value.trim();
  if (!candidate.startsWith("/")) return fallback;
  if (candidate.startsWith("//") || candidate.startsWith("/\\")) return fallback;
  if (candidate.includes("\\")) return fallback;
  if (/[\x00-\x1f\x7f]/.test(candidate)) return fallback;
  if (
    candidate === "/login" ||
    candidate === "/signup" ||
    candidate.startsWith("/login?") ||
    candidate.startsWith("/signup?")
  ) {
    return fallback;
  }
  if (candidate.startsWith("/checkout") || candidate.startsWith("/application/")) {
    return candidate;
  }
  return candidate;
}

export function websiteLoginHref(pathname: string, search = ""): string {
  if (pathname === "/login" || pathname === "/signup") return "/login";
  const returnTo = safeReturnTo(`${pathname}${search}`);
  if (returnTo === DEFAULT_RETURN_TO) return "/login";
  return `/login?returnTo=${encodeURIComponent(returnTo)}`;
}
