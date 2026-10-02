# Developer guide

Everything here is about *why* the code looks the way it does, and what to
check before changing it. For setup and scripts, see [README.md](README.md).

## How the site is put together

### Routes and rendering

- `/` is the home page, `src/app/page.tsx`.
- `/work/[slug]` is one case study per project. `generateStaticParams` builds
  them all ahead of time and `dynamicParams = false` turns any other slug into
  a 404.

Every page is a Server Component, prerendered to static HTML at build time.
Search engines get the full text without running JavaScript, and Vercel serves
the pages from its CDN.

### Components

Every component lives in its own folder under `src/components/`, as an
`index.tsx` next to a `styles.module.css` when it has styles.

- **Page sections:** `nav`, `hero`, `marquee`, `about`, `experience`,
  `projects` (the Work section), `skills`, `contact`, `footer`, and
  `case-study` for the project pages.
- **Shared:**
  - `section`: the `<section>` with its id anchor and big uppercase heading.
  - `social-links`, `underline-link`.
  - `logo`: the SVG mark.
  - `screenshot`: the image slot, a placeholder until real screenshots exist.
  - `role-sheet`: the "Read all" dialog for a job.
  - `page-transition`: starts a page transition (see Motion).
  - `json-ld`: structured data.

**Only two components are client components:**

- `nav`, for the mobile menu and the active-section highlight.
- `role-sheet`, for the experience dialog.

Both use the native `<dialog>` with `showModal()`, which gives focus trapping
and Escape for free. `globals.css` locks page scroll while one is open.

### Styling: CSS modules and tokens

Each component styles itself through its own CSS module. There are no inline
`style` objects and no utility-class framework. Values that would usually need
a style prop, like per-item animation delays or stack offsets, come from
`:nth-child` rules.

`src/app/globals.css` holds only what can't be scoped to a component:
- a small reset;
- the color tokens and font stacks;
- `.sr-only`, focus and selection styles;
- the page-transition rules.

**Colors are tokens.** `:root` defines `--bg`, `--surface*`, `--text*`,
`--line*`, `--accent` and `--on-accent`. Never put a hex in a component. The
OG images are the one exception: `ImageResponse` can't read CSS variables, so
they repeat the hexes with a comment.

**Shared components and `className`:** a caller's class must never set a
property the component's own class sets too. Both classes have the same
specificity, so the winner would depend on the order the CSS chunks load in.
`UnderlineLink` takes its color from its parent for this reason.

### Content

`src/data/index.tsx` holds everything editable:
- `profile`, `socials`, `navLinks`;
- `experience`: the full resume, word for word;
- `projects`: card text and case-study content;
- `skillGroups`, `marqueeItems`.

`SITE_URL` is the `www` host, because the bare domain redirects to it (308).
Canonicals, the sitemap and OG URLs all derive from it.

### SEO

- `layout.tsx` sets the title template, description, canonical, Open Graph and
  Twitter tags. Case studies add their own through `generateMetadata`.
- Structured data: `WebSite` and `Person` on the home page, `CreativeWork` and
  `BreadcrumbList` on each case study, linked by `@id`.
- OG images are generated at build time, one for the home page and one per
  case study.
- The hero name is split into one span per letter for its animation, so the
  `h1` also carries the plain name in an `.sr-only` span.

### Fonts

`layout.tsx` loads Barlow Condensed (headings, set in uppercase) and Barlow
(text) through `next/font/google` and exposes them as CSS variables on
`<body>`. `globals.css` builds the `--display` and `--sans` stacks from them,
also on `body`, because a property that references the next/font variables has
to be declared where they exist.

## Motion

### Scroll animations

All scroll motion is CSS scroll-driven animation (`animation-timeline: scroll()`
and `view()`). It's wrapped in `@supports` and
`prefers-reduced-motion: no-preference`, so browsers without support, and
people who turn motion off, get the static page.

- The hero name shrinks and the logo tile turns as you leave the hero.
- The About text lights up line by line.
- On desktop, the Experience row pins and pans sideways, and the Work panels
  stack and sink. On screens 760px wide or narrower, they become a swipeable
  row and plain cards.
- On phones the Experience row shows that it scrolls sideways in three ways:
  - the next card peeks in at the right edge;
  - the row nudges left and back as it scrolls into view;
  - a small slider under the cards follows the swipe through a named
    `scroll-timeline`. The slider uses container query units, so it works for
    any number of jobs.
- Section headings, skill chips and the Contact block rise or grow into view.

### Page transitions

Page changes use React's `<ViewTransition>`:
- Links set a `nav-forward` or `nav-back` type.
- `page-transition` wraps an empty marker, so every page change starts a
  transition.
- `globals.css` slides the `root` snapshot according to the type.
- Each project's screenshot and title share a `name` with its case study, so
  they morph between the two pages.
- The nav is held in place through `[data-site-header]`.

## Performance decisions to leave alone

Each of these fixed a measured problem:

- **Never wrap `<main>` in a `<ViewTransition>`.** It makes the browser
  snapshot the whole page; the home page is about 7,800px tall. That caused
  severe frame drops on iPhones. Slide the `root` snapshot instead; it's one
  screen in size.
- **Scroll-driven animations animate only `transform` and `opacity`.** Other
  properties repaint on every scroll frame. The nav's solid background fades in
  on a pseudo-element, and the Contact block only scales.
- **No `filter: blur()` in transitions.** It's one of the most expensive
  effects on phone GPUs.
- **The pinned Experience row and the stacking Work panels are desktop-only.**
- **About words are `inline-block`.** An inline `<span>` takes its `view()`
  timeline from the whole paragraph, so every line would light at once.
- **`<html data-scroll-behavior="smooth">`** lets Next.js turn off the global
  smooth scrolling during page changes. Without it, case studies opened
  scrolled near the bottom.

## Gotchas

- **Don't run `npm run build` while the dev server is running.** The build
  overwrites `.next` underneath it and the dev server starts failing with
  `Cannot find module './NNN.js'`. Stop it first, or restart it afterwards.
- **Ports:** the dev server is on 3002, set in `package.json` and
  `.claude/launch.json`. The `prod` entry in `.claude/launch.json` serves the
  production build on 3003.
- **CSS modules rename `view-transition-name`.** That's why the header's name
  is set in `globals.css` through `[data-site-header]`.
- **View transitions are skipped in a hidden tab.** If a transition doesn't play
  while testing, make sure the browser window is visible.
- **The iOS Simulator can't show real frame drops,** because it renders with
  the Mac's GPU. Test motion on a real phone.

## Before you open a PR

```bash
npm run lint
npm run type-check
npm run build
```

Then check the production build (`npm run start`) at 375px and 1440px wide,
with reduced motion both on and off. For SEO or accessibility changes, run
Lighthouse on the home page and one case study.

## Git conventions

**Branches** follow [Conventional Branch](https://conventional-branch.github.io):
a `feature/`, `bugfix/`, `hotfix/`, `release/` or `chore/` prefix plus a short
kebab-case description, e.g. `feature/redesign-v3`. Some older branches in the
history use `feat/`; prefer `feature/` for new work.

**Commits** follow [Conventional Commits](https://www.conventionalcommits.org):
`type(optional scope): description`, imperative and lowercase after the colon.
Types used in this repo: `chore`, `feat`, `perf`, `fix`, `docs`, and `content`
for copy-only changes.

**Releases** are a version bump in `package.json` committed as
`chore: bump version to X.Y.Z`.

**Every commit is reviewed before it's made.** See `CLAUDE.md` for how that
applies to Claude Code sessions.
