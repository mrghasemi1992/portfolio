"use client";

import { useEffect, useState } from "react";

import { navLinks } from "@/data";
import { LOGO_PATH, LOGO_VIEWBOX } from "@/data/logo";

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-out ${
        solid ? "border-b border-ink-line bg-ink/90 backdrop-blur-sm" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-shell items-center justify-between gap-6 px-5 sm:px-8"
      >
        <a href="#top" aria-label="Back to top" className="text-bone">
          <svg
            width="30"
            height="22"
            viewBox={LOGO_VIEWBOX}
            preserveAspectRatio="none"
            fill="currentColor"
            role="img"
            aria-label="Mohammad Reza Ghasemi"
          >
            <path d={LOGO_PATH} />
          </svg>
        </a>

        <ul className="hidden items-center gap-8 font-mono text-xs text-bone-dim md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="link-underline transition-colors hover:text-bone">
                <span className="text-signal">{link.num}</span> {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="font-mono text-xs uppercase tracking-[0.18em] text-bone transition-colors hover:text-signal"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
