import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0b",
          raised: "#111113",
          line: "#232326",
        },
        bone: {
          DEFAULT: "#ededea",
          dim: "#9a9a96",
          faint: "#6a6a67",
        },
        signal: {
          DEFAULT: "#f5a524",
          dim: "#c07d12",
        },
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 9vw, 8.5rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        title: ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        lede: ["clamp(1.125rem, 2vw, 1.5rem)", { lineHeight: "1.5" }],
      },
      maxWidth: {
        shell: "78rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
