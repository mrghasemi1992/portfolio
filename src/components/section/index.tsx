import type { ReactNode } from "react";
import { sectionNum } from "@/data";
import styles from "./styles.module.css";

type SectionProps = {
  title: string;
  /** Extra vertical padding, for the closing section. */
  spacious?: boolean;
  children: ReactNode;
};

export default function Section({ title, spacious, children }: SectionProps) {
  return (
    <section
      id={title.toLowerCase()}
      className={spacious ? `${styles.section} ${styles.spacious}` : styles.section}
    >
      <div className={styles.label}>
        {sectionNum(title)} / {title}
      </div>
      {children}
    </section>
  );
}
