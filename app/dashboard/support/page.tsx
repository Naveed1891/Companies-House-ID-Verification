import { redirect } from "next/navigation";
import { PageHeading, Panel, formatDate } from "@/components/dashboard/ui";
import { SupportForm } from "@/components/dashboard/SupportForm";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { PLACED_ORDER_FILTER } from "@/lib/server/orders";

export const dynamic = "force-dynamic";

export default async function SupportPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?returnTo=%2Fdashboard%2Fsupport");

  const [messages, orders] = await Promise.all([
    prisma.message.findMany({
      where: { userId: user.id, channel: "PORTAL" },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        direction: true,
        subject: true,
        body: true,
        createdAt: true,
        order: { select: { publicReference: true } },
      },
    }),
    prisma.order.findMany({
      where: { userId: user.id, ...PLACED_ORDER_FILTER },
      orderBy: { createdAt: "desc" },
      select: { publicReference: true },
    }),
  ]);

  return (
    <>
      <PageHeading
        eyebrow="Support"
        title="Message our team"
        description="Ask a question about your verification and we will reply here."
      />

      <Panel>
        <p className="eyebrow">New message</p>
        <SupportForm orders={orders.map((o) => o.publicReference)} />
      </Panel>

      <Panel>
        <p className="eyebrow">Conversation</p>
        {messages.length === 0 ? (
          <p className="m-0 text-[14px] text-[color:var(--muted)]">No messages yet.</p>
        ) : (
          <ul className="m-0 list-none space-y-4 p-0">
            {messages.map((message) => (
              <li
                key={message.id}
                className="border-b border-[color:var(--border)] pb-4 last:border-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`dash-badge ${
                      message.direction === "INBOUND" ? "dash-badge--muted" : "dash-badge--info"
                    }`}
                  >
                    {message.direction === "INBOUND" ? "You" : "Companies House ID Verification"}
                  </span>
                  {message.order && (
                    <span className="text-[12.5px] text-[color:var(--muted)]">
                      {message.order.publicReference}
                    </span>
                  )}
                  <span className="text-[12.5px] text-[color:var(--muted)]">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
                {message.subject && <p className="mt-2 mb-0 text-[14.5px] font-bold">{message.subject}</p>}
                <p className="mt-1 mb-0 text-[14px] whitespace-pre-wrap">{message.body}</p>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}
