"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-client";
import { PASSWORD_REQUIREMENTS } from "@/lib/password-policy";

const ROLES = [
  "OPERATIONS_ADMIN",
  "COMPLIANCE_REVIEWER",
  "FINANCE",
  "SUPPORT",
  "READ_ONLY",
  "SUPER_ADMIN",
];

export function StaffControls() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("SUPPORT");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await apiFetch("/api/admin/staff", {
        method: "POST",
        body: JSON.stringify({ fullName, email, role, password }),
      });
      setMessage(`${email} can now sign in at /login.`);
      setFullName("");
      setEmail("");
      setPassword("");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not add the staff member.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="dash-form" onSubmit={submit}>
      <label className="dash-label">
        Full name
        <input
          className="dash-input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </label>
      <label className="dash-label">
        Email
        <input
          className="dash-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="dash-label">
        Role
        <select className="dash-input" value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((value) => (
            <option key={value} value={value}>
              {value.replace(/_/g, " ").toLowerCase()}
            </option>
          ))}
        </select>
      </label>
      <label className="dash-label">
        Temporary password
        <input
          className="dash-input"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className="text-[12.5px] font-normal text-[color:var(--muted)]">
          {PASSWORD_REQUIREMENTS.map((rule) => rule.label).join(" · ")}. Share it securely and ask
          them to change it after first sign-in.
        </span>
      </label>

      {error && <p className="dash-error m-0">{error}</p>}
      {message && <p className="m-0 text-[13.5px] font-bold text-emerald">{message}</p>}

      <div className="dash-actions">
        <button type="submit" className="dash-btn dash-btn--primary" disabled={busy}>
          {busy ? "Adding…" : "Add staff member"}
        </button>
      </div>
    </form>
  );
}
