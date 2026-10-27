const SPECIAL_CHAR_RE = /[^A-Za-z0-9]/;

export const PASSWORD_REQUIREMENTS = [
  { id: "length", label: "At least 12 characters", test: (value: string) => value.length >= 12 },
  { id: "upper", label: "One uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { id: "lower", label: "One lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { id: "number", label: "One number", test: (value: string) => /\d/.test(value) },
  {
    id: "special",
    label: "One special character",
    test: (value: string) => SPECIAL_CHAR_RE.test(value),
  },
] as const;

export function passwordMeetsPolicy(password: string): boolean {
  if (password !== password.trim()) return false;
  return PASSWORD_REQUIREMENTS.every((rule) => rule.test(password));
}

export function passwordPolicyError(password: string): string | null {
  if (!password) return "Password is required.";
  if (password !== password.trim()) {
    return "Password must not start or end with spaces.";
  }
  for (const rule of PASSWORD_REQUIREMENTS) {
    if (!rule.test(password)) {
      return `Password must include: ${PASSWORD_REQUIREMENTS.map((item) => item.label.toLowerCase()).join(", ")}.`;
    }
  }
  return null;
}

export function passwordStrengthLabel(password: string): "Weak" | "Medium" | "Strong" {
  const score = PASSWORD_REQUIREMENTS.filter((rule) => rule.test(password)).length;
  if (score <= 2) return "Weak";
  if (score <= 4) return "Medium";
  return "Strong";
}
