import { experience } from "@/data";
import styles from "./styles.module.css";

export default function Experience() {
  return (
    <section id="experience" className={styles.experience} aria-labelledby="experience-heading">
      <h2 id="experience-heading" className={styles.heading}>
        Experience
      </h2>
      <ol className={styles.list}>
        {experience.map((job) => (
          <li key={job.company} className={styles.item}>
            <p className={styles.period}>{job.period}</p>
            <div className={styles.main}>
              <h3 className={styles.company}>{job.company}</h3>
              <p className={styles.role}>
                {job.role} · {job.type}
              </p>
              <ul className={styles.bullets}>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
