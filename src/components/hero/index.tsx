import SocialLinks from "@/components/social-links";
import styles from "./styles.module.css";

const NAME = "Mohammad Reza Ghasemi";
const RESUME_URL = "/resume-final-2026.09.17-17.23.pdf";
const RESUME_FILENAME = "Mohammad-Reza-Ghasemi-Frontend-Engineer-Resume.pdf";

export default function Hero() {
  return (
    <header className={styles.hero}>
      <h1 className={styles.name}>{NAME}</h1>
      <p className={styles.tagline}>
        Frontend Engineer building web interfaces with React &amp; Next.js.
      </p>
      <p className={styles.intro}>
        Over six years building production React and Next.js apps in fintech,
        insurance, and e-commerce — from step-by-step migrations of live
        applications to internal tools that make the team&apos;s daily work
        easier.
      </p>
      <div className={styles.actions}>
        <a href="#contact" className={styles.button}>
          Get in touch
        </a>
        <a href={RESUME_URL} download={RESUME_FILENAME} className={styles.button}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Resume
        </a>
      </div>
      <SocialLinks className={styles.socials} />
    </header>
  );
}
