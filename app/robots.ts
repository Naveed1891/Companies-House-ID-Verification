import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/login",
          "/signup",
          "/forgot-password",
          "/verify-otp",
          "/verify-signup",
          "/reset-password",
          "/checkout",
          "/start",
          "/payment/",
          "/request-received",
          "/application/",
          "/api/",
        ],
      },
    ],
    sitemap: "https://companieshouseidverification.com/sitemap.xml",
  };
}
