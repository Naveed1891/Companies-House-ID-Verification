import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Companies House ID Verification — ACSP Approved Identity Verification";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#2e7d32",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* ACSP badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: 6,
              padding: "6px 14px",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            ACSP Approved
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          <span>Companies House</span>
          <span>ID Verification</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "rgba(255,255,255,0.88)",
            fontSize: 26,
            fontWeight: 400,
            marginBottom: 40,
            lineHeight: 1.4,
          }}
        >
          <span>Identity verification for directors, PSCs &amp; LLP members</span>
          <span>Fixed £19 fee · UK &amp; international applicants welcome</span>
        </div>

        {/* Domain strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1.5px solid rgba(255,255,255,0.25)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", color: "rgba(255,255,255,0.7)", fontSize: 20, fontWeight: 500 }}>
            companieshouseidverification.com
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#ffffff",
              color: "#2e7d32",
              borderRadius: 8,
              padding: "12px 28px",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            Start Verification →
          </div>
        </div>
      </div>
    ),
    size,
  );
}
