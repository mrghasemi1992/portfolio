import { experience } from "@/data";
import Section from "@/components/section";
import styles from "./styles.module.css";

export default function Experience() {
  return (
    <Section title="Experience">
      <h2 className={styles.heading}>Where I&apos;ve worked</h2>
      <div className={styles.list}>
        {experience.map((job, i) => (
          <div key={i} className={styles.job}>
            <div className={styles.meta}>
              <div className={styles.period}>{job.period}</div>
              <div className={styles.type}>{job.type}</div>
            </div>
            <div>
              <div className={styles.title}>
                <h3 className={styles.role}>{job.role}</h3>
                <span className={styles.separator}>·</span>
                <span className={styles.company}>{job.company}</span>
              </div>
              <ul className={styles.bullets}>
                {job.bullets.map((bullet, j) => (
                  <li key={j} className={styles.bullet}>
                    <span className={styles.arrow}>→</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
