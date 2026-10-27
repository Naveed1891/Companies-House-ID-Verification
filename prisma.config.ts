import dotenv from "dotenv";
dotenv.config();
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const defaults = require("./config/production-env.js") as Record<string, string>;
  for (const [key, value] of Object.entries(defaults)) {
    if (!process.env[key]) process.env[key] = value;
  }
} catch {
  // config file is optional
}

// Build DATABASE_URL from separate Hostinger hPanel DB vars when not already set.
// Prisma detects this file and skips its own .env loading, so this must be done here.
if (!process.env.DATABASE_URL) {
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT || "3306";
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASSWORD;
  const name = process.env.DB_NAME;
  if (host && user && pass && name) {
    process.env.DATABASE_URL = `mysql://${user}:${encodeURIComponent(pass)}@${host}:${port}/${name}`;
  }
}

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});
