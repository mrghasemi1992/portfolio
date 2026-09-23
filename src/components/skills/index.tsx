import { skillGroups } from "@/data";
import styles from "./styles.module.css";

export default function Skills() {
  return (
    <section id="skills" className={styles.skills} aria-labelledby="skills-heading">
      <h2 id="skills-heading" className={styles.heading}>
        Skills
      </h2>
      <div className={styles.groups}>
        {skillGroups.map((g) => (
          <div key={g.title} className={styles.group}>
            <h3 className={styles.groupTitle}>{g.title}</h3>
            <ul className={styles.items}>
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
