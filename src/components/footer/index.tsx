import { NAME } from "@/data";
import { ArrowUp } from "@/components/icons";
import UnderlineLink from "@/components/underline-link";
import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>
          © {new Date().getFullYear()} {NAME}. Designed and built by me.
        </p>
        <UnderlineLink href="#top" className={styles.top}>
          Back to top <ArrowUp />
        </UnderlineLink>
      </div>
    </footer>
  );
}
