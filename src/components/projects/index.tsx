import { ViewTransition } from "react";
import Link from "next/link";

import Section from "@/components/section";
import Screenshot from "@/components/screenshot";
import { projects } from "@/data";
import styles from "./styles.module.css";

/** The Work section: one panel per project. On desktop each panel pins and
    sinks back while the next one slides over it. */
export default function Projects() {
  return (
    <Section title="Work">
      <div className={styles.stack}>
        {projects.map((project) => (
          <article key={project.slug} className={styles.panel}>
            <div className={styles.text}>
              {project.status && <span className={styles.status}>{project.status}</span>}
              <ViewTransition name={`title-${project.slug}`} share="morph" default="none">
                <h3 className={styles.name}>{project.name}</h3>
              </ViewTransition>
              <p className={styles.summary}>{project.summary}</p>
              <ul className={styles.tags}>
                {project.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
              <Link
                href={`/work/${project.slug}`}
                transitionTypes={["nav-forward"]}
                className={styles.cta}
              >
                Read case study <span aria-hidden="true">→</span>
                <span className="sr-only">: {project.name}</span>
              </Link>
            </div>
            <ViewTransition name={`shot-${project.slug}`} share="morph" default="none">
              <Screenshot label={project.screenshot} className={styles.shot} />
            </ViewTransition>
          </article>
        ))}
      </div>
    </Section>
  );
}
