# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio on Next.js 16 (App Router) + React 19 + TypeScript, deployed on Vercel at www.mrghasemi1992.ir. Dark only. The owner built it with Claude and doesn't know the code in depth, so explain changes in plain terms and don't assume they'll catch a subtle mistake in review.

**Read before changing things:** [DEVELOPMENT.md](DEVELOPMENT.md) explains how the code works (§2), the CSS features the motion depends on (§3), the rules and their reasons (§4), recipes (§5) and troubleshooting (§6). [README.md](README.md) covers content edits and deploys.

## Commands

```bash
npm run dev         # dev server on port 3002, not 3000
npm run build       # production build
npm run start       # serve the build; .claude/launch.json "prod" runs it on 3003
npm run lint        # eslint, flat config (`next lint` no longer exists in Next 16)
npm run type-check  # tsc --noEmit
```

Node 24 (`.nvmrc`). No test framework: lint + type-check + build, then verify in the browser preview (`preview_start` with `dev` or `prod` from `.claude/launch.json`) at 375px and 1440px, with reduced motion on and off.

Don't run `npm run build` while the dev server is up: it overwrites `.next` and the dev server throws `Cannot find module './NNN.js'`. Stop it first or restart it after.

## Architecture

- **Content is data.** All copy lives in `src/data/index.tsx` (`profile`, `experience`, `projects`, `skillGroups`, `marqueeItems`, `socials`, `navLinks`, `SITE_URL`, `SHOW_HERO_PHOTO`; the hero photo is `profile.portrait`, a cut-out PNG in `src/assets/profile/`). Components only lay it out. A copy change should touch only that file.
- **Projects.** `projects` is `allProjects` minus entries with `hidden: true` (Orange, for now); everything (cards, pages, sitemap, OG images) reads `projects`. Screenshots live in `src/assets/work/<slug>/` and are imported in `src/data/index.tsx` (never linked from `public/`: the import gives them a hashed, year-long-cached URL and a blur placeholder): main `image` 1600×1200 (cropped from the top), gallery 1600×1000 or 780×1688 with `phone: true` (sizes in README "Screenshots").
- **Computed copy.** The years of experience in `profile.intro`/`summary` come from the earliest `experience[].period`, parsed as `Mon YYYY - …`. `layout.tsx` sets `revalidate = 86400` so prerendered pages pick up the new number daily without a deploy.
- **Rendering.** Every page is a Server Component, prerendered at build time. `/work/[slug]` is built from `projects` via `generateStaticParams` with `dynamicParams = false`, so adding a project creates its page, OG image (`work/[slug]/opengraph-image.tsx`) and sitemap entry; unknown slugs 404.
- **Client components:** only `nav` (mobile menu `<dialog>`, active-section `IntersectionObserver`) and `accordion` (keeps a clicked Experience row in place when the open one above it closes). Keep it that way unless interactivity requires otherwise.
- **Section ids** come from `<Section title>` lowercased; `navLinks` hrefs (`/#work`) must match them for the nav highlight to work.
- **Components:** one folder each, `src/components/<kebab-name>/index.tsx` + `styles.module.css`. Import via `@/`.
- **SEO:** metadata in `layout.tsx`, overridden per case study in `generateMetadata`. JSON-LD (`WebSite`+`Person` on home, `CreativeWork`+`BreadcrumbList` per case study) linked by `@id`. Project link labels `"Code"` and `"Live site"` are read by the JSON-LD. `SITE_URL` must stay the `www` host (the bare domain 308s to it).

## Hard rules

- **CSS modules only.** No Tailwind/utility CSS, no inline `style` props. Per-item values (delays, offsets) come from `:nth-child` rules setting a custom property. Exception: the `ImageResponse` OG images, which need inline styles.
- **No hex colors in components**; use or add tokens in `globals.css` `:root`. Exceptions: OG images and `themeColor` in `layout.tsx`, which repeat the hexes — keep them in sync when a token changes.
- **Shared component + `className`:** the caller's class must not set a property the component's class sets (equal specificity, chunk order decides). `UnderlineLink` inherits color from its parent for this reason.
- **`view-transition-name` goes in `globals.css`** on a data attribute (`[data-site-header]`), never in a module (it gets renamed).
- **Motion is CSS only**, no animation library. Scroll-driven animations (`animation-timeline: scroll()`/`view()`) must be wrapped in `@media (prefers-reduced-motion: no-preference)` + `@supports (animation-timeline: …)` and animate only `transform`/`opacity` (the Work `sink` keyframe's `filter: brightness()` is the one existing exception — don't add more).
- **Never wrap `<main>` in `<ViewTransition>`** (snapshots the ~7800px page, drops frames on phones). `page-transition` wraps an empty marker; `globals.css` slides the `root` snapshot by `nav-forward`/`nav-back` type, set by `<Link transitionTypes>`. Project screenshot and title share `shot-<slug>`/`title-<slug>` names for the morph.
- **Desktop-only motion:** the stacking Work panels run above 760px only (the single breakpoint).
- Keep `data-scroll-behavior="smooth"` on `<html>`, `inline-block` on About words, and `.sr-only` copies next to visually split text (hero `h1`).
- **Fixed-count styles:** Work panels are styled for 2 or 3 projects, hero for 4 name words, skill chip stagger for 7. Extending past them needs CSS changes (DEVELOPMENT §5, "Hidden limits").

## Docs

When a change affects what a doc describes, update it in the same PR: README (usage, content), DEVELOPMENT (how it works, rules, workflow), this file (agent rules).

## Git

- Branches: Conventional Branch — `feature/`, `bugfix/`, `hotfix/`, `release/`, `chore/` + kebab-case (e.g. `feature/redesign-v3`). Use `feature/`, not the older `feat/`. Never commit to `master` directly.
- Commits: Conventional Commits, imperative, lowercase after the colon. Types: `feat`, `fix`, `perf`, `content` (copy only), `docs`, `chore`.
- Releases: `package.json` version bump, committed as `chore: bump version to X.Y.Z`.

### Every commit is approved first

Never run `git commit` without the user's approval. Before each commit, show them:

1. what will be staged (`git status --short`, and the diff when it isn't obvious), and
2. the exact commit message you intend to use.

Then wait. Commit only after they approve, and apply any wording they change. This is per commit, not per session — approving one commit does not authorize the next one. It applies to amends and to commits made as part of a larger task; when a task produces several commits, walk through them one at a time.

