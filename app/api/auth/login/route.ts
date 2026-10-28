import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth/session";
import { OTP_TTL_MS, generateOtpCode, hashOtpCode } from "@/lib/auth/password-reset";
import { renderEmail } from "@/lib/server/email-templates";
import { sendMail } from "@/lib/server/mailer";
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
  const isSuperAdmin = user.role === "SUPER_ADMIN";

  async function completeLogin() {
    await createSession(isCustomer ? "customer" : "staff", user!.id, user!.role, { rememberMe });
    await prisma.user.update({ where: { id: user!.id }, data: { lastLoginAt: new Date() } });
    return {
      user: {
        id: user!.id,
        fullName: user!.fullName,
        email: user!.email,
        whatsapp: user!.whatsapp ?? "",
        country: user!.country ?? "",
        role: user!.role,
      },
    };
  }

  // Password verified. Second factor: email a one-time code. The session is
  // only created after the code is verified (/api/auth/verify-login-otp).
  const code = generateOtpCode();
  await prisma.loginOtp.create({
    data: { userId: user.id, codeHash: hashOtpCode(code), expiresAt: new Date(Date.now() + OTP_TTL_MS) },
  });

  const otpMail = renderEmail({
    preview: "Your Companies House ID Verification sign-in code",
    heading: "Your sign-in code",
    intro: `Hi ${user.fullName || "there"}, enter this code to finish signing in to Companies House ID Verification.`,
    code,
    note: "This code expires in 10 minutes. If you did not try to sign in, you can ignore this email - your password is still safe.",
  });
  const delivered = await sendMail(
    { to: user.email, subject: "Your Companies House ID Verification sign-in code", text: otpMail.text, html: otpMail.html },
    "auth",
  );

  if (!delivered) {
    // Lockout-safe fallback: if the code email cannot be sent, super admins
    // (CEO / admin) are let straight in so a broken mailbox can never lock the
    // platform's operators out of fixing it. Everyone else must retry.
    if (isSuperAdmin) {
      return NextResponse.json({ ...(await completeLogin()), otpBypassed: true });
    }
    return NextResponse.json(
      { error: "We couldn't send your sign-in code right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ otpRequired: true, email: user.email });
  } catch (err) {
    console.error("[login] unhandled error:", err);
    const raw = err instanceof Error ? err.message?.trim() : "";
    const message = raw || "An unexpected error occurred. Please try again.";
    return NextResponse.json({ ok: false, error: { code: "INTERNAL_ERROR", message } }, { status: 500 });
  }
}
