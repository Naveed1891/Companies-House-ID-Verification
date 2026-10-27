import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db";

// Static import - webpack bundles the config values into this route at
// build time, so we do NOT depend on runtime env-var loading. This works
// no matter how Hostinger starts the app.
// Path: app/api/admin/reset-seed-passwords/route.ts -> ../../../.. is project root
// eslint-disable-next-line @typescript-eslint/no-require-imports
const seedConfig = require("../../../../config/production-env.js") as {
  RECOVERY_TOKEN?: string;
  SEED_ADMIN_EMAIL?: string;
  SEED_ADMIN_PASSWORD?: string;
  SEED_CEO_PASSWORD?: string;
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Emergency password reset for the two seed accounts. GET with
 * ?token=<RECOVERY_TOKEN>. Re-hashes both accounts' passwords from the
 * config values baked in at build time, clears any lockouts.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";
  const expected = (seedConfig.RECOVERY_TOKEN || "").trim();

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "RECOVERY_TOKEN not found in bundled config." },
      { status: 503 },
    );
  }

  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ ok: false, error: "Invalid token." }, { status: 401 });
  }

  const adminEmail = (seedConfig.SEED_ADMIN_EMAIL || "").trim().toLowerCase();
  const adminPassword = (seedConfig.SEED_ADMIN_PASSWORD || "").trim();
  const ceoPassword = (seedConfig.SEED_CEO_PASSWORD || "").trim();
  const ceoEmail = "ceo@hopetexx.com";

  if (!adminEmail || !adminPassword || !ceoPassword) {
    return NextResponse.json(
      { ok: false, error: "One or more SEED_* values missing from config." },
      { status: 503 },
    );
  }

  const results: Array<{ email: string; updated: boolean; note?: string }> = [];
  for (const { email, password } of [
    { email: adminEmail, password: adminPassword },
    { email: ceoEmail, password: ceoPassword },
  ]) {
    const passwordHash = await hash(password, 12);
    const updated = await prisma.user.updateMany({
      where: { emailNormalized: email },
      data: {
        passwordHash,
        status: "ACTIVE",
        deletedAt: null,
        lockedUntil: null,
      },
    });
    await prisma.passwordResetOtp.deleteMany({
      where: { user: { emailNormalized: email } },
    });
    results.push({
      email,
      updated: updated.count > 0,
      ...(updated.count === 0 ? { note: "No matching account - was it deleted?" } : {}),
    });
  }

  return NextResponse.json({ ok: true, results, timestamp: new Date().toISOString() });
}
