"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { COUNTRIES, COUNTRY_BY_CODE } from "@/lib/countries";

const BUSINESS_TYPES = [
  "Accountancy / bookkeeping firm",
  "Company formation agent",
  "Law firm / solicitors",
  "Corporate service provider (CSP)",
  "Trust or fiduciary service provider",
  "Business consultancy / advisory",
  "Bank or financial institution",
  "Other",
];

const CUSTOMER_RANGES = [
  "1 - 10",
  "11 - 50",
  "51 - 100",
  "101 - 250",
  "251 - 500",
  "500+",
];

const INITIAL = {
  companyName: "",
  website: "",
  businessType: "",
  monthlyCustomers: "",
  contactName: "",
  email: "",
  phoneCountry: "GB",
  phone: "",
  country: "",
  message: "",
};

export function PartnerForm() {
  const [values, setValues] = useState(INITIAL);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof typeof INITIAL>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      const dial = COUNTRY_BY_CODE[values.phoneCountry]?.dial ?? "";
      const { phoneCountry, ...rest } = values;
      const payload = { ...rest, phoneCode: dial ? `+${dial}` : "" };
      await apiFetch("/api/partner", { method: "POST", body: JSON.stringify(payload) });
      setDone(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Your enquiry could not be sent.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="form-alert form-alert--success m-0">
        <p className="m-0 font-bold">Thank you - your partnership enquiry has been received.</p>
        <p className="mt-2 mb-0 text-sm">
          We have sent a confirmation to {values.email || "your work email"}. Our partnerships team will review your
          details and reply within one working day to discuss next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <fieldset className="m-0 mb-2 border-0 p-0">
        <legend className="mb-4 text-[12.5px] font-bold tracking-[0.1em] text-orange-accent uppercase">
          About your business
        </legend>
        <div className="responsive-grid grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
            Company name <span className="text-orange-accent">*</span>
            <input
              className="form-control"
              type="text"
              required
              autoComplete="organization"
              value={values.companyName}
              onChange={(e) => update("companyName", e.target.value)}
            />
          </label>
          <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
            Company website <span className="text-orange-accent">*</span>
            <input
              className="form-control"
              type="text"
              inputMode="url"
              required
              placeholder="www.yourcompany.com"
              autoComplete="url"
              value={values.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </label>
        </div>
        <div className="responsive-grid grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
            Current business type <span className="text-orange-accent">*</span>
            <select
              className="form-control"
              required
              value={values.businessType}
              onChange={(e) => update("businessType", e.target.value)}
            >
              <option value="">Select business type</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
            Expected verifications per month <span className="text-orange-accent">*</span>
            <select
              className="form-control"
              required
              value={values.monthlyCustomers}
              onChange={(e) => update("monthlyCustomers", e.target.value)}
            >
              <option value="">Select a range</option>
              {CUSTOMER_RANGES.map((r) => (
                <option key={r} value={r}>
                  {r} customers
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className="m-0 mb-2 border-0 p-0">
        <legend className="mt-2 mb-4 text-[12.5px] font-bold tracking-[0.1em] text-orange-accent uppercase">
          Primary contact
        </legend>
        <div className="responsive-grid grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
            Full name <span className="text-orange-accent">*</span>
            <input
              className="form-control"
              type="text"
              required
              autoComplete="name"
              value={values.contactName}
              onChange={(e) => update("contactName", e.target.value)}
            />
          </label>
          <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
            Work email <span className="text-orange-accent">*</span>
            <input
              className="form-control"
              type="email"
              required
              autoComplete="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </label>
        </div>
        <div className="responsive-grid grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
            Phone number <span className="text-orange-accent">*</span>
            <div className="flex gap-2">
              <select
                className="form-control w-[130px]! shrink-0"
                required
                aria-label="Country calling code"
                value={values.phoneCountry}
                onChange={(e) => update("phoneCountry", e.target.value)}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    +{c.dial} {c.name}
                  </option>
                ))}
              </select>
              <input
                className="form-control min-w-0 flex-1"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Phone number"
                value={values.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
          </label>
          <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
            Country / region <span className="text-orange-accent">*</span>
            <select
              className="form-control"
              required
              autoComplete="country-name"
              value={values.country}
              onChange={(e) => update("country", e.target.value)}
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
        Tell us about your partnership goals <span className="font-medium text-muted-text">(optional)</span>
        <textarea
          className="form-control min-h-32 resize-y"
          placeholder="How do you plan to work with us? Any volume expectations, timelines or specific requirements?"
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </label>

      {error && <p className="form-alert form-alert--error mb-4">{error}</p>}

      <button type="submit" className="button button-primary w-full sm:w-auto" disabled={sending}>
        {sending ? "Submitting…" : "Submit partnership enquiry"}
      </button>
      <p className="mt-4 mb-0 text-xs leading-6 text-muted-text">
        By submitting, you agree to be contacted about a potential partnership. We never share your details with
        third parties.
      </p>
    </form>
  );
}
