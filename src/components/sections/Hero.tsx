"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { site, socials } from "@/data";
import { gsap, ScrollTrigger, prefersReducedMotion, registerScroll, supportsWebGL } from "@/lib/motion";

const LatticeCanvas = dynamic(() => import("../LatticeCanvas"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  // Re-runs once `webgl` is known: the section only grows to 300vh then, and
  // triggers measured against the shorter layout would fire at the wrong time.
  useEffect(() => {
    const content = contentRef.current;
    const section = sectionRef.current;
    if (!content || !section || prefersReducedMotion()) return;

    registerScroll();
    const context = gsap.context(() => {
      gsap.from(content.children, {
        opacity: 0,
        y: 28,
        duration: 1,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.15,
      });

      // The copy clears out before the pin releases, so About arrives clean.
      gsap.to(content, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top+=45% top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
      ScrollTrigger.refresh();
    };
  }, [webgl]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="group relative h-[300vh] data-[webgl=false]:h-auto"
      data-webgl={webgl}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden group-data-[webgl=false]:static group-data-[webgl=false]:h-auto group-data-[webgl=false]:min-h-screen group-data-[webgl=false]:py-32">
        {webgl && <LatticeCanvas triggerRef={sectionRef} />}

        {/* Keeps the copy readable wherever the structure drifts behind it.
            Phones get a vertical wash, since the copy spans the full width. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink/40 md:bg-gradient-to-r md:from-ink md:via-ink/60 md:to-transparent"
        />

        <div className="relative mx-auto w-full max-w-shell px-5 sm:px-8">
          <div ref={contentRef} className="max-w-2xl">
            <p className="label mb-6">{site.role} · Tehran</p>

            <h1 className="text-display font-medium">
              Mohammad
              <br />
              Reza <span className="text-signal">Ghasemi</span>
            </h1>

            <p className="mt-8 max-w-xl text-lede text-bone-dim">
              I build web interfaces with React &amp; Next.js — and the internal tools that keep
              the team moving.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="bg-signal px-6 py-3 font-mono text-sm text-ink transition-transform duration-300 ease-out hover:-translate-y-0.5"
              >
                Get in touch
              </a>
              <a
                href={site.resumeUrl}
                download={site.resumeFilename}
                className="border border-ink-line px-6 py-3 font-mono text-sm text-bone transition-colors duration-300 hover:border-signal"
              >
                Resume ↓
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-6 font-mono text-sm">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-bone-dim transition-colors hover:text-bone"
                  >
                    <span className="text-signal">↗</span> {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint sm:block"
        >
          Scroll
        </div>
      </div>
    </section>
  );
}
