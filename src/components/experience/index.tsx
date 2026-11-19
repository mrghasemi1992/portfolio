import Accordion from "@/components/accordion";
import Section from "@/components/section";
import { experience } from "@/data";
import styles from "./styles.module.css";

/**
 * One row per job: the company as a big headline that opens its bullets.
 * Native <details> sharing one `name`, so opening a job closes the one that
 * was open; `Accordion` keeps the clicked row from jumping when that happens.
 * The current job (the first) starts open.
 */
export default function Experience() {
  return (
    <Section title="Experience">
      <Accordion className={styles.list}>
        {experience.map((job, i) => (
          <details
            key={job.company}
            name="experience"
            open={i === 0}
            className={styles.item}
          >
            <summary className={styles.summary}>
              <h3 className={styles.company}>{job.company}</h3>
              <span className={styles.meta}>
                <span className={styles.role}>{job.role}</span>
                <span>{job.period}</span>
              </span>
              <span className={styles.icon} aria-hidden="true" />
            </summary>
            {/* Long lists split into two columns on desktop. */}
            <ul
              className={
                job.bullets.length > 3
                  ? `${styles.bullets} ${styles.columns}`
                  : styles.bullets
              }
            >
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </details>
        ))}
      </Accordion>
    </Section>
  );
}
