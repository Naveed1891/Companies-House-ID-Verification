import Link from "next/link";
import type { OrderStatus, Prisma } from "@prisma/client";
import { EmptyState, PageHeading, Panel, StatusBadge, formatDate, formatMoney } from "@/components/dashboard/ui";
import { requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUSES: OrderStatus[] = [
  "PENDING_PAYMENT",
  "PAYMENT_CONFIRMED",
  "AWAITING_APPLICATION",
  "APPLICATION_IN_PROGRESS",
  "SUBMITTED",
  "UNDER_REVIEW",
  "AWAITING_CUSTOMER",
  "ADDITIONAL_INFO_REQUIRED",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
  "REFUNDED",
];

const PAGE_SIZE = 25;

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>;
}) {
  await requireStaff();
  const params = await searchParams;

  const statusFilter = STATUSES.includes(params.status as OrderStatus)
    ? (params.status as OrderStatus)
    : undefined;
  const query = params.q?.trim() ?? "";
  const page = Math.max(1, Number(params.page ?? "1") || 1);

  const where: Prisma.OrderWhereInput = {
    // DRAFT orders are not-yet-placed selections and never appear here. When a
    // specific status is chosen it is applied directly (DRAFT is not offered).
    ...(statusFilter ? { status: statusFilter } : { status: { not: "DRAFT" } }),
    ...(query
      ? {
          OR: [
            { publicReference: { contains: query } },
            { user: { is: { email: { contains: query } } } },
            { user: { is: { fullName: { contains: query } } } },
          ],
        }
      : {}),
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        publicReference: true,
        status: true,
        paymentStatus: true,
        amount: true,
        currency: true,
        createdAt: true,
        user: { select: { fullName: true, email: true } },
        assignedTo: { select: { fullName: true } },
      },
    }),
    prisma.order.count({ where }),
  ]);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <PageHeading
        eyebrow="Admin"
        title="Orders"
        description={`${total} order${total === 1 ? "" : "s"} total.`}
      />

      <Panel>
        <form className="mb-5 flex flex-wrap items-end gap-3" method="get">
          <label className="dash-label">
            Search
            <input
              className="dash-input"
              name="q"
              defaultValue={query}
              placeholder="Reference, name or email"
            />
          </label>
          <label className="dash-label">
            Status
            <select className="dash-input" name="status" defaultValue={statusFilter ?? ""}>
              <option value="">All statuses</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.replace(/_/g, " ").toLowerCase()}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="dash-btn dash-btn--primary">
            Apply
          </button>
          {(query || statusFilter) && (
            <Link href="/dashboard/admin/orders" className="dash-btn">
              Clear
            </Link>
          )}
        </form>

        {orders.length === 0 ? (
          <EmptyState
            title="No orders found"
            description={
              query || statusFilter
                ? "No orders match these filters. Try clearing them."
                : "Orders will appear here once customers start verifications."
            }
          />
        ) : (
          <>
            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Assigned</th>
                    <th>Amount</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
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
                      <td>
                        <StatusBadge status={order.paymentStatus} />
                      </td>
                      <td className="text-[13px]">{order.assignedTo?.fullName ?? "-"}</td>
                      <td>{formatMoney(Number(order.amount), order.currency)}</td>
                      <td>{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pages > 1 && (
              <div className="mt-5 flex items-center gap-3">
                {page > 1 && (
                  <Link
                    className="dash-btn"
                    href={`/dashboard/admin/orders?page=${page - 1}${statusFilter ? `&status=${statusFilter}` : ""}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                  >
                    ← Previous
                  </Link>
                )}
                <span className="text-[13px] text-[color:var(--muted)]">
                  Page {page} of {pages}
                </span>
                {page < pages && (
                  <Link
                    className="dash-btn"
                    href={`/dashboard/admin/orders?page=${page + 1}${statusFilter ? `&status=${statusFilter}` : ""}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                  >
                    Next →
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </Panel>
    </>
  );
}
