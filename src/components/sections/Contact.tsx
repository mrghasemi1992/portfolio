import { site, socials } from "@/data";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="mx-auto max-w-shell px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading num="05" label="Contact" title="Got something in mind? Let's talk." />

      <Reveal>
        <a
          href={`mailto:${site.email}`}
          className="link-underline inline-block break-all font-mono text-2xl text-bone transition-colors hover:text-signal sm:text-4xl"
        >
          {site.email}
        </a>
      </Reveal>

      <Reveal delay={0.08} className="mt-8 max-w-xl text-lede text-bone-dim">
        Questions, ideas, or just a hello — email is the fastest way to reach me.
      </Reveal>

      <Reveal
        delay={0.16}
        as="footer"
        className="rule mt-20 flex flex-wrap items-center justify-between gap-6 pt-8"
      >
        <ul className="flex flex-wrap gap-6 font-mono text-sm">
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
          <li>
            <a
              href={site.resumeUrl}
              download={site.resumeFilename}
              className="link-underline text-bone-dim transition-colors hover:text-bone"
            >
              <span className="text-signal">↓</span> Resume
            </a>
          </li>
        </ul>

        <p className="font-mono text-xs text-bone-faint">
          © {year} {site.name}
        </p>
      </Reveal>
    </section>
  );
}
