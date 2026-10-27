export const VERIFICATION_PACKAGE = {
  name: "Companies House Identity Verification",
  slug: "companies-house-id-verification",
  regularPrice: 80,
  salePrice: 19,
  currency: "GBP",
  savePercent: 76,
  features: [
    "Identity Verification for One Director/PSC",
    "Verified by Authorised Corporate Service Provider (ACSP)",
    "Automated document validation (passport, driving licence, national ID card, etc.)",
    "Global coverage – suitable for UK and international clients",
    "No hidden costs (honest pricing)",
    "Fast Service – Verification within 2 working hours",
    "Hassle-free service",
    "Consistent 5-star reviews",
    "Confirmation email once verification is complete",
  ],
} as const;

export const REGISTERED_THROUGH_OPTIONS = [
  {
    value: "no_other_provider",
    label: "I have already registered my company",
  },
  {
    value: "not_registered_yet",
    label: "No, I haven't registered yet. I would like to register a new company",
  },
] as const;

export const ROLE_IN_COMPANY_OPTIONS = [
  { value: "director", label: "Director" },
  { value: "psc", label: "PSC (Person with Significant Control)" },
  { value: "director_and_psc", label: "Director & PSC Both" },
] as const;

export const PURPOSE_OF_VERIFICATION_OPTIONS = [
  { value: "uk_company_incorporation", label: "UK Company Incorporation" },
  { value: "director_psc_verification", label: "Director / PSC Verification" },
  { value: "ongoing_compliance", label: "Ongoing Compliance (ACSP requirement)" },
] as const;

export const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export const SOURCE_OF_FUNDS_OPTIONS = [
  { value: "personal_savings", label: "Personal savings" },
  { value: "salary_income", label: "Salary income" },
  { value: "business_revenue", label: "Business revenue" },
  { value: "investment", label: "Investment" },
  { value: "loan", label: "Loan" },
  { value: "other", label: "Other (specify)" },
] as const;

export const MAX_FILE_BYTES = 1024 * 1024 * 1024;
export const MAX_UPLOAD_FILES = 5;

export const FILE_UPLOAD_LIMITS_TEXT = "Max. file size: 1 GB, Max. files: 5.";

export const FILE_ACCEPT = {
  directorPhotoId: ".pdf,.jpg,.jpeg,.png,.webp",
  selfieHoldingPhotoId: ".jpg,.jpeg,.png,.webp",
  proofOfAddress: ".pdf,.jpg,.jpeg,.png,.webp",
} as const;

export const FILE_LIMITS = {
  directorPhotoId: { maxFiles: MAX_UPLOAD_FILES },
  selfieHoldingPhotoId: { maxFiles: MAX_UPLOAD_FILES },
  proofOfAddress: { maxFiles: MAX_UPLOAD_FILES },
} as const;

export const NON_REFUND_TEXT =
  "I understand that the verification fee covers the cost of identity and address checks. If my verification fails due to invalid, false, altered, or unverifiable documents, or unsuccessful live biometric verification, the fee is not refundable.";
