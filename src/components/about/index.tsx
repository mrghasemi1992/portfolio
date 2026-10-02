import { Fragment } from "react";

import Section from "@/components/section";
import { profile } from "@/data";
import styles from "./styles.module.css";

export default function About() {
  const words = profile.summary.split(" ");
  return (
    <Section title="About" hideTitle>
      {/* Each line lights up as it scrolls into the middle of the screen. The
          spaces sit between the word boxes, not inside them, or they collapse. */}
      <p className={styles.text}>
        {words.map((word, i) => (
          <Fragment key={i}>
            <span
              className={
                profile.summaryHighlight.includes(word)
                  ? `${styles.word} ${styles.highlight}`
                  : styles.word
              }
            >
              {word}
            </span>{" "}
          </Fragment>
        ))}
      </p>
    </Section>
  );
}
