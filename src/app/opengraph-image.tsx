import { ImageResponse } from "next/og";

import { LOGO_PATH, LOGO_VIEWBOX } from "@/data/logo";

export const alt = "Mohammad Reza Ghasemi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
        }}
      >
        <svg width="480" height="340" viewBox={LOGO_VIEWBOX} fill="#f4f4f5">
          <path d={LOGO_PATH} />
        </svg>
      </div>
    ),
    size
  );
}
