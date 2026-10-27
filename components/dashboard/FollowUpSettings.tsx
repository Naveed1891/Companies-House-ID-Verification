"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-client";

type FollowUpSettingsValue = {
  enabled: boolean;
  templates: Array<{ subject: string; heading: string; message: string }>;
};

const schedule = [
  "1 day after account creation",
  "2 days after the first follow-up",
  "4 days after the first follow-up",
];

export function FollowUpSettings({ initial }: { initial: FollowUpSettingsValue }) {
  const [settings, setSettings] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function updateTemplate(index: number, key: "subject" | "heading" | "message", value: string) {
    setSettings((current) => ({
      ...current,
      templates: current.templates.map((template, templateIndex) =>
        templateIndex === index ? { ...template, [key]: value } : template,
      ),
    }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await apiFetch<{ settings: FollowUpSettingsValue }>("/api/admin/follow-ups", {
        method: "POST",
        body: JSON.stringify(settings),
      });
      setSettings(response.settings);
      setMessage("Follow-up automation settings saved.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save follow-up settings.");
    } finally {
      setSaving(false);
    }
  }

  async function runNow() {
    setRunning(true);
    setMessage("");
    setError("");
    try {
      const response = await apiFetch<{
        result: { enabled: boolean; sent: number; failed: number; skipped: number; error?: string };
      }>("/api/admin/follow-ups/run", { method: "POST" });
      const { sent, failed, skipped, error: runError } = response.result;
      if (runError) {
        setError(runError);
        return;
      }
      setMessage(`Run complete: ${sent} sent, ${failed} failed, ${skipped} not due or already handled.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not run follow-up emails.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="grid gap-5">
      {(message || error) && (
        <p className={`form-alert ${error ? "form-alert--error" : "form-alert--success"}`}>
          {error || message}
        </p>
      )}

      <section className="dash-panel">
        <label className="flex items-start justify-between gap-5">
          <span>
            <span className="block text-[15px] font-extrabold">Automatic signup follow-ups</span>
            <span className="mt-1 block text-[13px] text-[color:var(--muted)]">
              Send through the configured support mailbox. The sequence stops as soon as the customer places an order.
            </span>
          </span>
          <input
            type="checkbox"
            className="mt-1 size-5 shrink-0 accent-emerald"
            checked={settings.enabled}
            onChange={(event) => setSettings({ ...settings, enabled: event.target.checked })}
          />
        </label>
        <div className="mt-5 border-t border-[color:var(--border)] pt-5">
          <p className="mb-3 text-[12.5px] leading-5 text-[color:var(--muted)]">
            The scheduler runs automatically after startup and every hour. Run now checks only customers
            currently due and never sends to customers with a placed order.
          </p>
          <button
            type="button"
            className="dash-btn"
            disabled={running || saving || !settings.enabled}
            onClick={runNow}
          >
            {running ? "Running…" : "Run eligible follow-ups now"}
          </button>
        </div>
      </section>

      {settings.templates.map((template, index) => (
        <section className="dash-panel" key={index}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="eyebrow">Follow-up {index + 1}</p>
              <h2 className="m-0 text-xl font-extrabold">{schedule[index]}</h2>
            </div>
            <span className="dash-badge dash-badge--info">support@companieshouseidverification.com</span>
          </div>
          <div className="grid gap-4">
            <label className="dash-label">
              Email subject
              <input
                className="dash-input"
                maxLength={191}
                value={template.subject}
                onChange={(event) => updateTemplate(index, "subject", event.target.value)}
              />
            </label>
            <label className="dash-label">
              Email heading
              <input
                className="dash-input"
                maxLength={191}
                value={template.heading}
                onChange={(event) => updateTemplate(index, "heading", event.target.value)}
              />
            </label>
            <label className="dash-label">
              Main message
              <textarea
                className="dash-input min-h-28 resize-y"
                maxLength={2000}
                value={template.message}
                onChange={(event) => updateTemplate(index, "message", event.target.value)}
              />
            </label>
          </div>
        </section>
      ))}

      <div className="dash-actions">
        <button type="button" className="dash-btn dash-btn--primary" disabled={saving} onClick={save}>
          {saving ? "Saving…" : "Save follow-up settings"}
        </button>
      </div>
    </div>
  );
}
