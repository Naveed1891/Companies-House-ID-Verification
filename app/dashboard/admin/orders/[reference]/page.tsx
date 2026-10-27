import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeading, Panel, StatusBadge, formatDate, formatMoney } from "@/components/dashboard/ui";
import { DocumentLink } from "@/components/dashboard/DocumentLink";
import { OrderAdminControls } from "@/components/dashboard/OrderAdminControls";
import { canWrite, requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";
import { renderAnswerValue } from "@/lib/verification-form/answers-display";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const staff = await requireStaff();
  const { reference } = await params;

  const order = await prisma.order.findFirst({
    where: { publicReference: reference },
    select: {
      id: true,
      publicReference: true,
      status: true,
      paymentStatus: true,
      amount: true,
      currency: true,
      createdAt: true,
      user: { select: { id: true, fullName: true, email: true, whatsapp: true, country: true } },
      package: { select: { name: true } },
      assignedTo: { select: { id: true, fullName: true } },
      application: {
        select: { status: true, answers: true, submittedAt: true, reviewNote: true, declarationAccepted: true },
      },
      documents: {
        orderBy: { uploadedAt: "desc" },
        select: { id: true, kind: true, fileName: true, status: true, rejectionReason: true, uploadedAt: true },
      },
      history: {
        orderBy: { createdAt: "desc" },
        select: { id: true, toStatus: true, note: true, createdAt: true },
      },
      notes: {
        orderBy: { createdAt: "desc" },
        select: { id: true, body: true, createdAt: true, author: { select: { fullName: true } } },
      },
      infoRequests: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          kind: true,
          message: true,
          documentLabel: true,
          status: true,
          responseText: true,
          createdAt: true,
          resolvedAt: true,
        },
      },
    },
  });

  if (!order) notFound();

  const staffList = await prisma.user.findMany({
    where: { role: { not: "CUSTOMER" }, status: "ACTIVE", deletedAt: null },
    select: { id: true, fullName: true },
    orderBy: { fullName: "asc" },
  });

  const answers = (order.application?.answers ?? {}) as Record<string, unknown>;
  const writable = canWrite(staff.role);

  return (
    <>
      <PageHeading
        eyebrow="Order"
        title={order.publicReference}
        description={`${order.package.name} · ${order.user.fullName}`}
        action={
          <Link href="/dashboard/admin/orders" className="dash-btn">
            ← All orders
          </Link>
        }
      />

      <div className="dash-grid">
        <div className="dash-stat">
          <p className="dash-stat__label">Status</p>
          <p className="mt-3 mb-0">
            <StatusBadge status={order.status} />
          </p>
        </div>
        <div className="dash-stat">
          <p className="dash-stat__label">Payment</p>
          <p className="mt-3 mb-0">
            <StatusBadge status={order.paymentStatus} />
          </p>
        </div>
        <div className="dash-stat">
          <p className="dash-stat__label">Amount</p>
          <p className="dash-stat__value">{formatMoney(Number(order.amount), order.currency)}</p>
        </div>
        <div className="dash-stat">
          <p className="dash-stat__label">Created</p>
          <p className="dash-stat__value" style={{ fontSize: "1.15rem" }}>
            {formatDate(order.createdAt)}
          </p>
        </div>
      </div>

      <Panel className="mt-5">
        <p className="eyebrow">Customer</p>
        <div className="grid gap-2 text-[14px]">
          <p className="m-0">
            <strong>{order.user.fullName}</strong>
          </p>
          <p className="m-0 text-[color:var(--muted)]">{order.user.email}</p>
          {order.user.whatsapp && <p className="m-0 text-[color:var(--muted)]">{order.user.whatsapp}</p>}
          {order.user.country && <p className="m-0 text-[color:var(--muted)]">{order.user.country}</p>}
          <Link
            href={`/dashboard/admin/customers/${order.user.id}`}
            className="text-[13.5px] font-bold text-emerald"
          >
            View customer →
          </Link>
        </div>
      </Panel>

      {writable && (
        <Panel className="mt-5">
          <p className="eyebrow">Manage</p>
          <OrderAdminControls
            reference={order.publicReference}
            currentStatus={order.status}
            paymentStatus={order.paymentStatus}
            assignedToId={order.assignedTo?.id ?? ""}
            staff={staffList}
          />
        </Panel>
      )}

      {order.infoRequests.length > 0 && (
        <Panel className="mt-5">
          <p className="eyebrow">Requests to customer</p>
          <ul className="m-0 list-none space-y-3 p-0">
            {order.infoRequests.map((req) => (
              <li key={req.id} className="border-b border-[color:var(--border)] pb-3 last:border-0">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={req.status} />
                  <span className="dash-badge dash-badge--muted">
                    {req.kind === "DOCUMENT" ? req.documentLabel ?? "Document" : "Information"}
                  </span>
                  <span className="text-[12.5px] text-[color:var(--muted)]">
                    {formatDate(req.createdAt)}
                  </span>
                </div>
                <p className="mt-2 mb-0 text-[14px]">{req.message}</p>
                {req.responseText && (
                  <p className="mt-1 mb-0 text-[13.5px] text-[color:var(--muted)] whitespace-pre-wrap">
                    Customer replied: {req.responseText}
                  </p>
                )}
                {req.status === "RESOLVED" && req.resolvedAt && (
                  <p className="mt-1 mb-0 text-[12.5px] text-[color:var(--muted)]">
                    Provided {formatDate(req.resolvedAt)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel className="mt-5">
        <p className="eyebrow">Application</p>
        {!order.application || order.application.status === "NOT_STARTED" ? (
          <p className="m-0 text-[14px] text-[color:var(--muted)]">Not started.</p>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <StatusBadge status={order.application.status} />
              {order.application.submittedAt && (
                <span className="text-[13px] text-[color:var(--muted)]">
                  Submitted {formatDate(order.application.submittedAt)}
                </span>
              )}
              <span className="text-[13px] text-[color:var(--muted)]">
                Declaration {order.application.declarationAccepted ? "accepted" : "not accepted"}
              </span>
            </div>
            {Object.keys(answers).length === 0 ? (
              <p className="m-0 text-[14px] text-[color:var(--muted)]">No answers recorded.</p>
            ) : (
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <tbody>
                    {Object.entries(answers).map(([key, value]) => (
                      <tr key={key}>
                        <th style={{ width: "34%" }}>{key.replace(/([A-Z])/g, " $1").toLowerCase()}</th>
                        <td>{renderAnswerValue(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Panel>

      <Panel className="mt-5">
        <p className="eyebrow">Documents</p>
        {order.documents.length === 0 ? (
          <p className="m-0 text-[14px] text-[color:var(--muted)]">No documents uploaded.</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>File</th>
                  <th>Status</th>
                  <th>Uploaded</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {order.documents.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.kind.replace(/_/g, " ")}</td>
                    <td>{doc.fileName}</td>
                    <td>
                      <StatusBadge status={doc.status} />
                    </td>
                    <td>{formatDate(doc.uploadedAt)}</td>
                    <td>
                      <DocumentLink documentId={doc.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Panel className="mt-5">
        <p className="eyebrow">Internal notes</p>
        <p className="mb-3 text-[12.5px] text-[color:var(--muted)]">
          Staff only - never shown to the customer.
        </p>
        {order.notes.length === 0 ? (
          <p className="m-0 text-[14px] text-[color:var(--muted)]">No notes yet.</p>
        ) : (
          <ul className="m-0 list-none space-y-3 p-0">
            {order.notes.map((note) => (
              <li key={note.id} className="border-b border-[color:var(--border)] pb-3 last:border-0">
                <p className="m-0 text-[14px]">{note.body}</p>
                <p className="mt-1 mb-0 text-[12.5px] text-[color:var(--muted)]">
                  {note.author.fullName} · {formatDate(note.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel className="mt-5">
        <p className="eyebrow">Timeline</p>
        {order.history.length === 0 ? (
          <p className="m-0 text-[14px] text-[color:var(--muted)]">No status changes recorded.</p>
        ) : (
          <ul className="m-0 list-none space-y-3 p-0">
            {order.history.map((entry) => (
              <li key={entry.id} className="flex flex-wrap items-center gap-3">
                <StatusBadge status={entry.toStatus} />
                <span className="text-[13px] text-[color:var(--muted)]">{formatDate(entry.createdAt)}</span>
                {entry.note && <span className="text-[13.5px]">{entry.note}</span>}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}
