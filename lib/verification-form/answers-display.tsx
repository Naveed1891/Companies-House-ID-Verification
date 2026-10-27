import type { ReactNode } from "react";
import {
  PURPOSE_OF_VERIFICATION_OPTIONS,
  REGISTERED_THROUGH_OPTIONS,
  ROLE_IN_COMPANY_OPTIONS,
  SOURCE_OF_FUNDS_OPTIONS,
  YES_NO_OPTIONS,
} from "./constants";

// Map every known form option value to its human label so stored enum values
// (e.g. "director_and_psc") render as the text the applicant actually saw.
const VALUE_LABELS: Record<string, string> = {};
for (const opt of [
  ...REGISTERED_THROUGH_OPTIONS,
  ...ROLE_IN_COMPANY_OPTIONS,
  ...PURPOSE_OF_VERIFICATION_OPTIONS,
  ...SOURCE_OF_FUNDS_OPTIONS,
  ...YES_NO_OPTIONS,
]) {
  VALUE_LABELS[opt.value] = opt.label;
}

const DOCUMENT_LABELS: Record<string, string> = {
  directorPhotoId: "Director photo ID",
  selfieHoldingPhotoId: "Selfie holding photo ID",
  proofOfAddress: "Proof of address",
};

const ADDRESS_ORDER = [
  "streetAddress",
  "addressLine2",
  "city",
  "stateProvince",
  "postalCode",
  "country",
] as const;

function labelForValue(value: string): string {
  return VALUE_LABELS[value] ?? value;
}

function humanizeKey(key: string): string {
  const spaced = key.replace(/([A-Z])/g, " $1").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAddress(value: Record<string, unknown>): boolean {
  return "streetAddress" in value || "city" in value || "postalCode" in value;
}

function formatAddress(value: Record<string, unknown>): string {
  const parts = ADDRESS_ORDER.map((k) =>
    typeof value[k] === "string" ? (value[k] as string).trim() : "",
  ).filter(Boolean);
  return parts.length ? parts.join(", ") : "-";
}

function isFileMetaArray(value: unknown): value is Array<{ name?: string }> {
  return Array.isArray(value) && value.length > 0 && value.every((item) => isPlainObject(item) && "name" in item);
}

/**
 * Render a stored application answer as readable text rather than raw JSON.
 * Handles the address object, the uploaded-documents metadata, enum values,
 * multi-select arrays and booleans; leaves free-text values untouched.
 */
export function renderAnswerValue(value: unknown): ReactNode {
  if (isPlainObject(value)) {
    if (isAddress(value)) return formatAddress(value);

    // Documents metadata: { directorPhotoId: [{ name, size, type }], ... }
    if (Object.values(value).some((v) => isFileMetaArray(v))) {
      const groups = Object.entries(value).filter(([, v]) => isFileMetaArray(v));
      return (
        <ul className="m-0 list-none space-y-1 p-0">
          {groups.map(([k, files]) => (
            <li key={k}>
              <span className="font-semibold">{DOCUMENT_LABELS[k] ?? humanizeKey(k)}:</span>{" "}
              {(files as Array<{ name?: string }>).map((f) => f.name ?? "file").join(", ")}
            </li>
          ))}
        </ul>
      );
    }

    // Any other object: show key/value lines instead of raw JSON.
    const entries = Object.entries(value).filter(([, v]) => v != null && v !== "");
    if (entries.length === 0) return "-";
    return (
      <ul className="m-0 list-none space-y-1 p-0">
        {entries.map(([k, v]) => (
          <li key={k}>
            <span className="font-semibold">{humanizeKey(k)}:</span> {String(v)}
          </li>
        ))}
      </ul>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "-";
    return value.map((v) => (typeof v === "string" ? labelForValue(v) : String(v))).join(", ");
  }

  if (typeof value === "boolean") return value ? "Yes" : "No";

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? "-" : labelForValue(trimmed);
  }

  return value == null ? "-" : String(value);
}
