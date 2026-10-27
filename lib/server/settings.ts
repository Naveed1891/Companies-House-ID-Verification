import { prisma } from "@/lib/db";
import { decryptSecret, encryptSecret } from "@/lib/server/secrets";

/**
 * Runtime configuration store.
 *
 * Values live encrypted in AppSetting and, when present, override the matching
 * environment variable. This lets the CEO manage SMTP / Stripe / S3 credentials
 * from the dashboard without a redeploy.
 */

export const SETTING_KEYS = {
  // Stripe
  stripeSecretKey: "stripe.secretKey",
  stripeWebhookSecret: "stripe.webhookSecret",
  stripePublishableKey: "stripe.publishableKey",
  // S3 storage
  storageDriver: "storage.driver",
  s3Bucket: "s3.bucket",
  s3Region: "s3.region",
  s3Endpoint: "s3.endpoint",
  s3AccessKeyId: "s3.accessKeyId",
  s3SecretAccessKey: "s3.secretAccessKey",
  s3ForcePathStyle: "s3.forcePathStyle",
  // SMTP email
  smtpHost: "smtp.host",
  smtpPort: "smtp.port",
  smtpSecure: "smtp.secure",
  smtpUser: "smtp.user",
  smtpPass: "smtp.pass",
  emailFrom: "email.from",
  supportEmail: "email.supportInbox",
  supportSmtpHost: "smtp.support.host",
  supportSmtpPort: "smtp.support.port",
  supportSmtpSecure: "smtp.support.secure",
  supportSmtpUser: "smtp.support.user",
  supportSmtpPass: "smtp.support.pass",
  supportEmailFrom: "email.supportFrom",
  // Didit identity verification
  diditMode: "didit.mode",
  diditApiKey: "didit.apiKey",
  diditWorkflowId: "didit.workflowId",
  diditWebhookSecret: "didit.webhookSecret",
  diditBaseUrl: "didit.baseUrl",
  // Payment method toggles (which methods customers can use at checkout)
  payBankEnabled: "pay.bank.enabled",
  payWorldpayEnabled: "pay.worldpay.enabled",
  payStripeEnabled: "pay.stripe.enabled",
  // WorldPay (Access Worldpay - Payments API)
  worldpayMode: "worldpay.mode",
  worldpayUsername: "worldpay.username",
  worldpayPassword: "worldpay.password",
  worldpayEntity: "worldpay.entity",
  worldpayCheckoutId: "worldpay.checkoutId",
  // Account-signup follow-up automation
  followUpEnabled: "followUp.enabled",
  followUp1Subject: "followUp.1.subject",
  followUp1Heading: "followUp.1.heading",
  followUp1Message: "followUp.1.message",
  followUp2Subject: "followUp.2.subject",
  followUp2Heading: "followUp.2.heading",
  followUp2Message: "followUp.2.message",
  followUp3Subject: "followUp.3.subject",
  followUp3Heading: "followUp.3.heading",
  followUp3Message: "followUp.3.message",
} as const;

type SettingKey = (typeof SETTING_KEYS)[keyof typeof SETTING_KEYS];

// Short in-process cache so hot paths (checkout, uploads) don't hit the DB each call.
let cache: Map<string, string> | null = null;
let cacheAt = 0;
const CACHE_MS = 30_000;

async function loadAll(): Promise<Map<string, string>> {
  if (cache && Date.now() - cacheAt < CACHE_MS) return cache;
  const rows = await prisma.appSetting.findMany({ select: { key: true, value: true } });
  const map = new Map<string, string>();
  for (const row of rows) {
    try {
      map.set(row.key, decryptSecret(row.value));
    } catch {
      // A value that cannot be decrypted (e.g. rotated key) is treated as unset.
    }
  }
  cache = map;
  cacheAt = Date.now();
  return map;
}

/** DB value if set, otherwise the env fallback, otherwise undefined. */
async function resolve(key: SettingKey, envValue: string | undefined): Promise<string | undefined> {
  const map = await loadAll();
  const dbValue = map.get(key)?.trim();
  return dbValue || envValue?.trim() || undefined;
}

export async function saveSettings(
  entries: Record<string, string | null | undefined>,
  actorId: string,
): Promise<void> {
  const ops = Object.entries(entries)
    // Skip masked placeholders so an unchanged secret is never overwritten with "".
    .filter(([, v]) => v !== undefined && v !== SECRET_PLACEHOLDER)
    .map(([key, value]) => {
      if (value === null || value === "") {
        return prisma.appSetting.deleteMany({ where: { key } });
      }
      const encrypted = encryptSecret(String(value));
      return prisma.appSetting.upsert({
        where: { key },
        update: { value: encrypted, updatedById: actorId },
        create: { key, value: encrypted, updatedById: actorId },
      });
    });
  await prisma.$transaction(ops);
  cache = null; // bust
}

