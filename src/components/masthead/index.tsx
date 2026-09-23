"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { EMAIL, NAME, RESUME, TITLE, hero, navLinks, socials } from "@/data";
import { ScrollTrigger, clamp, easeInOut, gsap, lerp, useReducedMotion } from "@/lib/motion";
import LogoMark from "@/components/logo-mark";
import UnderlineLink from "@/components/underline-link";
import { ArrowUpRight, Download } from "@/components/icons";
import styles from "./styles.module.css";

const WORDS = NAME.split(" "); // Mohammad · Reza · Ghasemi

/**
 * The fixed header and the first screen. The two are one component because of the
 * signature motion: as the page scrolls, each word of the name leaves the hero and flies
 * to its own place in the header, re-flowing from two lines into one while it shrinks.
 * When it lands, the header's own copy of the name takes over, pixel for pixel.
 */
export default function Masthead({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<string | null>(null);

  // Where am I: the last listed section whose top has passed a reading line 30% down the
  // screen. The first screen, above About, marks nothing; at the very bottom, the last
  // section wins even if it's too short to reach the line.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // Looked up on every check, so the list always matches the menu.
      const sections = navLinks
        .map((l) => ({ href: l.href, el: document.querySelector<HTMLElement>(l.href) }))
        .filter((s): s is { href: string; el: HTMLElement } => s.el !== null);
      const line = window.innerHeight * 0.3;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = null;
      for (const s of sections) {
        if (s.el.getBoundingClientRect().top <= line) current = s.href;
      }
      if (atBottom && sections.length) current = sections[sections.length - 1].href;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // The indicator measures the active link and moves there; it hides on the first screen.
  useLayoutEffect(() => {
    const place = () => {
      const indicator = indicatorRef.current;
      const link = active
        ? navRef.current?.querySelector<HTMLElement>(`a[href="${active}"]`)
        : null;
      if (!indicator) return;
      if (!link || link.offsetParent === null) {
        indicator.removeAttribute("data-visible");
        return;
      }
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
      indicator.setAttribute("data-visible", "");
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  useLayoutEffect(() => {
    const header = headerRef.current!;
    const name = nameRef.current!;
    const words = [...name.querySelectorAll<HTMLElement>("[data-word]")];
    const targets = [...slotRef.current!.querySelectorAll<HTMLElement>("[data-slot-word]")];

    let starts: { left: number; top: number }[] = [];
    let ends: { left: number; top: number }[] = [];
    let ratio = 1;
    let distance = 1;
    let docked: boolean | null = null;

    const measure = () => {
      words.forEach((w) => (w.style.transform = ""));
      const y = window.scrollY;
      // Hero words in document coordinates; header words in viewport coordinates (fixed).
      starts = words.map((w) => {
        const r = w.getBoundingClientRect();
        return { left: r.left, top: r.top + y };
      });
      ends = targets.map((t) => {
        const r = t.getBoundingClientRect();
        return { left: r.left, top: r.top };
      });
      ratio =
        parseFloat(getComputedStyle(targets[0]).fontSize) /
        parseFloat(getComputedStyle(words[0]).fontSize);
      distance = Math.max(window.innerHeight * 0.55, 320);
    };

    const setDocked = (value: boolean) => {
      if (value === docked) return;
      docked = value;
      header.toggleAttribute("data-docked", value);
      name.toggleAttribute("data-docked", value);
    };

    const render = (y: number) => {
      const p = clamp(y / distance);
      setDocked(p >= 1);
      if (p >= 1) return;
      // Position and size share one curve, so the name keeps its shape as it travels.
      const e = easeInOut(p);
      const k = lerp(1, ratio, e);
      words.forEach((w, i) => {
        const s = starts[i];
        const t = ends[i];
        const tx = lerp(s.left, t.left, e) - s.left;
        const ty = lerp(s.top, t.top, e) - (s.top - y);
        w.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${k})`;
      });
    };

    // Reduced motion: no flight. The header shows its own name from the start.
    if (reduce) {
      header.setAttribute("data-docked", "");
      return () => header.removeAttribute("data-docked");
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: () => render(window.scrollY),
        onRefresh: () => {
          measure();
          docked = null;
          render(window.scrollY);
        },
      });
    });
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      words.forEach((w) => (w.style.transform = ""));
      header.removeAttribute("data-docked");
      name.removeAttribute("data-docked");
    };
  }, [reduce]);

  return (
    <>
      <header ref={headerRef} className={styles.header}>
        <a href="#top" className={styles.home} aria-label={`${NAME}, back to top`}>
          <LogoMark className={styles.logo} />
          <span ref={slotRef} className={styles.slot} aria-hidden="true">
            {WORDS.map((w, i) => (
              <span key={w} data-slot-word>
                {w}
                {i < WORDS.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        </a>
        <nav aria-label="Sections" className={styles.navWrap}>
          <ul ref={navRef} className={styles.nav}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "location" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <span ref={indicatorRef} className={styles.indicator} aria-hidden="true" />
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="name">
          <h1 id="name" ref={nameRef} className={styles.name}>
            <span data-word>{WORDS[0]}</span> <span data-word>{WORDS[1]}</span>
            <br />
            <span data-word>{WORDS[2]}</span>
          </h1>

          <div className={styles.lower}>
            <div className={styles.intro}>
              <p className={styles.title}>{TITLE}</p>
              <p className={styles.text}>{hero.intro}</p>
            </div>
            <div className={styles.actions}>
              <div className={styles.buttons}>
                <a className={styles.primary} href={`mailto:${EMAIL}`}>
                  Email me
                </a>
                <a className={styles.secondary} href={RESUME.href} download={RESUME.filename}>
                  <Download /> Resume (PDF)
                </a>
              </div>
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
        </section>

        {children}
      </main>
    </>
  );
}
