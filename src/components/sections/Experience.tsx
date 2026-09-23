"use client";

import { useState } from "react";

import { experience } from "@/data";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

/** Long bullet lists are trimmed to this many until the reader asks for more. */
const VISIBLE_BULLETS = 3;

function Role({ role }: { role: (typeof experience)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const hidden = role.bullets.length - VISIBLE_BULLETS;
  const bullets = expanded ? role.bullets : role.bullets.slice(0, VISIBLE_BULLETS);

  return (
    <Reveal as="article" className="rule grid gap-6 py-10 md:grid-cols-[200px_1fr] md:gap-12">
      <div>
        <p className="font-mono text-xs text-bone-faint">{role.period}</p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-signal-dim">
          {role.type}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-medium sm:text-2xl">
          {role.role} <span className="text-bone-faint">·</span>{" "}
          <span className="text-signal">{role.company}</span>
        </h3>

        <ul className="mt-5 space-y-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-bone-dim">
              <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-ink-line" />
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>

        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-signal"
          >
            {expanded ? "Show less" : `Show ${hidden} more`}
          </button>
        )}
      </div>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-shell px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading num="02" label="Experience" title="Where I've worked, and what I changed." />
      <div>
        {experience.map((role) => (
          <Role key={role.company} role={role} />
        ))}
      </div>
    </section>
  );
}