export const SECRET_PLACEHOLDER = "__unchanged__";

export const DEFAULT_FOLLOW_UPS = [
  {
    subject: "Your Companies House ID Verification account is ready",
    heading: "Complete your verification when you’re ready",
    message:
      "Your secure Companies House ID Verification account has been created. Start your Companies House identity-verification request when it suits you, and our team will guide you through each step.",
  },
  {
    subject: "Need help starting your Companies House ID Verification request?",
    heading: "We’re here to make verification straightforward",
    message:
      "If you have not started because you are unsure what is required, our guided process explains each step clearly. You can begin online and contact our support team whenever you need help.",
  },
  {
    subject: "A final reminder about your Companies House ID Verification account",
    heading: "Your account is waiting for you",
    message:
      "This is our final automatic reminder. Your Companies House ID Verification account remains available, so you can start your identity-verification request whenever you are ready.",
  },
] as const;

export async function resolveFollowUpSettings() {
  const K = SETTING_KEYS;
  const templates = await Promise.all(
    DEFAULT_FOLLOW_UPS.map(async (fallback, index) => {
      const sequence = index + 1;
      const subjectKey = K[`followUp${sequence}Subject` as keyof typeof K];
      const headingKey = K[`followUp${sequence}Heading` as keyof typeof K];
      const messageKey = K[`followUp${sequence}Message` as keyof typeof K];
      return {
        subject: (await resolve(subjectKey, undefined)) || fallback.subject,
        heading: (await resolve(headingKey, undefined)) || fallback.heading,
        message: (await resolve(messageKey, undefined)) || fallback.message,
      };
    }),
  );
  return {
    enabled: ((await resolve(K.followUpEnabled, process.env.FOLLOW_UP_EMAILS_ENABLED)) || "true") === "true",
    templates,
  };
}

// --- Typed resolvers used by the rest of the app ---

export async function resolveStripe() {
  const secretKey = await resolve(SETTING_KEYS.stripeSecretKey, process.env.STRIPE_SECRET_KEY);
  const webhookSecret = await resolve(SETTING_KEYS.stripeWebhookSecret, process.env.STRIPE_WEBHOOK_SECRET);
  const publishableKey = await resolve(
    SETTING_KEYS.stripePublishableKey,
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  );
  return { secretKey, webhookSecret, publishableKey, configured: Boolean(secretKey) };
}

export async function resolveDidit() {
  const mode = ((await resolve(SETTING_KEYS.diditMode, process.env.DIDIT_MODE)) || "sandbox").toLowerCase();
  const apiKey = await resolve(SETTING_KEYS.diditApiKey, process.env.DIDIT_API_KEY);
  const workflowId = await resolve(SETTING_KEYS.diditWorkflowId, process.env.DIDIT_WORKFLOW_ID);
  const webhookSecret = await resolve(SETTING_KEYS.diditWebhookSecret, process.env.DIDIT_WEBHOOK_SECRET);
  const baseUrl =
    (await resolve(SETTING_KEYS.diditBaseUrl, process.env.DIDIT_BASE_URL)) || "https://verification.didit.me";
  return {
    mode: mode === "production" ? "production" : "sandbox",
    apiKey,
    workflowId,
    webhookSecret,
    baseUrl: baseUrl.replace(/\/+$/, ""),
    configured: Boolean(apiKey && workflowId),
  };
}

export type PaymentMethods = { bank: boolean; worldpay: boolean; stripe: boolean };

/** Which payment methods customers may use. Bank transfer defaults on; the
 *  card providers default off until their credentials are configured. */
export async function resolvePaymentMethods(): Promise<PaymentMethods> {
  const flag = async (key: SettingKey, envVar: string | undefined, def: boolean) => {
    const value = await resolve(key, envVar);
    if (value === undefined) return def;
    return value === "true";
  };
  return {
    bank: await flag(SETTING_KEYS.payBankEnabled, process.env.PAY_BANK_ENABLED, true),
    worldpay: await flag(SETTING_KEYS.payWorldpayEnabled, process.env.PAY_WORLDPAY_ENABLED, false),
    stripe: await flag(SETTING_KEYS.payStripeEnabled, process.env.PAY_STRIPE_ENABLED, false),
  };
}

