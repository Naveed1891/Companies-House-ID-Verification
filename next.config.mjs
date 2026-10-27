// Populate env for `next build` and `next start` from the committed
// fallback when hPanel env-var access is delegated. Existing env wins.
// This runs before Next.js reads env, so NEXT_PUBLIC_* vars are inlined
// correctly into client bundles.
import { createRequire } from "node:module";
try {
  const requireCjs = createRequire(import.meta.url);
  const defaults = requireCjs("./config/production-env.js");
  for (const [key, value] of Object.entries(defaults)) {
    if (!process.env[key]) process.env[key] = String(value);
  }
} catch {
  // config file is optional — silent skip if not present
}

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const authPageHeaders = [
  { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, max-age=0" },
  { key: "CDN-Cache-Control", value: "no-store" },
  { key: "Pragma", value: "no-cache" },
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Self-contained server output — the .next/standalone folder contains
  // everything Next.js needs to run. Copy static + public into it and start
  // via node .next/standalone/server.js. Bypasses the host's Node/glibc quirks.
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "prisma", "nodemailer"],
  // Hostinger's build machine has older glibc; TS/ESLint checks are run locally
  // and in CI before merge — no need to gate deploys on them.
  typescript: { ignoreBuildErrors: true },
  // Shared host: os.cpus() reports the whole machine, so Next otherwise spawns
  // dozens of build workers and trips the container's thread limit (tokio
  // "os error 11" / SIGABRT during page-data collection). Cap build parallelism.
  experimental: { cpus: 1, workerThreads: false, webpackBuildWorker: false },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/login", headers: authPageHeaders },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.companieshouseidverification.com" }],
        destination: "https://companieshouseidverification.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
