// Populate env for Prisma CLI (migrate, seed) from the committed
// fallback when hPanel env-var access is delegated. Existing env wins.
import dotenv from "dotenv";
dotenv.config();
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const defaults = require("./config/production-env.js") as Record<string, string>;
  for (const [key, value] of Object.entries(defaults)) {
    if (!process.env[key]) process.env[key] = value;
  }
} catch {
  // config file is optional (e.g. local dev without it) — silent skip
}
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});
