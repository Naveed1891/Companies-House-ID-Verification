import { createHash, randomBytes, randomInt, timingSafeEqual } from "node:crypto";

export const OTP_LENGTH = 6;
export const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
export const MAX_OTP_SENDS_PER_DAY = 5;
export const LOCKOUT_MS = 24 * 60 * 60 * 1000; // 24 hours

export const RESET_TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes
export const RESET_TOKEN_BYTES = 32;

/** Six-digit numeric OTP with cryptographic randomness. */
export function generateOtpCode(): string {
  let code = "";
  for (let i = 0; i < OTP_LENGTH; i += 1) {
    code += String(randomInt(0, 10));
  }
  return code;
}

/** SHA-256 of the OTP code (stored server-side, never the plaintext). */
export function hashOtpCode(code: string): string {
  return createHash("sha256").update(code, "utf8").digest("hex");
}

/** Constant-time OTP compare to defeat timing oracles. */
export function verifyOtpCode(code: string, storedHash: string): boolean {
  const given = Buffer.from(hashOtpCode(code));
  const want = Buffer.from(storedHash);
  if (given.length !== want.length) return false;
  return timingSafeEqual(given, want);
}

/** Long random reset-flow token (opaque bearer, sent to client after OTP verify). */
export function generateResetToken(): string {
  return randomBytes(RESET_TOKEN_BYTES).toString("base64url");
}

export function hashResetToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}
