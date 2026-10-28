import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateSignupInput } from "@/lib/auth/validation";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { generateOtpCode, hashOtpCode, OTP_TTL_MS } from "@/lib/auth/password-reset";
import { renderEmail } from "@/lib/server/email-templates";
import { sendMail } from "@/lib/server/mailer";

export const dynamic = "force-dynamic";

const DUPLICATE_EMAIL_MESSAGE = "Email already exists. Please sign in instead.";

export async function POST(request: Request) {
  if (!rateLimit(clientKey(request, "signup"), 5, 60_000)) {
    return NextResponse.json(
      { ok: false, error: { code: "RATE_LIMITED", message: "Too many attempts. Please wait a minute." } },
      { status: 429 },
    );
  }

  try {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) {
      return NextResponse.json(
        { ok: false, error: { code: "INVALID_BODY", message: "Invalid request body." } },
        { status: 400 },
      );
    }

    const input = {
      fullName: String(body.fullName ?? ""),
      email: String(body.email ?? ""),
      whatsapp: String(body.whatsapp ?? ""),
      country: String(body.country ?? ""),
      password: String(body.password ?? ""),
      confirmPassword: String(body.confirmPassword ?? ""),
    };

    const applicationSignup = body.applicationSignup === true;
    const fieldErrors = validateSignupInput(input, { requireContactDetails: !applicationSignup });
    if (Object.keys(fieldErrors).length > 0) {
      const first = Object.values(fieldErrors)[0];
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_FAILED", message: first } },
        { status: 400 },
      );
    }

    const email = input.email.trim().toLowerCase();

    const existing = await prisma.user.findUnique({
      where: { emailNormalized: email },
      select: { id: true, status: true, emailVerifiedAt: true },
    });
    if (existing && (existing.status !== "INVITED" || existing.emailVerifiedAt)) {
      return NextResponse.json(
        { ok: false, error: { code: "EMAIL_ALREADY_EXISTS", message: DUPLICATE_EMAIL_MESSAGE } },
        { status: 409 },
      );
    }

    const passwordHash = await hash(input.password, 12);
    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);

    // Public signup may only ever create a customer. Role is hard-coded, never
    // taken from the request body.
    const user = await prisma.$transaction(async (tx) => {
      const saved = existing
        ? await tx.user.update({
            where: { id: existing.id },
            data: { passwordHash, fullName: input.fullName.trim(), whatsapp: input.whatsapp.trim().replace(/\s+/g, ""), country: input.country.trim(), status: "INVITED" },
          })
        : await tx.user.create({
            data: { email, emailNormalized: email, passwordHash, role: "CUSTOMER", status: "INVITED", fullName: input.fullName.trim(), whatsapp: input.whatsapp.trim().replace(/\s+/g, ""), country: input.country.trim() },
          });
      await tx.passwordResetOtp.updateMany({ where: { userId: saved.id, consumedAt: null }, data: { consumedAt: new Date() } });
      await tx.passwordResetOtp.create({ data: { userId: saved.id, codeHash: hashOtpCode(code), expiresAt } });
      return saved;
    });

    const verifyEmail = renderEmail({
      preview: "Verify your Companies House ID Verification email address",
      heading: "Verify your email address",
      intro: `Hi ${user.fullName}, welcome to Companies House ID Verification. Use this code to confirm your email address.`,
      code,
      note: "This code expires in 10 minutes.",
    });
    const delivered = await sendMail({
      to: user.email,
      subject: "Verify your Companies House ID Verification email address",
      text: verifyEmail.text,
      html: verifyEmail.html,
    });
    if (!delivered) return NextResponse.json({ ok: false, error: { code: "EMAIL_SEND_FAILED", message: "We could not send the verification code. Please try again." } }, { status: 500 });

    return NextResponse.json({
      ok: true,
      email: user.email,
      verificationRequired: true,
    });
  } catch (err) {
    console.error("[signup] unhandled error:", err);
    const raw = err instanceof Error ? err.message?.trim() : "";
    const message = raw || "An unexpected error occurred. Please try again.";
    return NextResponse.json({ ok: false, error: { code: "INTERNAL_ERROR", message } }, { status: 500 });
  }
}
