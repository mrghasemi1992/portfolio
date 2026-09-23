import { skillGroups } from "@/data";
import Section from "@/components/section";
import styles from "./styles.module.css";

export default function Skills() {
  return (
    <Section title="Skills">
      <h2 className={styles.heading}>Toolkit</h2>
      <div className={styles.grid}>
        {skillGroups.map((g, i) => (
          <div key={i} className={styles.group}>
            <div className={styles.groupTitle}>{g.title}</div>
            <div className={styles.items}>
              {g.items.map((skill) => (
                <span key={skill} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
