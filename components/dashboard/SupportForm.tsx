"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-client";

export function SupportForm({ orders }: { orders: string[] }) {
  const router = useRouter();
  const [orderRef, setOrderRef] = useState(orders[0] ?? "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!body.trim()) return;
    setSending(true);
    setError("");
    try {
      await apiFetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ orderReference: orderRef || null, subject, body }),
      });
      setSubject("");
      setBody("");
      setSent(true);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Message could not be sent.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="dash-form" onSubmit={submit}>
      {orders.length > 0 && (
        <label className="dash-label">
          Related request
          <select
            className="dash-input"
            value={orderRef}
            onChange={(e) => setOrderRef(e.target.value)}
          >
            <option value="">General enquiry</option>
            {orders.map((ref) => (
              <option key={ref} value={ref}>
                {ref}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="dash-label">
        Subject
        <input
          className="dash-input"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="How can we help?"
        />
      </label>
      <label className="dash-label">
        Message
        <textarea
          className="dash-input"
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </label>

      {error && <p className="dash-error m-0">{error}</p>}
      {sent && !error && <p className="m-0 text-[13.5px] font-bold text-emerald">Message sent.</p>}

      <div className="dash-actions">
        <button type="submit" className="dash-btn dash-btn--primary" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
