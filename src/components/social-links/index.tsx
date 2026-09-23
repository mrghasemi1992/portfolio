import { socials } from "@/data";
import UnderlineLink from "@/components/underline-link";
import styles from "./styles.module.css";

export default function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className ? `${styles.list} ${className}` : styles.list}>
      {socials.map((s) => (
        <UnderlineLink
          key={s.label}
          href={s.href}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.arrow}>{s.arrow}</span> {s.label}
        </UnderlineLink>
      ))}
    </div>
  );
}
