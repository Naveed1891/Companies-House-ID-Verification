"use strict";
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const HOME_ENV_FILE = path.join(os.homedir(), "companieshouseidverification-env", ".env");
const REPO_ENV_MODULE = path.join(__dirname, "..", "config", "production-env.js");

function setIfMissing(key, value) {
  if (value == null || value === "") return false;
  if (process.env[key] !== undefined && process.env[key] !== "") return false;
  process.env[key] = String(value);
  return true;
}

function parseDotenvLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  const eq = trimmed.indexOf("=");
  if (eq === -1) return null;
  const key = trimmed.slice(0, eq).trim();
  let value = trimmed.slice(eq + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  return key ? { key, value } : null;
}

try {
  if (fs.existsSync(HOME_ENV_FILE)) {
    const contents = fs.readFileSync(HOME_ENV_FILE, "utf8");
    let loaded = 0;
    for (const line of contents.split(/\r?\n/)) {
      const entry = parseDotenvLine(line);
      if (entry && setIfMissing(entry.key, entry.value)) loaded += 1;
    }
    console.log(`[load-env] loaded ${loaded} vars from ${HOME_ENV_FILE}`);
  }
} catch (err) {
  console.error(`[load-env] failed to read ${HOME_ENV_FILE}:`, err.message);
}

try {
  if (fs.existsSync(REPO_ENV_MODULE)) {
    const defaults = require(REPO_ENV_MODULE);
    let loaded = 0;
    for (const [key, value] of Object.entries(defaults)) {
      if (setIfMissing(key, value)) loaded += 1;
    }
    console.log(`[load-env] loaded ${loaded} vars from ${REPO_ENV_MODULE}`);
  }
} catch (err) {
  console.error(`[load-env] failed to load ${REPO_ENV_MODULE}:`, err.message);
}

if (!process.env.DATABASE_URL) {
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT || "3306";
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASSWORD;
  const name = process.env.DB_NAME;
  if (host && user && pass && name) {
    process.env.DATABASE_URL = `mysql://${user}:${encodeURIComponent(pass)}@${host}:${port}/${name}`;
    console.log("[load-env] DATABASE_URL built from DB_HOST/DB_USER/DB_PASSWORD/DB_NAME");
  } else {
    console.warn("[load-env] DATABASE_URL is unset — app will fail to connect");
  }
}
