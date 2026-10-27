import { validateProductionEnv } from "@/lib/env";
import { processSignupFollowUps } from "@/lib/server/signup-follow-ups";

try {
  validateProductionEnv();
} catch (error) {
  // Keep the public site online while clearly reporting incomplete deployment configuration.
  console.error("[startup] environment warning:", error instanceof Error ? error.message : String(error));
}

if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build") {
  const scheduler = globalThis as typeof globalThis & {
    __chidvFollowUpScheduler?: boolean;
  };

  if (!scheduler.__chidvFollowUpScheduler) {
    scheduler.__chidvFollowUpScheduler = true;

    const run = async () => {
      try {
        const result = await processSignupFollowUps();
        console.info("[follow-ups] scheduler complete", result);
      } catch (error) {
        console.error("[follow-ups] scheduler error:", error instanceof Error ? error.message : error);
      }
    };

    setTimeout(run, 30_000).unref();
    setInterval(run, 60 * 60 * 1000).unref();
  }
}
