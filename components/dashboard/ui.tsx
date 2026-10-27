import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="dash-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="dash-heading__title">{title}</h1>
        {description && <p className="dash-heading__desc">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`dash-panel ${className}`}>{children}</section>;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="dash-empty">
      <p className="dash-empty__title">{title}</p>
      <p className="dash-empty__desc">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="button button-primary mt-5 inline-flex">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="dash-error" role="alert">
      {message}
    </div>
  );
}

const STATUS_TONE: Record<string, string> = {
  COMPLETED: "ok",
  APPROVED: "ok",
  PAID: "ok",
  SUBMITTED: "info",
  UNDER_REVIEW: "info",
  IN_REVIEW: "info",
  PROCESSING: "info",
  APPLICATION_IN_PROGRESS: "info",
  IN_PROGRESS: "info",
  AWAITING_APPLICATION: "warn",
  AWAITING_CUSTOMER: "warn",
  ADDITIONAL_INFO_REQUIRED: "warn",
  PENDING_PAYMENT: "warn",
  PENDING: "warn",
  NEEDS_REUPLOAD: "warn",
  UPLOADED: "info",
  REQUESTED: "warn",
  NOT_STARTED: "muted",
  DRAFT: "muted",
  UNPAID: "muted",
  CANCELLED: "bad",
  REFUNDED: "bad",
  REJECTED: "bad",
  FAILED: "bad",
};

export function StatusBadge({ status }: { status: string }) {
  const tone = STATUS_TONE[status] ?? "muted";
  return (
    <span className={`dash-badge dash-badge--${tone}`}>{status.replace(/_/g, " ").toLowerCase()}</span>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="dash-stat">
      <p className="dash-stat__label">{label}</p>
      <p className="dash-stat__value">{value}</p>
      {hint && <p className="dash-stat__hint">{hint}</p>}
    </div>
  );
}

export function formatMoney(amount: number, currency: string): string {
  const symbol = currency === "GBP" ? "£" : currency === "USD" ? "$" : currency === "EUR" ? "€" : `${currency} `;
  return `${symbol}${amount.toFixed(2)}`;
}

export function formatDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
