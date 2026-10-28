import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateOtpCode, hashOtpCode, OTP_TTL_MS } from "@/lib/auth/password-reset";
import { renderEmail } from "@/lib/server/email-templates";
import { sendMail } from "@/lib/server/mailer";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RATE_LIMIT_ERROR = "Too many requests. Please wait a minute before requesting another code.";

export async function POST(request: Request) {
  if (!rateLimit(clientKey(request, "login-otp-resend"), 3, 60_000)) {
    return NextResponse.json({ error: RATE_LIMIT_ERROR }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const email = String(body?.email ?? "").trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

  if (!rateLimit(`login-otp-resend:email:${email}`, 3, 60_000)) {
    return NextResponse.json({ error: RATE_LIMIT_ERROR }, { status: 429 });
  }

  const user = await prisma.user.findFirst({
    where: { emailNormalized: email, deletedAt: null, status: "ACTIVE" },
    select: { id: true, email: true, fullName: true },
  });

  // Only continue a login challenge created after a successful password check.
  // Return the same response when it is missing so this endpoint cannot be used
  // to discover registered email addresses.
  const previousOtp = user
    ? await prisma.loginOtp.findFirst({
        where: {
          userId: user.id,
          consumedAt: null,
          createdAt: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
        orderBy: { createdAt: "desc" },
        select: { id: true },
      })
    : null;
  if (!user || !previousOtp) return NextResponse.json({ ok: true });

  const code = generateOtpCode();
  const newOtp = await prisma.loginOtp.create({
    data: {
      userId: user.id,
      codeHash: hashOtpCode(code),
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
    },
    select: { id: true },
  });

  const otpMail = renderEmail({
    preview: "Your new Companies House ID Verification sign-in code",
    heading: "Your new sign-in code",
    intro: `Hi ${user.fullName || "there"}, enter this code to finish signing in to Companies House ID Verification.`,
    code,
    note: "This code expires in 10 minutes. Only the newest code will work.",
  });
  const delivered = await sendMail(
    {
      to: user.email,
      subject: "Your new Companies House ID Verification sign-in code",
      text: otpMail.text,
      html: otpMail.html,
    },
    "auth",
  );

  if (!delivered) {
    await prisma.loginOtp.update({ where: { id: newOtp.id }, data: { consumedAt: new Date() } });
    return NextResponse.json(
      { ok: false, error: { code: "EMAIL_SEND_FAILED", message: "We couldn't send a new sign-in code right now. Please try again shortly." } },
      { status: 500 },
    );
  }

  await prisma.loginOtp.updateMany({
    where: { userId: user.id, consumedAt: null, id: { not: newOtp.id } },
    data: { consumedAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
