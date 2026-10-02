# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # dev server on port 3002 (not 3000 — see .claude/launch.json)
npm run build   # production build
npm run start   # serve the production build (the `prod` entry in .claude/launch.json runs it on 3003)
npm run lint       # eslint (flat config; `next lint` was removed in Next 16)
npm run type-check # tsc --noEmit
```

Node 24 (`.nvmrc`); Next 16 requires at least 20.9. There is no test framework in this project.

Running `npm run build` while the dev server is up overwrites `.next` underneath it and the dev server starts throwing `Cannot find module './NNN.js'`. Stop the dev server first, or restart it afterwards.

## Architecture

A portfolio on Next.js 16 (App Router) with React 19, deployed on Vercel at mrghasemi1992.ir. Dark only. Every page is server-rendered and prerendered at build time, for SEO.

**Routes.** `/` is the home page (`src/app/page.tsx`). `/work/[slug]` is a case study per project (`src/app/work/[slug]/page.tsx`), built through `generateStaticParams` with `dynamicParams = false`, so unknown slugs are a 404. `sitemap.ts` and `robots.ts` sit in `src/app`.

**One component per folder.** Each lives in `src/components/<name>/index.tsx`, beside a `styles.module.css` when it has styles. Page sections: `nav`, `hero`, `marquee`, `about`, `experience`, `projects` (the Work section), `skills`, `contact`, `footer`, `case-study`. Shared: `section` (the `<section>` with its id anchor and big uppercase heading), `social-links`, `underline-link`, `logo`, `screenshot` (the image slot, a placeholder until real screenshots exist), `role-sheet`, `page-transition`, `json-ld`. Follow the same folder shape for new components.

**Server Components by default.** Only `nav` (the mobile menu, and the active-section highlight driven by an `IntersectionObserver`) and `role-sheet` (the experience dialog) are client components. The highlight that slides between nav links uses CSS anchor positioning: the active link is the anchor, and browsers without support fall back to filling the active link. Both use the native `<dialog>` with `showModal()`, which gives focus trapping and Escape for free; `globals.css` locks page scroll while one is open.

**Styling is CSS modules only.** No inline `style` objects, no Tailwind or other utility framework. Per-item values that would need a style prop (animation delays, stack offsets) come from `:nth-child` rules instead. `globals.css` keeps just what can't be scoped: a small reset, the color tokens, the `--sans`/`--display` font stacks, `.sr-only`, focus and selection styles, and the route-transition rules. When a shared component accepts `className`, the caller's class must not set a property the component's own class sets, because equal-specificity module classes resolve by chunk order. `UnderlineLink` inherits its color from its parent for this reason.

**Colors are tokens.** `globals.css` defines the palette on `:root` (`--bg`, `--surface*`, `--text*`, `--line*`, `--accent` and `--on-accent`). Never hardcode a hex in a component. The OG images are the one exception, because `ImageResponse` can't read CSS variables; they repeat the hexes with a comment.

**Content is separated from markup.** `src/data/index.tsx` holds everything editable: `profile` (name, role, intro, summary, email), `socials`, `navLinks`, `experience` (the full resume, word for word), `projects` (card text and the case-study content), `skillGroups` and `marqueeItems`. `src/data/logo.ts` exports the logo path, shared by the nav, the hero tile and the OG images.

**SEO.** `layout.tsx` sets `metadataBase`, the title template, description, canonical, Open Graph and Twitter tags. Each case study adds its own through `generateMetadata`. The home page renders `WebSite` and `Person` structured data and each case study `CreativeWork` and `BreadcrumbList`, linked by `@id`, through `json-ld`. `SITE_URL` in `src/data` is the www host, because the bare domain redirects to it (308); canonicals, the sitemap and OG URLs all derive from it, so keep it on the host that answers 200. OG images are generated at build time: `src/app/opengraph-image.tsx` and one per case study in `src/app/work/[slug]/opengraph-image.tsx`. The hero `h1` keeps the plain name in an `.sr-only` span, because the visible name is split into one span per letter.

**Motion.** All scroll motion is CSS scroll-driven animations (`animation-timeline: scroll()` / `view()`), wrapped in `@supports` and `prefers-reduced-motion: no-preference`, so browsers without support get the static page. No animation library. The pinned sideways Experience row and the stacking Work panels run only above 760px; on mobile they are a swipeable row and plain cards. Route changes use React's `<ViewTransition>` (works in the App Router with no config): `page-transition` slides content by the `nav-forward`/`nav-back` types set on links, and each project's screenshot and title share a `name` with the case study so they morph. The header is held in place through `[data-site-header]` in `globals.css`, because a `view-transition-name` written in a CSS module gets renamed.

**Fonts** are loaded through `next/font/google` in `layout.tsx` (Barlow Condensed for headings, set in uppercase, and Barlow for text) and exposed as CSS variables on `<body>`. `globals.css` wraps them into the `--display` and `--sans` stacks.

## Git conventions

Branches follow **Conventional Branch** (https://conventional-branch.github.io): `feature/`, `bugfix/`, `hotfix/`, `release/`, `chore/` plus a short kebab-case description, e.g. `feature/redesign-v3`. History contains a few older `feat/…` branches; use `feature/` for new ones.

Commits follow **Conventional Commits** (https://www.conventionalcommits.org): `type(optional scope): description`, written in the imperative and lowercase after the colon. Types in use here, by frequency: `chore`, `feat`, `perf`, `fix`, and `content` for copy-only changes.

Releases are marked by a version bump in `package.json` with a `chore: bump version to X.Y.Z` commit.

### Every commit is approved first

Never run `git commit` without the user's approval. Before each commit, show them:

1. what will be staged (`git status --short`, and the diff when it isn't obvious), and
2. the exact commit message you intend to use.

Then wait. Commit only after they approve, and apply any wording they change. This is per commit, not per session — approving one commit does not authorize the next one. It applies to amends and to commits made as part of a larger task; when a task produces several commits, walk through them one at a time.
