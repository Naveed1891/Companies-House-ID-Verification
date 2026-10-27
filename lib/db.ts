import { PrismaClient } from "@prisma/client";

// Hostinger supplies separate DB_HOST/DB_USER/DB_PASSWORD/DB_NAME vars.
// Build DATABASE_URL here so Prisma always has it, regardless of how the
// server was started (standalone, custom server, or Next.js directly).
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

// Next.js hot-reloads modules in development; without a global cache each reload
// opens a new pool and exhausts database connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
