import Link from "next/link";
import { EmptyState, PageHeading, Panel, formatDate } from "@/components/dashboard/ui";
import { requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

export default async function AdminAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  await requireStaff();
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const query = params.q?.trim() ?? "";

  const where = query
    ? { OR: [{ action: { contains: query } }, { entity: { contains: query } }] }
    : {};

  const [entries, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        action: true,
        entity: true,
        entityId: true,
        ip: true,
        createdAt: true,
        actor: { select: { fullName: true, email: true } },
      },
    }),
    prisma.auditLog.count({ where }),
  ]);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <PageHeading
        eyebrow="Admin"
        title="Audit log"
        description="Every administrative change, recorded and read-only."
      />
      <Panel>
        <form className="mb-5 flex flex-wrap items-end gap-3" method="get">
          <label className="dash-label">
            Search
            <input className="dash-input" name="q" defaultValue={query} placeholder="Action or entity" />
          </label>
          <button type="submit" className="dash-btn dash-btn--primary">
            Search
          </button>
          {query && (
            <Link href="/dashboard/admin/audit" className="dash-btn">
              Clear
            </Link>
          )}
        </form>

        {entries.length === 0 ? (
          <EmptyState title="No entries" description="Administrative actions will be recorded here." />
        ) : (
          <>
            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Actor</th>
                    <th>Action</th>
                    <th>Entity</th>
                    <th>IP</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      <td>{formatDate(entry.createdAt)}</td>
                      <td>{entry.actor?.fullName ?? "System"}</td>
                      <td>{entry.action}</td>
                      <td>
                        {entry.entity}
                        {entry.entityId && (
                          <span className="block text-[12px] text-[color:var(--muted)]">
                            {entry.entityId}
                          </span>
                        )}
                      </td>
                      <td className="text-[12.5px]">{entry.ip ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pages > 1 && (
              <div className="mt-5 flex items-center gap-3">
                {page > 1 && (
                  <Link className="dash-btn" href={`/dashboard/admin/audit?page=${page - 1}`}>
                    ← Previous
                  </Link>
                )}
                <span className="text-[13px] text-[color:var(--muted)]">
                  Page {page} of {pages}
                </span>
                {page < pages && (
                  <Link className="dash-btn" href={`/dashboard/admin/audit?page=${page + 1}`}>
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
