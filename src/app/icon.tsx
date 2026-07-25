import { ImageResponse } from "next/og";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07090d",
          color: "#22d3ee",
          fontSize: 72,
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          borderRadius: 36,
          border: "4px solid #164e63",
        }}
      >
        US
      </div>
    ),
    { ...size }
  );
}
