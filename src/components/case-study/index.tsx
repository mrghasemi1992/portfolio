import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";

import Screenshot from "@/components/screenshot";
import type { Project } from "@/data";
import styles from "./styles.module.css";

type Props = {
  project: Project;
  next: Project;
};

export default function CaseStudy({ project, next }: Props) {
  const gallery = project.gallery ?? [];
  const desktopShots = gallery.filter((shot) => !shot.phone);
  const phoneShots = gallery.filter((shot) => shot.phone);

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
        {project.facts.length > 0 && (
          <dl className={styles.facts}>
            {project.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt className={styles.factLabel}>{fact.label}</dt>
                <dd className={styles.factValue}>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      <ViewTransition name={`shot-${project.slug}`} share="morph" default="none">
        <Screenshot
          label={project.screenshot}
          src={project.image}
          sizes="(max-width: 1360px) 100vw, 1280px"
          preload
          className={styles.shot}
        />
      </ViewTransition>

      <section aria-labelledby="features-title">
        <h2 id="features-title" className={styles.subhead}>
          Features
        </h2>
        <div className={styles.groups}>
          {project.features.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {gallery.length > 0 && (
        <section aria-labelledby="gallery-title">
          <h2 id="gallery-title" className={styles.subhead}>
            Screens
          </h2>
          {desktopShots.length > 0 && (
            <ul className={styles.gallery}>
              {desktopShots.map((shot) => (
                <li key={shot.src}>
                  <figure className={styles.figure}>
                    <a href={shot.src} target="_blank" rel="noopener noreferrer" className={styles.shotLink}>
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={1600}
                        height={1000}
                        sizes="(max-width: 760px) 100vw, (max-width: 1360px) 50vw, 640px"
                        className={styles.galleryImage}
                      />
                      <span className="sr-only"> (opens the full-size image)</span>
                    </a>
                    <figcaption className={styles.caption}>{shot.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          )}
          {phoneShots.length > 0 && (
            <ul className={styles.phones}>
              {phoneShots.map((shot) => (
                <li key={shot.src}>
                  <figure className={styles.figure}>
                    <a href={shot.src} target="_blank" rel="noopener noreferrer" className={styles.shotLink}>
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={780}
                        height={1688}
                        sizes="(max-width: 760px) 50vw, 320px"
                        className={styles.galleryImage}
                      />
                      <span className="sr-only"> (opens the full-size image)</span>
                    </a>
                    <figcaption className={styles.caption}>{shot.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section aria-labelledby="decisions-title">
        <h2 id="decisions-title" className={styles.subhead}>
          Decisions
        </h2>
        <ul className={`${styles.list} ${styles.decisions}`}>
          {project.decisions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

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

      {next.slug !== project.slug && (
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
      )}
    </article>
  );
}
