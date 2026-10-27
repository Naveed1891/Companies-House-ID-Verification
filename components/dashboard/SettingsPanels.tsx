"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-client";

type Status = {
  stripe: { secretKeySet: boolean; webhookSecretSet: boolean; publishableKey: string };
  s3: {
    driver: string;
    bucket: string;
    region: string;
    endpoint: string;
    accessKeyIdSet: boolean;
    secretAccessKeySet: boolean;
    forcePathStyle: boolean;
  };
  smtp: {
    host: string;
    port: string;
    secure: boolean;
    userSet: boolean;
    passSet: boolean;
    from: string;
    supportInbox: string;
  };
  supportSmtp: {
    host: string;
    port: string;
    secure: boolean;
    userSet: boolean;
    passSet: boolean;
    from: string;
  };
  didit: {
    mode: string;
    apiKeySet: boolean;
    webhookSecretSet: boolean;
    workflowId: string;
    baseUrl: string;
  };
  payments: { bank: boolean; worldpay: boolean; stripe: boolean };
  worldpay: {
    mode: string;
    usernameSet: boolean;
    passwordSet: boolean;
    entity: string;
    checkoutId: string;
  };
};

const UNCHANGED = "__unchanged__";
type Tab = "payments" | "email" | "stripe" | "identity" | "storage";

/** Password input whose stored value is never sent to the browser. */
function SecretField({
  label,
  isSet,
  value,
  onChange,
  hint,
}: {
  label: string;
  isSet: boolean;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <label className="dash-label">
      {label} {isSet && <span className="settings-set">saved</span>}
      <input
        className="dash-input"
        type="password"
        autoComplete="new-password"
        placeholder={isSet ? "•••••••• (leave blank to keep)" : "Not set"}
        value={value === UNCHANGED ? "" : value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="text-[12px] font-normal text-[color:var(--muted)]">{hint}</span>}
    </label>
  );
}

