import Link from "next/link";
import { PageHeading, Panel, StatCard, StatusBadge, formatDate, formatMoney } from "@/components/dashboard/ui";
import { requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const OPEN_STATUSES = [
  "PENDING_PAYMENT",
  "AWAITING_APPLICATION",
  "APPLICATION_IN_PROGRESS",
  "SUBMITTED",
  "UNDER_REVIEW",
  "AWAITING_CUSTOMER",
  "ADDITIONAL_INFO_REQUIRED",
  "PROCESSING",
] as const;

export default async function AdminOverviewPage() {
  await requireStaff();

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const [openOrders, awaitingReview, pendingDocs, completed, revenue, recent] = await Promise.all([
    prisma.order.count({ where: { status: { in: [...OPEN_STATUSES] } } }),
    prisma.application.count({ where: { status: "SUBMITTED" } }),
    prisma.document.count({ where: { status: { in: ["UPLOADED", "IN_REVIEW"] } } }),
    prisma.order.count({ where: { status: "COMPLETED" } }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "PAID", createdAt: { gte: since } },
    }),
    prisma.order.findMany({
      where: { status: { not: "DRAFT" } },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        publicReference: true,
        status: true,
        amount: true,
        currency: true,
        createdAt: true,
        user: { select: { fullName: true, email: true } },
      },
    }),
  ]);

  const revenue30 = Number(revenue._sum.amount ?? 0);

  return (
    <>
      <PageHeading
        eyebrow="Admin"
        title="Operations overview"
        description="Companies House ID Verification verification activity at a glance."
      />

      <div className="dash-grid">
        <StatCard label="Open orders" value={openOrders} />
        <StatCard label="Awaiting review" value={awaitingReview} hint="Applications submitted" />
        <StatCard label="Documents pending" value={pendingDocs} />
        <StatCard label="Completed" value={completed} />
        <StatCard label="Revenue (30 days)" value={formatMoney(revenue30, "GBP")} />
      </div>

      <Panel className="mt-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow m-0">Recent orders</p>
          <Link href="/dashboard/admin/orders" className="text-[13.5px] font-bold text-emerald">
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="m-0 text-[14px] text-[color:var(--muted)]">No orders yet.</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((order) => (
                  <tr key={order.publicReference}>
                    <td>
                      <Link href={`/dashboard/admin/orders/${order.publicReference}`}>
                        {order.publicReference}
                      </Link>
                    </td>
                    <td>
                      {order.user.fullName}
                      <span className="block text-[12.5px] text-[color:var(--muted)]">
                        {order.user.email}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td>{formatMoney(Number(order.amount), order.currency)}</td>
                    <td>{formatDate(order.createdAt)}</td>
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
