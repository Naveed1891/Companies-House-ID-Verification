import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth/session";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** One message for every failure mode - never reveal which check failed. */
const GENERIC_ERROR = "Invalid email or password.";

export async function POST(request: Request) {
  try {
    if (!rateLimit(clientKey(request, "login"), 10, 60_000)) {
      return NextResponse.json(
        { error: "Too many attempts. Please wait a minute and try again." },
        { status: 429 },
      );
    }

    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const rememberMe = body.rememberMe === true;
    if (!email || !password) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
    }

    if (!rateLimit(`login:email:${email}`, 10, 60_000)) {
      return NextResponse.json(
        { error: "Too many attempts for this account. Please wait a minute." },
        { status: 429 },
      );
    }

    const user = await prisma.user.findFirst({
      where: { emailNormalized: email, deletedAt: null },
      select: {
        id: true,
        email: true,
        fullName: true,
        whatsapp: true,
        country: true,
        role: true,
        status: true,
        passwordHash: true,
        lockedUntil: true,
      },
    });

    if (user?.lockedUntil && user.lockedUntil > new Date()) {
      return NextResponse.json(
        { error: "Account temporarily locked. Try again later or reset your password." },
        { status: 423 },
      );
    }

    // Compare against a dummy hash when the user is missing so the response time
    // does not reveal whether the email exists.
    const hash = user?.passwordHash ?? "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidin";
    const passwordMatches = await compare(password, hash);

    if (!user || !user.passwordHash || !passwordMatches || user.status !== "ACTIVE") {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
    }

    const isCustomer = user.role === "CUSTOMER";
    await createSession(isCustomer ? "customer" : "staff", user.id, user.role, { rememberMe });
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

    return NextResponse.json({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        whatsapp: user.whatsapp ?? "",
        country: user.country ?? "",
        role: user.role,
      },
    });
  } catch (err) {
    console.error("[login] unhandled error:", err);
    const raw = err instanceof Error ? err.message?.trim() : "";
    const message = raw || "An unexpected error occurred. Please try again.";
    return NextResponse.json({ ok: false, error: { code: "INTERNAL_ERROR", message } }, { status: 500 });
  }
}
