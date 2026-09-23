import { skillGroups } from "@/data";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export default function Toolkit() {
  return (
    <section id="toolkit" className="mx-auto max-w-shell px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading num="04" label="Toolkit" title="What I reach for." />

      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.06} className="rule pt-5">
            <h3 className="label mb-4">{group.title}</h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {group.items.map((item) => (
                <li key={item} className="font-mono text-sm text-bone-dim">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
