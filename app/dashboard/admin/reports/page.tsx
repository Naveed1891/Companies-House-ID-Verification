import Link from "next/link";
import { PageHeading, Panel, StatCard, formatMoney } from "@/components/dashboard/ui";
import { requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function parseDate(value: string | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default async function AdminReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  await requireStaff();
  const params = await searchParams;

  const defaultFrom = new Date();
  defaultFrom.setDate(defaultFrom.getDate() - 30);
  const from = parseDate(params.from, defaultFrom);
  const to = parseDate(params.to, new Date());
  to.setHours(23, 59, 59, 999);

  const range = { gte: from, lte: to };

  const [orders, byStatus, revenue, completed] = await Promise.all([
    prisma.order.count({ where: { status: { not: "DRAFT" }, createdAt: range } }),
    prisma.order.groupBy({
      by: ["status"],
      _count: { _all: true },
      where: { status: { not: "DRAFT" }, createdAt: range },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "PAID", createdAt: range },
    }),
    prisma.order.findMany({
      where: { status: "COMPLETED", completedAt: { not: null }, createdAt: range },
      select: { createdAt: true, completedAt: true },
    }),
  ]);

  const turnaroundHours =
    completed.length === 0
      ? null
      : completed.reduce(
          (sum, o) => sum + (o.completedAt!.getTime() - o.createdAt.getTime()) / 3_600_000,
          0,
        ) / completed.length;

  const fromValue = from.toISOString().slice(0, 10);
  const toValue = to.toISOString().slice(0, 10);

  return (
    <>
      <PageHeading
        eyebrow="Admin"
        title="Reports"
        description="Volume, revenue and turnaround."
        action={
          <Link
            href={`/api/admin/reports/orders.csv?from=${fromValue}&to=${toValue}`}
            className="dash-btn"
            prefetch={false}
          >
            Export CSV
          </Link>
        }
      />

      <Panel className="mb-5">
        <form className="flex flex-wrap items-end gap-3" method="get">
          <label className="dash-label">
            From
            <input className="dash-input" type="date" name="from" defaultValue={fromValue} />
          </label>
          <label className="dash-label">
            To
            <input className="dash-input" type="date" name="to" defaultValue={toValue} />
          </label>
          <button type="submit" className="dash-btn dash-btn--primary">
            Apply
          </button>
        </form>
      </Panel>

      <div className="dash-grid">
        <StatCard label="Orders" value={orders} />
        <StatCard label="Revenue" value={formatMoney(Number(revenue._sum.amount ?? 0), "GBP")} />
        <StatCard label="Completed" value={completed.length} />
        <StatCard
          label="Avg turnaround"
          value={turnaroundHours === null ? "-" : `${turnaroundHours.toFixed(1)}h`}
          hint="Created to completed"
        />
      </div>

      <Panel className="mt-5">
        <p className="eyebrow">Orders by status</p>
        {byStatus.length === 0 ? (
          <p className="m-0 text-[14px] text-[color:var(--muted)]">No orders in this period.</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {byStatus.map((row) => (
                  <tr key={row.status}>
                    <td>{row.status.replace(/_/g, " ").toLowerCase()}</td>
                    <td>{row._count._all}</td>
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
