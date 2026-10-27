import Link from "next/link";
import { redirect } from "next/navigation";
import { EmptyState, PageHeading, Panel, StatusBadge, formatDate } from "@/components/dashboard/ui";
import { DocumentLink } from "@/components/dashboard/DocumentLink";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CustomerDocumentsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?returnTo=%2Fdashboard%2Fdocuments");

  const documents = await prisma.document.findMany({
    where: { userId: user.id },
    orderBy: { uploadedAt: "desc" },
    select: {
      id: true,
      kind: true,
      fileName: true,
      status: true,
      rejectionReason: true,
      uploadedAt: true,
      order: { select: { publicReference: true } },
    },
  });

  const needsAction = documents.filter(
    (doc) => doc.status === "REJECTED" || doc.status === "NEEDS_REUPLOAD",
  );

  return (
    <>
      <PageHeading
        eyebrow="Documents"
        title="Your documents"
        description="Everything you have uploaded, and anything we still need."
      />

      {needsAction.length > 0 && (
        <Panel className="mb-5">
          <p className="eyebrow">Action needed</p>
          <p className="m-0 text-[14.5px]">
            {needsAction.length} document{needsAction.length > 1 ? "s need" : " needs"} to be uploaded
            again. Open the request below to replace {needsAction.length > 1 ? "them" : "it"}.
          </p>
        </Panel>
      )}

      <Panel>
        {documents.length === 0 ? (
          <EmptyState
            title="No documents yet"
            description="Once you reach the document step of your application, your uploads appear here."
            actionLabel="View my requests"
            actionHref="/dashboard/orders"
          />
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>File</th>
                  <th>Request</th>
                  <th>Status</th>
                  <th>Uploaded</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.kind.replace(/_/g, " ")}</td>
                    <td>{doc.fileName}</td>
                    <td>
                      <Link href={`/dashboard/orders/${doc.order.publicReference}`}>
                        {doc.order.publicReference}
                      </Link>
                    </td>
                    <td>
                      <StatusBadge status={doc.status} />
                      {doc.rejectionReason && (
                        <span className="ml-2 text-[12.5px] text-[color:var(--muted)]">
                          {doc.rejectionReason}
                        </span>
                      )}
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
    </>
  );
}
