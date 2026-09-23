import { about } from "@/data";
import styles from "./styles.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-heading">
      <h2 id="about-heading" className={styles.heading}>About</h2>
      <p className={styles.statement}>{about.statement}</p>
      <dl className={styles.facts}>
        {about.facts.map((f) => (
          <div key={f.label} className={styles.fact}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
