"use strict";
require("./load-env.js");

const { execSync } = require("node:child_process");

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit", env: process.env });
}

run("node_modules/.bin/prisma generate");
run("node_modules/.bin/prisma migrate deploy");
run("node_modules/.bin/prisma db seed");
run("node_modules/.bin/next build --webpack");
run("node scripts/postbuild-standalone.mjs");
