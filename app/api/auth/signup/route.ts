import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateSignupInput } from "@/lib/auth/validation";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { createSession } from "@/lib/auth/session";

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
      select: { id: true, status: true },
    });
    if (existing && existing.status === "ACTIVE") {
      return NextResponse.json(
        { ok: false, error: { code: "EMAIL_ALREADY_EXISTS", message: DUPLICATE_EMAIL_MESSAGE } },
        { status: 409 },
      );
    }

    const passwordHash = await hash(input.password, 12);
    const now = new Date();

    // Public signup may only ever create a customer. Role is hard-coded, never
    // taken from the request body.
    const user = existing
      ? await prisma.user.update({
          where: { id: existing.id },
          data: {
            passwordHash,
            fullName: input.fullName.trim(),
            whatsapp: input.whatsapp.trim().replace(/\s+/g, ""),
            country: input.country.trim(),
            status: "ACTIVE",
            emailVerifiedAt: now,
          },
        })
      : await prisma.user.create({
          data: {
            email,
            emailNormalized: email,
            passwordHash,
            role: "CUSTOMER",
            status: "ACTIVE",
            emailVerifiedAt: now,
            fullName: input.fullName.trim(),
            whatsapp: input.whatsapp.trim().replace(/\s+/g, ""),
            country: input.country.trim(),
          },
        });

    await createSession("customer", user.id, user.role);

    return NextResponse.json({
      ok: true,
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
    console.error("[signup] unhandled error:", err);
    const raw = err instanceof Error ? err.message?.trim() : "";
    const message = raw || "An unexpected error occurred. Please try again.";
    return NextResponse.json({ ok: false, error: { code: "INTERNAL_ERROR", message } }, { status: 500 });
  }
}
