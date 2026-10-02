# Portfolio

Personal site for Mohammad Reza Ghasemi, Frontend Engineer. Live at
**[www.mrghasemi1992.ir](https://www.mrghasemi1992.ir)**.

Version 3: a dark, motion-led portfolio with a home page (hero, about,
experience, work, skills, contact) and a case-study page for each project.
Every page is server-rendered and prerendered at build time.

> **How this version was made:** v3 was designed and built with Claude, from
> the first brief to the mobile performance fixes. The whole process (prompts,
> skills, tools and decisions) is written up step by step in
> [**docs/building-v3-with-claude.md**](docs/building-v3-with-claude.md).

## Stack

- **Next.js 16** (App Router) with React 19 and TypeScript 5, statically
  prerendered
- **CSS modules**, one per component, with color tokens as CSS custom
  properties
- **CSS scroll-driven animations** for scroll motion, with no animation library
- **React `<ViewTransition>`** for page transitions and the project morph
- **next/font** for Barlow Condensed (headings) and Barlow (text)
- **next/og** for Open Graph images, generated at build time
- **Vercel** for hosting, analytics and speed insights

## Getting started

Requires Node 24 (see `.nvmrc`); Next 16 needs at least Node 20.9.

```bash
npm install
npm run dev
```

The dev server runs on **[http://localhost:3002](http://localhost:3002)**, not
the usual 3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 3002 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (`.claude/launch.json` runs it on 3003) |
| `npm run lint` | ESLint (flat config in `eslint.config.mjs`) |
| `npm run type-check` | `tsc --noEmit` |

There is no test suite in this project.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, about, experience, work, skills, contact |
| `/work/orange` | Case study: Orange, a Hacker News reader |
| `/work/money` | Case study: Money, a Persian personal accounting app |
| `/work/portfolio` | Case study: this site |
| `/sitemap.xml`, `/robots.txt` | Generated from `src/app/sitemap.ts` and `robots.ts` |

## Project layout

```
src/
  app/
    page.tsx               home page, composes the sections
    work/[slug]/page.tsx   case-study pages, one per project
    work/[slug]/opengraph-image.tsx
    layout.tsx             fonts, metadata, analytics
    globals.css            reset, color tokens, font stacks, page transitions
    opengraph-image.tsx    home social preview
    sitemap.ts, robots.ts
  components/
    <name>/index.tsx       one folder per component
    <name>/styles.module.css
  data/
    index.tsx              all editable content
    logo.ts                the logo path, shared by nav, hero and OG images
docs/
  building-v3-with-claude.md
```

## Editing content

Everything readable on the site lives in `src/data/index.tsx`:

- `profile`: name, role, intro and summary.
- `experience`: every resume bullet, word for word.
- `projects`: the card text and the full case study (scope, decisions, stack,
  links).
- `skillGroups`, `marqueeItems`, `socials` and `navLinks`.

Adding a project to `projects` creates its case-study page, its OG image and
its sitemap entry on the next build.

Project screenshots are placeholders for now (`src/components/screenshot`).

## Deployment

Pushes to `master` deploy automatically on Vercel, and pull requests get a
preview deploy. Releases are marked with a version bump in `package.json`.

## Docs

- [**DEVELOPMENT.md**](DEVELOPMENT.md): how the site is put together, the
  motion and performance decisions, gotchas, and the git conventions.
- [**CLAUDE.md**](CLAUDE.md): the same ground rules in the form Claude Code
  reads.
- [**docs/building-v3-with-claude.md**](docs/building-v3-with-claude.md): how v3
  was designed and built with Claude, step by step.
