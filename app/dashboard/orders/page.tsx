import Link from "next/link";
import { redirect } from "next/navigation";
import { EmptyState, PageHeading, Panel, StatusBadge, formatDate, formatMoney } from "@/components/dashboard/ui";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CustomerOrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?returnTo=%2Fdashboard%2Forders");

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      publicReference: true,
      status: true,
      paymentStatus: true,
      amount: true,
      currency: true,
      createdAt: true,
      package: { select: { name: true } },
    },
  });

  return (
    <>
      <PageHeading
        eyebrow="My requests"
        title="Verification requests"
        description="Every verification you have started, with its current status."
      />
      <Panel>
        {orders.length === 0 ? (
          <EmptyState
            title="No requests yet"
            description="When you start a verification it will appear here with its progress."
            actionLabel="Start verification"
            actionHref="/pricing"
          />
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Amount</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.publicReference}>
                    <td>
                      <Link href={`/dashboard/orders/${order.publicReference}`}>
                        {order.publicReference}
                      </Link>
                    </td>
                    <td>{order.package.name}</td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td>
                      <StatusBadge status={order.paymentStatus} />
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
