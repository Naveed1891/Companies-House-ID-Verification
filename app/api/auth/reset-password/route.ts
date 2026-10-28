import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { hashResetToken } from "@/lib/auth/password-reset";
import { passwordMeetsPolicy, passwordPolicyError } from "@/lib/password-policy";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!rateLimit(clientKey(request, "reset"), 10, 60_000)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait a minute." },
      { status: 429 },
    );
  }

  try {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const token = String(body?.token ?? "").trim();
  const password = String(body?.password ?? "");

  if (!token || !password) {
    return NextResponse.json({ ok: false, error: "Missing token or password." }, { status: 400 });
  }
  if (!passwordMeetsPolicy(password)) {
    return NextResponse.json(
      { ok: false, error: passwordPolicyError(password) ?? "Password does not meet requirements." },
      { status: 400 },
    );
  }

  const now = new Date();
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashResetToken(token) },
    select: { id: true, userId: true, expiresAt: true, usedAt: true },
  });

  if (!record || record.usedAt || record.expiresAt <= now) {
    return NextResponse.json(
      { ok: false, error: "Reset link expired or already used. Please request a new code." },
      { status: 400 },
    );
  }

  const passwordHash = await hash(password, 12);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { passwordHash, lockedUntil: null },
    }),
    prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: now },
    }),
    // Invalidate every outstanding OTP for this user so an old code can't
    // spin up a second concurrent reset session.
    prisma.passwordResetOtp.updateMany({
      where: { userId: record.userId, consumedAt: null },
      data: { consumedAt: now },
    }),
  ]);

  return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reset-password] unhandled error:", err);
    const raw = err instanceof Error ? err.message?.trim() : "";
    const message = raw || "An unexpected error occurred. Please try again.";
    return NextResponse.json({ ok: false, error: { code: "INTERNAL_ERROR", message } }, { status: 500 });
  }
}
