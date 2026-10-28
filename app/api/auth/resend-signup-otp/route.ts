import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateOtpCode, hashOtpCode, OTP_TTL_MS } from "@/lib/auth/password-reset";
import { renderEmail } from "@/lib/server/email-templates";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { sendMail } from "@/lib/server/mailer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!rateLimit(clientKey(request, "signup-resend"), 3, 60_000)) return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  try {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    const email = String(body?.email ?? "").trim().toLowerCase();
    const user = await prisma.user.findFirst({ where: { emailNormalized: email, status: "INVITED", deletedAt: null }, select: { id: true, email: true, fullName: true } });
    if (!user) return NextResponse.json({ ok: true });
    const code = generateOtpCode();
    await prisma.$transaction([
      prisma.passwordResetOtp.updateMany({ where: { userId: user.id, consumedAt: null }, data: { consumedAt: new Date() } }),
      prisma.passwordResetOtp.create({ data: { userId: user.id, codeHash: hashOtpCode(code), expiresAt: new Date(Date.now() + OTP_TTL_MS) } }),
    ]);
    const verifyEmail = renderEmail({
      preview: "Verify your Companies House ID Verification email address",
      heading: "Verify your email address",
      intro: `Hi ${user.fullName || "there"}, use this code to confirm your email address.`,
      code,
      note: "This code expires in 10 minutes.",
    });
    const sent = await sendMail({
      to: user.email,
      subject: "Verify your Companies House ID Verification email address",
      text: verifyEmail.text,
      html: verifyEmail.html,
    });
    return sent ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false, error: { code: "EMAIL_SEND_FAILED", message: "Could not send a new code. Please try again." } }, { status: 500 });
  } catch (err) {
    console.error("[resend-signup-otp] unhandled error:", err);
    const raw = err instanceof Error ? err.message?.trim() : "";
    const message = raw || "An unexpected error occurred. Please try again.";
    return NextResponse.json({ ok: false, error: { code: "INTERNAL_ERROR", message } }, { status: 500 });
  }
}
