"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-client";

const STATUSES = [
  "PENDING_PAYMENT",
  "PAYMENT_CONFIRMED",
  "AWAITING_APPLICATION",
  "APPLICATION_IN_PROGRESS",
  "SUBMITTED",
  "UNDER_REVIEW",
  "AWAITING_CUSTOMER",
  // ADDITIONAL_INFO_REQUIRED is reached only via the request control below,
  // so the customer always gets a matching upload/answer input.
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
];

export function OrderAdminControls({
  reference,
  currentStatus,
  paymentStatus,
  assignedToId,
  staff,
}: {
  reference: string;
  currentStatus: string;
  paymentStatus: string;
  assignedToId: string;
  staff: { id: string; fullName: string }[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState("");
  const [assignee, setAssignee] = useState(assignedToId);
  const [internalNote, setInternalNote] = useState("");
  const [reqKind, setReqKind] = useState<"DOCUMENT" | "INFORMATION">("INFORMATION");
  const [reqMessage, setReqMessage] = useState("");
  const [reqDocLabel, setReqDocLabel] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function run(action: string, fn: () => Promise<unknown>) {
    setBusy(action);
    setError("");
    try {
      await fn();
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Action failed.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid gap-6">
      {paymentStatus !== "PAID" && (
        <div className="dash-form">
          <p className="m-0 text-[13.5px] font-extrabold">Bank transfer payment</p>
          <p className="m-0 text-[12.5px] text-[color:var(--muted)]">
            Payment status is <strong>{paymentStatus.toLowerCase()}</strong>. Check the payment-proof document
            below, then confirm once the transfer has landed. This opens the application for the customer.
          </p>
          <div className="dash-actions">
            <button
              type="button"
              className="dash-btn dash-btn--primary"
              disabled={busy !== null}
              onClick={() =>
                run("confirm-payment", () =>
                  apiFetch(`/api/admin/orders/${encodeURIComponent(reference)}/confirm-payment`, {
                    method: "POST",
                  }),
                )
              }
            >
              {busy === "confirm-payment" ? "Confirming…" : "Confirm payment received"}
            </button>
          </div>
        </div>
      )}

      <div className="dash-form">
        <label className="dash-label">
          Status
          <select className="dash-input" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((value) => (
              <option key={value} value={value}>
                {value.replace(/_/g, " ").toLowerCase()}
              </option>
            ))}
          </select>
        </label>
        <label className="dash-label">
          Note (recorded on the timeline)
          <input className="dash-input" value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
        <div className="dash-actions">
          <button
            type="button"
            className="dash-btn dash-btn--primary"
            disabled={busy !== null || status === currentStatus}
            onClick={() =>
              run("status", () =>
                apiFetch(`/api/admin/orders/${encodeURIComponent(reference)}/status`, {
                  method: "PATCH",
                  body: JSON.stringify({ status, note }),
                }),
              )
            }
          >
            {busy === "status" ? "Updating…" : "Update status"}
          </button>
        </div>
      </div>

      <div className="dash-form">
        <label className="dash-label">
          Assigned to
          <select className="dash-input" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
            <option value="">Unassigned</option>
            {staff.map((member) => (
              <option key={member.id} value={member.id}>
                {member.fullName}
              </option>
            ))}
          </select>
        </label>
        <div className="dash-actions">
          <button
            type="button"
            className="dash-btn"
            disabled={busy !== null}
            onClick={() =>
              run("assign", () =>
                apiFetch(`/api/admin/orders/${encodeURIComponent(reference)}/assign`, {
                  method: "POST",
                  body: JSON.stringify({ staffUserId: assignee || null }),
                }),
              )
            }
          >
            {busy === "assign" ? "Saving…" : "Save assignment"}
          </button>
        </div>
      </div>

      <div className="dash-form">
        <p className="m-0 text-[13.5px] font-extrabold">Request something from the customer</p>
        <p className="m-0 text-[12.5px] text-[color:var(--muted)]">
          Sets the order to “additional info required” and shows the customer the matching input -
          they are not sent back through their submitted application.
        </p>
        <label className="dash-label">
          What do you need?
          <select
            className="dash-input"
            value={reqKind}
            onChange={(e) => setReqKind(e.target.value as "DOCUMENT" | "INFORMATION")}
          >
            <option value="INFORMATION">Information (customer types an answer)</option>
            <option value="DOCUMENT">Document (customer uploads a file)</option>
          </select>
        </label>
        {reqKind === "DOCUMENT" && (
          <label className="dash-label">
            Document name
            <input
              className="dash-input"
              value={reqDocLabel}
              onChange={(e) => setReqDocLabel(e.target.value)}
              placeholder="e.g. Proof of address"
            />
          </label>
        )}
        <label className="dash-label">
          Message to the customer
          <textarea
            className="dash-input"
            rows={3}
            value={reqMessage}
            onChange={(e) => setReqMessage(e.target.value)}
            placeholder={
              reqKind === "DOCUMENT"
                ? "e.g. Your proof of address is older than 3 months - please upload a recent one."
                : "e.g. Please confirm your date of birth as it appears on your passport."
            }
          />
        </label>
        <div className="dash-actions">
          <button
            type="button"
            className="dash-btn dash-btn--primary"
            disabled={busy !== null || !reqMessage.trim()}
            onClick={() =>
              run("request", async () => {
                await apiFetch(`/api/admin/orders/${encodeURIComponent(reference)}/info-requests`, {
                  method: "POST",
                  body: JSON.stringify({
                    kind: reqKind,
                    message: reqMessage,
                    documentLabel: reqDocLabel,
                    documentKind: reqDocLabel,
                  }),
                });
                setReqMessage("");
                setReqDocLabel("");
              })
            }
          >
            {busy === "request" ? "Sending…" : "Send request"}
          </button>
        </div>
      </div>

      <div className="dash-form">
        <label className="dash-label">
          Internal note
          <textarea
            className="dash-input"
            rows={3}
            value={internalNote}
            onChange={(e) => setInternalNote(e.target.value)}
          />
        </label>
        <div className="dash-actions">
          <button
            type="button"
            className="dash-btn"
            disabled={busy !== null || !internalNote.trim()}
            onClick={() =>
              run("note", async () => {
                await apiFetch(`/api/admin/orders/${encodeURIComponent(reference)}/notes`, {
                  method: "POST",
                  body: JSON.stringify({ body: internalNote }),
                });
                setInternalNote("");
              })
            }
          >
            {busy === "note" ? "Saving…" : "Add note"}
          </button>
        </div>
      </div>

      {error && <p className="dash-error m-0">{error}</p>}
    </div>
  );
}
