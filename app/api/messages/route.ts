import { prisma } from "@/lib/db";
import { getCurrentStaff, getCurrentUser } from "@/lib/auth/session";
import { getSiteUrl } from "@/lib/env";
import { canWrite } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { renderEmail } from "@/lib/server/email-templates";
import { json, parseJson, routeError } from "@/lib/server/http";
import { sendMail } from "@/lib/server/mailer";

export const dynamic = "force-dynamic";

/**
 * Customers post messages against their own orders. Staff post replies to any
 * customer. The sender's identity always comes from the session.
 */
export async function POST(request: Request) {
  try {
    const staff = await getCurrentStaff();
    const customer = staff ? null : await getCurrentUser();
    if (!staff && !customer) throw new Error("UNAUTHENTICATED");

    const body = await parseJson<{
      orderReference?: string | null;
      subject?: string;
      body?: string;
      customerId?: string;
    }>(request);

    const text = String(body.body ?? "").trim();
    if (!text) return json({ error: "A message is required." }, 400);
    const subject = String(body.subject ?? "").trim().slice(0, 191) || null;

    if (staff) {
      if (!canWrite(staff.role)) throw new Error("FORBIDDEN");

      const targetCustomerId = String(body.customerId ?? "").trim();
      if (!targetCustomerId) return json({ error: "A customer is required." }, 400);

      const targetCustomer = await prisma.user.findFirst({
        where: { id: targetCustomerId, role: "CUSTOMER", deletedAt: null },
        select: { email: true, fullName: true },
      });
      if (!targetCustomer) return json({ error: "Customer not found." }, 404);

      let orderId: string | null = null;
      if (body.orderReference) {
        const order = await prisma.order.findFirst({
          where: { publicReference: String(body.orderReference), userId: targetCustomerId },
          select: { id: true },
        });
        orderId = order?.id ?? null;
      }

      const message = await prisma.message.create({
        data: {
          orderId,
          userId: targetCustomerId,
          channel: "PORTAL",
          direction: "OUTBOUND",
          subject,
          body: text,
          authorId: staff.id,
        },
        select: { id: true },
      });

      await prisma.notification.create({
        data: {
          userId: targetCustomerId,
          title: subject ?? "Message from Companies House ID Verification",
          body: text.slice(0, 240),
          href: "/dashboard/support",
        },
      });

      // Best-effort styled email so the customer sees the message even if they
      // are not currently in the portal.
      const email = renderEmail({
        preview: subject ?? "You have a new message from Companies House ID Verification.",
        heading: subject ?? "A message from our team",
        intro: `Hi ${targetCustomer.fullName || "there"}, you have a new message from the Companies House ID Verification team.`,
        paragraphs: [text],
        cta: { label: "Reply in your dashboard", url: `${getSiteUrl()}/dashboard/support` },
        note: "Please reply from your secure dashboard rather than to this email.",
      });
      void sendMail(
        {
          to: targetCustomer.email,
          subject: subject ?? "New message from Companies House ID Verification",
          text: email.text,
          html: email.html,
        },
        "support",
      );

      await recordAudit({
        actorId: staff.id,
        action: "message.send",
        entity: "Message",
        entityId: message.id,
        request,
      });

      return json({ ok: true });
    }

    // Customer path - the message is always attached to their own session id.
    let orderId: string | null = null;
    if (body.orderReference) {
      const order = await prisma.order.findFirst({
        where: { publicReference: String(body.orderReference), userId: customer!.id },
        select: { id: true },
      });
      orderId = order?.id ?? null;
    }

    await prisma.message.create({
      data: {
        orderId,
        userId: customer!.id,
        channel: "PORTAL",
        direction: "INBOUND",
        subject,
        body: text,
        authorId: customer!.id,
      },
    });

    return json({ ok: true });
  } catch (error) {
    return routeError(error);
  }
}
