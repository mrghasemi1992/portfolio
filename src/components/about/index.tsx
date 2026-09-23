import Section from "@/components/section";
import styles from "./styles.module.css";

export default function About() {
  return (
    <Section title="About">
      <div className={styles.body}>
        <h2 className={styles.heading}>A little about me.</h2>
        <p className={styles.text}>
          I&apos;m Mohammad Reza Ghasemi — a Frontend Engineer with{" "}
          <span className={styles.highlight}>over six years of experience</span>{" "}
          building production React and Next.js apps in fintech, insurance, and
          e-commerce. I&apos;ve worked on step-by-step migrations of live
          applications, and I build internal tools that make daily work easier
          for the team.
        </p>
        <p className={styles.text}>
          Along the way I&apos;ve worked at{" "}
          <span className={styles.highlight}>
            SnappPay, SADAD, TashilCar, and Fanap Plus
          </span>{" "}
          — modernizing live applications through step-by-step migrations,
          strengthening testing and error reporting, and building the internal
          tools and shared packages my teams rely on every day.
        </p>
      </div>
    </Section>
  );
}
