// Icons drawn for the site: one 14px grid, 1.5px stroke, square caps.

type IconProps = { className?: string };

function Icon({ className, d }: IconProps & { d: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}

export const ArrowUpRight = (p: IconProps) => <Icon {...p} d="M4 10 10 4M5 4h5v5" />;
export const Download = (p: IconProps) => <Icon {...p} d="M7 2v7M4 6.5 7 9.5l3-3M2.5 12h9" />;
export const ArrowUp = (p: IconProps) => <Icon {...p} d="M7 12V2.5M3 6.5l4-4 4 4" />;
