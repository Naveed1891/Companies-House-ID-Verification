import { prisma } from "@/lib/db";
import type { CheckoutPackage } from "@/lib/checkout-package";
import { VERIFICATION_PACKAGE } from "@/lib/verification-form/constants";

// Fallback rendered when the DB is unreachable or has not been seeded yet.
// Keeps marketing pages fully functional (correct price, name, features)
// until the operator connects a working database.
const FALLBACK_PACKAGE: CheckoutPackage = {
  id: "fallback",
  slug: VERIFICATION_PACKAGE.slug,
  name: VERIFICATION_PACKAGE.name,
  description:
    "One fixed fee. Identity and document checks, international applicant support, and personal-code guidance.",
  price: VERIFICATION_PACKAGE.salePrice,
  regularPrice: VERIFICATION_PACKAGE.regularPrice,
  currency: VERIFICATION_PACKAGE.currency,
  features: [...VERIFICATION_PACKAGE.features],
};

type PackageRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: unknown;
  compareAtPrice: unknown;
  currency: string;
  features: unknown;
};

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && "toNumber" in value) {
    return (value as { toNumber: () => number }).toNumber();
  }
  if (value && typeof value === "object" && "toJSON" in value) {
    const json = (value as { toJSON: () => unknown }).toJSON();
    const parsed = Number(json);
    if (Number.isFinite(parsed)) return parsed;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 19;
}

function toFeatures(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  return [];
}

export function mapPackage(row: PackageRow): CheckoutPackage {
  const price = toNumber(row.price);
  const compare = row.compareAtPrice == null ? undefined : toNumber(row.compareAtPrice);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    price,
    ...(typeof compare === "number" && compare > price ? { regularPrice: compare } : {}),
    currency: row.currency,
    features: toFeatures(row.features),
  };
}

export async function getActivePackages(): Promise<CheckoutPackage[]> {
  try {
    const rows = await prisma.package.findMany({
      where: { active: true },
      orderBy: { price: "asc" },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        price: true,
        compareAtPrice: true,
        currency: true,
        features: true,
      },
    });
    if (rows.length === 0) return [FALLBACK_PACKAGE];
    return rows.map(mapPackage);
  } catch (err) {
    console.error(
      "[catalog] getActivePackages failed - is DATABASE_URL set and have migrations run?",
      err instanceof Error ? err.message : err,
    );
    return [FALLBACK_PACKAGE];
  }
}

export async function getPackageBySlug(slug: string): Promise<CheckoutPackage | null> {
  try {
    const row = await prisma.package.findFirst({
      where: { slug, active: true },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        price: true,
        compareAtPrice: true,
        currency: true,
        features: true,
      },
    });
    if (row) return mapPackage(row);
    return slug === FALLBACK_PACKAGE.slug ? FALLBACK_PACKAGE : null;
  } catch (err) {
    console.error(
      "[catalog] getPackageBySlug failed - is DATABASE_URL set and have migrations run?",
      err instanceof Error ? err.message : err,
    );
    return slug === FALLBACK_PACKAGE.slug ? FALLBACK_PACKAGE : null;
  }
}
