import { prisma } from "@/lib/db";
import { requireStaff } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { routeError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

/** Escapes a CSV cell, including the leading-character guard against formula injection. */
function cell(value: unknown): string {
  const raw = value == null ? "" : String(value);
  const guarded = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${guarded.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  try {
    const staff = await requireStaff();
    const url = new URL(request.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    const range =
      from && to
        ? { gte: new Date(from), lte: new Date(`${to}T23:59:59.999Z`) }
        : undefined;

    const orders = await prisma.order.findMany({
      // Exclude DRAFT (not-yet-placed) selections from reporting.
      where: { status: { not: "DRAFT" }, ...(range ? { createdAt: range } : {}) },
      orderBy: { createdAt: "desc" },
      select: {
        publicReference: true,
        status: true,
        paymentStatus: true,
        amount: true,
        currency: true,
        createdAt: true,
        completedAt: true,
        user: { select: { fullName: true, email: true, country: true } },
        package: { select: { name: true } },
      },
    });

    const header = [
      "Reference",
      "Status",
      "Payment",
      "Amount",
      "Currency",
      "Customer",
      "Email",
      "Country",
      "Package",
      "Created",
      "Completed",
    ];

    const rows = orders.map((o) =>
      [
        o.publicReference,
        o.status,
        o.paymentStatus,
        Number(o.amount).toFixed(2),
        o.currency,
        o.user.fullName,
        o.user.email,
        o.user.country ?? "",
        o.package.name,
        o.createdAt.toISOString(),
        o.completedAt?.toISOString() ?? "",
      ]
        .map(cell)
        .join(","),
    );

    await recordAudit({
      actorId: staff.id,
      action: "report.export.orders",
      entity: "Order",
      after: { count: orders.length },
      request,
    });

    const csv = [header.map(cell).join(","), ...rows].join("\r\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="companieshouseidverification-orders.csv"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return routeError(error);
  }
}
