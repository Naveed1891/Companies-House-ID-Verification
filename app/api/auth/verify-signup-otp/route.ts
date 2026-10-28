import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth/session";
import { verifyOtpCode } from "@/lib/auth/password-reset";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!rateLimit(clientKey(request, "signup-otp"), 20, 60_000)) return NextResponse.json({ error: "Too many attempts. Please wait a minute." }, { status: 429 });
  try {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    const email = String(body?.email ?? "").trim().toLowerCase();
    const code = String(body?.code ?? "").trim();
    if (!email || !/^\d{6}$/.test(code)) return NextResponse.json({ error: "Invalid or expired code." }, { status: 400 });

    const user = await prisma.user.findFirst({ where: { emailNormalized: email, status: "INVITED", deletedAt: null }, select: { id: true, fullName: true, email: true, whatsapp: true, country: true, role: true } });
    if (!user) return NextResponse.json({ error: "Invalid or expired code." }, { status: 400 });
    const otp = await prisma.passwordResetOtp.findFirst({ where: { userId: user.id, consumedAt: null, expiresAt: { gt: new Date() } }, orderBy: { createdAt: "desc" } });
    if (!otp || otp.attempts >= 5) return NextResponse.json({ error: "Invalid or expired code." }, { status: 400 });
    if (!verifyOtpCode(code, otp.codeHash)) {
      await prisma.passwordResetOtp.update({ where: { id: otp.id }, data: { attempts: otp.attempts + 1, ...(otp.attempts + 1 >= 5 ? { consumedAt: new Date() } : {}) } });
      return NextResponse.json({ error: "Invalid or expired code." }, { status: 400 });
    }
    await prisma.$transaction([
      prisma.passwordResetOtp.update({ where: { id: otp.id }, data: { consumedAt: new Date() } }),
      prisma.user.update({ where: { id: user.id }, data: { status: "ACTIVE", emailVerifiedAt: new Date() } }),
    ]);
    await createSession("customer", user.id, user.role);
    return NextResponse.json({ ok: true, user: { ...user, whatsapp: user.whatsapp ?? "", country: user.country ?? "" } });
  } catch (err) {
    console.error("[verify-signup-otp] unhandled error:", err);
    const raw = err instanceof Error ? err.message?.trim() : "";
    const message = raw || "An unexpected error occurred. Please try again.";
    return NextResponse.json({ ok: false, error: { code: "INTERNAL_ERROR", message } }, { status: 500 });
  }
}
