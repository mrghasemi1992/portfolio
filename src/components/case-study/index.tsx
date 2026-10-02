import { ViewTransition } from "react";
import Link from "next/link";

import Screenshot from "@/components/screenshot";
import type { Project } from "@/data";
import styles from "./styles.module.css";

type Props = {
  project: Project;
  next: Project;
};

export default function CaseStudy({ project, next }: Props) {
  return (
    <article className={styles.page}>
      <Link href="/#work" transitionTypes={["nav-back"]} className={styles.back}>
        <span aria-hidden="true">←</span> All work
      </Link>

      <header className={styles.head}>
        {project.status && <span className={styles.status}>{project.status}</span>}
        <ViewTransition name={`title-${project.slug}`} share="morph" default="none">
          <h1 className={styles.title}>{project.name}</h1>
        </ViewTransition>
        <p className={styles.intro}>{project.intro}</p>
        <ul className={styles.links}>
          {project.links.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={i === 0 ? styles.primary : styles.secondary}
              >
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </header>

      <ViewTransition name={`shot-${project.slug}`} share="morph" default="none">
        <Screenshot label={project.screenshot} className={styles.shot} />
      </ViewTransition>

      <div className={styles.columns}>
        <section aria-labelledby="scope-title">
          <h2 id="scope-title" className={styles.subhead}>
            Scope
          </h2>
          <ul className={styles.list}>
            {project.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="decisions-title">
          <h2 id="decisions-title" className={styles.subhead}>
            Decisions
          </h2>
          <ul className={styles.list}>
            {project.decisions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="stack-title">
        <h2 id="stack-title" className={styles.subhead}>
          Stack
        </h2>
        <ul className={styles.chips}>
          {project.stack.map((item) => (
            <li key={item} className={styles.chip}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <Link
        href={`/work/${next.slug}`}
        transitionTypes={["nav-forward"]}
        className={styles.next}
      >
        <span className={styles.nextLabel}>Next project</span>
        <span className={styles.nextName}>
          {next.name} <span aria-hidden="true">→</span>
        </span>
      </Link>
    </article>
  );
}
