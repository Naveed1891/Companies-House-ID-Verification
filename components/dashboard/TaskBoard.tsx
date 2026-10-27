"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-client";

export function TaskBoard({ staff }: { staff: { id: string; fullName: string }[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [assignee, setAssignee] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await apiFetch("/api/admin/tasks", {
        method: "POST",
        body: JSON.stringify({
          title,
          detail,
          assignedToId: assignee || null,
          orderReference: orderRef || null,
        }),
      });
      setTitle("");
      setDetail("");
      setOrderRef("");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create the task.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="dash-form" onSubmit={submit}>
      <label className="dash-label">
        Title
        <input
          className="dash-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="dash-label">
        Detail
        <textarea
          className="dash-input"
          rows={2}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <label className="dash-label" style={{ flex: "1 1 180px" }}>
          Assign to
          <select className="dash-input" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
            <option value="">Unassigned</option>
            {staff.map((member) => (
              <option key={member.id} value={member.id}>
                {member.fullName}
              </option>
            ))}
          </select>
        </label>
        <label className="dash-label" style={{ flex: "1 1 180px" }}>
          Order reference (optional)
          <input
            className="dash-input"
            value={orderRef}
            onChange={(e) => setOrderRef(e.target.value)}
            placeholder="DK-2026-XXXXXX"
          />
        </label>
      </div>

      {error && <p className="dash-error m-0">{error}</p>}

      <div className="dash-actions">
        <button type="submit" className="dash-btn dash-btn--primary" disabled={busy || !title.trim()}>
          {busy ? "Creating…" : "Create task"}
        </button>
      </div>
    </form>
  );
}
