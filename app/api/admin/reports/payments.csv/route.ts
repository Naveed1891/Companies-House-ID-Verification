import { prisma } from "@/lib/db";
import { requireStaff } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { routeError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

function cell(value: unknown): string {
  const raw = value == null ? "" : String(value);
  const guarded = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${guarded.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  try {
    const staff = await requireStaff();

    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        amount: true,
        currency: true,
        status: true,
        createdAt: true,
        providerPaymentId: true,
        order: {
          select: { publicReference: true, user: { select: { fullName: true, email: true } } },
        },
        refunds: { select: { amount: true, status: true } },
      },
    });

    const header = [
      "Reference",
      "Customer",
      "Email",
      "Amount",
      "Currency",
      "Status",
      "Refunded",
      "StripePaymentIntent",
      "Date",
    ];

    const rows = payments.map((p) => {
      const refunded = p.refunds
        .filter((r) => r.status === "COMPLETED")
        .reduce((sum, r) => sum + Number(r.amount), 0);
      return [
        p.order.publicReference,
        p.order.user.fullName,
        p.order.user.email,
        Number(p.amount).toFixed(2),
        p.currency,
        p.status,
        refunded.toFixed(2),
        p.providerPaymentId ?? "",
        p.createdAt.toISOString(),
      ]
        .map(cell)
        .join(",");
    });

    await recordAudit({
      actorId: staff.id,
      action: "report.export.payments",
      entity: "Payment",
      after: { count: payments.length },
      request,
    });

    const csv = [header.map(cell).join(","), ...rows].join("\r\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="companieshouseidverification-payments.csv"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return routeError(error);
  }
}
