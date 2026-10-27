# DirectorKYC — Standalone Platform Implementation

## Objective

Turn `directorkyc-website` into a **single self-contained Next.js application** that can be deployed to Hostinger on its own, with **no dependency on any other folder or service**. It must contain the full order lifecycle, Stripe payments, document handling, a customer dashboard, and an admin dashboard — all reached through **one login page at `directorkyc.com/login`**.

**Deployment constraint that drives everything:** only this folder is uploaded. If a feature needs a database, Stripe, file storage, or email, it must live in this repo.

---

## 1. Current state

`directorkyc-website` (Next.js 15, React 19, Tailwind v4, TypeScript strict, port 3003 local) is today a **thin front-end with no database**. It proxies everything to a separate `service-dashboard` app over an integration API.

**All of that proxying is being removed.** This app becomes the system of record.

### What to delete once replacements are working

- `lib/central-dashboard/` (client + config)
- `lib/customer-dashboard-url.ts`
- `lib/dashboard/` (client, fallback, types, format — the proxy layer)
- The bridge-token model in `lib/auth/session.ts` (replaced by real sessions)
- Proxy routes under `app/api/` that only forward to the integration API

### What to keep

- All public marketing pages and their motion system
- `components/auth/AuthProvider.tsx` — the single client-side source of truth for auth state. Extend it; do not replace it.
- The purchase flow shape: **choose package → check login → signup/login → Stripe → application → dashboard**
- `lib/return-to.ts` open-redirect guards
- `app/login/page.tsx` and `app/signup/page.tsx` — extend in place
- Design tokens in `app/globals.css`

### Unrelated folders — do not touch

`service-dashboard` and `directorkyc-customer-dashboard` stay as they are. ITINFiling continues to use `service-dashboard`. Do not modify, import from, or delete them. This build must not reference them at all.

---

## 2. Stack to add (all inside this repo)

