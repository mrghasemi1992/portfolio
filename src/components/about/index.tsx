import Section from "@/components/section";
import { profile } from "@/data";
import styles from "./styles.module.css";

export default function About() {
  const words = profile.summary.split(" ");
  return (
    <Section title="About" hideTitle>
      {/* Each word lights up as its line scrolls into the middle of the screen. */}
      <p className={styles.text}>
        {words.map((word, i) => (
          <span
            key={i}
            className={
              profile.summaryHighlight.includes(word)
                ? `${styles.word} ${styles.highlight}`
                : styles.word
            }
          >
            {word}{" "}
          </span>
        ))}
      </p>
    </Section>
  );
}
