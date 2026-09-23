import { about } from "@/data";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-shell px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading num="01" label="About" title={about.heading} />

      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-20">
        <div className="space-y-6">
          {about.paragraphs.map((text, i) => (
            <Reveal key={i} as="p" delay={i * 0.08} className="text-lede text-bone-dim">
              {text}
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <dl className="space-y-8">
            {about.stats.map((stat) => (
              <div key={stat.label} className="rule pt-5">
                <dt className="font-mono text-4xl text-signal">{stat.value}</dt>
                <dd className="mt-2 text-sm text-bone-faint">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