export async function resolveWorldpay() {
  const mode = ((await resolve(SETTING_KEYS.worldpayMode, process.env.WORLDPAY_MODE)) || "sandbox").toLowerCase();
  const isLive = mode === "live";
  const username = await resolve(SETTING_KEYS.worldpayUsername, process.env.WORLDPAY_USERNAME);
  const password = await resolve(SETTING_KEYS.worldpayPassword, process.env.WORLDPAY_PASSWORD);
  const entity = (await resolve(SETTING_KEYS.worldpayEntity, process.env.WORLDPAY_ENTITY)) || "default";
  const checkoutId = await resolve(SETTING_KEYS.worldpayCheckoutId, process.env.WORLDPAY_CHECKOUT_ID);
  return {
    mode: isLive ? "live" : "sandbox",
    username,
    password,
    entity,
    checkoutId,
    baseUrl: isLive ? "https://access.worldpay.com" : "https://try.access.worldpay.com",
    // Hosted Payment Pages only needs the Basic-auth credentials; the card
    // details are collected on Worldpay's own page after a redirect.
    configured: Boolean(username && password),
  };
}

export type StorageDriver = "local" | "s3";

export async function resolveStorageDriver(): Promise<StorageDriver> {
  const value = ((await resolve(SETTING_KEYS.storageDriver, process.env.STORAGE_DRIVER)) || "local").toLowerCase();
  return value === "s3" ? "s3" : "local";
}

export async function resolveS3() {
  return {
    bucket: await resolve(SETTING_KEYS.s3Bucket, process.env.S3_BUCKET),
    region: (await resolve(SETTING_KEYS.s3Region, process.env.S3_REGION)) || "auto",
    endpoint: await resolve(SETTING_KEYS.s3Endpoint, process.env.S3_ENDPOINT),
    accessKeyId: await resolve(SETTING_KEYS.s3AccessKeyId, process.env.S3_ACCESS_KEY_ID),
    secretAccessKey: await resolve(SETTING_KEYS.s3SecretAccessKey, process.env.S3_SECRET_ACCESS_KEY),
    forcePathStyle:
      ((await resolve(SETTING_KEYS.s3ForcePathStyle, process.env.S3_FORCE_PATH_STYLE)) || "true") === "true",
  };
}

export async function resolveSmtp(profile: "auth" | "support" = "auth") {
  if (profile === "support") {
    const host = await resolve(SETTING_KEYS.supportSmtpHost, process.env.SUPPORT_SMTP_HOST);
    const port = Number((await resolve(SETTING_KEYS.supportSmtpPort, process.env.SUPPORT_SMTP_PORT)) || "587");
    const user = await resolve(SETTING_KEYS.supportSmtpUser, process.env.SUPPORT_SMTP_USER);
    const pass = await resolve(SETTING_KEYS.supportSmtpPass, process.env.SUPPORT_SMTP_PASS);
    const from = (await resolve(SETTING_KEYS.supportEmailFrom, process.env.SUPPORT_EMAIL_FROM)) || "support@companieshouseidverification.com";
    const secure = ((await resolve(SETTING_KEYS.supportSmtpSecure, process.env.SUPPORT_SMTP_SECURE)) || "false") === "true";
    const supportInbox = await resolve(SETTING_KEYS.supportEmail, process.env.SUPPORT_EMAIL);
    return { host, port, user, pass, from, secure, supportInbox, configured: Boolean(host && user && pass) };
  }
  const host = await resolve(SETTING_KEYS.smtpHost, process.env.SMTP_HOST);
  const port = Number((await resolve(SETTING_KEYS.smtpPort, process.env.SMTP_PORT)) || "587");
  const user = await resolve(SETTING_KEYS.smtpUser, process.env.SMTP_USER);
  const pass = await resolve(SETTING_KEYS.smtpPass, process.env.SMTP_PASS);
  const from = await resolve(SETTING_KEYS.emailFrom, process.env.EMAIL_FROM) || "no-reply@companieshouseidverification.com";
  const secure = ((await resolve(SETTING_KEYS.smtpSecure, process.env.SMTP_SECURE)) || "false") === "true";
  const supportInbox = await resolve(SETTING_KEYS.supportEmail, process.env.SUPPORT_EMAIL);
  return { host, port, user, pass, from, secure, supportInbox, configured: Boolean(host && user && pass) };
}

