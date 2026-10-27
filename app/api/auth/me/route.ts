import { NextResponse } from "next/server";
import { getAnySessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getAnySessionUser();
    return NextResponse.json({ user });
  } catch (err) {
    console.error("[auth/me] unhandled error:", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
