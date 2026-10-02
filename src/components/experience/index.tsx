import RoleSheet from "@/components/role-sheet";
import Section from "@/components/section";
import { experience } from "@/data";
import styles from "./styles.module.css";

export default function Experience() {
  return (
    <Section title="Experience" className={styles.section}>
      {/* On desktop the row pins while vertical scrolling pans it sideways;
          elsewhere it is a swipeable row that snaps to each card. */}
      <div className={styles.pinArea}>
        <div className={styles.pin}>
          <ol className={styles.track}>
            {experience.map((job, i) => {
              const count = job.bullets.length;
              // The first card is the current job, drawn in the accent color.
              const preview = job.bullets.slice(0, i === 0 ? 2 : 3);
              return (
                <li
                  key={job.company}
                  className={i === 0 ? `${styles.card} ${styles.current}` : styles.card}
                >
                  <div className={styles.meta}>
                    <span>{job.period}</span>
                    <span>
                      {count} {count === 1 ? "highlight" : "highlights"}
                    </span>
                  </div>
                  <h3 className={styles.company}>{job.company}</h3>
                  <span className={styles.role}>{job.role}</span>
                  <ul className={styles.bullets}>
                    {preview.map((bullet) => (
                      <li key={bullet}>
                        <span className={styles.clamp}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <RoleSheet
                    job={job}
                    label={count > 2 ? `Read all ${count}` : "Read more"}
                    className={styles.more}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
