"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api-client";

const ROLES = [
  "Company director",
  "Person with significant control (PSC)",
  "LLP member",
  "Authorised filer",
  "Other / not sure yet",
];

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", role: "", message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      await apiFetch("/api/contact", { method: "POST", body: JSON.stringify(values) });
      setDone(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Message could not be sent.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <p className="form-alert form-alert--success m-0">
        Thanks - your message has been sent. We aim to reply within one working day.
      </p>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="responsive-grid grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
          Full name
          <input className="form-control" type="text" required value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
        </label>
        <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
          Email address
          <input className="form-control" type="email" required value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
        </label>
      </div>
      <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
        Your role
        <select className="form-control" value={values.role} onChange={(e) => setValues({ ...values, role: e.target.value })}>
          <option value="">Select your role</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <label className="mb-[18px] flex flex-col gap-2 text-[13.5px] font-bold text-slate">
        Message
        <textarea className="form-control min-h-36 resize-y" required value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} />
      </label>
      {error && <p className="form-alert form-alert--error mb-4">{error}</p>}
      <button type="submit" className="button button-primary" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
