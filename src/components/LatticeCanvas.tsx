"use client";

import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger, registerScroll } from "@/lib/motion";
import type { LatticeScene } from "@/three/lattice";

type Props = {
  /** The pinned section whose scroll progress drives the scene. */
  triggerRef: React.RefObject<HTMLElement>;
};

export default function LatticeCanvas({ triggerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const trigger = triggerRef.current;
    if (!canvas || !trigger) return;

    let scene: LatticeScene | undefined;
    let scrollTrigger: ScrollTrigger | undefined;
    let observer: IntersectionObserver | undefined;
    let cancelled = false;

    const onResize = () => scene?.resize();

    // three.js is ~600KB: keep it out of the first paint.
    import("@/three/lattice").then(({ createLatticeScene }) => {
      if (cancelled) return;

      scene = createLatticeScene(canvas);
      canvas.dataset.ready = "true";
      registerScroll();

      scrollTrigger = ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => scene?.setProgress(self.progress),
      });

      // Rendering off-screen burns battery for nothing.
      observer = new IntersectionObserver(
        ([entry]) => scene?.setPaused(!entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(canvas);

      // The canvas mounts after the section reaches its full height.
      ScrollTrigger.refresh();

      window.addEventListener("resize", onResize);
      gsap.to(canvas, { opacity: 1, duration: 1.2, ease: "power2.out" });
    });

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
      scrollTrigger?.kill();
      scene?.dispose();
    };
  }, [triggerRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-0"
    />
  );
}
