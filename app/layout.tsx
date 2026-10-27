import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Manrope, Newsreader } from "next/font/google";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { CookieConsent } from "@/components/CookieConsent";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2e7d32",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://companieshouseidverification.com"),
  title: {
    default: "Companies House ID Verification - ACSP Approved Identity Verification Service",
    template: "%s | Companies House ID Verification",
  },
  description:
    "Complete your Companies House identity verification online. ACSP approved verification service for UK company directors, PSCs, LLP members and authorised filers. Fixed £19 fee, international applicants welcome.",
  keywords: [
    "companies house identity verification",
    "companies house id verification",
    "companies house identity verification service",
    "companies house verification online",
    "ACSP verification service",
    "ACSP approved verification",
    "authorised corporate service provider verification",
    "companies house ACSP",
    "director identity verification",
    "company director verification UK",
    "director verification companies house",
    "PSC identity verification",
    "person with significant control verification",
    "PSC verification companies house",
    "LLP member verification",
    "authorised filer verification",
    "companies house personal code",
    "how to get companies house personal code",
    "companies house personal code not received",
    "where is my companies house personal code",
    "companies house verification overseas",
    "overseas director verification UK",
    "international director verification",
    "companies house verification deadline 2026",
    "companies house verification deadline November 2026",
    "ECCTA identity verification",
    "Economic Crime and Corporate Transparency Act verification",
    "companies house verification documents",
    "companies house authorised agent",
    "identity verification UK company",
    "companies house verification failed",
    "companies house unable to verify identity",
    "companies house verification not working",
    "GOV.UK One Login alternative",
    "companies house verification cost",
    "companies house id check",
    "companies house KYC",
    "UK company director ID check",
    "companies house id verification £19",
    "cheapest companies house verification",
    "companies house verification fixed fee",
  ],
  authors: [{ name: "Companies House ID Verification", url: "https://companieshouseidverification.com" }],
  creator: "Companies House ID Verification",
  publisher: "Companies House ID Verification",
  formatDetection: { telephone: false, email: false },
  alternates: { canonical: "https://companieshouseidverification.com" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? undefined,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://companieshouseidverification.com",
    siteName: "Companies House ID Verification",
    title: "Companies House ID Verification - ACSP Approved Identity Verification Service",
    description:
      "ACSP approved Companies House identity verification for directors, PSCs, LLP members and authorised filers. Fixed £19 fee, international applicants welcome.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Companies House ID Verification — ACSP Approved Identity Verification Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Companies House ID Verification - ACSP Approved",
    description:
      "Complete your Companies House identity verification online. ACSP approved service for directors, PSCs and LLP members. Fixed £19 fee.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable}`}>
      <body>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true,cookie_flags:'SameSite=None;Secure'});`}
            </Script>
          </>
        )}
        <AuthProvider>{children}</AuthProvider>
        <CookieConsent />
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];s1.async=true;s1.src='https://embed.tawk.to/6ae100767edb8f347453110e/1k5vejks1';s1.charset='UTF-8';s1.setAttribute('crossorigin','*');s0.parentNode.insertBefore(s1,s0);})();`,
          }}
        />
      </body>
    </html>
  );
}
