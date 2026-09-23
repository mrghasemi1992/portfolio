import type { ComponentProps } from "react";
import styles from "./styles.module.css";

/**
 * A link whose accent underline slides in on hover. It takes its color from
 * the parent, so set color on the container rather than through `className`.
 */
export default function UnderlineLink({
  className,
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      className={className ? `${styles.link} ${className}` : styles.link}
      {...props}
    />
  );
}
