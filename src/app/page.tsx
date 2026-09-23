import SmoothScroll from "@/components/smooth-scroll";
import Masthead from "@/components/masthead";
import About from "@/components/about";
import Experience from "@/components/experience";
import Work from "@/components/work";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Masthead>
        <About />
        <Experience />
        <Work />
        <Skills />
        <Contact />
      </Masthead>
      <Footer />
    </>
  );
}
