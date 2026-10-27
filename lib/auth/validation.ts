import { passwordPolicyError } from "@/lib/password-policy";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_RE = /^\+[1-9]\d{7,14}$/;

export type SignupInput = {
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  password: string;
  confirmPassword: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export function validateSignupInput(
  input: SignupInput,
  options: { requireContactDetails?: boolean } = {},
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.fullName.trim() || input.fullName.trim().length < 2) {
    errors.fullName = "Full name is required.";
  }
  if (!input.email.trim() || !EMAIL_RE.test(input.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (options.requireContactDetails !== false) {
    const whatsapp = input.whatsapp.trim().replace(/\s+/g, "");
    if (!whatsapp || !WHATSAPP_RE.test(whatsapp)) {
      errors.whatsapp = "Enter a WhatsApp number with country code, e.g. +447700900123.";
    }
    if (!input.country.trim()) errors.country = "Country is required.";
  }
  const passwordError = passwordPolicyError(input.password);
  if (passwordError) errors.password = passwordError;
  if (input.password !== input.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
}

export function validateLoginInput(input: LoginInput): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.email.trim() || !EMAIL_RE.test(input.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!input.password) errors.password = "Password is required.";
  return errors;
}
