import Section from "@/components/section";
import { skillGroups } from "@/data";
import styles from "./styles.module.css";

export default function Skills() {
  return (
    <Section title="Skills">
      <div className={styles.grid}>
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className={styles.group}>{group.title}</h3>
            <ul className={styles.chips}>
              {group.items.map((item) => (
                <li key={item} className={styles.chip}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
