import { EmptyState, PageHeading, Panel, StatusBadge, formatDate } from "@/components/dashboard/ui";
import { TaskBoard } from "@/components/dashboard/TaskBoard";
import { canWrite, requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminTasksPage() {
  const staff = await requireStaff();

  const [tasks, staffList] = await Promise.all([
    prisma.task.findMany({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      take: 100,
      select: {
        id: true,
        title: true,
        detail: true,
        status: true,
        dueAt: true,
        createdAt: true,
        assignedTo: { select: { fullName: true } },
        order: { select: { publicReference: true } },
      },
    }),
    prisma.user.findMany({
      where: { role: { not: "CUSTOMER" }, status: "ACTIVE", deletedAt: null },
      select: { id: true, fullName: true },
      orderBy: { fullName: "asc" },
    }),
  ]);

  const writable = canWrite(staff.role);

  return (
    <>
      <PageHeading eyebrow="Admin" title="Tasks" description="Internal work tracking." />

      {writable && (
        <Panel className="mb-5">
          <p className="eyebrow">New task</p>
          <TaskBoard staff={staffList} />
        </Panel>
      )}

      <Panel>
        <p className="eyebrow">All tasks</p>
        {tasks.length === 0 ? (
          <EmptyState title="No tasks" description="Create a task to track internal work." />
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Request</th>
                  <th>Assigned</th>
                  <th>Status</th>
                  <th>Due</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      {task.title}
                      {task.detail && (
                        <span className="block text-[12.5px] text-[color:var(--muted)]">
                          {task.detail}
                        </span>
                      )}
                    </td>
                    <td>{task.order?.publicReference ?? "-"}</td>
                    <td>{task.assignedTo?.fullName ?? "Unassigned"}</td>
                    <td>
                      <StatusBadge status={task.status} />
                    </td>
                    <td>{task.dueAt ? formatDate(task.dueAt) : "-"}</td>
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
