import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageHeading, Panel, StatusBadge, formatDate, formatMoney } from "@/components/dashboard/ui";
import { InfoRequestPanel } from "@/components/dashboard/InfoRequestPanel";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { isPaymentSubmitted } from "@/lib/payment-status";
import { qrDataUrl } from "@/lib/server/qr";

export const dynamic = "force-dynamic";

export default async function CustomerOrderDetailPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?returnTo=${encodeURIComponent(`/dashboard/orders/${reference}`)}`);

  // Scoped by userId - another customer's reference simply does not exist here.
  const order = await prisma.order.findFirst({
    where: { publicReference: reference, userId: user.id },
    select: {
      publicReference: true,
      status: true,
      paymentStatus: true,
      amount: true,
      currency: true,
      createdAt: true,
      diditUrl: true,
      diditStatus: true,
      package: { select: { name: true } },
      application: { select: { status: true, submittedAt: true, reviewNote: true } },
      documents: {
        orderBy: { uploadedAt: "desc" },
        select: { id: true, kind: true, fileName: true, status: true, rejectionReason: true, uploadedAt: true },
      },
      history: {
        orderBy: { createdAt: "desc" },
        select: { id: true, toStatus: true, note: true, createdAt: true },
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
        },
      },
    },
  });

  if (!order) notFound();

  if (order.status === "DRAFT") redirect(`/payment/bank/${order.publicReference}`);

  const applicationStatus = order.application?.status ?? "NOT_STARTED";

  // Only offer the application while it is genuinely unfinished. Once submitted,
  // anything further is handled through specific staff requests instead.
  const canContinue =
    isPaymentSubmitted(order.paymentStatus) &&
    (applicationStatus === "NOT_STARTED" || applicationStatus === "IN_PROGRESS") &&
    ["AWAITING_APPLICATION", "APPLICATION_IN_PROGRESS"].includes(order.status);

  const openRequests = order.infoRequests.filter((r) => r.status === "OPEN");
  const verifyApproved = order.diditStatus === "Approved";
  const verifyQr = order.diditUrl && !verifyApproved ? await qrDataUrl(order.diditUrl) : null;

  return (
    <>
      <PageHeading
        eyebrow="Request"
        title={order.publicReference}
        description={order.package.name}
        action={
          canContinue ? (
            <Link href={`/application/${order.publicReference}`} className="button button-primary">
              Continue application
            </Link>
          ) : undefined
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

      {order.diditUrl && (
        <Panel className="mt-5">
          <p className="eyebrow">Identity verification</p>
          {verifyApproved ? (
            <p className="m-0 text-[14px] font-bold text-emerald">
              Your identity has been verified. Thank you.
            </p>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={verifyQr!}
                alt="QR code to verify your identity"
                width={150}
                height={150}
                className="shrink-0 rounded-lg border border-[color:var(--border)] p-2"
              />
              <div>
                <p className="mt-0 mb-3 text-[14px] text-[color:var(--muted)]">
                  Verify your identity with our partner Didit. Scan the QR code with your phone, or open the
                  secure link. Current status:{" "}
                  <strong>{(order.diditStatus ?? "not started").replace(/_/g, " ").toLowerCase()}</strong>.
                </p>
                <a
                  href={order.diditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary"
                >
                  Open verification
                </a>
              </div>
            </div>
          )}
        </Panel>
      )}

      {order.paymentStatus !== "PAID" && (
        <Panel className="mt-5">
          <p className="eyebrow">Payment</p>
          <p className="mt-0 mb-4 text-[14px] text-[color:var(--muted)]">
            {order.paymentStatus === "PENDING"
              ? "We have received your payment proof and are confirming your bank transfer. Confirmation usually follows within one working day."
              : "Complete your payment by bank transfer to continue. The bank details and payment-proof upload are on the payment page."}
          </p>
          <Link
            href={`/payment/bank/${order.publicReference}`}
            className={order.paymentStatus === "PENDING" ? "button button-light" : "button button-primary"}
          >
            {order.paymentStatus === "PENDING" ? "View payment details" : "Complete payment"}
          </Link>
        </Panel>
      )}

      {order.infoRequests.length > 0 && (
        <Panel className="mt-5">
          <p className="eyebrow">
            {openRequests.length > 0 ? "Action needed" : "Requests from our team"}
          </p>
          {openRequests.length > 0 && (
            <p className="mt-0 mb-4 text-[14px] text-[color:var(--muted)]">
              Your application is already submitted - just provide the item(s) below and we will
              continue the review.
            </p>
          )}
          <InfoRequestPanel
            orderRef={order.publicReference}
            requests={order.infoRequests.map((r) => ({
              id: r.id,
              kind: r.kind,
              message: r.message,
              documentLabel: r.documentLabel,
              status: r.status,
              responseText: r.responseText,
              createdAt: r.createdAt.toISOString(),
            }))}
          />
        </Panel>
      )}

      {order.application?.reviewNote && (
        <Panel className="mt-5">
          <p className="eyebrow">Reviewer note</p>
          <p className="m-0 text-[14.5px]">{order.application.reviewNote}</p>
        </Panel>
      )}

      <Panel className="mt-5">
        <p className="eyebrow">Documents</p>
        {order.documents.length === 0 ? (
          <p className="m-0 text-[14px] text-[color:var(--muted)]">No documents uploaded yet.</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>File</th>
                  <th>Status</th>
                  <th>Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {order.documents.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.kind.replace(/_/g, " ")}</td>
                    <td>{doc.fileName}</td>
                    <td>
                      <StatusBadge status={doc.status} />
                      {doc.rejectionReason && (
                        <span className="ml-2 text-[12.5px] text-[color:var(--muted)]">
                          {doc.rejectionReason}
                        </span>
                      )}
                    </td>
                    <td>{formatDate(doc.uploadedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Panel className="mt-5">
        <p className="eyebrow">Timeline</p>
        {order.history.length === 0 ? (
          <p className="m-0 text-[14px] text-[color:var(--muted)]">No status changes recorded yet.</p>
        ) : (
          <ul className="m-0 list-none space-y-3 p-0">
            {order.history.map((entry) => (
              <li key={entry.id} className="flex flex-wrap items-center gap-3">
                <StatusBadge status={entry.toStatus} />
                <span className="text-[13.5px] text-[color:var(--muted)]">
                  {formatDate(entry.createdAt)}
                </span>
                {entry.note && <span className="text-[13.5px]">{entry.note}</span>}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}
