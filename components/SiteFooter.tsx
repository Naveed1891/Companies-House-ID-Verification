import Link from "next/link";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Services",
    links: [
      ["Director Verification", "/services"],
      ["PSC Verification", "/services"],
      ["LLP Member Verification", "/services"],
      ["Authorised Filer Verification", "/services"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Requirements", "/requirements"],
      ["How It Works", "/how-it-works"],
      ["FAQ", "/faq"],
      ["Contact", "/contact"],
      ["Become a Partner", "/become-partner"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Privacy Policy", "/privacy-policy"],
      ["Terms & Conditions", "/terms"],
      ["Refund Policy", "/refund-policy"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer style={{ background: "#1b5e20", color: "#ffffff" }}>
      <div className="site-container pt-[clamp(48px,7vw,72px)]">
        <div className="grid grid-cols-1 gap-[clamp(32px,5vw,48px)] sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-[300px] text-[14px] leading-7" style={{ color: "rgba(255,255,255,0.7)" }}>
              Companies House identity verification for directors, PSCs, LLP members and authorised filers - in the UK and worldwide.
            </p>
            <a
              href="mailto:support@companieshouseidverification.com"
              className="mt-3 inline-block text-[13.5px] font-semibold no-underline hover:underline"
              style={{ color: "#c8e6c9" }}
            >
              support@companieshouseidverification.com
            </a>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="mb-4 text-[12px] font-bold tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
                {column.title}
              </p>
              <div className="flex flex-col gap-2.5">
                {column.links.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-[14px] no-underline hover:underline"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[clamp(40px,6vw,56px)] border-t py-5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="m-0 text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              © 2026 Companies House Identity Verification. All rights reserved.
            </p>
            <p className="m-0 text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              Developed by InvoClouds Limited
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
