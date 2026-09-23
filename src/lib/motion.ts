import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registers ScrollTrigger once, on the client only. */
export function registerScroll() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * WebGL is skipped on reduced motion, when the context can't be created, and on
 * devices too weak to hold 60fps with a few hundred instanced meshes.
 */
export function supportsWebGL() {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 3) return false;

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
    const lose = (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export { gsap, ScrollTrigger };
