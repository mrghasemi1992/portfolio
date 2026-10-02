import { ImageResponse } from "next/og";

import { LOGO_PATH, LOGO_VIEWBOX } from "@/data/logo";
import { profile } from "@/data";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same palette as the site (globals.css); ImageResponse can't read CSS variables.
const BG = "#111110";
const TEXT = "#f2f1ec";
const ACCENT = "#d7ff3a";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: 72,
          background: BG,
          color: TEXT,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: -2,
              textTransform: "uppercase",
            }}
          >
            {profile.name.split(" ").map((word) => (
              <span key={word}>{word}</span>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: ACCENT }}>
            {`${profile.role}, ${profile.stack}`}
          </div>
        </div>
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: 36,
            background: ACCENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="180" height="127" viewBox={LOGO_VIEWBOX} fill={BG}>
            <path d={LOGO_PATH} />
          </svg>
        </div>
      </div>
    ),
    size
  );
}
