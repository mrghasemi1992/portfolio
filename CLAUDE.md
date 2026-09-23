# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # dev server on port 3002 (not 3000 — see .claude/launch.json)
npm run build   # production build
npm run start   # serve the production build
npm run lint       # eslint (flat config; `next lint` was removed in Next 16)
npm run type-check # tsc --noEmit
```

Node 24 (`.nvmrc`); Next 16 requires at least 20.9. There is no test framework in this project.

Running `npm run build` while the dev server is up overwrites `.next` underneath it and the dev server starts throwing `Cannot find module './NNN.js'`. Stop the dev server first, or restart it afterwards.

## Architecture

A single-page portfolio on Next.js 16 (App Router) with React 19, deployed on Vercel at mrghasemi1992.ir.

**The whole UI lives in one client component.** `src/app/page.tsx` renders every section — nav, hero, about, experience, projects, skills, contact — in roughly 900 lines. There is no component directory. Follow that structure when editing rather than half-extracting components.

**Styling is inline, not utility classes.** Tailwind 4 is installed for its base layer (one `@import "tailwindcss"` in `globals.css`, no `tailwind.config.ts`), but `page.tsx` uses inline `style` objects almost exclusively. The only `className` values are the nine hand-written classes in `globals.css` (`.site-nav`, `.nav-link`, `.btn-primary`, `.project-card`, `.experience-grid`, …), which exist for the hover and transition states that inline styles can't express.

**Theming runs on CSS custom properties.** `globals.css` defines the palette on `:root`, overrides it under `[data-theme="light"]`, and defines accent variants under `[data-accent="lime"|"amber"|"violet"]`. `page.tsx` holds the theme in React state and writes it to `document.documentElement.dataset.theme`; the wrapper div also carries `data-theme`/`data-accent`. Add colors as variables in both the dark and light blocks — never hardcode a hex in a component.

**Content is separated from markup.** `src/data/index.tsx` holds everything editable: `navLinks`, `socials`, `experience`, `projects`, `skillGroups`, and the `SHOW_PROJECTS` flag that currently hides the projects section. Section numbers (`01`, `02`, …) are derived from `navLinks` order through `sectionNum()`, so adding or reordering a nav entry renumbers the headings automatically. `src/data/logo.ts` exports the logo path, shared by the nav SVG and the Open Graph image.

**The OG image is generated at build time.** `src/app/opengraph-image.tsx` uses `next/og` `ImageResponse` with the same logo constants, so the social preview and the nav mark never drift apart.

**Fonts** are loaded through `next/font/google` in `layout.tsx` (Manrope, JetBrains Mono) and exposed as CSS variables, which `page.tsx` references through the local `sans` and `mono` string constants.

### Performance decisions already made here

These carry comments in `globals.css` and are deliberate — don't undo them without a reason:

- The dot-grid background is a cached SVG data URI tile, because a repeated `radial-gradient` repaints slowly in WebKit.
- `backdrop-filter` on the nav is disabled below 720px and on touch devices, where it costs more than it's worth.
- Scroll reveal animations were removed on purpose (commit `33e2409`) for smoother mobile scrolling.

## Git conventions

Branches follow **Conventional Branch** (https://conventional-branch.github.io): `feature/`, `bugfix/`, `hotfix/`, `release/`, `chore/` plus a short kebab-case description, e.g. `feature/redesign-v3`. History contains a few older `feat/…` branches; use `feature/` for new ones.

Commits follow **Conventional Commits** (https://www.conventionalcommits.org): `type(optional scope): description`, written in the imperative and lowercase after the colon. Types in use here, by frequency: `chore`, `feat`, `perf`, `fix`, and `content` for copy-only changes.

Releases are marked by a version bump in `package.json` with a `chore: bump version to X.Y.Z` commit.

### Every commit is approved first

Never run `git commit` without the user's approval. Before each commit, show them:

1. what will be staged (`git status --short`, and the diff when it isn't obvious), and
2. the exact commit message you intend to use.

Then wait. Commit only after they approve, and apply any wording they change. This is per commit, not per session — approving one commit does not authorize the next one. It applies to amends and to commits made as part of a larger task; when a task produces several commits, walk through them one at a time.
