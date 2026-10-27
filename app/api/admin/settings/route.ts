import { requireStaffAdmin } from "@/lib/server/auth";
import { recordAudit } from "@/lib/server/audit";
import { json, parseJson, routeError } from "@/lib/server/http";
import { SETTING_KEYS, saveSettings, settingsStatus } from "@/lib/server/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireStaffAdmin();
    return json({ status: await settingsStatus() });
  } catch (error) {
    return routeError(error);
  }
}

export async function POST(request: Request) {
  try {
    const ceo = await requireStaffAdmin();
    const body = await parseJson<Record<string, string | null>>(request);

    const K = SETTING_KEYS;
    // Only known keys are accepted - nothing arbitrary is written.
    const allowed: Record<string, string | null | undefined> = {
      [K.stripeSecretKey]: body.stripeSecretKey,
      [K.stripeWebhookSecret]: body.stripeWebhookSecret,
      [K.stripePublishableKey]: body.stripePublishableKey,
      [K.storageDriver]: body.storageDriver,
      [K.s3Bucket]: body.s3Bucket,
      [K.s3Region]: body.s3Region,
      [K.s3Endpoint]: body.s3Endpoint,
      [K.s3AccessKeyId]: body.s3AccessKeyId,
      [K.s3SecretAccessKey]: body.s3SecretAccessKey,
      [K.s3ForcePathStyle]: body.s3ForcePathStyle,
      [K.smtpHost]: body.smtpHost,
      [K.smtpPort]: body.smtpPort,
      [K.smtpSecure]: body.smtpSecure,
      [K.smtpUser]: body.smtpUser,
      [K.smtpPass]: body.smtpPass,
      [K.emailFrom]: body.emailFrom,
      [K.supportEmail]: body.supportEmail,
      [K.supportSmtpHost]: body.supportSmtpHost,
      [K.supportSmtpPort]: body.supportSmtpPort,
      [K.supportSmtpSecure]: body.supportSmtpSecure,
      [K.supportSmtpUser]: body.supportSmtpUser,
      [K.supportSmtpPass]: body.supportSmtpPass,
      [K.supportEmailFrom]: body.supportEmailFrom,
      [K.diditMode]: body.diditMode,
      [K.diditApiKey]: body.diditApiKey,
      [K.diditWorkflowId]: body.diditWorkflowId,
      [K.diditWebhookSecret]: body.diditWebhookSecret,
      [K.diditBaseUrl]: body.diditBaseUrl,
      [K.payBankEnabled]: body.payBankEnabled,
      [K.payWorldpayEnabled]: body.payWorldpayEnabled,
      [K.payStripeEnabled]: body.payStripeEnabled,
      [K.worldpayMode]: body.worldpayMode,
      [K.worldpayUsername]: body.worldpayUsername,
      [K.worldpayPassword]: body.worldpayPassword,
      [K.worldpayEntity]: body.worldpayEntity,
      [K.worldpayCheckoutId]: body.worldpayCheckoutId,
    };

    await saveSettings(allowed, ceo.id);
    await recordAudit({
      actorId: ceo.id,
      action: "settings.update",
      entity: "AppSetting",
      // Never log the values themselves - only which groups were touched.
      after: { keys: Object.keys(body) },
      request,
    });

    return json({ ok: true, status: await settingsStatus() });
  } catch (error) {
    return routeError(error);
  }
}
