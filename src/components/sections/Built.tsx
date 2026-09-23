import { built } from "@/data";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export default function Built() {
  return (
    <section id="built" className="mx-auto max-w-shell px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        num="03"
        label="Built"
        title="Tools I built because the team needed them."
      />

      <div className="grid gap-px overflow-hidden rounded-sm bg-ink-line sm:grid-cols-2">
        {built.map((item, i) => (
          <Reveal
            key={item.name}
            as="article"
            delay={(i % 2) * 0.08}
            className="flex flex-col gap-4 bg-ink p-7 transition-colors duration-300 hover:bg-ink-raised sm:p-9"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-medium sm:text-2xl">{item.name}</h3>
              <span className="font-mono text-xs text-bone-faint">{item.num}</span>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-dim">
              {item.kind} · {item.where}
            </p>

            <p className="text-bone-dim">{item.desc}</p>

            <ul className="mt-auto flex flex-wrap gap-2 pt-2">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-ink-line px-2.5 py-1 font-mono text-[11px] text-bone-faint"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
