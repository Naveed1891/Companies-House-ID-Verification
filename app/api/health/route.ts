import { after, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Minimal public health probe. Reports whether the app is up and whether
 * the database is reachable. No env values, no account details, no hash
 * material - anything richer belongs behind an authenticated admin route.
 */
export async function GET() {
  let db: "ok" | "error" = "error";
  try {
    const { prisma } = await import("@/lib/db");
    await prisma.$queryRawUnsafe("SELECT 1");
    db = "ok";
  } catch {
    db = "error";
  }

  if (db === "ok" && process.env.NODE_ENV === "production") {
    after(async () => {
      const state = globalThis as typeof globalThis & {
        __chidvFollowUpRequestTriggerAt?: number;
        __chidvFollowUpRequestRunning?: boolean;
      };
      const now = Date.now();
      const lastRun = state.__chidvFollowUpRequestTriggerAt ?? 0;
      if (state.__chidvFollowUpRequestRunning || now - lastRun < 60 * 60 * 1000) return;

      state.__chidvFollowUpRequestRunning = true;
      state.__chidvFollowUpRequestTriggerAt = now;
      try {
        const { processSignupFollowUps } = await import("@/lib/server/signup-follow-ups");
        const result = await processSignupFollowUps();
        console.info("[follow-ups] health trigger complete", result);
      } catch (error) {
        console.error(
          "[follow-ups] health trigger error:",
          error instanceof Error ? error.message : error,
        );
      } finally {
        state.__chidvFollowUpRequestRunning = false;
      }
    });
  }

  return NextResponse.json(
    { status: "up", db, timestamp: new Date().toISOString() },
    { status: db === "ok" ? 200 : 503 },
  );
}
