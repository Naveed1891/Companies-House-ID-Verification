import Link from "next/link";
import type { DocumentStatus, Prisma } from "@prisma/client";
import { EmptyState, PageHeading, Panel, StatusBadge, formatDate } from "@/components/dashboard/ui";
import { DocumentLink } from "@/components/dashboard/DocumentLink";
import { DocumentReview } from "@/components/dashboard/DocumentReview";
import { canReview, requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUSES: DocumentStatus[] = [
  "UPLOADED",
  "IN_REVIEW",
  "APPROVED",
  "REJECTED",
  "NEEDS_REUPLOAD",
];

export default async function AdminDocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const staff = await requireStaff();
  const params = await searchParams;
  const statusFilter = STATUSES.includes(params.status as DocumentStatus)
    ? (params.status as DocumentStatus)
    : undefined;
  const pendingOnly = params.status === "PENDING";

  const where: Prisma.DocumentWhereInput = statusFilter
    ? { status: statusFilter }
    : pendingOnly
      ? { status: { in: ["UPLOADED", "IN_REVIEW"] } }
      : {};

  const documents = await prisma.document.findMany({
    where,
    orderBy: { uploadedAt: "desc" },
    select: {
      id: true,
      kind: true,
      fileName: true,
      status: true,
      uploadedAt: true,
      rejectionReason: true,
      order: { select: { publicReference: true } },
      user: { select: { id: true, fullName: true, email: true } },
    },
  });

  const reviewable = canReview(staff.role);
  const folders = Array.from(
    documents.reduce((grouped, document) => {
      const folder = grouped.get(document.user.id);
      if (folder) folder.documents.push(document);
      else grouped.set(document.user.id, { user: document.user, documents: [document] });
      return grouped;
    }, new Map<string, { user: (typeof documents)[number]["user"]; documents: typeof documents }>()),
  )
    .map(([, folder]) => ({
      ...folder,
      documents: folder.documents.sort(
        (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime() || a.fileName.localeCompare(b.fileName),
      ),
    }))
    .sort((a, b) => a.user.fullName.localeCompare(b.user.fullName, undefined, { sensitivity: "base" }) || a.user.email.localeCompare(b.user.email));

  return (
    <>
      <PageHeading
        eyebrow="Admin"
        title="Documents"
        description="Browse secure client folders and review identity documents submitted by customers."
      />
      <Panel>
        <div className="mb-5 flex flex-wrap gap-2">
          <Link href="/dashboard/admin/documents" className={`dash-btn ${!statusFilter && !pendingOnly ? "dash-btn--primary" : ""}`}>All documents</Link>
          <Link href="/dashboard/admin/documents?status=PENDING" className={`dash-btn ${pendingOnly ? "dash-btn--primary" : ""}`}>Pending review</Link>
          {STATUSES.map((status) => (
            <Link
              key={status}
              href={`/dashboard/admin/documents?status=${status}`}
              className={`dash-btn ${statusFilter === status ? "dash-btn--primary" : ""}`}
            >
              {status.replace(/_/g, " ").toLowerCase()}
            </Link>
          ))}
        </div>

        {folders.length === 0 ? (
          <EmptyState title="No client folders" description="No documents match this filter." />
        ) : (
          <div className="space-y-4">
            {folders.map((folder, index) => (
              <details key={folder.user.id} className="overflow-hidden rounded-xl border border-[color:var(--border)] bg-white" open={folders.length === 1 || index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-[color:var(--surface-muted)] px-5 py-4 marker:content-none">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">📁</span>
                    <span className="min-w-0">
                      <Link href={`/dashboard/admin/customers/${folder.user.id}`} className="block truncate font-extrabold text-[color:var(--ink)]">{folder.user.fullName}</Link>
                      <span className="block truncate text-[12px] text-[color:var(--muted)]">{folder.user.email}</span>
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[12px] font-bold text-[color:var(--muted)]">{folder.documents.length} {folder.documents.length === 1 ? "document" : "documents"}</span>
                </summary>
                <div className="dash-table-wrap border-t border-[color:var(--border)]">
                  <table className="dash-table">
                    <thead><tr><th>Type</th><th>File</th><th>Request</th><th>Status</th><th>Uploaded</th><th>Actions</th></tr></thead>
                    <tbody>
                      {folder.documents.map((doc) => (
                        <tr key={doc.id}>
                          <td>{doc.kind.replace(/_/g, " ")}</td>
                          <td><strong>{doc.fileName}</strong></td>
                          <td><Link href={`/dashboard/admin/orders/${doc.order.publicReference}`}>{doc.order.publicReference}</Link></td>
                          <td><StatusBadge status={doc.status} />{doc.rejectionReason && <span className="block text-[12px] text-[color:var(--muted)]">{doc.rejectionReason}</span>}</td>
                          <td>{formatDate(doc.uploadedAt)}</td>
                          <td><div className="flex flex-wrap gap-2"><DocumentLink documentId={doc.id} />{reviewable && (doc.status === "UPLOADED" || doc.status === "IN_REVIEW") && <DocumentReview documentId={doc.id} />}</div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ))}
          </div>
        )}
      </Panel>
    </>
  );
}
