import type { Role } from "@prisma/client";
import {
  getCurrentStaff,
  getCurrentUser,
  type PublicUser,
} from "@/lib/auth/session";

/** Roles permitted to mutate data. READ_ONLY may view but never write. */
const WRITE_ROLES: Role[] = [
  "SUPER_ADMIN",
  "OPERATIONS_ADMIN",
  "COMPLIANCE_REVIEWER",
  "FINANCE",
  "SUPPORT",
];

const REFUND_ROLES: Role[] = ["SUPER_ADMIN", "FINANCE"];
const REVIEW_ROLES: Role[] = ["SUPER_ADMIN", "OPERATIONS_ADMIN", "COMPLIANCE_REVIEWER"];
const STAFF_ADMIN_ROLES: Role[] = ["SUPER_ADMIN"];

export async function requireUser(): Promise<PublicUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return user;
}

export async function requireStaff(): Promise<PublicUser> {
  const staff = await getCurrentStaff();
  if (!staff) throw new Error("UNAUTHENTICATED");
  return staff;
}

/** Staff session plus a role check. Throws FORBIDDEN when the role is insufficient. */
export async function requireRole(allowed: Role[]): Promise<PublicUser> {
  const staff = await requireStaff();
  if (!allowed.includes(staff.role)) throw new Error("FORBIDDEN");
  return staff;
}

/** The single account permitted to manage runtime credentials (SMTP/Stripe/S3). */
export const CEO_EMAIL = "ceo@hopetexx.com";
export const FOLLOW_UP_ADMIN_EMAIL = "naveed@invoclouds.com";

export function isCeo(user: PublicUser): boolean {
  return user.role === "SUPER_ADMIN" && user.email.toLowerCase() === CEO_EMAIL;
}

/** Staff session that must also be the CEO. Throws NOT_FOUND to hide the route. */
export async function requireCeo(): Promise<PublicUser> {
  const staff = await requireStaff();
  if (!isCeo(staff)) throw new Error("NOT_FOUND");
  return staff;
}

export function canManageFollowUps(user: PublicUser): boolean {
  return user.email.trim().toLowerCase() === FOLLOW_UP_ADMIN_EMAIL;
}

export async function requireFollowUpAdmin(): Promise<PublicUser> {
  const staff = await requireStaff();
  if (!canManageFollowUps(staff)) throw new Error("NOT_FOUND");
  return staff;
}

export const requireStaffWrite = () => requireRole(WRITE_ROLES);
export const requireRefundAccess = () => requireRole(REFUND_ROLES);
export const requireReviewAccess = () => requireRole(REVIEW_ROLES);
export const requireStaffAdmin = () => requireRole(STAFF_ADMIN_ROLES);

export function canWrite(role: Role): boolean {
  return WRITE_ROLES.includes(role);
}

export function canRefund(role: Role): boolean {
  return REFUND_ROLES.includes(role);
}

export function canReview(role: Role): boolean {
  return REVIEW_ROLES.includes(role);
}

export function isStaffRole(role: Role): boolean {
  return role !== "CUSTOMER";
}
