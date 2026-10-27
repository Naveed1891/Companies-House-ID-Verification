// Next.js output: "standalone" produces a self-contained server at
// .next/standalone/server.js but does NOT copy static assets or the public
// folder — those must be placed alongside it for the server to serve them.
// This script does that copy so a single `node .next/standalone/server.js`
// call serves the entire application.

import { cp, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function copyDir(from, to, label) {
  if (!(await exists(from))) {
    console.log(`[postbuild] skip ${label} — ${from} not found`);
    return;
  }
  await cp(from, to, { recursive: true, force: true });
  console.log(`[postbuild] copied ${label} → ${to}`);
}

if (!(await exists(standaloneDir))) {
  console.error(`[postbuild] ERROR: ${standaloneDir} does not exist. Is output: 'standalone' set in next.config.mjs?`);
  process.exit(1);
}

await copyDir(
  path.join(root, ".next", "static"),
  path.join(standaloneDir, ".next", "static"),
  "static assets",
);

await copyDir(
  path.join(root, "public"),
  path.join(standaloneDir, "public"),
  "public folder",
);

console.log("[postbuild] standalone bundle ready");
