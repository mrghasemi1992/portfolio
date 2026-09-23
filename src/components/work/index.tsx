import { projects } from "@/data";
import { ArrowUpRight } from "@/components/icons";
import UnderlineLink from "@/components/underline-link";
import styles from "./styles.module.css";

export default function Work() {
  return (
    <section id="work" className={styles.work} aria-labelledby="work-heading">
      <h2 id="work-heading" className={styles.heading}>
        Work
      </h2>
      <ul className={styles.list}>
        {projects.map((p) => (
          <li key={p.title} className={styles.project}>
            <div className={styles.lead}>
              <p className={styles.meta}>
                <span className={styles.status} data-live={p.status === "Live" ? "" : undefined}>
                  {p.status}
                </span>
                <span>{p.year}</span>
              </p>
              <h3 className={styles.title}>{p.title}</h3>
            </div>
            <div className={styles.body}>
              <p className={styles.description}>{p.description}</p>
              <ul className={styles.stack} aria-label="Built with">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <ul className={styles.links}>
                {p.links.map((l) => (
                  <li key={l.href}>
                    <UnderlineLink className={styles.link} href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label}
                      <span className={styles.visuallyHidden}> for {p.title}</span> <ArrowUpRight />
                    </UnderlineLink>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
