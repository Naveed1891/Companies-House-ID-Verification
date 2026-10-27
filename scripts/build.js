"use strict";
require("./load-env.js");

const { execSync } = require("node:child_process");

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit", env: process.env });
}

run("node_modules/.bin/prisma generate");
run("node_modules/.bin/prisma migrate deploy");

// Seed is best-effort: creates the superadmin on first deploy.
// A seed failure (e.g. env var missing) must never block the build.
try {
  run("node_modules/.bin/prisma db seed");
} catch (e) {
  console.warn("[build] seed skipped:", e.message);
}

run("node_modules/.bin/next build --webpack");
run("node scripts/postbuild-standalone.mjs");
