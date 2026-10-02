import type { ReactNode } from "react";
import styles from "./styles.module.css";

type SectionProps = {
  /** Also the section's id, lowercased, for the nav anchors. */
  title: string;
  /** Hide the visible heading (the section still gets an accessible name). */
  hideTitle?: boolean;
  className?: string;
  children: ReactNode;
};

/** A page section with its anchor id and big uppercase heading. */
export default function Section({
  title,
  hideTitle,
  className,
  children,
}: SectionProps) {
  const id = title.toLowerCase();
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      <h2
        id={`${id}-title`}
        className={hideTitle ? "sr-only" : styles.title}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
