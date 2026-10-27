import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function POST() {
  // Clear both kinds - a browser should never keep a stale session of either type.
  await clearSession();
  return NextResponse.json({ ok: true });
}