| Concern | Choice |
|---|---|
| Database | MySQL 8 via **Prisma** (`@prisma/client`, `prisma`) |
| Auth | Own session layer — HTTP-only signed cookies, **bcryptjs** for passwords |
| Payments | **stripe** SDK + own webhook route |
| Documents | S3-compatible object storage (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`) |
| Validation | **zod** at every route boundary |
| Email | Provider-agnostic adapter, `EMAIL_PROVIDER="none"` default |

Do not add a UI component library. Tailwind v4 is already configured.

---

## 3. Data model (Prisma, `prisma/schema.prisma`)

MySQL 8, `utf8mb4`. Keep it to what DirectorKYC needs — this is a single-brand system, so there are **no Brand, BrandDomain, BrandTheme, StaffBrandAccess or WebsiteIntegrationKey tables**.

```
User            id, email(unique, normalized), passwordHash, role, status,
                fullName, whatsapp, country, emailVerified, timestamps, deletedAt
Service         id, slug, name, description, active
Package         id, slug(unique), name, description, price, compareAtPrice,
                currency, features(Json), active, serviceId
Order           id, publicReference(unique), userId, packageId, status,
                paymentStatus, amount, currency, assignedToId, timestamps
OrderStatusHistory  id, orderId, fromStatus, toStatus, note, actorId, createdAt
Payment         id, orderId, provider, providerPaymentId(unique), amount,
                currency, status, rawPayload(Json), createdAt
Refund          id, paymentId, amount, reason, status, providerRefundId, createdAt
CheckoutIntent  id, publicReference, userId, packageId, stripeSessionId(unique),
                status, createdAt
Application     id, orderId(unique), status, answers(Json),
                declarationAccepted, submittedAt, reviewNote, reviewedById
FormDefinition  id, packageId, version, schema(Json), active
Document        id, orderId, userId, kind, fileName, mimeType, size,
                storageKey, status, rejectionReason, uploadedAt, reviewedById
DocumentRequirement  id, packageId, kind, label, required, guidance
Message         id, orderId, userId, channel, direction, subject, body, createdAt
Notification    id, userId, title, body, readAt, createdAt
Task            id, orderId, title, status, assignedToId, dueAt, createdAt
InternalNote    id, orderId, authorId, body, createdAt          # staff-only, never exposed to customers
AuditLog        id, actorId, action, entity, entityId, before(Json), after(Json), ip, createdAt
ProcessedStripeEvent  id, eventId(unique), processedAt          # webhook idempotency
PasswordResetToken    id, userId, tokenHash, expiresAt, usedAt
```

### Enums — use these exact values

```
Role:              SUPER_ADMIN OPERATIONS_ADMIN COMPLIANCE_REVIEWER FINANCE SUPPORT READ_ONLY CUSTOMER
UserStatus:        ACTIVE INACTIVE INVITED SUSPENDED
OrderStatus:       DRAFT PENDING_PAYMENT PAYMENT_CONFIRMED AWAITING_APPLICATION
                   APPLICATION_IN_PROGRESS SUBMITTED UNDER_REVIEW AWAITING_CUSTOMER
                   ADDITIONAL_INFO_REQUIRED PROCESSING COMPLETED CANCELLED REFUNDED
ApplicationStatus: NOT_STARTED IN_PROGRESS SUBMITTED APPROVED REJECTED
DocumentStatus:    REQUESTED UPLOADED IN_REVIEW APPROVED REJECTED NEEDS_REUPLOAD
PaymentStatus:     UNPAID PENDING AUTHORIZED PAID FAILED CANCELLED PARTIALLY_REFUNDED REFUNDED
RefundStatus:      PENDING PROCESSING COMPLETED FAILED CANCELLED
MessageChannel:    EMAIL PORTAL SMS WHATSAPP SYSTEM
MessageDirection:  INBOUND OUTBOUND INTERNAL
TaskStatus:        TODO IN_PROGRESS BLOCKED DONE
```

### Seed (`prisma/seed.ts`, idempotent)

- The DirectorKYC IDV service, its package (**£19.99**, compare-at £80), features, form definition, and document requirements — matching what the site already advertises
- One admin from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (min 12 chars), role `SUPER_ADMIN`
- Never seed customer accounts or fake orders in production

---

## 4. Authentication

Replace the bridge-token model entirely. Sessions are now local.

- Passwords: bcrypt, cost 12. Never store or log plaintext.
- Session: signed HTTP-only cookie, `sameSite: lax`, `secure` in production, `path=/`
  - Customer: `dkyc_session`, 30 days
  - Staff: `dkyc_staff_session`, 8 hours
- Sign the cookie with `SESSION_SECRET` (HMAC-SHA256) or use a JWT — either way, verify signature and expiry on every request.
- **A transient failure must never sign a user out.** Only an invalid/expired session clears the cookie. This was a real bug in this codebase — do not reintroduce it.

### Single login page — `/login`

`app/login/page.tsx` already exists and is load-bearing for checkout. **Extend it; do not create a second login route.**

One form, one submit. Look the user up once, then branch on `role`:
- `role === CUSTOMER` → customer session
- any other role → staff session
- no match, wrong password, inactive, or soft-deleted → generic **"Invalid email or password."**

Never reveal which account type matched or whether the email exists. Rate-limit by IP and by email.

**Redirect precedence after sign-in (this order matters):**
1. Staff → always `/dashboard/admin`, ignoring `returnTo` — staff must never land in a customer checkout
2. Customer **with** a valid `returnTo` → that destination (preserves package → login → Stripe)
3. Customer **without** → `/dashboard`

Keep `safeReturnTo` from `lib/return-to.ts`. Never show a login form to a signed-in user — redirect to their landing page.

`/signup` is **customer-only**; it may only ever create `role = CUSTOMER`. Staff are seeded or invited.

Also implement: forgot password, reset password (single-use hashed token, short expiry), and change password.

### Route protection

Middleware **plus** a server-side re-check in every route handler and server component that reads data. Client-side role checks are UX only.

- `/dashboard/**` requires a customer session
- `/dashboard/admin/**` requires a staff session
- A signed-in customer hitting an admin route gets **404**, not 403
- Unauthenticated → redirect to `/login?returnTo=…`

---

## 5. Order lifecycle and Stripe

Own the whole flow in this app.

1. `/checkout?package=<slug>` — reads the package from the database; if signed out, prompts sign in/create account preserving the selection
2. `POST /api/checkout/create-session` — creates `Order` (`PENDING_PAYMENT`) + `CheckoutIntent`, then a Stripe Checkout Session. Amount and currency come from the **database**, never from the client.
3. `POST /api/webhooks/stripe` — raw body, `stripe.webhooks.constructEvent` with `STRIPE_WEBHOOK_SECRET`. Handle `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`. Record in `ProcessedStripeEvent` **before** acting so replays are idempotent. On success: `Payment` row, order → `PAYMENT_CONFIRMED` / `AWAITING_APPLICATION`, `OrderStatusHistory`, notify the customer.
4. `/application/[orderRef]` — unlocked only when payment is confirmed; save draft, submit, upload documents
5. Customer tracks progress in `/dashboard`; staff process it in `/dashboard/admin`

Never mark an order paid from a client callback or the Stripe redirect alone — **only the verified webhook** may do that. The redirect page polls order status.

---

## 6. Document storage

KYC documents are sensitive and legally significant. Use S3-compatible object storage (AWS S3 or Cloudflare R2), not the app filesystem — Hostinger's disk is not a durable store across deploys.

- Upload server-side; validate MIME type and size (`MAX_UPLOAD_SIZE_MB`, default 10); store only `storageKey` in the database
- Serve **only** via short-lived presigned URLs, issued after an ownership/role check
- Never a public URL, never a guessable path, never the raw key to the client
- Local dev may use `STORAGE_DRIVER="local"` with `PRIVATE_UPLOAD_DIR`; production must be `s3`

---

## 7. Customer dashboard — `/dashboard`

- **Overview** — current verification status, next action, progress
- **My Requests** — list + detail (`/dashboard/orders/[reference]`) with timeline, package, amount paid
- **Application** — resume in progress; read-only after submission
- **Documents** — upload, see status, re-upload when rejected with the reason shown
- **Personal Code** — Companies House code once issued, with copy-to-clipboard
- **Notifications** — in-app, unread count
- **Profile** — name, email, WhatsApp, country, change password
- **Support** — message thread with the team

Every query scoped to the session's `userId` server-side. Never accept a customer id from the client.

---

## 8. Admin dashboard — `/dashboard/admin`

- **Overview** — KPIs (new orders, awaiting review, documents pending, revenue, completion rate), recent activity
- **Orders** — filter/sort/paginate; detail with timeline, status change, assignment, internal notes
- **Customers** — search, profile, order history
- **Applications** — review queue, full answers, approve/reject with reason
- **Documents** — review queue, secure preview/download, approve/reject/request re-upload
- **Finance** — payments, refunds (real Stripe refund), revenue reporting, CSV export
- **Packages & Services** — edit price, features, active state
- **Communications** — message customers, thread history
- **Tasks** — assign and track internal work
- **Reports** — volume, turnaround, status breakdown, date filters, CSV export
- **Audit Log** — read-only, searchable, paginated
- **Staff** — list, invite, role assignment (`SUPER_ADMIN` only)

Enforce role permissions server-side: only `SUPER_ADMIN`/`FINANCE` may refund; `READ_ONLY` may not mutate. **Every mutation writes an `AuditLog` row.** Every table needs loading, empty, error, and permission states; every destructive action needs confirmation.

---

## 9. Design — match the existing website exactly

```css
--orange: #FF5A1F;  --orange-dark: #E94E1B;
--cream: #FAF6F0;   --cream-soft: #FFF7F1;
--black: #111111;   --charcoal: #202024;  --charcoal-soft: #242428;
--body: #4B4B4B;    --muted: #666666;     --border: rgba(17,17,17,0.10);
```

Fonts already wired: **Manrope** (UI), **Newsreader** (headings). Reuse tokens and classes from `app/globals.css`; reuse `MagneticButton` for CTAs. Charcoal sidebar echoing the site navbar, cream content background, orange as the single accent. Dashboard motion stays restrained — transitions and skeletons only; do not port hero animations into data tables. Fully responsive, no horizontal overflow, respect `prefers-reduced-motion`.

---

## 10. Environment variables

Update `.env.example`. Never commit real secrets.

```dotenv
DATABASE_URL="mysql://user:pass@host:3306/directorkyc"
SESSION_SECRET=""
NEXT_PUBLIC_SITE_URL="https://directorkyc.com"

STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

STORAGE_DRIVER="s3"          # local | s3
S3_BUCKET=""
S3_ENDPOINT=""
S3_REGION="auto"
S3_ACCESS_KEY_ID=""
S3_SECRET_ACCESS_KEY=""
MAX_UPLOAD_SIZE_MB="10"
PRIVATE_UPLOAD_DIR="./storage/private"

EMAIL_PROVIDER="none"
EMAIL_FROM="no-reply@directorkyc.com"

SEED_ADMIN_EMAIL=""
SEED_ADMIN_PASSWORD=""
```

Remove every `CENTRAL_DASHBOARD_*`, `SERVICE_DASHBOARD_*`, `USE_CENTRAL_DASHBOARD`, and `NEXT_PUBLIC_CUSTOMER_DASHBOARD_URL` variable. Fail fast at startup if a required production variable is missing.

---

## 11. Hostinger deployment

Target: Hostinger **Node.js application** + **MySQL 8**, Node 22 LTS, npm.

- Build `npm run build`; start `npm run start`; Hostinger supplies `PORT` and Next.js reads it
- Release commands: `npx prisma generate` → `npx prisma migrate deploy` → `npx prisma db seed`
- Percent-encode reserved characters (`@ : / ? #`) in the database password inside `DATABASE_URL`
- Point the Stripe webhook at `https://directorkyc.com/api/webhooks/stripe` and use that endpoint's signing secret
- Add a `HOSTINGER_DEPLOYMENT.md` in this repo covering env vars, release commands, and a rollback note
- Only this folder is deployed. Nothing may import from a sibling directory.

---

## 12. Security (non-negotiable)

- All authorization server-side on every request; never trust client-supplied role, user id, or order id
- Order amounts always from the database, never the client
- Stripe webhook signature verified; events idempotent via `ProcessedStripeEvent`
- Documents only via short-lived presigned URLs after an ownership/role check
- Generic auth errors; rate-limit login, signup, and password reset; no user enumeration
- Audit-log every admin mutation
- Never log secrets, tokens, passwords, or document contents
- Zod validation at every route boundary
- Security headers and HTTPS-only cookies in production

---

## 13. Acceptance criteria

1. `directorkyc.com/login` serves one form for both customers and admins
2. Customer → `/dashboard`; admin → `/dashboard/admin`
3. `/login?returnTo=/checkout?package=…` still returns a customer to checkout, signed in
4. Staff sign-in ignores `returnTo`
5. A customer cannot reach `/dashboard/admin/**` by URL, cookie edit, or direct API call — 404
6. Full flow works: package → login/signup → Stripe → webhook confirms → application → dashboard shows it → admin sees the same order
7. A replayed Stripe webhook does not double-process
8. The app runs with **no other folder present** — clone this repo alone, set env, migrate, seed, build, run
9. `npm run build` and `npm run lint` pass; no secrets committed
10. Dashboard visually matches the website brand

---

## 14. How to work

Build in vertical slices — schema → API → UI → states, one module at a time — not all backend then all frontend.

Suggested order:
1. Prisma schema + migration + seed; prove `npx prisma migrate dev` and seed work
2. Auth: sessions, `/login`, `/signup`, reset, middleware, route protection
3. Catalog + checkout + Stripe webhook — get one real test payment landing in the database
4. Application + documents
5. One customer module and one admin module end to end (sets the pattern)
6. Remaining modules
7. Delete the dead proxy layer from section 1
8. Deployment docs + final verification

Strict TypeScript, no `any`, no unsafe casts. Do not disable checks, swallow errors, or add broad fallbacks to make something pass. Match existing conventions. Verify in the browser before calling anything done, and report what was actually run.

### Local

```
MySQL/MariaDB on 3306
npm run dev -- --port 3003
stripe listen --forward-to localhost:3003/api/webhooks/stripe
```

Note the webhook now points at **3003**, this app — not 3001.
