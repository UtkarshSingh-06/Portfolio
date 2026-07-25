import { ImageResponse } from "next/og";
import { siteSeo } from "@/lib/seo/site";

export const ogImageAlt = `${siteSeo.name} — Full-Stack Developer & AI Enthusiast`;
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function createOgImageResponse() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #07090d 0%, #0f172a 45%, #0e7490 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#67e8f9",
          }}
        >
          Portfolio · Full-Stack · Cloud & DevOps
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
            {siteSeo.name}
          </div>
          <div style={{ fontSize: 32, color: "#cbd5e1", maxWidth: 900 }}>
            Full-Stack Developer & AI Enthusiast — building scalable products,
            AI systems, and cloud-native tooling.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          <span>Manipal University Jaipur</span>
          <span>AWS SAA-C03 · Open Source</span>
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
