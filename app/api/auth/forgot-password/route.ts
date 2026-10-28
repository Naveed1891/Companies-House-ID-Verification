import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { renderEmail } from "@/lib/server/email-templates";
import { sendMail } from "@/lib/server/mailer";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import {
  LOCKOUT_MS,
  MAX_OTP_SENDS_PER_DAY,
  OTP_TTL_MS,
  generateOtpCode,
  hashOtpCode,
} from "@/lib/auth/password-reset";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Uniform response text - never reveal whether an account exists. */
const GENERIC_OK = { ok: true, message: "If that email is registered, a code has been sent." };

export async function POST(request: Request) {
  if (!rateLimit(clientKey(request, "forgot"), 10, 60_000)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  try {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const email = String(body?.email ?? "").trim().toLowerCase();
  if (!email) return NextResponse.json(GENERIC_OK);

  const user = await prisma.user.findFirst({
    where: { emailNormalized: email, deletedAt: null },
    select: { id: true, email: true, fullName: true, lockedUntil: true, status: true },
  });

  // Silent no-op for unknown emails - prevents user enumeration.
  if (!user || user.status !== "ACTIVE") return NextResponse.json(GENERIC_OK);

  const now = new Date();
  if (user.lockedUntil && user.lockedUntil > now) {
    // Also silent for locked accounts - do not confirm the lockout state to
    // the outside world; only real owners see the block on login.
    return NextResponse.json(GENERIC_OK);
  }

  // Count OTP requests in the trailing 24h to enforce the send limit.
  const windowStart = new Date(now.getTime() - LOCKOUT_MS);
  const recentSends = await prisma.passwordResetOtp.count({
    where: { userId: user.id, createdAt: { gte: windowStart } },
  });

  if (recentSends >= MAX_OTP_SENDS_PER_DAY) {
    await prisma.user.update({
      where: { id: user.id },
      data: { lockedUntil: new Date(now.getTime() + LOCKOUT_MS) },
    });
    return NextResponse.json(GENERIC_OK);
  }

  const code = generateOtpCode();
  const expiresAt = new Date(now.getTime() + OTP_TTL_MS);

  await prisma.passwordResetOtp.create({
    data: {
      userId: user.id,
      codeHash: hashOtpCode(code),
      expiresAt,
    },
  });

  const resetEmail = renderEmail({
    preview: "Your Companies House ID Verification password reset code",
    heading: "Reset your password",
    intro: `Hi ${user.fullName || "there"}, use this code to reset your Companies House ID Verification password.`,
    code,
    note: "This code expires in 10 minutes. If you did not request this, you can safely ignore this email - your password stays the same.",
  });
  const delivered = await sendMail({
    to: user.email,
    subject: "Your Companies House ID Verification password reset code",
    text: resetEmail.text,
    html: resetEmail.html,
  });

  if (!delivered) {
    console.warn(
      "[forgot-password] SMTP not configured or send failed - OTP created but email not delivered for user",
      user.id,
    );
  }

  return NextResponse.json(GENERIC_OK);
  } catch (err) {
    console.error("[forgot-password] unhandled error:", err);
    const raw = err instanceof Error ? err.message?.trim() : "";
    const message = raw || "An unexpected error occurred. Please try again.";
    return NextResponse.json({ ok: false, error: { code: "INTERNAL_ERROR", message } }, { status: 500 });
  }
}
