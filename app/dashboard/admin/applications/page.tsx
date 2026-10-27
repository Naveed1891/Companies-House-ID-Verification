import Link from "next/link";
import type { ApplicationStatus, Prisma } from "@prisma/client";
import { EmptyState, PageHeading, Panel, StatusBadge, formatDate } from "@/components/dashboard/ui";
import { requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUSES: ApplicationStatus[] = [
  "NOT_STARTED",
  "IN_PROGRESS",
  "SUBMITTED",
  "APPROVED",
  "REJECTED",
];

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireStaff();
  const params = await searchParams;
  const statusFilter = STATUSES.includes(params.status as ApplicationStatus)
    ? (params.status as ApplicationStatus)
    : undefined;

  const where: Prisma.ApplicationWhereInput = statusFilter ? { status: statusFilter } : {};

  const applications = await prisma.application.findMany({
    where,
    orderBy: [{ submittedAt: "desc" }, { updatedAt: "desc" }],
    take: 100,
    select: {
      id: true,
      status: true,
      submittedAt: true,
      order: {
        select: {
          publicReference: true,
          status: true,
          paymentStatus: true,
          user: { select: { fullName: true, email: true } },
        },
      },
    },
  });

  return (
    <>
      <PageHeading
        eyebrow="Admin"
        title="Applications"
        description="Review submitted verification applications."
      />
      <Panel>
        <div className="mb-5 flex flex-wrap gap-2">
          <Link
            href="/dashboard/admin/applications"
            className={`dash-btn ${!statusFilter ? "dash-btn--primary" : ""}`}
          >
            All
          </Link>
          {STATUSES.map((status) => (
            <Link
              key={status}
              href={`/dashboard/admin/applications?status=${status}`}
              className={`dash-btn ${statusFilter === status ? "dash-btn--primary" : ""}`}
            >
              {status.replace(/_/g, " ").toLowerCase()}
            </Link>
          ))}
        </div>

        {applications.length === 0 ? (
          <EmptyState
            title="Nothing to review"
            description="No applications match this filter."
          />
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Processing</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <Link href={`/dashboard/admin/orders/${application.order.publicReference}`}>
                        {application.order.publicReference}
                      </Link>
                    </td>
                    <td>
                      {application.order.user.fullName}
                      <span className="block text-[12.5px] text-[color:var(--muted)]">
                        {application.order.user.email}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={application.status} />
                    </td>
                    <td><StatusBadge status={application.order.paymentStatus} /></td>
                    <td><StatusBadge status={application.order.status} /></td>
                    <td>{application.submittedAt ? formatDate(application.submittedAt) : "-"}</td>
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
