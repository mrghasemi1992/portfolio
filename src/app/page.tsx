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

const structured = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: profile.name,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: profile.name,
      jobTitle: profile.role,
      description: profile.summary,
      url: SITE_URL,
      email: `mailto:${profile.email}`,
      sameAs: socials.map((s) => s.href),
      knowsAbout: skillGroups.flatMap((g) => g.items),
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={structured} />
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
