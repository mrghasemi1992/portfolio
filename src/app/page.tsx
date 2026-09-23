"use client";

import { useState, useEffect } from "react";
import { SHOW_PROJECTS } from "@/data";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import styles from "./page.module.css";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div data-theme={theme} data-accent="cyan" className={styles.page}>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main id="top" className={styles.main}>
        <Hero />
        <About />
        <Experience />
        {SHOW_PROJECTS && <Projects />}
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
