"use strict";

module.exports = {
  DB_HOST: "127.0.0.1",
  DB_PORT: "3306",
  DB_NAME: "",
  DB_USER: "",
  DB_PASSWORD: "",

  SESSION_SECRET: "d9c8d2a4a7287c23bcdc01f4aeaca1094c002c5b6b41e271668a8e35c6c87cee",

  NEXT_PUBLIC_SITE_URL: "https://companieshouseidverification.com",
  NEXT_PUBLIC_BRAND_NAME: "Companies House Identity Verification",
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || "",
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",

  SEED_ADMIN_EMAIL: "naveed@invoclouds.com",
  SEED_ADMIN_PASSWORD: "Naveed@1891",
  SEED_CEO_PASSWORD: "Naveed@1891",

  RECOVERY_TOKEN: "4b8501aa0c5d132a66addd54e5231983e0eedaf6f10a5c14",
};
