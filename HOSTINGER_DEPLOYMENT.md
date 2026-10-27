# Companies House Identity Verification — Hostinger Deployment

## Requirements

- Hostinger **Node.js application**, Node **20 LTS or newer**
- Hostinger **MySQL 8** database (provisioned in hPanel)
- A Stripe account (live keys)
- A Didit account with a workflow configured at verification.didit.me

## hPanel Node.js app settings

| Field | Value |
|---|---|
| **Application startup file** | `server.js` |
| **Build command** | `npm run build` |
| **Start command** | `npm run start` |
| **Node.js version** | 20 LTS (or 22 LTS) |

## Commands

| Step | Command |
|---|---|
| Install | `npm ci` |
| Build | `npm run build` |
| Start | `npm run start` |

`npm run build` automatically runs `prisma migrate deploy` before compiling.
For a database-only migration:

```bash
npx prisma migrate deploy
```

Run `npx prisma db seed` only once to create the initial superadmin (idempotent).

## Environment variables

Set these in Hostinger hPanel → Node.js application → Environment variables.
**This is the complete list — Stripe, Didit, SMTP, and S3 are configured through the superadmin credentials UI after first login.**

### Database (Hostinger MySQL)

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

> Hostinger provides these values in hPanel → Databases → MySQL.
> The app automatically builds `DATABASE_URL` from these at startup.
> Always use `127.0.0.1` as `DB_HOST`, not `localhost`.

### Application

```
SESSION_SECRET=<64 hex chars — generate below>
```

### Superadmin seeding (used once by `prisma db seed`)

```
SEED_ADMIN_EMAIL=naveed@hopetexx.com
SEED_ADMIN_PASSWORD=<at least 12 characters>
SEED_CEO_PASSWORD=<at least 12 characters>
```

Change both passwords after first sign-in.

### Optional recovery

```
RECOVERY_TOKEN=<random token for emergency CLI resets>
```

## Generating SESSION_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Deploying from GitHub

1. Push this directory to a private GitHub repository.
2. In Hostinger hPanel, create a Node.js application and connect the repository.
3. Select Node.js 22 and set the project root to the repository root.
4. Set build command `npm run build` and start command `npm run start`.
5. Add the environment variables listed above.
6. Click Deploy.
7. After the first deploy, run `npx prisma db seed` via SSH to create the superadmin.
8. Attach the domain `companieshouseidverification.com`, enable HTTPS, and verify.
9. Sign in as superadmin and go to **Dashboard → Credentials** to configure Stripe, Didit, SMTP, and Storage.

## Superadmin credentials UI

Sign in as SUPER_ADMIN, then open **Dashboard → Credentials** (`/dashboard/admin/settings`).

All sensitive credentials are stored encrypted in the database and take effect immediately — no redeploy needed.

| Tab | What to configure |
|---|---|
| **Payments** | Enable/disable Bank transfer, WorldPay, Stripe at checkout |
| **Email (SMTP)** | no-reply and support mailbox SMTP credentials |
| **Stripe** | Secret key, publishable key, webhook signing secret |
| **Identity (Didit)** | API key, workflow ID, webhook secret, mode (sandbox / production) |
| **Storage (S3)** | Bucket, region, endpoint, access keys (if storing documents) |

## Stripe webhook

1. Stripe Dashboard → Developers → Webhooks → Add endpoint
2. URL: `https://companieshouseidverification.com/api/webhooks/stripe`
3. Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`
4. Copy the signing secret and paste it in **Dashboard → Credentials → Stripe**

## Didit webhook

1. Didit Dashboard → Webhooks → Add endpoint
2. URL: `https://companieshouseidverification.com/api/webhooks/didit`
3. Copy the signing secret and paste it in **Dashboard → Credentials → Identity (Didit)**

## Post-deploy checks

- `https://companieshouseidverification.com` loads homepage
- `https://companieshouseidverification.com/login` shows sign-in form
- `https://companieshouseidverification.com/signup` shows registration form
- Superadmin signs in → lands on `/dashboard/admin`
- Customer signs up → lands on `/dashboard`
- A signed-in customer visiting `/dashboard/admin` gets 404
- Superadmin opens **Credentials** → configures Stripe, Didit, SMTP
- A live test purchase moves the order to paid and unlocks the verification step
- Didit verification link generates correctly
- Stripe dashboard shows webhook delivering 200

## Rollback

Deploy the previous commit and restart. Do not roll back migrations on a live database — restore from a backup taken before the release.

## Architecture

- Next.js 16 App Router, React 19, Tailwind v4, TypeScript strict
- Prisma → MySQL 8 (this app owns the schema)
- Sessions: signed HTTP-only cookies — `chidv_session` (customer, 30 days), `chidv_staff_session` (staff, 8 hours)
- Credentials (Stripe, Didit, SMTP, S3) stored AES-encrypted in `AppSetting` table, resolved at request time with 30-second in-process cache
- Identity verification: Didit (QR code flow, no document uploads stored)
- Authorisation enforced server-side in every route handler and server component
- All administrative mutations written to `AuditLog`
- Output: standalone — `node .next/standalone/server.js` serves the entire app
