import type { InfoRequestKind } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireStaffWrite } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { json, parseJson, routeError } from "@/lib/server/http";
import { sendMail } from "@/lib/server/mailer";
import { getSiteUrl } from "@/lib/env";

export const dynamic = "force-dynamic";

const KINDS: InfoRequestKind[] = ["DOCUMENT", "INFORMATION"];

/**
 * Ask the customer for something specific after submission.
 *
 * This is what moves an order to ADDITIONAL_INFO_REQUIRED - the customer is
 * then shown the matching input (upload or text) rather than being sent back
 * through an application they have already submitted.
 */
export async function POST(request: Request, { params }: { params: Promise<{ reference: string }> }) {
  try {
    const staff = await requireStaffWrite();
    const { reference } = await params;
    const body = await parseJson<{
      kind?: string;
      message?: string;
      documentKind?: string;
      documentLabel?: string;
    }>(request);

    const kind = body.kind as InfoRequestKind;
    if (!KINDS.includes(kind)) {
      return json({ error: "Choose whether you need a document or information." }, 400);
    }

    const message = String(body.message ?? "").trim();
    if (!message) {
      return json({ error: "Explain what the customer needs to provide." }, 400);
    }

    const order = await prisma.order.findFirst({
      where: { publicReference: reference },
      select: { id: true, status: true, userId: true, user: { select: { email: true, fullName: true } } },
    });
    if (!order) throw new Error("NOT_FOUND");

    const documentLabel = String(body.documentLabel ?? "").trim() || null;
    const documentKind =
      kind === "DOCUMENT"
        ? String(body.documentKind ?? "").trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_") ||
          "additional_document"
        : null;

    const created = await prisma.$transaction(async (tx) => {
      const infoRequest = await tx.infoRequest.create({
        data: {
          orderId: order.id,
          kind,
          message,
          documentKind,
          documentLabel: kind === "DOCUMENT" ? documentLabel ?? "Additional document" : null,
          createdById: staff.id,
          status: "OPEN",
        },
        select: { id: true },
      });

      if (order.status !== "ADDITIONAL_INFO_REQUIRED") {
        await tx.order.update({
          where: { id: order.id },
          data: { status: "ADDITIONAL_INFO_REQUIRED" },
        });
        await tx.orderStatusHistory.create({
          data: {
            orderId: order.id,
            fromStatus: order.status,
            toStatus: "ADDITIONAL_INFO_REQUIRED",
            note: kind === "DOCUMENT" ? "Document requested from customer." : "Information requested from customer.",
            actorId: staff.id,
          },
        });
      }

      await tx.notification.create({
        data: {
          userId: order.userId,
          title: kind === "DOCUMENT" ? "A document is needed" : "We need some information",
          body: message.slice(0, 240),
          href: `/dashboard/orders/${reference}`,
        },
      });

      return infoRequest;
    });

    await recordAudit({
      actorId: staff.id,
      action: "order.info-request.create",
      entity: "InfoRequest",
      entityId: created.id,
      after: { kind, orderReference: reference },
      request,
    });

    void sendMail({
      to: order.user.email,
      subject: kind === "DOCUMENT" ? `Document needed for ${reference}` : `Information needed for ${reference}`,
      text: `Hello ${order.user.fullName},

${message}

Provide it here: ${getSiteUrl()}/dashboard/orders/${reference}`,
    }, "support");

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
