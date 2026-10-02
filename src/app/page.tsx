import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import JsonLd from "@/components/json-ld";
import Marquee from "@/components/marquee";
import Nav from "@/components/nav";
import PageTransition from "@/components/page-transition";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import { SITE_URL, profile, skillGroups, socials } from "@/data";
import styles from "./page.module.css";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.summary,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  sameAs: socials.map((s) => s.href),
  knowsAbout: skillGroups.flatMap((g) => g.items),
};

export default function Home() {
  return (
    <>
      <JsonLd data={person} />
      <Nav />
      <PageTransition>
        <main id="main" className={styles.main}>
          <Hero />
          <Marquee />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
