import { compare, hash } from "bcryptjs";
import { prisma } from "@/lib/db";
import { getAnySessionUser } from "@/lib/auth/session";
import { json, parseJson, routeError } from "@/lib/server/http";
import { passwordPolicyError } from "@/lib/password-policy";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const sessionUser = await getAnySessionUser();
    if (!sessionUser) throw new Error("UNAUTHENTICATED");

    if (!rateLimit(clientKey(request, "password-change"), 5, 60_000)) {
      return json({ error: "Too many attempts. Please wait a minute." }, 429);
    }

    const body = await parseJson<{
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    }>(request);

    const currentPassword = String(body.currentPassword ?? "");
    const newPassword = String(body.newPassword ?? "");
    const confirmPassword = String(body.confirmPassword ?? "");

    if (newPassword !== confirmPassword) {
      return json({ error: "Passwords do not match." }, 400);
    }
    const policyError = passwordPolicyError(newPassword);
    if (policyError) return json({ error: policyError }, 400);

    const record = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: { passwordHash: true },
    });
    if (!record?.passwordHash) throw new Error("UNAUTHENTICATED");

    const matches = await compare(currentPassword, record.passwordHash);
    if (!matches) return json({ error: "Your current password is incorrect." }, 400);

    await prisma.user.update({
      where: { id: sessionUser.id },
      data: { passwordHash: await hash(newPassword, 12) },
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
