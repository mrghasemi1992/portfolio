import Section from "@/components/section";
import SocialLinks from "@/components/social-links";
import styles from "./styles.module.css";

const EMAIL = "mrghasemi1992@gmail.com";

export default function Contact() {
  return (
    <Section title="Contact" spacious>
      <div className={styles.body}>
        <h2 className={styles.heading}>
          Got something in mind?
          <br />
          <span className={styles.accent}>Let&apos;s talk.</span>
        </h2>
        <p className={styles.text}>
          Questions, ideas, or just a hello — the fastest way to reach me is
          email.
        </p>
        <div>
          <a href={`mailto:${EMAIL}`} className={styles.email}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
              <polyline points="3 6 12 13 21 6" />
            </svg>
            {EMAIL}
          </a>
        </div>
        <SocialLinks className={styles.socials} />
      </div>
    </Section>
  );
}
