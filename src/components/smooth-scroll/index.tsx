"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/motion";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger reads the same frame.
 * In-page anchor links scroll smoothly; Lenis honours each target's scroll-margin-top
 * (set globally to the header height), so they stop right below the fixed header.
 * Off entirely under reduced motion: native scrolling and instant jumps.
 */
export default function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ autoRaf: false, lerp: 0.12, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}
