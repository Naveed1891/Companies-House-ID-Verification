import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getSessionSecret } from "@/lib/env";

export const CUSTOMER_COOKIE = "chidv_session";
export const STAFF_COOKIE = "chidv_staff_session";

const CUSTOMER_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const STAFF_TTL_MS = 8 * 60 * 60 * 1000;

export type SessionKind = "customer" | "staff";

export type SessionPayload = {
  userId: string;
  role: Role;
  kind: SessionKind;
  exp: number;
};

export type PublicUser = {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  role: Role;
};

function sign(payloadB64: string): string {
  return createHmac("sha256", getSessionSecret()).update(payloadB64).digest("base64url");
}

function encode(payload: SessionPayload): string {
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${payloadB64}.${sign(payloadB64)}`;
}

/** Returns null for any malformed, tampered, or expired token. */
function decode(token: string): SessionPayload | null {
  const separator = token.lastIndexOf(".");
  if (separator <= 0) return null;

  const payloadB64 = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const expected = sign(payloadB64);

  const given = Buffer.from(signature);
  const want = Buffer.from(expected);
  if (given.length !== want.length || !timingSafeEqual(given, want)) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.userId || !payload.role || !payload.kind) return null;
    if (!payload.exp || payload.exp <= Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function cookieName(kind: SessionKind): string {
  return kind === "staff" ? STAFF_COOKIE : CUSTOMER_COOKIE;
}

export async function createSession(
  kind: SessionKind,
  userId: string,
  role: Role,
  options: { rememberMe?: boolean } = {},
): Promise<void> {
  const ttl = kind === "staff" ? STAFF_TTL_MS : CUSTOMER_TTL_MS;
  const expiresAt = new Date(Date.now() + ttl);
  const token = encode({ userId, role, kind, exp: expiresAt.getTime() });

  // Customer session with rememberMe=false becomes a session cookie -
  // no `expires` / `maxAge`, so the browser deletes it on close. Staff
  // sessions always persist for their fixed TTL (security policy).
  const persist = kind === "staff" || options.rememberMe !== false;
  const store = await cookies();
  store.set(cookieName(kind), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(persist ? { expires: expiresAt } : {}),
  });
}

export async function clearSession(kind?: SessionKind): Promise<void> {
  const store = await cookies();
  const targets: SessionKind[] = kind ? [kind] : ["customer", "staff"];
  for (const target of targets) {
    try {
      store.delete(cookieName(target));
    } catch {
      // Cookies are read-only during a server component render.
    }
  }
}

export async function readSession(kind: SessionKind): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(cookieName(kind))?.value;
  if (!token) return null;
  return decode(token);
}

function toPublicUser(user: {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string | null;
  country: string | null;
  role: Role;
}): PublicUser {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    whatsapp: user.whatsapp ?? "",
    country: user.country ?? "",
    role: user.role,
  };
}

/**
 * Resolves the signed-in user for a session kind.
 *
 * The account is re-checked against the database on every call, so a suspended
 * or deleted user loses access immediately rather than at cookie expiry.
 */
export async function getSessionUser(kind: SessionKind): Promise<PublicUser | null> {
  const payload = await readSession(kind);
  if (!payload) return null;

  const user = await prisma.user.findFirst({
    where: { id: payload.userId, status: "ACTIVE", deletedAt: null },
    select: {
      id: true,
      fullName: true,
      email: true,
      whatsapp: true,
      country: true,
      role: true,
    },
  });
  if (!user) return null;

  // A cookie must not outlive a role change in either direction.
  const isCustomer = user.role === "CUSTOMER";
  if (kind === "customer" && !isCustomer) return null;
  if (kind === "staff" && isCustomer) return null;

  return toPublicUser(user);
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  return getSessionUser("customer");
}

export async function getCurrentStaff(): Promise<PublicUser | null> {
  return getSessionUser("staff");
}

/** Whichever session is present - staff takes precedence. */
export async function getAnySessionUser(): Promise<PublicUser | null> {
  return (await getCurrentStaff()) ?? (await getCurrentUser());
}
