"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/logo";
import SocialLinks from "@/components/social-links";
import { contactLink, navLinks, profile } from "@/data";
import styles from "./styles.module.css";

// Section ids the nav can mark as active, from the "/#id" hrefs.
const sectionIds = navLinks.map((link) => link.href.split("#")[1]);

/**
 * The href of the nav link for the section crossing a line 40% down the
 * screen, or null at the hero and Contact. Case studies keep Work active.
 */
function useActiveHref() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    // The hero (#top) and #contact are watched too, so reaching them clears
    // the highlight instead of leaving the last section active.
    const targets = ["top", ...sectionIds, "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActiveId(sectionIds.includes(id) ? id : null);
        }
      },
      // A 1%-tall band 40% down the viewport: one section crosses it at a time.
      { rootMargin: "-40% 0px -59% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname.startsWith("/work/")) return "/#work";
  if (pathname !== "/" || !activeId) return null;
  return `/#${activeId}`;
}

export default function Nav() {
  const menuRef = useRef<HTMLDialogElement>(null);
  const activeHref = useActiveHref();

  const openMenu = () => menuRef.current?.showModal();
  const closeMenu = () => menuRef.current?.close();

  return (
    <header className={styles.nav} data-site-header>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <div className={styles.inner}>
        <Link href="/" className={styles.home} aria-label={`${profile.name}, home`}>
          <Logo className={styles.logo} />
        </Link>

        <nav
          className={activeHref ? `${styles.pill} ${styles.hasActive}` : styles.pill}
          aria-label="Primary"
        >
          {/* One highlight that slides to whichever link is active. */}
          <span className={styles.indicator} aria-hidden="true" />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.href === activeHref
                  ? `${styles.pillLink} ${styles.active}`
                  : styles.pillLink
              }
              aria-current={link.href === activeHref ? "location" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href={contactLink.href} className={styles.cta}>
          {contactLink.label}
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-haspopup="dialog"
          onClick={openMenu}
        >
          Menu
        </button>
      </div>

      <dialog ref={menuRef} className={styles.menu} aria-label="Menu">
        <div className={styles.menuTop}>
          <Logo className={styles.logo} />
          <button type="button" className={styles.menuButton} onClick={closeMenu}>
            Close
          </button>
        </div>
        <nav className={styles.menuLinks} aria-label="Menu links">
          {[...navLinks, contactLink].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.href === activeHref
                  ? `${styles.menuLink} ${styles.menuActive}`
                  : styles.menuLink
              }
              aria-current={link.href === activeHref ? "location" : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.menuFoot}>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <SocialLinks />
        </div>
      </dialog>
    </header>
  );
}
