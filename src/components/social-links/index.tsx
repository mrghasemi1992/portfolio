import { socials } from "@/data";
import UnderlineLink from "@/components/underline-link";
import styles from "./styles.module.css";

type Props = {
  className?: string;
};

/** GitHub and LinkedIn, used by the contact section and the mobile menu. */
export default function SocialLinks({ className }: Props) {
  return (
    <ul className={className ? `${styles.list} ${className}` : styles.list}>
      {socials.map((s) => (
        <li key={s.href}>
          <UnderlineLink href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label} <span aria-hidden="true">↗</span>
          </UnderlineLink>
        </li>
      ))}
    </ul>
  );
}
