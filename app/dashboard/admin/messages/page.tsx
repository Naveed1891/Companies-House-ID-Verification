import Link from "next/link";
import { EmptyState, PageHeading, Panel, formatDate } from "@/components/dashboard/ui";
import { AdminReplyForm } from "@/components/dashboard/AdminReplyForm";
import { canWrite, requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const staff = await requireStaff();

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      direction: true,
      subject: true,
      body: true,
      createdAt: true,
      user: { select: { id: true, fullName: true, email: true } },
      order: { select: { publicReference: true } },
    },
  });

  return (
    <>
      <PageHeading
        eyebrow="Admin"
        title="Communications"
        description="Messages to and from customers."
      />
      <Panel>
        {messages.length === 0 ? (
          <EmptyState title="No messages" description="Customer messages will appear here." />
        ) : (
          <ul className="m-0 list-none space-y-4 p-0">
            {messages.map((message) => (
              <li key={message.id} className="border-b border-[color:var(--border)] pb-4 last:border-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`dash-badge ${
                      message.direction === "INBOUND" ? "dash-badge--warn" : "dash-badge--info"
                    }`}
                  >
                    {message.direction === "INBOUND" ? "From customer" : "Sent"}
                  </span>
                  <Link
                    href={`/dashboard/admin/customers/${message.user.id}`}
                    className="text-[13.5px] font-bold"
                  >
                    {message.user.fullName}
                  </Link>
                  {message.order && (
                    <Link
                      href={`/dashboard/admin/orders/${message.order.publicReference}`}
                      className="text-[12.5px] text-[color:var(--muted)]"
                    >
                      {message.order.publicReference}
                    </Link>
                  )}
                  <span className="text-[12.5px] text-[color:var(--muted)]">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
                {message.subject && <p className="mt-2 mb-0 text-[14.5px] font-bold">{message.subject}</p>}
                <p className="mt-1 mb-0 text-[14px] whitespace-pre-wrap">{message.body}</p>
                {message.direction === "INBOUND" && canWrite(staff.role) && (
                  <AdminReplyForm
                    customerId={message.user.id}
                    orderReference={message.order?.publicReference ?? null}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}
