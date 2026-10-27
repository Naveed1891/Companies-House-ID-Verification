import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { EmptyState, PageHeading, Panel, formatDate } from "@/components/dashboard/ui";
import { requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  await requireStaff();
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const page = Math.max(1, Number(params.page ?? "1") || 1);

  const where: Prisma.UserWhereInput = {
    role: "CUSTOMER",
    deletedAt: null,
    ...(query
      ? { OR: [{ email: { contains: query } }, { fullName: { contains: query } }] }
      : {}),
  };

  const [customers, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        fullName: true,
        email: true,
        country: true,
        createdAt: true,
        signupFollowUps: { select: { status: true } },
        // Only count placed orders - not DRAFT (not-yet-paid) selections.
        _count: {
          select: {
            orders: { where: { status: { not: "DRAFT" } } },
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <PageHeading
        eyebrow="Admin"
        title="Customers"
        description={`${total} customer${total === 1 ? "" : "s"}.`}
      />
      <Panel>
        <form className="mb-5 flex flex-wrap items-end gap-3" method="get">
          <label className="dash-label">
            Search
            <input className="dash-input" name="q" defaultValue={query} placeholder="Name or email" />
          </label>
          <button type="submit" className="dash-btn dash-btn--primary">
            Search
          </button>
          {query && (
            <Link href="/dashboard/admin/customers" className="dash-btn">
              Clear
            </Link>
          )}
        </form>

        {customers.length === 0 ? (
          <EmptyState title="No customers found" description="No customer accounts match this search." />
        ) : (
          <>
            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Requests</th>
                    <th>Follow-ups</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => {
                    const sent = customer.signupFollowUps.filter((item) => item.status === "SENT").length;
                    const failed = customer.signupFollowUps.filter((item) => item.status === "FAILED").length;
                    return (
                    <tr key={customer.id}>
                      <td>
                        <Link href={`/dashboard/admin/customers/${customer.id}`}>
                          {customer.fullName}
                        </Link>
                      </td>
                      <td>{customer.email}</td>
                      <td>{customer.country ?? "-"}</td>
                      <td>{customer._count.orders}</td>
                      <td>
                        <span className="dash-badge dash-badge--muted">
                          {sent} of 3 sent{failed > 0 ? ` · ${failed} failed` : ""}
                        </span>
                      </td>
                      <td>{formatDate(customer.createdAt)}</td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {pages > 1 && (
              <div className="mt-5 flex items-center gap-3">
                {page > 1 && (
                  <Link
                    className="dash-btn"
                    href={`/dashboard/admin/customers?page=${page - 1}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
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
                    href={`/dashboard/admin/customers?page=${page + 1}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
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
