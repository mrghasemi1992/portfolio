import { ImageResponse } from "next/og";

import { LOGO_PATH, LOGO_VIEWBOX } from "@/data/logo";

export const alt = "Mohammad Reza Ghasemi — Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the site: the dark ground, the name set large, and one field of the brand blue.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0b0f",
          color: "#eeeff3",
        }}
      >
        <div style={{ display: "flex", padding: "64px 72px 0" }}>
          <svg width="84" height="60" viewBox={LOGO_VIEWBOX} fill="#eeeff3">
            <path d={LOGO_PATH} />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: "0 72px" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>
            Mohammad Reza
          </div>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>
            Ghasemi
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 120,
            padding: "0 72px",
            background: "#223bb2",
            color: "#ffffff",
            fontSize: 34,
          }}
        >
          Frontend Engineer
        </div>
      </div>
    ),
    size
  );
}
