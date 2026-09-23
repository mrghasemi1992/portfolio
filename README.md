# Portfolio

Personal site for Mohammad Reza Ghasemi — [mrghasemi1992.ir](https://mrghasemi1992.ir).

Version 3 is a scroll-driven redesign: the hero pins while a Three.js lattice
scrubs from scattered parts into a monolith and then rebuilds itself as an open
frame.

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS
- Three.js for the hero scene
- GSAP ScrollTrigger for scroll-linked animation, Lenis for smooth scrolling
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on [http://localhost:3002](http://localhost:3002).

```bash
npm run build   # production build
npm run lint    # eslint
```

## How the hero works

`src/three/lattice.ts` builds one `InstancedMesh` and interpolates every
instance between three keyframe layouts. `LatticeCanvas` maps the pinned
section's scroll progress onto that timeline through a scrubbed ScrollTrigger,
and `SmoothScroll` drives Lenis from GSAP's ticker so both share one clock.

The scene is skipped entirely — and three.js is never downloaded — when the
visitor prefers reduced motion, when WebGL is unavailable, or when the device
reports too few cores to hold a frame rate. The hero then renders as a static,
full-height section.

## Layout

```
src/
  app/          layout, page, global styles, OG image
  components/   nav, reveal, smooth scroll, canvas, sections/
  data/         all site content
  lib/          GSAP + reduced-motion helpers
  three/        the hero scene
```
