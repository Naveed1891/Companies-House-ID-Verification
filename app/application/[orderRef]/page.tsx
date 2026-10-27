import { notFound, redirect } from "next/navigation";
import { ApplicationSubmitted } from "@/components/ApplicationSubmitted";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { isPaymentSubmitted } from "@/lib/payment-status";
import { verificationFromUrl } from "@/lib/server/submit-application";
import { ApplicationForm } from "./ApplicationForm";

export const dynamic = "force-dynamic";

function asAnswers(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ orderRef: string }>;
}) {
  const { orderRef } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?returnTo=${encodeURIComponent(`/application/${orderRef}`)}`);

  const order = await prisma.order.findFirst({
    where: { publicReference: orderRef, userId: user.id },
    select: {
      publicReference: true,
      status: true,
      paymentStatus: true,
      diditUrl: true,
      diditStatus: true,
      package: { select: { slug: true } },
      application: { select: { status: true, answers: true } },
    },
  });
  if (!order) notFound();

  const applicationStatus = order.application?.status ?? "NOT_STARTED";
  const submitted =
    applicationStatus === "SUBMITTED" ||
    applicationStatus === "APPROVED" ||
    order.status === "SUBMITTED" ||
    order.status === "COMPLETED";

  if (submitted) {
    const approved = order.diditStatus === "Approved";
    const verification = approved ? null : await verificationFromUrl(order.diditUrl);
    return (
      <ApplicationSubmitted
        orderRef={order.publicReference}
        verification={verification}
        approved={approved}
      />
    );
  }

  if (!isPaymentSubmitted(order.paymentStatus)) {
    redirect(`/payment/bank/${order.publicReference}`);
  }

  return (
    <ApplicationForm
      orderRef={order.publicReference}
      packageSlug={order.package.slug}
      initialAnswers={asAnswers(order.application?.answers)}
    />
  );
}
