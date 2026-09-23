# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** hiring managers and engineering leads at product companies hiring for remote or international frontend roles. They arrive from a job application, LinkedIn or a referral, usually on a laptop, and give the site a minute or two to decide whether Mohammad Reza is worth a conversation.
- **Secondary:** design-minded engineers those leads forward the link to, who judge the craft of the site itself: motion, detail, performance, accessibility.

## Product Purpose

The personal site of Mohammad Reza Ghasemi, **Frontend Engineer**, at mrghasemi1992.ir.

Its job is to prove that he has taste in design and motion. A visitor should finish scrolling impressed by the craft of the site itself, not only informed about his career. Version 3 is a full redesign: v2 (on `master`) is a content source only, and its layout, components, CSS and visual style are not carried over.

Success, in order of priority:

1. The visitor emails him (`mrghasemi1992@gmail.com`).
2. The visitor downloads the resume PDF.
3. The visitor opens LinkedIn or GitHub.

## Positioning

A frontend engineer whose portfolio is itself the strongest work sample: the site demonstrates the motion, precision and engineering discipline it claims. The identity comes from frontend engineering only: six-plus years building production React and Next.js apps in fintech, insurance and e-commerce, step-by-step migrations of live applications, internal tooling and dev tools, testing and error reporting, design systems, and the craft of the browser itself. His academic degrees are not part of the site's identity and must not ground design concepts.

Personality the visitor should feel: **calm & precise** (restraint, exact spacing, motion that is subtle but perfect) and **technical & engineered** (systems, grids, exact detail, felt through the craft rather than shown as tooling). Impress through craft, not noise.

## Operating Context

- Single-page site. Visitors scroll top to bottom or jump through anchor navigation.
- Evaluated mostly on desktop laptops, but must hold up from 360px wide to wide desktop, on mid-range hardware, on phones and without WebGL.
- Recruiters often skim, so the facts (role, years, companies, contact) must be reachable without waiting for motion.

## Capabilities and Constraints

- **Stack (fixed):** Next.js 16 (App Router), React 19, TypeScript, CSS modules with CSS custom properties. No Tailwind or utility framework. Ask before adding a framework or changing tooling. Animation and 3D libraries are expected additions (GSAP + ScrollTrigger with Lenis for any scroll-driven work; Three.js or shaders allowed, not required).
- **Hosting:** Vercel, auto-deploys from `master`. Vercel Analytics and Speed Insights stay.
- **Theme:** dark only. No light mode and no theme toggle.
- **Performance:** 60fps on a mid-range laptop; lazy-load heavy assets (3D, shaders, photos); cap `devicePixelRatio` at 2; pause rendering off-screen; Lighthouse desktop Performance ≥ 85.
- **Fallbacks:** under `prefers-reduced-motion`, no scrub and no smooth scroll, with a complete static layout. Degrade gracefully on mobile, low-power devices and without WebGL.
- **SEO/meta:** page titles and the build-time Open Graph image (`next/og`) keep working; the OG image is redesigned to match v3.
- **Language:** English only.
- **Resume:** a clear "Resume (PDF)" download of `public/resume-final-2026.09.17-17.23.pdf`, saved as `Mohammad-Reza-Ghasemi-Frontend-Engineer-Resume.pdf`.
- **Work section data** must scale beyond the two current projects.

## Brand Commitments

- **Name and title:** Mohammad Reza Ghasemi, Frontend Engineer. In Experience, his SnappPay title is "Frontend Engineer"; earlier roles stay "Frontend Developer" as held.
- **Logo mark:** the existing mark in `src/data/logo.ts` is his and carries over. Everything around it is new. The favicon is regenerated from it for v3.
- **No external design references.** The concept must come from him and his work as a frontend engineer, and must not be recognizably derived from v2 or any single site.
- **Voice:** copy is rewritten in v3's voice, keeping every fact; each rewritten line is approved by him before it ships.
- **Craft, not instrumentation.** The "technical & engineered" feeling comes only from the craft itself: exact grid, spacing, typography and motion quality. No tool-style interface (rulers, inspect panels, readouts, devtools chrome) and no technical numbers shown to visitors (frame rate, paint times, magnification or similar). Performance is a quality the visitor feels, never a display.
- **Accent colour:** `#223BB2`, used as fields, fills and buttons (it is too dark to carry text on the dark ground).
- **Signature motion:** his name, large on the first screen, flies word by word into the fixed header as the visitor scrolls and becomes the site's title there.
- **Not wanted:** a career timeline, and portrait photos placed beside the hero.

## Evidence on Hand

- **Experience** (wording kept verbatim from v2, `src/data/index.tsx`): SnappPay (Nov 2024–present, 8 bullets incl. React Query migration, Pado/Tokenizer, vpnctl, Sentry, testing foundation, TS migration, A/B component, AI workflow), SADAD (Feb–Nov 2024), TashilCar (Dec 2022–Nov 2023), Fanap Plus (Jan 2021–Dec 2022), Arsh (Nov 2019–Dec 2020). Pado, Tokenizer and vpnctl are internal: text mentions only, no links or Work cards.
- **Education** is on the resume only. It is not shown on the site and plays no part in the design.
- **Skills:** v2's six groups carry over. Libraries v3 actually ships (e.g. GSAP, Lenis, Three.js) are added only once they ship.
- **Work:**
  1. *This portfolio (v3).* New copy describing v3's real stack, proposed once the stack is final and approved by him.
  2. *Orange*: a read-only Hacker News client with a modern reader UI (Next.js 16, custom design system, Storybook). In progress: 2 of 11 phases done (project setup, design system); next is the app shell. Source of truth for progress: the Phases table in `~/Projects/personal/orange/CLAUDE.md`. Repo `github.com/mrghasemi1992/orange` is public and may be linked. The live app (orange-hn.vercel.app) is linked at his request; the Storybook (orange-storybook.vercel.app, deployed with no stories when last checked) is not linked until he says so.
  - The Nazanin Portfolio project is dropped.
- **Contact and socials:** `mrghasemi1992@gmail.com`, `github.com/mrghasemi1992` (v2's `luckydevboy` links are dead and are replaced), `linkedin.com/in/mrghasemi1992`.
- **Photos:** none exist, and v3 ships without portrait photos.
- **Not on the site, and not to be invented:** location, availability or open-to-work status, testimonials, client names beyond the employers above, metrics, and any project beyond the two listed.

## Product Principles

1. **The site is the proof.** Every motion and detail must be good enough to be the work sample; anything that isn't gets cut.
2. **Facts first, craft around them.** Role, experience and contact stay readable as real text, instantly, with or without motion or WebGL.
3. **Restraint over spectacle.** One considered showpiece beats many effects; calm and precise wins over busy.
4. **Honest content.** Nothing invented; in-progress work is shown as in progress.
5. **Performance is part of the craft.** A stutter disproves the claim the site is making.

## Accessibility & Inclusion

WCAG 2.2 AA: semantic HTML, full keyboard navigation with visible focus, sufficient contrast, text never baked into a canvas, and a complete static experience under `prefers-reduced-motion`.
