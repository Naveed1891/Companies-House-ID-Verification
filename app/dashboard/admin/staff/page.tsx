import { PageHeading, Panel, StatusBadge, formatDate } from "@/components/dashboard/ui";
import { StaffControls } from "@/components/dashboard/StaffControls";
import { requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminStaffPage() {
  const staff = await requireStaff();
  const isSuperAdmin = staff.role === "SUPER_ADMIN";

  const members = await prisma.user.findMany({
    where: { role: { not: "CUSTOMER" }, deletedAt: null },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      status: true,
      lastLoginAt: true,
      createdAt: true,
    },
  });

  return (
    <>
      <PageHeading
        eyebrow="Admin"
        title="Staff"
        description="Team members with access to this dashboard."
      />

      {isSuperAdmin && (
        <Panel className="mb-5">
          <p className="eyebrow">Invite a staff member</p>
          <StaffControls />
        </Panel>
      )}

      <Panel>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last sign-in</th>
                <th>Added</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.fullName}</td>
                  <td>{member.email}</td>
                  <td>{member.role.replace(/_/g, " ").toLowerCase()}</td>
                  <td>
                    <StatusBadge status={member.status} />
                  </td>
                  <td>{member.lastLoginAt ? formatDate(member.lastLoginAt) : "Never"}</td>
                  <td>{formatDate(member.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isSuperAdmin && (
          <p className="mt-4 mb-0 text-[12.5px] text-[color:var(--muted)]">
            Only a super admin can add or change staff.
          </p>
        )}
      </Panel>
    </>
  );
}