/** Non-secret status for the settings UI - never returns secret values. */
export async function settingsStatus() {
  const map = await loadAll();
  const has = (k: SettingKey) => Boolean(map.get(k)?.trim());
  const val = (k: SettingKey) => map.get(k)?.trim() ?? "";
  return {
    stripe: {
      secretKeySet: has(SETTING_KEYS.stripeSecretKey) || Boolean(process.env.STRIPE_SECRET_KEY),
      webhookSecretSet: has(SETTING_KEYS.stripeWebhookSecret) || Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      publishableKey: val(SETTING_KEYS.stripePublishableKey) || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
    },
    s3: {
      driver: (map.get(SETTING_KEYS.storageDriver) || process.env.STORAGE_DRIVER || "local").toLowerCase(),
      bucket: val(SETTING_KEYS.s3Bucket) || process.env.S3_BUCKET || "",
      region: val(SETTING_KEYS.s3Region) || process.env.S3_REGION || "auto",
      endpoint: val(SETTING_KEYS.s3Endpoint) || process.env.S3_ENDPOINT || "",
      accessKeyIdSet: has(SETTING_KEYS.s3AccessKeyId) || Boolean(process.env.S3_ACCESS_KEY_ID),
      secretAccessKeySet: has(SETTING_KEYS.s3SecretAccessKey) || Boolean(process.env.S3_SECRET_ACCESS_KEY),
      forcePathStyle: (map.get(SETTING_KEYS.s3ForcePathStyle) || process.env.S3_FORCE_PATH_STYLE || "true") === "true",
    },
    smtp: {
      host: val(SETTING_KEYS.smtpHost) || process.env.SMTP_HOST || "",
      port: val(SETTING_KEYS.smtpPort) || process.env.SMTP_PORT || "587",
      secure: (map.get(SETTING_KEYS.smtpSecure) || process.env.SMTP_SECURE || "false") === "true",
      userSet: has(SETTING_KEYS.smtpUser) || Boolean(process.env.SMTP_USER),
      passSet: has(SETTING_KEYS.smtpPass) || Boolean(process.env.SMTP_PASS),
      from: val(SETTING_KEYS.emailFrom) || process.env.EMAIL_FROM || "",
      supportInbox: val(SETTING_KEYS.supportEmail) || process.env.SUPPORT_EMAIL || "",
    },
    supportSmtp: {
      host: val(SETTING_KEYS.supportSmtpHost) || process.env.SUPPORT_SMTP_HOST || "",
      port: val(SETTING_KEYS.supportSmtpPort) || process.env.SUPPORT_SMTP_PORT || "587",
      secure: (map.get(SETTING_KEYS.supportSmtpSecure) || process.env.SUPPORT_SMTP_SECURE || "false") === "true",
      userSet: has(SETTING_KEYS.supportSmtpUser) || Boolean(process.env.SUPPORT_SMTP_USER),
      passSet: has(SETTING_KEYS.supportSmtpPass) || Boolean(process.env.SUPPORT_SMTP_PASS),
      from: val(SETTING_KEYS.supportEmailFrom) || process.env.SUPPORT_EMAIL_FROM || "support@companieshouseidverification.com",
    },
    didit: {
      mode: (map.get(SETTING_KEYS.diditMode) || process.env.DIDIT_MODE || "sandbox").toLowerCase(),
      apiKeySet: has(SETTING_KEYS.diditApiKey) || Boolean(process.env.DIDIT_API_KEY),
      webhookSecretSet: has(SETTING_KEYS.diditWebhookSecret) || Boolean(process.env.DIDIT_WEBHOOK_SECRET),
      workflowId: val(SETTING_KEYS.diditWorkflowId) || process.env.DIDIT_WORKFLOW_ID || "",
      baseUrl: val(SETTING_KEYS.diditBaseUrl) || process.env.DIDIT_BASE_URL || "https://verification.didit.me",
    },
    payments: {
      bank: (map.get(SETTING_KEYS.payBankEnabled) ?? process.env.PAY_BANK_ENABLED ?? "true") === "true",
      worldpay: (map.get(SETTING_KEYS.payWorldpayEnabled) ?? process.env.PAY_WORLDPAY_ENABLED ?? "false") === "true",
      stripe: (map.get(SETTING_KEYS.payStripeEnabled) ?? process.env.PAY_STRIPE_ENABLED ?? "false") === "true",
    },
    worldpay: {
      mode: (map.get(SETTING_KEYS.worldpayMode) || process.env.WORLDPAY_MODE || "sandbox").toLowerCase(),
      usernameSet: has(SETTING_KEYS.worldpayUsername) || Boolean(process.env.WORLDPAY_USERNAME),
      passwordSet: has(SETTING_KEYS.worldpayPassword) || Boolean(process.env.WORLDPAY_PASSWORD),
      entity: val(SETTING_KEYS.worldpayEntity) || process.env.WORLDPAY_ENTITY || "default",
      checkoutId: val(SETTING_KEYS.worldpayCheckoutId) || process.env.WORLDPAY_CHECKOUT_ID || "",
    },
  };
}
