"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-client";
import { useAuth } from "@/components/auth/AuthProvider";
import { CountrySelect } from "@/components/CountrySelect";
import { PhoneInput } from "@/components/PhoneInput";

type Initial = { fullName: string; email: string; whatsapp: string; country: string };

export function ProfileForm({ initial }: { initial: Initial }) {
  const router = useRouter();
  const { refresh } = useAuth();
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const nextWhatsapp = String(form.get("whatsapp") ?? "");
      const nextCountry = String(form.get("country") ?? "");
      await apiFetch("/api/account/profile", {
        method: "PATCH",
        body: JSON.stringify({
          fullName: values.fullName,
          whatsapp: nextWhatsapp,
          country: nextCountry,
        }),
      });
      setValues({ ...values, whatsapp: nextWhatsapp, country: nextCountry });
      setMessage("Details saved.");
      await refresh();
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save your details.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="dash-form" onSubmit={submit}>
      <label className="dash-label">
        Full name
        <input
          className="dash-input"
          value={values.fullName}
          onChange={(e) => setValues({ ...values, fullName: e.target.value })}
          required
        />
      </label>
      <label className="dash-label">
        Email address
        <input className="dash-input" value={values.email} disabled readOnly />
        <span className="text-[12.5px] font-normal text-[color:var(--muted)]">
          Contact support to change the email on your account.
        </span>
      </label>
      <label className="dash-label">
        WhatsApp number
        <PhoneInput name="whatsapp" defaultValue={values.whatsapp} />
      </label>
      <label className="dash-label">
        Country
        <CountrySelect name="country" defaultValue={values.country} />
      </label>

      {error && <p className="dash-error m-0">{error}</p>}
      {message && <p className="m-0 text-[13.5px] font-bold text-emerald">{message}</p>}

      <div className="dash-actions">
        <button type="submit" className="dash-btn dash-btn--primary" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
