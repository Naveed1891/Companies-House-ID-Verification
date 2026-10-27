export type RoleInCompany = "" | "director" | "psc" | "director_and_psc";
export type YesNo = "" | "yes" | "no";
export type PurposeOfVerification =
  | ""
  | "uk_company_incorporation"
  | "director_psc_verification"
  | "ongoing_compliance";

export type DirectorHomeAddress = {
  streetAddress: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
};

export type VerificationFormValues = {
  directorFirstName: string;
  directorLastName: string;
  businessLtdName: string;
  companyRegistrationNumber: string;
  roleInCompany: RoleInCompany;
  directorHomeAddress: DirectorHomeAddress;
  manualDocumentUpload: boolean;
  directorPhotoId: FileList | null;
  selfieHoldingPhotoId: FileList | null;
  proofOfAddress: FileList | null;
  purposeOfVerification: PurposeOfVerification;
  isPoliticallyExposedPerson: YesNo;
  isPepFamilyOrAssociate: YesNo;
  subjectToSanctionsOrProceedings: YesNo;
  convictedFinancialCrime: YesNo;
  sourceOfFunds: string[];
  sourceOfFundsOther: string;
  electronicVerificationConsent: boolean;
  verificationPartnerConsent: boolean;
  informationTrueDeclaration: YesNo;
  identityAmlConsent: YesNo;
  secureDocumentStorageConsent: YesNo;
  nonRefundAcknowledgement: boolean;
};

export type VerificationFormErrors = Partial<Record<string, string>>;

export function createInitialFormValues(): VerificationFormValues {
  return {
    directorFirstName: "",
    directorLastName: "",
    businessLtdName: "",
    companyRegistrationNumber: "",
    roleInCompany: "",
    directorHomeAddress: {
      streetAddress: "",
      addressLine2: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
    },
    manualDocumentUpload: false,
    directorPhotoId: null,
    selfieHoldingPhotoId: null,
    proofOfAddress: null,
    purposeOfVerification: "",
    isPoliticallyExposedPerson: "",
    isPepFamilyOrAssociate: "",
    subjectToSanctionsOrProceedings: "",
    convictedFinancialCrime: "",
    sourceOfFunds: [],
    sourceOfFundsOther: "",
    electronicVerificationConsent: false,
    verificationPartnerConsent: false,
    informationTrueDeclaration: "",
    identityAmlConsent: "",
    secureDocumentStorageConsent: "",
    nonRefundAcknowledgement: false,
  };
}
