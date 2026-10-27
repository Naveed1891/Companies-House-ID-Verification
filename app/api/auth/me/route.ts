import { NextResponse } from "next/server";
import { getAnySessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getAnySessionUser();
  return NextResponse.json({ user });
}
