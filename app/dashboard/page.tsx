import Link from "next/link";
import { redirect } from "next/navigation";
import { EmptyState, PageHeading, Panel, StatCard, StatusBadge, formatDate, formatMoney } from "@/components/dashboard/ui";
import { getCurrentStaff, getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type OrderRow = {
  publicReference: string;
  status: string;
  paymentStatus: string;
  diditUrl: string | null;
  diditStatus: string | null;
  amount: unknown;
  currency: string;
  createdAt: Date;
  package: { name: string };
};

type Section = "action" | "progress" | "done";
type Classified = { section: Section; title: string; href?: string; cta?: string };

/**
 * Decide what (if anything) the customer needs to do next for one order,
 * considering payment, application and identity-verification state together.
 */
function classify(o: OrderRow): Classified {
  const ref = o.publicReference;
  if (o.status === "COMPLETED") return { section: "done", title: "Verification complete." };
  if (o.status === "CANCELLED") return { section: "done", title: "Cancelled." };
  if (o.status === "REFUNDED") return { section: "done", title: "Refunded." };

  // The application comes first. Unpaid drafts resume there and prompt for
  // payment only after the form has been completed and saved.
  if (o.paymentStatus === "UNPAID") {
    return { section: "action", title: "Finish your verification application.", href: `/application/${ref}`, cta: "Continue application" };
  }

  // Application still to be completed.
  if (o.status === "AWAITING_APPLICATION") {
    return { section: "action", title: "Complete your verification application.", href: `/application/${ref}`, cta: "Continue application" };
  }
  if (o.status === "APPLICATION_IN_PROGRESS") {
    return { section: "action", title: "Finish your verification application.", href: `/application/${ref}`, cta: "Continue application" };
  }
  if (o.status === "ADDITIONAL_INFO_REQUIRED" || o.status === "AWAITING_CUSTOMER") {
    return { section: "action", title: "We need some more information from you.", href: `/dashboard/orders/${ref}`, cta: "Open request" };
  }

  // Application submitted: identity verification is the customer's next action.
  if (o.diditUrl && o.diditStatus !== "Approved") {
    return { section: "action", title: "Verify your identity to finish.", href: `/dashboard/orders/${ref}`, cta: "Verify identity" };
  }

  // Otherwise it is with our team.
  if (o.paymentStatus === "PENDING") {
    return { section: "progress", title: "Payment received - we are confirming your bank transfer." };
  }
  if (o.status === "PROCESSING") return { section: "progress", title: "Being processed." };
  return { section: "progress", title: "Submitted - under review by our team." };
}

export default async function CustomerOverviewPage() {
  // Staff landing on /dashboard belong in the admin area.
  const staff = await getCurrentStaff();
  if (staff) redirect("/dashboard/admin");

  const user = await getCurrentUser();
  if (!user) redirect("/login?returnTo=%2Fdashboard");

  const [orders, unread, documents] = await Promise.all([
    prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        publicReference: true,
        status: true,
        paymentStatus: true,
        diditUrl: true,
        diditStatus: true,
        amount: true,
        currency: true,
        createdAt: true,
        package: { select: { name: true } },
      },
    }),
    prisma.notification.count({ where: { userId: user.id, readAt: null } }),
    prisma.document.count({ where: { userId: user.id } }),
  ]);

  const items = orders.map((order) => ({ order, ...classify(order as OrderRow) }));
  const actionItems = items.filter((i) => i.section === "action");
  const progressItems = items.filter((i) => i.section === "progress");

  return (
    <>
      <PageHeading
        eyebrow="Dashboard"
        title={`Welcome back, ${user.fullName.split(" ")[0]}`}
        description="Track your Companies House identity verification here."
      />

      <div className="dash-grid">
        <StatCard label="Requests" value={orders.length} />
        <StatCard label="Documents" value={documents} />
        <StatCard label="Unread notifications" value={unread} />
      </div>

      {actionItems.length > 0 && (
        <Panel className="mt-5">
          <p className="eyebrow">Action needed</p>
          <p className="mt-0 mb-3 text-[13px] text-[color:var(--muted)]">
            {actionItems.length === 1
              ? "One request needs your attention."
              : `${actionItems.length} requests need your attention.`}
          </p>
          <ul className="m-0 list-none p-0">
            {actionItems.map(({ order, title, href, cta }) => (
              <li
                key={order.publicReference}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border)] py-4 last:border-0"
              >
                <div className="min-w-0">
                  <p className="m-0 text-[15px] font-bold">{title}</p>
                  <p className="m-0 mt-0.5 text-[12.5px] text-[color:var(--muted)]">
                    {order.package.name} · {order.publicReference}
                  </p>
                </div>
                {href && cta && (
                  <Link href={href} className="dash-btn dash-btn--primary shrink-0">
                    {cta}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {progressItems.length > 0 && (
        <Panel className="mt-5">
          <p className="eyebrow">In progress</p>
          <ul className="m-0 list-none p-0">
            {progressItems.map(({ order, title }) => (
              <li
                key={order.publicReference}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border)] py-4 last:border-0"
              >
                <div className="min-w-0">
                  <p className="m-0 text-[14.5px] font-semibold">{title}</p>
                  <p className="m-0 mt-0.5 text-[12.5px] text-[color:var(--muted)]">
                    {order.package.name} · {order.publicReference}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <StatusBadge status={order.status} />
                  <Link href={`/dashboard/orders/${order.publicReference}`} className="dash-btn">
                    View
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel className="mt-5">
        <p className="eyebrow">All requests</p>
        {orders.length === 0 ? (
          <EmptyState
            title="No requests yet"
            description="Start your Companies House identity verification and it will appear here."
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
