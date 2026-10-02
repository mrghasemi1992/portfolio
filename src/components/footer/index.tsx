import UnderlineLink from "@/components/underline-link";
import { profile } from "@/data";
import styles from "./styles.module.css";

type Props = {
  /** Where "Back to top" points; the case studies have no #top section. */
  topHref?: string;
};

export default function Footer({ topHref = "#top" }: Props) {
  return (
    <footer className={styles.footer}>
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <UnderlineLink href={topHref}>
        Back to top <span aria-hidden="true">↑</span>
      </UnderlineLink>
    </footer>
  );
}
