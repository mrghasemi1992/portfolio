# Portfolio

Personal site for Mohammad Reza Ghasemi, Frontend Engineer — live at
**[mrghasemi1992.ir](https://mrghasemi1992.ir)**.

A single-page portfolio: hero, about, experience, skills and contact, with a
dark/light theme toggle and a downloadable resume.

## Stack

- **Next.js 16** (App Router) with React 19 and TypeScript 5
- **Tailwind CSS 4** for its base layer, configured in CSS — the page itself
  styles with inline styles and CSS custom properties (the developer guide
  explains why)
- **next/font** for Manrope and JetBrains Mono
- **next/og** to generate the Open Graph preview at build time
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
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config in `eslint.config.mjs`) |
| `npm run type-check` | `tsc --noEmit` |

There is no test suite in this project.

## Project layout

```
src/
  app/
    page.tsx             every section of the site
    layout.tsx           fonts, metadata, analytics
    globals.css          theme variables and the few real CSS classes
    opengraph-image.tsx  social preview, generated at build time
  data/
    index.tsx            all editable content
    logo.ts              the logo path, shared by nav and OG image
public/
  resume-*.pdf           the downloadable resume
```

## Editing content

Almost everything readable on the site — experience, projects, skills, nav
links, socials — lives in `src/data/index.tsx`, so the copy can be updated
without touching `page.tsx`.

## Deployment

Pushes to `master` deploy automatically on Vercel. Releases are marked with a
version bump in `package.json`.

## Developer guide

[**DEVELOPMENT.md**](DEVELOPMENT.md) covers what the file tree doesn't show:
how theming works, why the page is one component styled inline, how to add a
section or an accent color, the performance decisions baked into `globals.css`,
the git conventions this repo follows, and the gotchas worth knowing before
changing anything.

`CLAUDE.md` holds the same ground rules in the form Claude Code reads.
