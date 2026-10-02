import { LOGO_PATH, LOGO_VIEWBOX } from "@/data/logo";

type Props = {
  className?: string;
};

/** The logo mark, drawn in the current text color. Decorative by default. */
export default function Logo({ className }: Props) {
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
