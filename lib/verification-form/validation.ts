import {
  FILE_ACCEPT,
  MAX_FILE_BYTES,
  MAX_UPLOAD_FILES,
} from "./constants";
import type { VerificationFormErrors, VerificationFormValues } from "./types";

function getExtension(name: string): string {
  const parts = name.toLowerCase().split(".");
  return parts.length > 1 ? `.${parts.pop()}` : "";
}

function validateFiles(
  files: FileList | null,
  fieldKey: keyof typeof FILE_ACCEPT,
  label: string,
  required = true,
): string | undefined {
  if (!files || files.length === 0) {
    return required ? `Please upload ${label}.` : undefined;
  }

  const allowed = FILE_ACCEPT[fieldKey]
    .split(",")
    .map((ext) => ext.trim().toLowerCase());

  if (files.length > MAX_UPLOAD_FILES) {
    return "You can upload up to 5 files only.";
  }

  for (const file of Array.from(files)) {
    if (file.size > MAX_FILE_BYTES) return "File size must be less than 1 GB.";
    const ext = getExtension(file.name);
    if (!allowed.includes(ext)) {
      return `${label}: invalid file type. Allowed: ${allowed.join(", ")}.`;
    }
  }

  return undefined;
}

export function validateUploadField(
  files: FileList | null,
  fieldKey: keyof typeof FILE_ACCEPT,
  label: string,
  required = true,
): string | undefined {
  return validateFiles(files, fieldKey, label, required);
}

export function validateVerificationForm(values: VerificationFormValues): VerificationFormErrors {
  const errors: VerificationFormErrors = {};
  if (!values.directorFirstName.trim()) errors.directorFirstName = "Please enter the director first name.";
  if (!values.directorLastName.trim()) errors.directorLastName = "Please enter the director last name.";
  if (!values.roleInCompany) errors.roleInCompany = "Please select your role in the company.";

  const address = values.directorHomeAddress;
  if (!address.streetAddress.trim()) errors["directorHomeAddress.streetAddress"] = "Please enter street address.";
  if (!address.city.trim()) errors["directorHomeAddress.city"] = "Please enter city.";
  if (!address.stateProvince.trim()) {
    errors["directorHomeAddress.stateProvince"] = "Please enter state or province.";
  }
  if (!address.postalCode.trim()) errors["directorHomeAddress.postalCode"] = "Please enter ZIP or postal code.";
  if (!address.country.trim()) errors["directorHomeAddress.country"] = "Please enter country.";

  if (!values.purposeOfVerification) {
    errors.purposeOfVerification = "Please select the purpose of verification.";
  }

  if (!values.isPoliticallyExposedPerson) {
    errors.isPoliticallyExposedPerson = "Please answer the PEP question.";
  }
  if (!values.isPepFamilyOrAssociate) {
    errors.isPepFamilyOrAssociate = "Please answer the PEP family or associate question.";
  }
  if (!values.subjectToSanctionsOrProceedings) {
    errors.subjectToSanctionsOrProceedings = "Please answer the sanctions question.";
  }
  if (!values.convictedFinancialCrime) {
    errors.convictedFinancialCrime = "Please answer the financial crime question.";
  }

  if (values.sourceOfFunds.length === 0) {
    errors.sourceOfFunds = "Please select at least one source of funds.";
  }
  if (values.sourceOfFunds.includes("other") && !values.sourceOfFundsOther.trim()) {
    errors.sourceOfFundsOther = "Please specify your other source of funds.";
  }

  if (!values.electronicVerificationConsent) {
    errors.electronicVerificationConsent = "Electronic verification consent is required.";
  }
  if (!values.verificationPartnerConsent) {
    errors.verificationPartnerConsent = "Verification partner consent is required.";
  }

  if (!values.informationTrueDeclaration) {
    errors.informationTrueDeclaration = "Please confirm your information is true and accurate.";
  } else if (values.informationTrueDeclaration !== "yes") {
    errors.informationTrueDeclaration = "You must confirm the information is true and accurate.";
  }

  if (!values.identityAmlConsent) {
    errors.identityAmlConsent = "Please provide identity and AML consent.";
  } else if (values.identityAmlConsent !== "yes") {
    errors.identityAmlConsent = "Identity and AML consent must be Yes to continue.";
  }

  if (!values.secureDocumentStorageConsent) {
    errors.secureDocumentStorageConsent = "Please provide secure document storage consent.";
  } else if (values.secureDocumentStorageConsent !== "yes") {
    errors.secureDocumentStorageConsent = "Secure document storage consent must be Yes to continue.";
  }

  if (!values.nonRefundAcknowledgement) {
    errors.nonRefundAcknowledgement = "Please acknowledge the non-refund policy.";
  }

  return errors;
}

export function serializeFormPayload(values: VerificationFormValues) {
  return {
    directorFirstName: values.directorFirstName.trim() || undefined,
    directorLastName: values.directorLastName.trim() || undefined,
    businessLtdName: values.businessLtdName.trim() || undefined,
    companyRegistrationNumber: values.companyRegistrationNumber.trim() || undefined,
    roleInCompany: values.roleInCompany || undefined,
    directorHomeAddress: values.directorHomeAddress,
    purposeOfVerification: values.purposeOfVerification,
    isPoliticallyExposedPerson: values.isPoliticallyExposedPerson,
    isPepFamilyOrAssociate: values.isPepFamilyOrAssociate,
    subjectToSanctionsOrProceedings: values.subjectToSanctionsOrProceedings,
    convictedFinancialCrime: values.convictedFinancialCrime,
    sourceOfFunds: values.sourceOfFunds,
    sourceOfFundsOther: values.sourceOfFundsOther.trim() || undefined,
    electronicVerificationConsent: values.electronicVerificationConsent,
    verificationPartnerConsent: values.verificationPartnerConsent,
    informationTrueDeclaration: values.informationTrueDeclaration,
    identityAmlConsent: values.identityAmlConsent,
    secureDocumentStorageConsent: values.secureDocumentStorageConsent,
    nonRefundAcknowledgement: values.nonRefundAcknowledgement,
  };
}
