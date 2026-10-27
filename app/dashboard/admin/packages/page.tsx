import { PageHeading, Panel } from "@/components/dashboard/ui";
import { PackageEditor } from "@/components/dashboard/PackageEditor";
import { canWrite, requireStaff } from "@/lib/server/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const staff = await requireStaff();

  const packages = await prisma.package.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      price: true,
      compareAtPrice: true,
      currency: true,
      features: true,
      active: true,
    },
  });

  const editable = canWrite(staff.role);

  return (
    <>
      <PageHeading
        eyebrow="Admin"
        title="Packages & services"
        description="Pricing and features shown on the public website."
      />
      {packages.map((pkg) => (
        <Panel key={pkg.id} className="mb-5">
          <p className="eyebrow">{pkg.slug}</p>
          <PackageEditor
            editable={editable}
            pkg={{
              id: pkg.id,
              name: pkg.name,
              description: pkg.description ?? "",
              price: Number(pkg.price),
              compareAtPrice: pkg.compareAtPrice == null ? "" : String(Number(pkg.compareAtPrice)),
              currency: pkg.currency,
              features: Array.isArray(pkg.features) ? (pkg.features as string[]) : [],
              active: pkg.active,
            }}
          />
        </Panel>
      ))}
    </>
  );
}