export function SettingsPanels({ initial }: { initial: Status }) {
  const [tab, setTab] = useState<Tab>("payments");
  const [status, setStatus] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Local editable copies. Secrets start blank; sending "" leaves them unchanged.
  const [smtp, setSmtp] = useState({
    smtpHost: initial.smtp.host,
    smtpPort: initial.smtp.port,
    smtpSecure: String(initial.smtp.secure),
    smtpUser: "",
    smtpPass: "",
    emailFrom: initial.smtp.from,
  });
  const [supportSmtp, setSupportSmtp] = useState({
    supportSmtpHost: initial.supportSmtp.host,
    supportSmtpPort: initial.supportSmtp.port,
    supportSmtpSecure: String(initial.supportSmtp.secure),
    supportSmtpUser: "",
    supportSmtpPass: "",
    supportEmailFrom: initial.supportSmtp.from,
    supportEmail: initial.smtp.supportInbox,
  });
  const [stripe, setStripe] = useState({
    stripeSecretKey: "",
    stripeWebhookSecret: "",
    stripePublishableKey: initial.stripe.publishableKey,
  });
  const [s3, setS3] = useState({
    storageDriver: initial.s3.driver,
    s3Bucket: initial.s3.bucket,
    s3Region: initial.s3.region,
    s3Endpoint: initial.s3.endpoint,
    s3AccessKeyId: "",
    s3SecretAccessKey: "",
    s3ForcePathStyle: String(initial.s3.forcePathStyle),
  });
  const [didit, setDidit] = useState({
    diditMode: initial.didit.mode === "production" ? "production" : "sandbox",
    diditApiKey: "",
    diditWorkflowId: initial.didit.workflowId,
    diditWebhookSecret: "",
    diditBaseUrl: initial.didit.baseUrl,
  });
  const [methods, setMethods] = useState({
    payBankEnabled: String(initial.payments.bank),
    payWorldpayEnabled: String(initial.payments.worldpay),
    payStripeEnabled: String(initial.payments.stripe),
  });
  const [worldpay, setWorldpay] = useState({
    worldpayMode: initial.worldpay.mode === "live" ? "live" : "sandbox",
    worldpayEntity: initial.worldpay.entity,
    worldpayUsername: "",
    worldpayPassword: "",
  });
  const [emailTest, setEmailTest] = useState("");
  const [diditTest, setDiditTest] = useState("");
  const [worldpayTest, setWorldpayTest] = useState("");

  async function save(payload: Record<string, string>) {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      // Blank secret fields mean "keep existing" - do not overwrite.
      const cleaned: Record<string, string> = {};
      for (const [k, v] of Object.entries(payload)) {
        cleaned[k] =
          v === "" && k.match(/Key$|Pass$|Secret$|User$|Username$|Password$/) ? UNCHANGED : v;
      }
      const res = await apiFetch<{ status: Status }>("/api/admin/settings", {
        method: "POST",
        body: JSON.stringify(cleaned),
      });
      setStatus(res.status);
      setMessage("Saved. New credentials are now in effect.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save settings.");
    } finally {
      setSaving(false);
    }
  }

  async function testDidit() {
    setDiditTest("Testing…");
    try {
      const res = await apiFetch<{ message?: string }>("/api/admin/settings/test-didit", {
        method: "POST",
      });
      setDiditTest(res.message ?? "Success - Didit is reachable.");
    } catch (cause) {
      setDiditTest(cause instanceof Error ? cause.message : "Test failed.");
    }
  }

  async function testWorldpay() {
    setWorldpayTest("Testing…");
    try {
      const res = await apiFetch<{ ok: boolean; message?: string }>(
        "/api/admin/settings/worldpay-test",
        { method: "POST" },
      );
      setWorldpayTest(res.message ?? (res.ok ? "Credentials accepted by WorldPay." : "Test failed."));
    } catch (cause) {
      setWorldpayTest(cause instanceof Error ? cause.message : "Test failed.");
    }
  }

  async function testEmail(profile: "auth" | "support") {
    setEmailTest("Sending…");
    try {
      const res = await apiFetch<{ ok: boolean; error?: string }>("/api/admin/settings/test-email", {
        method: "POST",
        body: JSON.stringify({ profile }),
      });
      setEmailTest(res.ok ? "Test email sent - check your inbox." : res.error ?? "Test failed.");
    } catch (cause) {
      setEmailTest(cause instanceof Error ? cause.message : "Test failed.");
    }
  }

  return (
    <div className="settings">
      <div className="settings__tabs" role="tablist">
        {(["payments", "email", "stripe", "identity", "storage"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={`settings__tab ${tab === t ? "settings__tab--active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "payments"
              ? "Payments"
              : t === "email"
                ? "Email (SMTP)"
                : t === "stripe"
                  ? "Stripe"
                  : t === "identity"
                    ? "Identity (Didit)"
                    : "Storage (S3)"}
          </button>
        ))}
      </div>

      {(error || message) && (
        <p className={`form-alert ${error ? "form-alert--error" : "form-alert--success"} mb-5`}>
          {error || message}
        </p>
      )}

      {tab === "payments" && (
        <>
          <section className="dash-panel">
            <p className="eyebrow">Payment methods</p>
            <p className="settings__lead">
              Turn each checkout payment method on or off. Customers only see and can use the methods
              that are switched on here.
            </p>
            <div className="grid gap-3">
              {[
                ["payBankEnabled", "Bank transfer (Tide)", "Customer transfers to the business account and uploads proof."] as const,
                ["payWorldpayEnabled", "WorldPay (card)", "Card payment via WorldPay. Configure the credentials below."] as const,
                ["payStripeEnabled", "Stripe (card)", "Card payment via Stripe. Configure keys in the Stripe tab."] as const,
              ].map(([key, title, desc]) => (
                <label
                  key={key}
                  className="flex items-start justify-between gap-4 rounded-xl border border-[color:var(--border)] p-4"
                >
                  <span>
                    <span className="block text-[14px] font-bold">{title}</span>
                    <span className="block text-[12.5px] text-[color:var(--muted)]">{desc}</span>
                  </span>
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 shrink-0 accent-emerald"
                    checked={methods[key] === "true"}
                    onChange={(e) => setMethods({ ...methods, [key]: String(e.target.checked) })}
                  />
                </label>
              ))}
            </div>
            <div className="dash-actions mt-4">
              <button type="button" className="dash-btn dash-btn--primary" disabled={saving} onClick={() => save(methods)}>
                {saving ? "Saving…" : "Save payment methods"}
              </button>
            </div>
          </section>

          <section className="dash-panel mt-5">
            <p className="eyebrow">WorldPay (Access Worldpay - hosted card payments)</p>
            <p className="settings__lead">
              Use <strong>sandbox</strong> credentials to test, then switch to <strong>live</strong> and paste
              the production credentials. Customers are redirected to WorldPay&rsquo;s own secure page to enter
              their card details, so no card data touches this site.
            </p>
            <div className="settings__grid">
              <label className="dash-label">
                Mode
                <select className="dash-input" value={worldpay.worldpayMode} onChange={(e) => setWorldpay({ ...worldpay, worldpayMode: e.target.value })}>
                  <option value="sandbox">Sandbox (testing)</option>
                  <option value="live">Live (production)</option>
                </select>
              </label>
              <label className="dash-label">
                Entity / merchant reference
                <input className="dash-input" value={worldpay.worldpayEntity} onChange={(e) => setWorldpay({ ...worldpay, worldpayEntity: e.target.value })} placeholder="default" />
              </label>
              <SecretField label="API username" isSet={status.worldpay.usernameSet} value={worldpay.worldpayUsername} onChange={(v) => setWorldpay({ ...worldpay, worldpayUsername: v })} hint="Basic-auth username from WorldPay" />
              <SecretField label="API password" isSet={status.worldpay.passwordSet} value={worldpay.worldpayPassword} onChange={(v) => setWorldpay({ ...worldpay, worldpayPassword: v })} hint="Basic-auth password from WorldPay" />
            </div>
            <div className="dash-actions mt-4">
              <button type="button" className="dash-btn dash-btn--primary" disabled={saving} onClick={() => save(worldpay)}>
                {saving ? "Saving…" : "Save WorldPay settings"}
              </button>
              <button type="button" className="dash-btn" onClick={testWorldpay}>
                Test connection
              </button>
            </div>
            {worldpayTest && <p className="mt-3 text-[13.5px] font-semibold text-[color:var(--body)]">{worldpayTest}</p>}
            <p className="mt-3 text-[12.5px] text-[color:var(--muted)]">
              The API username and password are the machine credentials from your WorldPay dashboard (not your
              WorldPay login email/password). The hosted page needs only these two values - no Checkout ID
              required. Save first, then Test connection to confirm they authenticate against the selected mode.
            </p>
          </section>
        </>
      )}

      {tab === "email" && (
        <section className="dash-panel">
          <p className="eyebrow">Email (SMTP)</p>
          <p className="settings__lead">Configure each mailbox with its own Hostinger SMTP login.</p>
          <p className="mb-3 font-bold">Authentication mail — no-reply@companieshouseidverification.com</p>
          <div className="settings__grid">
            <label className="dash-label">
              SMTP host
              <input className="dash-input" value={smtp.smtpHost} onChange={(e) => setSmtp({ ...smtp, smtpHost: e.target.value })} placeholder="smtp.yourprovider.com" />
            </label>
            <label className="dash-label">
              Port
              <input className="dash-input" value={smtp.smtpPort} onChange={(e) => setSmtp({ ...smtp, smtpPort: e.target.value })} placeholder="587" />
            </label>
            <SecretField label="Username" isSet={status.smtp.userSet} value={smtp.smtpUser} onChange={(v) => setSmtp({ ...smtp, smtpUser: v })} />
            <SecretField label="Password" isSet={status.smtp.passSet} value={smtp.smtpPass} onChange={(v) => setSmtp({ ...smtp, smtpPass: v })} />
            <label className="dash-label">
              From address (OTP and password reset)
              <input className="dash-input" value={smtp.emailFrom} onChange={(e) => setSmtp({ ...smtp, emailFrom: e.target.value })} placeholder="no-reply@companieshouseidverification.com" />
            </label>
            <label className="dash-label">
              Use TLS (SSL)
              <select className="dash-input" value={smtp.smtpSecure} onChange={(e) => setSmtp({ ...smtp, smtpSecure: e.target.value })}>
                <option value="false">STARTTLS (port 587)</option>
                <option value="true">SSL/TLS (port 465)</option>
              </select>
            </label>
          </div>
          <div className="dash-actions mt-4">
            <button type="button" className="dash-btn dash-btn--primary" disabled={saving} onClick={() => save(smtp)}>
              {saving ? "Saving…" : "Save no-reply settings"}
            </button>
            <button type="button" className="dash-btn" onClick={() => testEmail("auth")}>
              Test no-reply
            </button>
          </div>
          <p className="mb-3 mt-8 font-bold">Customer communications — support@companieshouseidverification.com</p>
          <div className="settings__grid">
            <label className="dash-label">SMTP host<input className="dash-input" value={supportSmtp.supportSmtpHost} onChange={(e) => setSupportSmtp({ ...supportSmtp, supportSmtpHost: e.target.value })} placeholder="smtp.hostinger.com" /></label>
            <label className="dash-label">Port<input className="dash-input" value={supportSmtp.supportSmtpPort} onChange={(e) => setSupportSmtp({ ...supportSmtp, supportSmtpPort: e.target.value })} placeholder="465" /></label>
            <SecretField label="Username" isSet={status.supportSmtp.userSet} value={supportSmtp.supportSmtpUser} onChange={(v) => setSupportSmtp({ ...supportSmtp, supportSmtpUser: v })} />
            <SecretField label="Password" isSet={status.supportSmtp.passSet} value={supportSmtp.supportSmtpPass} onChange={(v) => setSupportSmtp({ ...supportSmtp, supportSmtpPass: v })} />
            <label className="dash-label">From address<input className="dash-input" value={supportSmtp.supportEmailFrom} onChange={(e) => setSupportSmtp({ ...supportSmtp, supportEmailFrom: e.target.value })} placeholder="support@companieshouseidverification.com" /></label>
            <label className="dash-label">Support inbox (contact enquiries)<input className="dash-input" value={supportSmtp.supportEmail} onChange={(e) => setSupportSmtp({ ...supportSmtp, supportEmail: e.target.value })} placeholder="support@companieshouseidverification.com" /></label>
            <label className="dash-label">Use TLS (SSL)<select className="dash-input" value={supportSmtp.supportSmtpSecure} onChange={(e) => setSupportSmtp({ ...supportSmtp, supportSmtpSecure: e.target.value })}><option value="false">STARTTLS (port 587)</option><option value="true">SSL/TLS (port 465)</option></select></label>
          </div>
          <div className="dash-actions mt-4">
            <button type="button" className="dash-btn dash-btn--primary" disabled={saving} onClick={() => save(supportSmtp)}>{saving ? "Saving…" : "Save support settings"}</button>
            <button type="button" className="dash-btn" onClick={() => testEmail("support")}>Test support</button>
          </div>
          {emailTest && <p className="mt-3 text-[13.5px] font-semibold text-[color:var(--body)]">{emailTest}</p>}
        </section>
      )}

      {tab === "stripe" && (
        <section className="dash-panel">
          <p className="eyebrow">Stripe payments</p>
          <p className="settings__lead">
            Used to take the verification fee. Point your Stripe webhook at{" "}
            <code>/api/webhooks/stripe</code> and paste its signing secret below.
          </p>
          <div className="settings__grid">
            <SecretField label="Secret key" isSet={status.stripe.secretKeySet} value={stripe.stripeSecretKey} onChange={(v) => setStripe({ ...stripe, stripeSecretKey: v })} hint="Starts with sk_live_ or sk_test_" />
            <SecretField label="Webhook signing secret" isSet={status.stripe.webhookSecretSet} value={stripe.stripeWebhookSecret} onChange={(v) => setStripe({ ...stripe, stripeWebhookSecret: v })} hint="Starts with whsec_" />
            <label className="dash-label">
              Publishable key
              <input className="dash-input" value={stripe.stripePublishableKey} onChange={(e) => setStripe({ ...stripe, stripePublishableKey: e.target.value })} placeholder="pk_live_…" />
            </label>
          </div>
          <div className="dash-actions mt-4">
            <button type="button" className="dash-btn dash-btn--primary" disabled={saving} onClick={() => save(stripe)}>
              {saving ? "Saving…" : "Save Stripe settings"}
            </button>
          </div>
        </section>
      )}

      {tab === "identity" && (
        <section className="dash-panel">
          <p className="eyebrow">Identity verification (Didit)</p>
          <p className="settings__lead">
            Generates each applicant&rsquo;s Didit verification link. Use a <strong>sandbox</strong> app&rsquo;s
            API key while testing (sessions are mocked and unbilled), then switch the mode to{" "}
            <strong>production</strong> and paste the live keys. Register your Didit webhook at{" "}
            <code>/api/webhooks/didit</code>.
          </p>
          <div className="settings__grid">
            <label className="dash-label">
              Mode
              <select className="dash-input" value={didit.diditMode} onChange={(e) => setDidit({ ...didit, diditMode: e.target.value })}>
                <option value="sandbox">Sandbox (testing)</option>
                <option value="production">Production (live)</option>
              </select>
            </label>
            <label className="dash-label">
              Workflow ID
              <input className="dash-input" value={didit.diditWorkflowId} onChange={(e) => setDidit({ ...didit, diditWorkflowId: e.target.value })} placeholder="Workflow ID from the Didit console" />
            </label>
            <SecretField label="API key" isSet={status.didit.apiKeySet} value={didit.diditApiKey} onChange={(v) => setDidit({ ...didit, diditApiKey: v })} hint="x-api-key from the Didit console (sandbox or live app)" />
            <SecretField label="Webhook secret" isSet={status.didit.webhookSecretSet} value={didit.diditWebhookSecret} onChange={(v) => setDidit({ ...didit, diditWebhookSecret: v })} hint="Shared key used to verify webhook signatures" />
            <label className="dash-label">
              API base URL
              <input className="dash-input" value={didit.diditBaseUrl} onChange={(e) => setDidit({ ...didit, diditBaseUrl: e.target.value })} placeholder="https://verification.didit.me" />
            </label>
          </div>
          <div className="dash-actions mt-4">
            <button type="button" className="dash-btn dash-btn--primary" disabled={saving} onClick={() => save(didit)}>
              {saving ? "Saving…" : "Save Didit settings"}
            </button>
            <button type="button" className="dash-btn" onClick={testDidit}>
              Test connection
            </button>
          </div>
          {diditTest && (
            <p className="mt-3 text-[13.5px] font-semibold text-[color:var(--body)]">{diditTest}</p>
          )}
        </section>
      )}

      {tab === "storage" && (
        <section className="dash-panel">
          <p className="eyebrow">Document storage (S3)</p>
          <p className="settings__lead">
            Where identity documents are stored. Use S3 (or an S3-compatible service such as
            Cloudflare R2) in production.
          </p>
          <div className="settings__grid">
            <label className="dash-label">
              Driver
              <select className="dash-input" value={s3.storageDriver} onChange={(e) => setS3({ ...s3, storageDriver: e.target.value })}>
                <option value="s3">S3 / R2 (recommended)</option>
                <option value="local">Local disk (development only)</option>
              </select>
            </label>
            <label className="dash-label">
              Bucket
              <input className="dash-input" value={s3.s3Bucket} onChange={(e) => setS3({ ...s3, s3Bucket: e.target.value })} />
            </label>
            <label className="dash-label">
              Region
              <input className="dash-input" value={s3.s3Region} onChange={(e) => setS3({ ...s3, s3Region: e.target.value })} placeholder="auto" />
            </label>
            <label className="dash-label">
              Endpoint (R2 / custom)
              <input className="dash-input" value={s3.s3Endpoint} onChange={(e) => setS3({ ...s3, s3Endpoint: e.target.value })} placeholder="https://…" />
            </label>
            <SecretField label="Access key ID" isSet={status.s3.accessKeyIdSet} value={s3.s3AccessKeyId} onChange={(v) => setS3({ ...s3, s3AccessKeyId: v })} />
            <SecretField label="Secret access key" isSet={status.s3.secretAccessKeySet} value={s3.s3SecretAccessKey} onChange={(v) => setS3({ ...s3, s3SecretAccessKey: v })} />
            <label className="dash-label">
              Force path style
              <select className="dash-input" value={s3.s3ForcePathStyle} onChange={(e) => setS3({ ...s3, s3ForcePathStyle: e.target.value })}>
                <option value="true">Yes (R2 / MinIO)</option>
                <option value="false">No (AWS S3)</option>
              </select>
            </label>
          </div>
          <div className="dash-actions mt-4">
            <button type="button" className="dash-btn dash-btn--primary" disabled={saving} onClick={() => save(s3)}>
              {saving ? "Saving…" : "Save storage settings"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
