import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeading, Panel, StatusBadge, formatDate, formatMoney } from "@/components/dashboard/ui";
import { requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireStaff();
  const { id } = await params;

  const customer = await prisma.user.findFirst({
    where: { id, role: "CUSTOMER", deletedAt: null },
    select: {
      id: true,
      fullName: true,
      email: true,
      whatsapp: true,
      country: true,
      status: true,
      createdAt: true,
      lastLoginAt: true,
      signupFollowUps: {
        orderBy: { sequence: "asc" },
        select: { id: true, sequence: true, status: true, subject: true, sentAt: true, error: true },
      },
      orders: {
        where: { status: { not: "DRAFT" } },
        orderBy: { createdAt: "desc" },
        select: {
          publicReference: true,
          status: true,
          paymentStatus: true,
          amount: true,
          currency: true,
          createdAt: true,
        },
      },
    },
  });

  if (!customer) notFound();

  const totalPaid = customer.orders
    .filter((o) => o.paymentStatus === "PAID")
    .reduce((sum, o) => sum + Number(o.amount), 0);
  const sentFollowUps = customer.signupFollowUps.filter((followUp) => followUp.status === "SENT").length;

  return (
    <>
      <PageHeading
        eyebrow="Customer"
        title={customer.fullName}
        description={customer.email}
        action={
          <Link href="/dashboard/admin/customers" className="dash-btn">
            ← All customers
          </Link>
        }
      />

      <Panel>
        <p className="eyebrow">Details</p>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <tbody>
              <tr>
                <th style={{ width: "30%" }}>Status</th>
                <td>
                  <StatusBadge status={customer.status} />
                </td>
              </tr>
              <tr>
                <th>WhatsApp</th>
                <td>{customer.whatsapp ?? "-"}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{customer.country ?? "-"}</td>
              </tr>
              <tr>
                <th>Joined</th>
                <td>{formatDate(customer.createdAt)}</td>
              </tr>
              <tr>
                <th>Last sign-in</th>
                <td>{customer.lastLoginAt ? formatDate(customer.lastLoginAt) : "Never"}</td>
              </tr>
              <tr>
                <th>Total paid</th>
                <td>{formatMoney(totalPaid, "GBP")}</td>
              </tr>
              <tr>
                <th>Signup follow-ups</th>
                <td>{sentFollowUps} of 3 sent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel className="mt-5">
        <p className="eyebrow">Signup follow-up emails</p>
        {customer.signupFollowUps.length === 0 ? (
          <p className="m-0 text-[14px] text-[color:var(--muted)]">No follow-up emails sent yet.</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr><th>Email</th><th>Subject</th><th>Status</th><th>Sent</th><th>Details</th></tr>
              </thead>
              <tbody>
                {customer.signupFollowUps.map((followUp) => (
                  <tr key={followUp.id}>
                    <td>Follow-up {followUp.sequence}</td>
                    <td>{followUp.subject}</td>
                    <td><StatusBadge status={followUp.status} /></td>
                    <td>{followUp.sentAt ? formatDate(followUp.sentAt) : "-"}</td>
                    <td>{followUp.error ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Panel className="mt-5">
        <p className="eyebrow">Requests</p>
        {customer.orders.length === 0 ? (
          <p className="m-0 text-[14px] text-[color:var(--muted)]">No requests yet.</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Amount</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {customer.orders.map((order) => (
                  <tr key={order.publicReference}>
                    <td>
                      <Link href={`/dashboard/admin/orders/${order.publicReference}`}>
                        {order.publicReference}
                      </Link>
                    </td>
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
