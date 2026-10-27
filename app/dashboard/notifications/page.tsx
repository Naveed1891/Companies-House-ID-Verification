import Link from "next/link";
import { redirect } from "next/navigation";
import { EmptyState, PageHeading, Panel, formatDate } from "@/components/dashboard/ui";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?returnTo=%2Fdashboard%2Fnotifications");

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: { id: true, title: true, body: true, href: true, readAt: true, createdAt: true },
  });

  // Viewing the list marks it read - the badge should not persist after reading.
  if (notifications.some((n) => !n.readAt)) {
    await prisma.notification.updateMany({
      where: { userId: user.id, readAt: null },
      data: { readAt: new Date() },
    });
  }

  return (
    <>
      <PageHeading eyebrow="Notifications" title="Updates" description="Everything we have sent you." />
      <Panel>
        {notifications.length === 0 ? (
          <EmptyState
            title="Nothing yet"
            description="Updates about your verification will appear here."
          />
        ) : (
          <ul className="m-0 list-none space-y-4 p-0">
            {notifications.map((item) => (
              <li
                key={item.id}
                className="border-b border-[color:var(--border)] pb-4 last:border-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="m-0 text-[15px] font-bold">{item.title}</p>
                  {!item.readAt && <span className="dash-badge dash-badge--warn">new</span>}
                  <span className="text-[12.5px] text-[color:var(--muted)]">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <p className="mt-1 mb-0 text-[14px] text-[color:var(--body)]">{item.body}</p>
                {item.href && (
                  <Link href={item.href} className="mt-2 inline-block text-[13.5px] font-bold text-emerald">
                    Open →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}
