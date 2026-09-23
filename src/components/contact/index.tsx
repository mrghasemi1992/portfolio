import { EMAIL, RESUME, contact, socials } from "@/data";
import { ArrowUpRight, Download } from "@/components/icons";
import UnderlineLink from "@/components/underline-link";
import styles from "./styles.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <h2 id="contact-heading" className={styles.heading}>
          <span className={styles.lead}>{contact.heading[0]}</span>
          <br />
          {contact.heading[1]}
        </h2>
        <div className={styles.body}>
          <p className={styles.text}>{contact.text}</p>
          <UnderlineLink className={styles.email} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </UnderlineLink>
          <div className={styles.row}>
            <a className={styles.resume} href={RESUME.href} download={RESUME.filename}>
              <Download /> Resume (PDF)
            </a>
            <ul className={styles.socials}>
              {socials.map((s) => (
                <li key={s.label}>
                  <UnderlineLink className={styles.social} href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label} <ArrowUpRight />
                  </UnderlineLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
