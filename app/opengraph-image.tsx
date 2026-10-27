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
          background: "#1d70b8",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
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
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: 6,
              padding: "6px 14px",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            ACSP Approved
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1,
            flex: 1,
          }}
        >
          Companies House
          <br />
          ID Verification
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "rgba(255,255,255,0.88)",
            fontSize: 26,
            fontWeight: 400,
            marginBottom: 40,
            lineHeight: 1.4,
          }}
        >
          Identity verification for directors, PSCs &amp; LLP members
          <br />
          Fixed £19 fee · UK &amp; international applicants welcome
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
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 20, fontWeight: 500 }}>
            companieshouseidverification.com
          </div>
          <div
            style={{
              background: "#ffffff",
              color: "#1d70b8",
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
