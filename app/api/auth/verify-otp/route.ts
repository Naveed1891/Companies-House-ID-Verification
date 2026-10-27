import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import {
  RESET_TOKEN_TTL_MS,
  generateResetToken,
  hashResetToken,
  verifyOtpCode,
} from "@/lib/auth/password-reset";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const GENERIC_ERROR = "Invalid or expired code.";

export async function POST(request: Request) {
  if (!rateLimit(clientKey(request, "otp"), 20, 60_000)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait a minute." },
      { status: 429 },
    );
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const email = String(body?.email ?? "").trim().toLowerCase();
  const code = String(body?.code ?? "").trim();

  if (!email || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: { emailNormalized: email, deletedAt: null, status: "ACTIVE" },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 400 });

  const now = new Date();
  const otp = await prisma.passwordResetOtp.findFirst({
    where: {
      userId: user.id,
      consumedAt: null,
      expiresAt: { gt: now },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otp) {
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 400 });
  }

  // Cap wrong-code attempts on a single OTP - after 5, it is dead.
  if (otp.attempts >= 5) {
    await prisma.passwordResetOtp.update({
      where: { id: otp.id },
      data: { consumedAt: now },
    });
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 400 });
  }

  if (!verifyOtpCode(code, otp.codeHash)) {
    await prisma.passwordResetOtp.update({
      where: { id: otp.id },
      data: { attempts: otp.attempts + 1 },
    });
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 400 });
  }

  // OTP good - burn it and issue a short-lived reset-token bearer.
  const token = generateResetToken();
  await prisma.$transaction([
    prisma.passwordResetOtp.update({
      where: { id: otp.id },
      data: { consumedAt: now },
    }),
    prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: hashResetToken(token),
        expiresAt: new Date(now.getTime() + RESET_TOKEN_TTL_MS),
      },
    }),
  ]);

  return NextResponse.json({ ok: true, resetToken: token });
}
