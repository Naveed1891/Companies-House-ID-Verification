import { ImageResponse } from "next/og";
import { articles } from "@/components/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return articles.filter((a) => a.published).map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  const title = article?.title ?? "Companies House ID Verification";
  const category = article?.category ?? "Guide";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0f385c",
          padding: "64px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 44,
          }}
        >
          <div
            style={{
              background: "#1d70b8",
              borderRadius: 6,
              padding: "6px 14px",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, fontWeight: 500 }}>
            companieshouseidverification.com
          </div>
        </div>

        {/* Article title */}
        <div
          style={{
            color: "#ffffff",
            fontSize: title.length > 60 ? 44 : 52,
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: -0.5,
            flex: 1,
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1.5px solid rgba(255,255,255,0.15)",
            paddingTop: 24,
            marginTop: 32,
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 18 }}>
            Companies House ID Verification
          </div>
          <div
            style={{
              background: "rgba(29,112,184,0.25)",
              border: "1.5px solid rgba(29,112,184,0.6)",
              borderRadius: 6,
              padding: "8px 20px",
              color: "#ffffff",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            ACSP Approved ✓
          </div>
        </div>
      </div>
    ),
    size,
  );
}
