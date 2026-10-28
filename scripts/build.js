"use strict";
require("./load-env.js");

const { execSync } = require("node:child_process");

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit", env: process.env });
}

run("node_modules/.bin/prisma generate");

// Migration and seed are best-effort at build time. On Hostinger the DB
// credentials are injected at runtime; if they are absent at build time the
// migration step logs a warning and the build continues. The next deploy
// that has live credentials will apply any pending migrations.
try {
  run("node_modules/.bin/prisma migrate deploy");
} catch (e) {
  console.warn("[build] migrate skipped (no DB at build time):", e.message);
}

try {
  run("node_modules/.bin/prisma db seed");
} catch (e) {
  console.warn("[build] seed skipped:", e.message);
}

run("node_modules/.bin/next build --webpack");
run("node scripts/postbuild-standalone.mjs");
