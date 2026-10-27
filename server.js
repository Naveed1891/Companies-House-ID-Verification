"use strict";
/* eslint-disable @typescript-eslint/no-require-imports */
require("./scripts/load-env.js");
// Custom server — required for Hostinger's "Application startup file" field.
// Delegates everything to Next.js; only adds explicit port binding and startup logging.
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
// dir: __dirname ensures Next.js finds .next even if cwd differs from app root
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

console.log(`[Companies House ID Verification] Starting — port ${port}, dir ${__dirname}`);

process.on("uncaughtException", (err) => {
  console.error("[Companies House ID Verification] Uncaught exception:", err.message, err.stack);
});
process.on("unhandledRejection", (reason) => {
  console.error("[Companies House ID Verification] Unhandled rejection:", reason);
});

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url || "/", true);
      handle(req, res, parsedUrl).catch((err) => {
        console.error("[Companies House ID Verification] Request error:", req.url, err);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        }
      });
    }).listen(port, "0.0.0.0", () => {
      console.log(`[Companies House ID Verification] Ready — http://0.0.0.0:${port}`);
    });
  })
  .catch((err) => {
    console.error("[Companies House ID Verification] Failed to start:", err.message, err.stack);
    process.exit(1);
  });
