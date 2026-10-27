import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getSiteUrl } from "@/lib/env";
import { renderFollowUpEmail } from "@/lib/server/email-templates";
import { sendMailWithResult } from "@/lib/server/mailer";
import { resolveFollowUpSettings } from "@/lib/server/settings";

const DAY_MS = 24 * 60 * 60 * 1000;
const CLAIM_TIMEOUT_MS = 60 * 60 * 1000;

type FollowUpCandidate = {
  id: string;
  fullName: string;
  email: string;
  createdAt: Date;
  signupFollowUps: Array<{
    id: string;
    sequence: number;
    status: string;
    claimedAt: Date;
    sentAt: Date | null;
  }>;
};

function dueSequence(customer: FollowUpCandidate, now: Date): 1 | 2 | 3 | null {
  const records = new Map(customer.signupFollowUps.map((record) => [record.sequence, record]));
  const first = records.get(1);
  const second = records.get(2);
  const third = records.get(3);
  const canAttempt = (record: FollowUpCandidate["signupFollowUps"][number] | undefined) =>
    !record ||
    record.status === "FAILED" ||
    (record.status === "PROCESSING" &&
      record.claimedAt.getTime() <= now.getTime() - CLAIM_TIMEOUT_MS);

  if (canAttempt(first) && customer.createdAt.getTime() <= now.getTime() - DAY_MS) return 1;
  if (
    first?.status === "SENT" &&
    first.sentAt &&
    canAttempt(second) &&
    first.sentAt.getTime() <= now.getTime() - 2 * DAY_MS
  ) return 2;
  if (
    first?.status === "SENT" &&
    first.sentAt &&
    second?.status === "SENT" &&
    canAttempt(third) &&
    first.sentAt.getTime() <= now.getTime() - 4 * DAY_MS
  ) return 3;
  return null;
}

async function claimFollowUp(
  customer: FollowUpCandidate,
  sequence: 1 | 2 | 3,
  subject: string,
  now: Date,
): Promise<string | null> {
  const existing = customer.signupFollowUps.find((record) => record.sequence === sequence);
  if (existing) {
    if (existing.status === "SENT") return null;
    if (
      existing.status === "PROCESSING" &&
      existing.claimedAt.getTime() > now.getTime() - CLAIM_TIMEOUT_MS
    ) return null;
    const claimed = await prisma.signupFollowUp.updateMany({
      where: {
        id: existing.id,
        status: existing.status,
        claimedAt: existing.claimedAt,
      },
      data: { status: "PROCESSING", subject, claimedAt: now, error: null },
    });
    return claimed.count === 1 ? existing.id : null;
  }

  try {
    const record = await prisma.signupFollowUp.create({
      data: { userId: customer.id, sequence, subject, status: "PROCESSING", claimedAt: now },
      select: { id: true },
    });
    return record.id;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return null;
    throw error;
  }
}

export async function processSignupFollowUps(now = new Date()) {
  const settings = await resolveFollowUpSettings();
  if (!settings.enabled) return { enabled: false, sent: 0, failed: 0, skipped: 0 };

  const customers = await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
      status: "ACTIVE",
      deletedAt: null,
      emailVerifiedAt: { not: null },
      createdAt: { lte: new Date(now.getTime() - DAY_MS) },
      orders: { none: { status: { not: "DRAFT" } } },
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
      signupFollowUps: {
        select: { id: true, sequence: true, status: true, claimedAt: true, sentAt: true },
      },
    },
    // Bound each hourly batch so slow SMTP servers cannot hold one request for
    // too long. Remaining eligible customers are picked up on the next run.
    take: 50,
  });

  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const customer of customers) {
    const sequence = dueSequence(customer, now);
    if (!sequence) {
      skipped += 1;
      continue;
    }
    const template = settings.templates[sequence - 1];
    const claimId = await claimFollowUp(customer, sequence, template.subject, now);
    if (!claimId) {
      skipped += 1;
      continue;
    }

    // Re-check immediately before delivery so a newly placed order cancels
    // the sequence even if it was created while this scheduler run was active.
    const hasOrder = await prisma.order.count({
      where: { userId: customer.id, status: { not: "DRAFT" } },
    });
    if (hasOrder > 0) {
      await prisma.signupFollowUp.update({
        where: { id: claimId },
        data: { status: "CANCELLED", error: "Customer created an order before delivery." },
      });
      skipped += 1;
      continue;
    }

    const rendered = renderFollowUpEmail({
      sequence,
      recipientName: customer.fullName,
      heading: template.heading,
      message: template.message,
      ctaUrl: `${getSiteUrl()}/start`,
    });
    const delivery = await sendMailWithResult(
      {
        to: customer.email,
        subject: template.subject,
        text: rendered.text,
        html: rendered.html,
      },
      "support",
    );

    if (!delivery.ok) {
      await prisma.signupFollowUp.update({
        where: { id: claimId },
        data: { status: "FAILED", error: delivery.error },
      });
      failed += 1;
      continue;
    }

    await prisma.$transaction([
      prisma.signupFollowUp.update({
        where: { id: claimId },
        data: { status: "SENT", sentAt: new Date(), error: null },
      }),
      prisma.message.create({
        data: {
          userId: customer.id,
          channel: "EMAIL",
          direction: "OUTBOUND",
          subject: template.subject,
          body: template.message,
        },
      }),
    ]);
    sent += 1;
  }

  return { enabled: true, sent, failed, skipped };
}
