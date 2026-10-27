import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth/session";
import { verifyOtpCode } from "@/lib/auth/password-reset";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const GENERIC_ERROR = "Invalid or expired code.";

export async function POST(request: Request) {
  if (!rateLimit(clientKey(request, "login-otp"), 20, 60_000)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a minute." },
      { status: 429 },
    );
  }

  try {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    const email = String(body?.email ?? "").trim().toLowerCase();
    const code = String(body?.code ?? "").trim();
    const rememberMe = body?.rememberMe === true;

    if (!email || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { emailNormalized: email, deletedAt: null, status: "ACTIVE" },
      select: { id: true, email: true, fullName: true, whatsapp: true, country: true, role: true },
    });
    if (!user) return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });

    const now = new Date();
    const otp = await prisma.loginOtp.findFirst({
      where: { userId: user.id, consumedAt: null, expiresAt: { gt: now } },
      orderBy: { createdAt: "desc" },
    });
    if (!otp) return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });

    // A single code dies after 5 wrong attempts.
    if (otp.attempts >= 5) {
      await prisma.loginOtp.update({ where: { id: otp.id }, data: { consumedAt: now } });
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }

    if (!verifyOtpCode(code, otp.codeHash)) {
      await prisma.loginOtp.update({ where: { id: otp.id }, data: { attempts: otp.attempts + 1 } });
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }

    await prisma.loginOtp.update({ where: { id: otp.id }, data: { consumedAt: now } });

    const isCustomer = user.role === "CUSTOMER";
    await createSession(isCustomer ? "customer" : "staff", user.id, user.role, { rememberMe });
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: now } });

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
    console.error("[verify-login-otp] unhandled error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
