"use client";

import { useState } from "react";
import {
  NON_REFUND_TEXT,
  PURPOSE_OF_VERIFICATION_OPTIONS,
  ROLE_IN_COMPANY_OPTIONS,
  SOURCE_OF_FUNDS_OPTIONS,
  YES_NO_OPTIONS,
} from "@/lib/verification-form/constants";
import {
  createInitialFormValues,
  type VerificationFormErrors,
  type VerificationFormValues,
} from "@/lib/verification-form/types";
import {
  serializeFormPayload,
  validateVerificationForm,
} from "@/lib/verification-form/validation";

export function StartRequestForm({
  packageId,
  orderRef,
  mode = "draft",
  onSubmitted,
  onDraftReady,
  initialValues,
}: {
  packageId: string | null;
  orderRef?: string;
  mode?: "draft" | "application";
  onSubmitted?: (result?: { verification?: { url: string; qr: string } | null }) => void;
  onDraftReady?: (draft: { application: Record<string, unknown>; fullName: string }) => void;
  initialValues?: Record<string, unknown>;
}) {
  const packageAvailable = Boolean(packageId);

  const [values, setValues] = useState<VerificationFormValues>(() => {
    const defaults = createInitialFormValues();
    const saved = (initialValues ?? {}) as Partial<VerificationFormValues>;
    return {
      ...defaults,
      ...saved,
      directorHomeAddress: {
        ...defaults.directorHomeAddress,
        ...(saved.directorHomeAddress ?? {}),
      },
      directorPhotoId: null,
      selfieHoldingPhotoId: null,
      proofOfAddress: null,
    };
  });
  const [errors, setErrors] = useState<VerificationFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const showSourceOther = values.sourceOfFunds.includes("other");

  function clearError(key: string) {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function updateValue<K extends keyof VerificationFormValues>(
    key: K,
    value: VerificationFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    clearError(key as string);
  }

  function updateAddress<K extends keyof VerificationFormValues["directorHomeAddress"]>(
    key: K,
    value: VerificationFormValues["directorHomeAddress"][K],
  ) {
    setValues((prev) => ({
      ...prev,
      directorHomeAddress: { ...prev.directorHomeAddress, [key]: value },
    }));
    clearError(`directorHomeAddress.${key}`);
  }

  function toggleSourceOfFunds(option: string) {
    setValues((prev) => {
      const exists = prev.sourceOfFunds.includes(option);
      const sourceOfFunds = exists
        ? prev.sourceOfFunds.filter((item) => item !== option)
        : [...prev.sourceOfFunds, option];
      return { ...prev, sourceOfFunds };
    });
    clearError("sourceOfFunds");
    if (option === "other") clearError("sourceOfFundsOther");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitError(null);

    const found = validateVerificationForm(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    const payload = serializeFormPayload(values);
    setSubmitting(true);

    if (mode === "draft") {
      onDraftReady?.({
        application: payload,
        fullName: `${values.directorFirstName.trim()} ${values.directorLastName.trim()}`.trim(),
      });
      setSubmitting(false);
      return;
    }

    if (mode === "application" && orderRef) {
      try {
        const submitResult = await fetch(`/api/applications/${encodeURIComponent(orderRef)}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            application: payload,
            declarationAccepted: values.nonRefundAcknowledgement,
          }),
        }).then(async (response) => {
          const data = (await response.json().catch(() => ({}))) as {
            error?: string;
            verification?: { url: string; qr: string } | null;
          };
          if (!response.ok) throw new Error(data.error ?? "Submission failed.");
          return data;
        });

        onSubmitted?.({ verification: submitResult.verification ?? null });
        return;
      } catch (cause) {
        setSubmitError(cause instanceof Error ? cause.message : "Submission failed. Please try again.");
        setSubmitting(false);
        return;
      }
    }

    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="verification-form">
      {!packageAvailable && (
        <p className="form-notice mb-6">
          Live pricing is briefly unavailable. You can still complete the form and our team will
          follow up, or contact us directly.
        </p>
      )}

      <FormSection title="Director details">
          <div className="responsive-grid grid grid-cols-1 gap-[18px] sm:grid-cols-2">
            <Field label="Director Name / First Name" required error={errors.directorFirstName}>
              <input
                className="form-control"
                type="text"
                autoComplete="given-name"
                value={values.directorFirstName}
                onChange={(e) => updateValue("directorFirstName", e.target.value)}
                aria-invalid={!!errors.directorFirstName}
              />
            </Field>
            <Field label="Last Name" required error={errors.directorLastName}>
              <input
                className="form-control"
                type="text"
                autoComplete="family-name"
                value={values.directorLastName}
                onChange={(e) => updateValue("directorLastName", e.target.value)}
                aria-invalid={!!errors.directorLastName}
              />
            </Field>
          </div>

            <div className="responsive-grid mt-[18px] grid grid-cols-1 gap-[18px] sm:grid-cols-2">
              <Field label="(optional) Business / Ltd Name" error={errors.businessLtdName}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Please type your business name"
                  value={values.businessLtdName}
                  onChange={(e) => updateValue("businessLtdName", e.target.value)}
                  aria-invalid={!!errors.businessLtdName}
                />
              </Field>
              <Field label="(optional) CRN" error={errors.companyRegistrationNumber}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Type your company Registration Number here"
                  value={values.companyRegistrationNumber}
                  onChange={(e) => updateValue("companyRegistrationNumber", e.target.value)}
                  aria-invalid={!!errors.companyRegistrationNumber}
                />
              </Field>
            </div>

          <Fieldset label="Role in Company" required error={errors.roleInCompany}>
            <div className="flex flex-col gap-3">
              {ROLE_IN_COMPANY_OPTIONS.map((option) => (
                <label key={option.value} className="form-choice">
                  <input
                    type="radio"
                    name="roleInCompany"
                    value={option.value}
                    checked={values.roleInCompany === option.value}
                    onChange={() => updateValue("roleInCompany", option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </Fieldset>

          <Fieldset label="Type Director Home Address" required>
            <div className="responsive-grid grid grid-cols-1 gap-[18px] sm:grid-cols-2">
              <Field label="Street Address" required error={errors["directorHomeAddress.streetAddress"]}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Street Address"
                  autoComplete="address-line1"
                  value={values.directorHomeAddress.streetAddress}
                  onChange={(e) => updateAddress("streetAddress", e.target.value)}
                  aria-invalid={!!errors["directorHomeAddress.streetAddress"]}
                />
              </Field>
              <Field label="Address Line 2" error={errors["directorHomeAddress.addressLine2"]}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Address Line 2"
                  autoComplete="address-line2"
                  value={values.directorHomeAddress.addressLine2}
                  onChange={(e) => updateAddress("addressLine2", e.target.value)}
                />
              </Field>
              <Field label="City" required error={errors["directorHomeAddress.city"]}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="City"
                  autoComplete="address-level2"
                  value={values.directorHomeAddress.city}
                  onChange={(e) => updateAddress("city", e.target.value)}
                  aria-invalid={!!errors["directorHomeAddress.city"]}
                />
              </Field>
              <Field label="State / Province" required error={errors["directorHomeAddress.stateProvince"]}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="State / Province"
                  autoComplete="address-level1"
                  value={values.directorHomeAddress.stateProvince}
                  onChange={(e) => updateAddress("stateProvince", e.target.value)}
                  aria-invalid={!!errors["directorHomeAddress.stateProvince"]}
                />
              </Field>
              <Field label="ZIP / Postal Code" required error={errors["directorHomeAddress.postalCode"]}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="ZIP / Postal Code"
                  autoComplete="postal-code"
                  value={values.directorHomeAddress.postalCode}
                  onChange={(e) => updateAddress("postalCode", e.target.value)}
                  aria-invalid={!!errors["directorHomeAddress.postalCode"]}
                />
              </Field>
              <Field label="Country" required error={errors["directorHomeAddress.country"]}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Country"
                  autoComplete="country-name"
                  value={values.directorHomeAddress.country}
                  onChange={(e) => updateAddress("country", e.target.value)}
                  aria-invalid={!!errors["directorHomeAddress.country"]}
                />
              </Field>
            </div>
          </Fieldset>
      </FormSection>

      <FormSection title="ACSP compliance questions">
        <Fieldset label="Purpose of Verification" required error={errors.purposeOfVerification}>
          <div className="flex flex-col gap-3">
            {PURPOSE_OF_VERIFICATION_OPTIONS.map((option) => (
              <label key={option.value} className="form-choice">
                <input
                  type="radio"
                  name="purposeOfVerification"
                  value={option.value}
                  checked={values.purposeOfVerification === option.value}
                  onChange={() => updateValue("purposeOfVerification", option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </Fieldset>
      </FormSection>

      <FormSection title="PEP declaration">
        <RadioGroup
          name="isPoliticallyExposedPerson"
          label="Are you a Politically Exposed Person (PEP)?"
          required
          value={values.isPoliticallyExposedPerson}
          error={errors.isPoliticallyExposedPerson}
          onChange={(value) => updateValue("isPoliticallyExposedPerson", value)}
        />
        <RadioGroup
          name="isPepFamilyOrAssociate"
          label="Are you a family member or close associate of a PEP?"
          required
          value={values.isPepFamilyOrAssociate}
          error={errors.isPepFamilyOrAssociate}
          onChange={(value) => updateValue("isPepFamilyOrAssociate", value)}
        />
      </FormSection>

      <FormSection title="Sanctions declaration">
        <RadioGroup
          name="subjectToSanctionsOrProceedings"
          label="Are you subject to any sanctions, investigations, or legal proceedings?"
          required
          value={values.subjectToSanctionsOrProceedings}
          error={errors.subjectToSanctionsOrProceedings}
          onChange={(value) => updateValue("subjectToSanctionsOrProceedings", value)}
        />
        <RadioGroup
          name="convictedFinancialCrime"
          label="Have you ever been convicted of a financial crime?"
          required
          value={values.convictedFinancialCrime}
          error={errors.convictedFinancialCrime}
          onChange={(value) => updateValue("convictedFinancialCrime", value)}
        />
      </FormSection>

      <FormSection title="Source of funds (SOF)">
        <Fieldset label="What is the source of funds?" required error={errors.sourceOfFunds}>
          <div className="flex flex-col gap-3">
            {SOURCE_OF_FUNDS_OPTIONS.map((option) => (
              <label key={option.value} className="form-choice">
                <input
                  type="checkbox"
                  checked={values.sourceOfFunds.includes(option.value)}
                  onChange={() => toggleSourceOfFunds(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </Fieldset>
        {showSourceOther && (
          <Field label="Please specify other source of funds" required error={errors.sourceOfFundsOther}>
            <textarea
              className="form-control min-h-24 resize-y"
              value={values.sourceOfFundsOther}
              onChange={(e) => updateValue("sourceOfFundsOther", e.target.value)}
              aria-invalid={!!errors.sourceOfFundsOther}
            />
          </Field>
        )}
      </FormSection>

      <FormSection title="Electronic verification consent">
        <CheckboxField
          label="I consent to CompaniesHouseIDVerification.com carrying out electronic identity and address verification, including document checks and live biometric verification, using a third-party provider."
          required
          checked={values.electronicVerificationConsent}
          error={errors.electronicVerificationConsent}
          onChange={(checked) => updateValue("electronicVerificationConsent", checked)}
        />
        <CheckboxField
          label="CompaniesHouseIDVerification.com relies on electronic verification results provided by its identity-verification partner to meet ACSP obligations."
          required
          checked={values.verificationPartnerConsent}
          error={errors.verificationPartnerConsent}
          onChange={(checked) => updateValue("verificationPartnerConsent", checked)}
        />
      </FormSection>

      <FormSection title="Declaration & consent">
        <RadioGroup
          name="informationTrueDeclaration"
          label="Do you confirm that all information provided is true and accurate?"
          required
          value={values.informationTrueDeclaration}
          error={errors.informationTrueDeclaration}
          onChange={(value) => updateValue("informationTrueDeclaration", value)}
        />
        <RadioGroup
          name="identityAmlConsent"
          label="Do you consent to identity and AML checks?"
          required
          value={values.identityAmlConsent}
          error={errors.identityAmlConsent}
          onChange={(value) => updateValue("identityAmlConsent", value)}
        />
        <RadioGroup
          name="secureDocumentStorageConsent"
          label="Do you consent to secure storage of documents as required by law?"
          required
          value={values.secureDocumentStorageConsent}
          error={errors.secureDocumentStorageConsent}
          onChange={(value) => updateValue("secureDocumentStorageConsent", value)}
        />
        <CheckboxField
          label={
            <>
              <strong className="block text-slate">Non-Refund Acknowledgement Verification fee acknowledgement</strong>
              <span className="mt-1 block font-normal text-muted-text">{NON_REFUND_TEXT}</span>
            </>
          }
          required
          checked={values.nonRefundAcknowledgement}
          error={errors.nonRefundAcknowledgement}
          onChange={(checked) => updateValue("nonRefundAcknowledgement", checked)}
        />
      </FormSection>

      {submitError && (
        <p role="alert" className="form-notice mb-5">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        className="button button-primary w-full"
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? "Submitting application…" : "Submit application"}
      </button>
    </form>
  );
}
function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="form-section">
      <h3 className="form-section__title">{title}</h3>
      {children}
    </section>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="form-field">
      <span className="form-field__label">
        {label}
        {required && <span className="form-field__required">*</span>}
      </span>
      {children}
      {hint && !error && <span className="form-field__hint">{hint}</span>}
      {error && <span className="form-field__error">{error}</span>}
    </label>
  );
}

function Fieldset({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="form-fieldset">
      <legend className="form-field__label">
        {label}
        {required && <span className="form-field__required">*</span>}
      </legend>
      {children}
      {error && <span className="form-field__error">{error}</span>}
    </fieldset>
  );
}

function RadioGroup({
  name,
  label,
  required,
  value,
  error,
  onChange,
}: {
  name: string;
  label: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (value: "yes" | "no") => void;
}) {
  return (
    <Fieldset label={label} required={required} error={error}>
      <div className="flex flex-wrap gap-4">
        {YES_NO_OPTIONS.map((option) => (
          <label key={option.value} className="form-choice form-choice--inline">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </Fieldset>
  );
}

function CheckboxField({
  label,
  required,
  checked,
  error,
  onChange,
}: {
  label: React.ReactNode;
  required?: boolean;
  checked: boolean;
  error?: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="form-field">
      <label className="form-checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
        />
        <span>
          {label}
          {required && <span className="form-field__required"> *</span>}
        </span>
      </label>
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}
