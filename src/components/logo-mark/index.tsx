import { LOGO_PATH, LOGO_VIEWBOX } from "@/data/logo";

export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={LOGO_VIEWBOX}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={LOGO_PATH} />
    </svg>
  );
}
