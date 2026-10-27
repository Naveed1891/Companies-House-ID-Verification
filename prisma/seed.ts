import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { VERIFICATION_PACKAGE } from "../lib/verification-form/constants";

const prisma = new PrismaClient();

const SERVICE_SLUG = "companies-house-identity-verification";

const DOCUMENT_REQUIREMENTS = [
  {
    kind: "photo_id",
    label: "Passport or national ID card",
    guidance: "Colour photo of the full page. All four corners visible, no glare.",
    sortOrder: 1,
  },
  {
    kind: "proof_of_address",
    label: "Proof of address",
    guidance: "Bank statement or utility bill issued within the last 3 months.",
    sortOrder: 2,
  },
  {
    kind: "selfie",
    label: "Photo of yourself",
    guidance: "A clear, well-lit photo of your face for the liveness check.",
    sortOrder: 3,
  },
] as const;

/** Minimal declarative form schema consumed by the application step. */
const FORM_SCHEMA = {
  sections: [
    {
      id: "applicant",
      title: "Applicant details",
      fields: [
        { id: "fullName", label: "Full legal name", type: "text", required: true },
        { id: "dateOfBirth", label: "Date of birth", type: "date", required: true },
        { id: "nationality", label: "Nationality", type: "text", required: true },
        { id: "residentialAddress", label: "Residential address", type: "textarea", required: true },
      ],
    },
    {
      id: "company",
      title: "Company connection",
      fields: [
        { id: "companyName", label: "Company name", type: "text", required: false },
        { id: "companyNumber", label: "Companies House number", type: "text", required: false },
        {
          id: "roleInCompany",
          label: "Your role",
          type: "select",
          required: true,
          options: [
            { value: "director", label: "Director" },
            { value: "psc", label: "PSC (Person with Significant Control)" },
            { value: "director_and_psc", label: "Director & PSC Both" },
            { value: "llp_member", label: "LLP Member" },
            { value: "authorised_filer", label: "Authorised Filer" },
          ],
        },
      ],
    },
  ],
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function main() {
  const adminEmail = requireEnv("SEED_ADMIN_EMAIL").toLowerCase();
  const adminPassword = requireEnv("SEED_ADMIN_PASSWORD");
  if (adminPassword.length < 12) {
    throw new Error("SEED_ADMIN_PASSWORD must be at least 12 characters.");
  }

  const service = await prisma.service.upsert({
    where: { slug: SERVICE_SLUG },
    update: { name: VERIFICATION_PACKAGE.name, active: true },
    create: {
      slug: SERVICE_SLUG,
      name: VERIFICATION_PACKAGE.name,
      description:
        "Guided Companies House identity verification for directors, PSCs, LLP members and authorised filers.",
      active: true,
    },
  });

  const pkg = await prisma.package.upsert({
    where: { slug: VERIFICATION_PACKAGE.slug },
    update: {
      name: VERIFICATION_PACKAGE.name,
      price: VERIFICATION_PACKAGE.salePrice,
      compareAtPrice: VERIFICATION_PACKAGE.regularPrice,
      currency: VERIFICATION_PACKAGE.currency,
      features: [...VERIFICATION_PACKAGE.features],
      active: true,
    },
    create: {
      serviceId: service.id,
      slug: VERIFICATION_PACKAGE.slug,
      name: VERIFICATION_PACKAGE.name,
      description:
        "One fixed fee. Identity and document checks, international applicant support, and personal-code guidance.",
      price: VERIFICATION_PACKAGE.salePrice,
      compareAtPrice: VERIFICATION_PACKAGE.regularPrice,
      currency: VERIFICATION_PACKAGE.currency,
      features: [...VERIFICATION_PACKAGE.features],
      active: true,
    },
  });

  await prisma.formDefinition.upsert({
    where: { packageId_version: { packageId: pkg.id, version: 1 } },
    update: { schema: FORM_SCHEMA, active: true },
    create: { packageId: pkg.id, version: 1, schema: FORM_SCHEMA, active: true },
  });

  for (const requirement of DOCUMENT_REQUIREMENTS) {
    await prisma.documentRequirement.upsert({
      where: { packageId_kind: { packageId: pkg.id, kind: requirement.kind } },
      update: {
        label: requirement.label,
        guidance: requirement.guidance,
        sortOrder: requirement.sortOrder,
        required: true,
      },
      create: {
        packageId: pkg.id,
        kind: requirement.kind,
        label: requirement.label,
        guidance: requirement.guidance,
        sortOrder: requirement.sortOrder,
        required: true,
      },
    });
  }

  const passwordHash = await hash(adminPassword, 12);
  // On UPDATE we deliberately do NOT overwrite passwordHash - once the
  // account exists, its password is owned by the user (or by manual
  // rotation via /api/admin/reset-seed-passwords), not by the seed.
  // This stops re-seeds from clobbering a working password.
  await prisma.user.upsert({
    where: { emailNormalized: adminEmail },
    update: { role: "SUPER_ADMIN", status: "ACTIVE", deletedAt: null, lockedUntil: null },
    create: {
      email: adminEmail,
      emailNormalized: adminEmail,
      passwordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      fullName: "CHIDV Administrator",
      emailVerifiedAt: new Date(),
    },
  });

  // CEO - the only account permitted to manage runtime credentials
  // (SMTP/Stripe/S3). Email must match lib/server/auth.ts CEO_EMAIL.
  const ceoEmail = "ceo@hopetexx.com";
  const ceoPassword = requireEnv("SEED_CEO_PASSWORD");
  const ceoHash = await hash(ceoPassword, 12);
  // Password is set only when this account is first created. Never include
  // passwordHash in the update branch: deployments run this seed automatically,
  // and must not overwrite a password chosen through the reset/profile flows.
  await prisma.user.upsert({
    where: { emailNormalized: ceoEmail },
    update: {
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      deletedAt: null,
      lockedUntil: null,
      emailVerifiedAt: new Date(),
    },
    create: {
      email: ceoEmail,
      emailNormalized: ceoEmail,
      passwordHash: ceoHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      fullName: "HopeTex CEO",
      emailVerifiedAt: new Date(),
    },
  });

  // Retire legacy seeded accounts. Their passwords appeared in git history
  // during the initial deploy scramble and must not remain usable.
  const legacyEmails = ["ceo@invoclouds.com", "naveed@hopetexx.com"];
  for (const legacy of legacyEmails) {
    if (legacy === adminEmail || legacy === ceoEmail) continue;
    await prisma.user.updateMany({
      where: { emailNormalized: legacy, deletedAt: null },
      data: { status: "SUSPENDED", deletedAt: new Date() },
    });
  }

  // Rename the staff account kashif@hopetexx.com -> waqas@hopetexx.com,
  // keeping their role/password. Idempotent and skipped if a waqas account
  // already exists (avoids a unique-email collision).
  const oldStaffEmail = "kashif@hopetexx.com";
  const newStaffEmail = "waqas@hopetexx.com";
  const oldStaff = await prisma.user.findFirst({ where: { emailNormalized: oldStaffEmail } });
  const newStaffExists = await prisma.user.findFirst({ where: { emailNormalized: newStaffEmail } });
  if (oldStaff && !newStaffExists) {
    await prisma.user.update({
      where: { id: oldStaff.id },
      data: { email: newStaffEmail, emailNormalized: newStaffEmail },
    });
    console.log(`[seed] renamed staff ${oldStaffEmail} -> ${newStaffEmail}`);
  }

  console.log("[seed] service, package, form definition, document requirements and admin ready.");
  console.log(`[seed] admin: ${adminEmail}`);
}

main()
  .catch((error: unknown) => {
    console.error("[seed] failed:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
