import Nav from "@/components/Nav";
import About from "@/components/sections/About";
import Built from "@/components/sections/Built";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Toolkit from "@/components/sections/Toolkit";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Built />
        <Toolkit />
        <Contact />
      </main>
    </>
  );
}
