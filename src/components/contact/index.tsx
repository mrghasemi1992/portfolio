import SocialLinks from "@/components/social-links";
import UnderlineLink from "@/components/underline-link";
import { profile } from "@/data";
import styles from "./styles.module.css";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={styles.outer}>
      <div className={styles.block}>
        <h2 id="contact-title" className={styles.heading}>
          <span className="sr-only">Contact: </span>
          Let&apos;s build
          <br />
          something.
        </h2>
        <div className={styles.links}>
          <UnderlineLink href={`mailto:${profile.email}`}>{profile.email}</UnderlineLink>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
