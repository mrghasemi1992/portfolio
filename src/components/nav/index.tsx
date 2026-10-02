"use client";

import { useRef } from "react";
import Link from "next/link";

import Logo from "@/components/logo";
import SocialLinks from "@/components/social-links";
import { contactLink, navLinks, profile } from "@/data";
import styles from "./styles.module.css";

export default function Nav() {
  const menuRef = useRef<HTMLDialogElement>(null);

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

        <nav className={styles.pill} aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.pillLink}>
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
              className={styles.menuLink}
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
