"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { PASSWORD_REQUIREMENTS } from "@/lib/password-policy";

export function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await apiFetch("/api/account/password", {
        method: "POST",
        body: JSON.stringify({ currentPassword: current, newPassword: next, confirmPassword: confirm }),
      });
      setMessage("Password updated.");
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update your password.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="dash-form" onSubmit={submit}>
      <label className="dash-label">
        Current password
        <input
          type="password"
          autoComplete="current-password"
          className="dash-input"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          required
        />
      </label>
      <label className="dash-label">
        New password
        <input
          type="password"
          autoComplete="new-password"
          className="dash-input"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          required
        />
        <span className="text-[12.5px] font-normal text-[color:var(--muted)]">
          {PASSWORD_REQUIREMENTS.map((rule) => rule.label).join(" · ")}
        </span>
      </label>
      <label className="dash-label">
        Confirm new password
        <input
          type="password"
          autoComplete="new-password"
          className="dash-input"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
      </label>

      {error && <p className="dash-error m-0">{error}</p>}
      {message && <p className="m-0 text-[13.5px] font-bold text-emerald">{message}</p>}

      <div className="dash-actions">
        <button type="submit" className="dash-btn dash-btn--primary" disabled={saving}>
          {saving ? "Updating…" : "Update password"}
        </button>
      </div>
    </form>
  );
}
