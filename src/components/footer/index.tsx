import UnderlineLink from "@/components/underline-link";
import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>
          © {new Date().getFullYear()} Mohammad Reza Ghasemi — built with React
          &amp; Next.js
        </span>
        <UnderlineLink href="#top">back to top ↑</UnderlineLink>
      </div>
    </footer>
  );
}
