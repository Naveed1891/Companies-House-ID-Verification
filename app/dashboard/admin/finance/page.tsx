import Link from "next/link";
import { EmptyState, PageHeading, Panel, StatCard, StatusBadge, formatDate, formatMoney } from "@/components/dashboard/ui";
import { RefundControl } from "@/components/dashboard/RefundControl";
import { canRefund, requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminFinancePage() {
  const staff = await requireStaff();

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const [payments, totals, refundTotals] = await Promise.all([
    prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        createdAt: true,
        providerPaymentId: true,
        order: {
          select: { publicReference: true, status: true, user: { select: { fullName: true, email: true } } },
        },
        refunds: { select: { id: true, amount: true, status: true, createdAt: true } },
      },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      _count: true,
      where: { status: "PAID" },
    }),
    prisma.refund.aggregate({ _sum: { amount: true }, where: { status: "COMPLETED" } }),
  ]);

  const recent = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: "PAID", createdAt: { gte: since } },
  });

  const gross = Number(totals._sum.amount ?? 0);
  const refunded = Number(refundTotals._sum.amount ?? 0);
  const allowRefund = canRefund(staff.role);

  return (
    <>
      <PageHeading
        eyebrow="Admin"
        title="Finance"
        description="Payments, refunds and revenue."
        action={
          <Link href="/api/admin/reports/payments.csv" className="dash-btn" prefetch={false}>
            Export CSV
          </Link>
        }
      />

      <div className="dash-grid">
        <StatCard label="Gross revenue" value={formatMoney(gross, "GBP")} hint={`${totals._count} payments`} />
        <StatCard label="Last 30 days" value={formatMoney(Number(recent._sum.amount ?? 0), "GBP")} />
        <StatCard label="Refunded" value={formatMoney(refunded, "GBP")} />
        <StatCard label="Net" value={formatMoney(gross - refunded, "GBP")} />
      </div>

      <Panel className="mt-5">
        <p className="eyebrow">Payments</p>
        {payments.length === 0 ? (
          <EmptyState title="No payments yet" description="Payments appear here once customers check out." />
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Request</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Application</th>
                  <th>Date</th>
                  {allowRefund && <th />}
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => {
                  const refundedAmount = payment.refunds
                    .filter((r) => r.status === "COMPLETED" || r.status === "PENDING")
                    .reduce((sum, r) => sum + Number(r.amount), 0);
                  const remaining = Number(payment.amount) - refundedAmount;
                  return (
                    <tr key={payment.id}>
                      <td>
                        <Link href={`/dashboard/admin/orders/${payment.order.publicReference}`}>
                          {payment.order.publicReference}
                        </Link>
                      </td>
                      <td>
                        {payment.order.user.fullName}
                        <span className="block text-[12.5px] text-[color:var(--muted)]">
                          {payment.order.user.email}
                        </span>
                      </td>
                      <td>
                        {formatMoney(Number(payment.amount), payment.currency)}
                        {refundedAmount > 0 && (
                          <span className="block text-[12px] text-[color:var(--muted)]">
                            −{formatMoney(refundedAmount, payment.currency)} refunded
                          </span>
                        )}
                      </td>
                      <td>
                        <StatusBadge status={payment.status} />
                      </td>
                      <td><StatusBadge status={payment.order.status} /></td>
                      <td>{formatDate(payment.createdAt)}</td>
                      {allowRefund && (
                        <td>
                          {payment.status === "PAID" && remaining > 0 ? (
                            <RefundControl paymentId={payment.id} maxAmount={remaining} />
                          ) : (
                            <span className="text-[12.5px] text-[color:var(--muted)]">-</span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </>
  );
}
