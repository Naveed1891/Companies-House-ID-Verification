/**
 * Standalone environment access.
 *
 * Every reader validates at call time and throws a clear error rather than
 * letting an undefined value reach the database, Stripe, or a cookie signer.
 */

export class EnvValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnvValidationError";
  }
}

function readRequired(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new EnvValidationError(
      `Missing required environment variable: ${name}. Copy .env.example to .env and set all values.`,
    );
  }
  return value;
}

function trimUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

export function getSessionSecret(): string {
  return readRequired("SESSION_SECRET");
}

export function getSiteUrl(): string {
  return trimUrl(process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3003");
}

export function getPrivateUploadDir(): string {
  return process.env.PRIVATE_UPLOAD_DIR?.trim() || "./storage/private";
}

export function getMaxUploadBytes(): number {
  const mb = Number(process.env.MAX_UPLOAD_SIZE_MB?.trim() || "10");
  return (Number.isFinite(mb) && mb > 0 ? mb : 10) * 1024 * 1024;
}

/**
 * Fail fast at boot in production for values with no other source.
 * Stripe / S3 / SMTP credentials are intentionally NOT required here - they can
 * be supplied at runtime through the CEO settings panel (see lib/server/settings).
 */
export function validateProductionEnv(): void {
  if (process.env.NODE_ENV !== "production") return;
  readRequired("DATABASE_URL");
  readRequired("SESSION_SECRET");
}
