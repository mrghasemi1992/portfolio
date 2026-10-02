import { ImageResponse } from "next/og";

import { LOGO_PATH, LOGO_VIEWBOX } from "@/data/logo";
import { getProject, profile, projects } from "@/data";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same palette as the site (globals.css); ImageResponse can't read CSS variables.
const BG = "#111110";
const TEXT = "#f2f1ec";
const DIM = "#a8a69e";
const ACCENT = "#d7ff3a";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const name = project?.name ?? profile.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: BG,
          color: TEXT,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="45" viewBox={LOGO_VIEWBOX} fill={TEXT}>
            <path d={LOGO_PATH} />
          </svg>
          <span style={{ fontSize: 30, color: DIM }}>{profile.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 34, color: ACCENT }}>Case study</span>
          <span
            style={{
              fontSize: 150,
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: -4,
              textTransform: "uppercase",
            }}
          >
            {name}
          </span>
        </div>
      </div>
    ),
    size
  );
}
