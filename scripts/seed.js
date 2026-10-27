"use strict";
require("./load-env.js");

const { execSync } = require("node:child_process");
execSync("node_modules/.bin/prisma db seed", { stdio: "inherit", env: process.env });
