"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-client";

type PackageValues = {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice: string;
  currency: string;
  features: string[];
  active: boolean;
};

export function PackageEditor({ pkg, editable }: { pkg: PackageValues; editable: boolean }) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: pkg.name,
    description: pkg.description,
    price: String(pkg.price),
    compareAtPrice: pkg.compareAtPrice,
    features: pkg.features.join("\n"),
    active: pkg.active,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await apiFetch(`/api/admin/packages/${encodeURIComponent(pkg.id)}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          price: Number(values.price),
          compareAtPrice: values.compareAtPrice === "" ? null : Number(values.compareAtPrice),
          features: values.features.split("\n").map((f) => f.trim()).filter(Boolean),
          active: values.active,
        }),
      });
      setMessage("Package saved.");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save the package.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="dash-form" style={{ maxWidth: "640px" }} onSubmit={submit}>
      <label className="dash-label">
        Name
        <input
          className="dash-input"
          value={values.name}
          disabled={!editable}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
      </label>
      <label className="dash-label">
        Description
        <textarea
          className="dash-input"
          rows={2}
          value={values.description}
          disabled={!editable}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <label className="dash-label" style={{ flex: "1 1 140px" }}>
          Price ({pkg.currency})
          <input
            className="dash-input"
            type="number"
            step="0.01"
            min="0"
            value={values.price}
            disabled={!editable}
            onChange={(e) => setValues({ ...values, price: e.target.value })}
          />
        </label>
        <label className="dash-label" style={{ flex: "1 1 140px" }}>
          Compare-at price
          <input
            className="dash-input"
            type="number"
            step="0.01"
            min="0"
            value={values.compareAtPrice}
            disabled={!editable}
            placeholder="Optional"
            onChange={(e) => setValues({ ...values, compareAtPrice: e.target.value })}
          />
        </label>
      </div>
      <label className="dash-label">
        Features (one per line)
        <textarea
          className="dash-input"
          rows={8}
          value={values.features}
          disabled={!editable}
          onChange={(e) => setValues({ ...values, features: e.target.value })}
        />
      </label>
      <label className="flex items-center gap-2 text-[13.5px] font-bold">
        <input
          type="checkbox"
          checked={values.active}
          disabled={!editable}
          onChange={(e) => setValues({ ...values, active: e.target.checked })}
        />
        Active (visible on the website)
      </label>

      {error && <p className="dash-error m-0">{error}</p>}
      {message && <p className="m-0 text-[13.5px] font-bold text-emerald">{message}</p>}

      {editable ? (
        <div className="dash-actions">
          <button type="submit" className="dash-btn dash-btn--primary" disabled={saving}>
            {saving ? "Saving…" : "Save package"}
          </button>
        </div>
      ) : (
        <p className="m-0 text-[12.5px] text-[color:var(--muted)]">
          Your role does not permit editing packages.
        </p>
      )}
    </form>
  );
}
