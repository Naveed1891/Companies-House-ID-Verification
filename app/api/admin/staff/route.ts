import { hash } from "bcryptjs";
import type { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireStaffAdmin } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { json, parseJson, routeError } from "@/lib/server/http";
import { passwordPolicyError } from "@/lib/password-policy";

export const dynamic = "force-dynamic";

const ASSIGNABLE: Role[] = [
  "SUPER_ADMIN",
  "OPERATIONS_ADMIN",
  "COMPLIANCE_REVIEWER",
  "FINANCE",
  "SUPPORT",
  "READ_ONLY",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const staff = await requireStaffAdmin();
    const body = await parseJson<{
      fullName?: string;
      email?: string;
      role?: string;
      password?: string;
    }>(request);

    const fullName = String(body.fullName ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const role = body.role as Role;
    const password = String(body.password ?? "");

    if (fullName.length < 2) return json({ error: "A full name is required." }, 400);
    if (!EMAIL_RE.test(email)) return json({ error: "Enter a valid email address." }, 400);
    // CUSTOMER is deliberately excluded - staff creation must never mint a customer.
    if (!ASSIGNABLE.includes(role)) return json({ error: "Select a valid role." }, 400);

    const policyError = passwordPolicyError(password);
    if (policyError) return json({ error: policyError }, 400);

    const existing = await prisma.user.findUnique({
      where: { emailNormalized: email },
      select: { id: true },
    });
    if (existing) return json({ error: "An account with that email already exists." }, 409);

    const created = await prisma.user.create({
      data: {
        email,
        emailNormalized: email,
        passwordHash: await hash(password, 12),
        role,
        status: "ACTIVE",
        fullName,
        emailVerifiedAt: new Date(),
      },
      select: { id: true },
    });

    await recordAudit({
      actorId: staff.id,
      action: "staff.create",
      entity: "User",
      entityId: created.id,
      after: { email, role },
      request,
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
