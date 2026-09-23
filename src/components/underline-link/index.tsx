import type { ComponentProps } from "react";
import styles from "./styles.module.css";

/**
 * A link with a faint line at rest; on hover a coloured underline slides in from the left.
 * It takes its text colour from the parent. Callers tune the line through custom
 * properties (--ul-color, --ul-rest, --ul-weight, --ul-offset), never by overriding its own rules.
 */
export default function UnderlineLink({ className, ...props }: ComponentProps<"a">) {
  return <a className={className ? `${styles.link} ${className}` : styles.link} {...props} />;
}
