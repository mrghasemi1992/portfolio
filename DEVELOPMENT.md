# Developer guide

How the site works, how to change it without breaking it, and the workflow from
branch to release. For setup, scripts and content edits, see
[README.md](README.md).

**Contents**

1. [The mental model](#1-the-mental-model)
2. [A walk through the code](#2-a-walk-through-the-code)
3. [The browser features this site relies on](#3-the-browser-features-this-site-relies-on)
4. [Rules](#4-rules)
5. [How to](#5-how-to)
6. [Troubleshooting](#6-troubleshooting)
7. [Workflow: branch, commit, PR, release](#7-workflow-branch-commit-pr-release)

## 1. The mental model

```
src/data/index.tsx          all the text: profile, jobs, projects, skills
        │
        ▼
src/components/<name>/      one folder per piece of the page; reads the data,
        │                   outputs HTML, styles itself with a CSS module
        ▼
src/app/                    the routes: put components together into pages
        │                   and set titles, social images and the sitemap
        ▼
next build                  renders every page to static HTML
        │
        ▼
Vercel                      serves that HTML from its CDN, and rebuilds it
                            once a day
```

Three facts explain most of the code:

- **Content and markup are separate.** Changing what the site *says* touches
  only `src/data/index.tsx`. Changing how it *looks or behaves* touches
  components and CSS.
- **Almost everything runs on the server, at build time.** Visitors download
  HTML and CSS. Only two small components send JavaScript to the browser.
- **All motion is CSS.** Animations tied to scrolling, and the slide between
  pages, are plain CSS features of the browser. No JavaScript drives them. If a
  browser doesn't support them, the page is simply still.

## 2. A walk through the code

```
src/
  app/
    layout.tsx                  <html> and <body>: fonts, site-wide metadata,
                                analytics, daily revalidate
    page.tsx                    home page: puts the sections in order, adds
                                structured data
    page.module.css             one rule: clips the marquee's sideways overflow
    globals.css                 reset, color tokens, font stacks, page-change
                                animations
    opengraph-image.tsx         social image for the home page
    work/[slug]/page.tsx        one case-study page per project
    work/[slug]/opengraph-image.tsx   social image per case study
    sitemap.ts, robots.ts       /sitemap.xml and /robots.txt
    favicon.ico
  components/<name>/
    index.tsx                   the component
    styles.module.css           its styles, when it has any
  data/
    index.tsx                   all editable content (see README)
    logo.ts                     the logo's SVG path, used by the nav, the hero
                                tile and the social images
public/                         files served as-is from the site root
.claude/launch.json             dev (3002) and prod (3003) servers for Claude
                                Code's browser preview
```

### Rendering

Every page is a **React Server Component**: it runs during `next build`, and the
result is saved as static HTML. `layout.tsx` exports `revalidate = 86400`, so
Vercel regenerates each page in the background once a day (Incremental Static
Regeneration). That exists for one reason: the years of experience in the copy
are computed from the date, and should go up without a deploy.

`/work/[slug]` is one file that makes many pages. `generateStaticParams`
returns one slug per entry in `projects`, and `dynamicParams = false` makes any
other slug a 404. `generateMetadata` gives each case study its own title,
description and canonical URL.

### Components

Page sections, in the order they appear on the home page:

| Component | What it is |
| --- | --- |
| `nav` | Sticky header: logo, section links with a sliding highlight, Contact button, and the mobile menu. **Client component.** |
| `hero` | Name (letters drop in), role, intro, and the optional logo tile |
| `marquee` | Strip of skills scrolling sideways. Decorative, hidden from screen readers |
| `about` | The summary, lit up line by line as you scroll |
| `experience` | One row per job, the company as a big headline. A click opens its bullets; one job is open at a time, and the current job starts open |
| `projects` | The Work section: one panel per project, stacking on desktop |
| `skills` | Skill groups as chips |
| `contact` | Email and social links |
| `footer` | Copyright and "Back to top" |
| `case-study` | The whole body of a `/work/[slug]` page |

Shared pieces:

| Component | What it is |
| --- | --- |
| `section` | A `<section>` with an id and the big uppercase heading. **The id is the title in lowercase**, which is what the nav links point at (`title="Work"` → `#work`). |
| `accordion` | Wraps the Experience rows and keeps a clicked row in place when the open row above it closes (see §3). **Client component.** |
| `screenshot` | A project's main image (`next/image`), or a striped placeholder when the project has no `image`. Drawn as a bleed: a dark well with the image inset top-left, running off the right and bottom edges |
| `page-transition` | An empty marker that makes every page change start a view transition (see §3) |
| `json-ld` | Writes structured data for search engines into a `<script>` tag |
| `logo` | The logo as an inline SVG, drawn in the current text color |
| `social-links` | GitHub and LinkedIn, used in Contact and the mobile menu |
| `underline-link` | A link whose underline sweeps in on hover |

**Why only two client components.** `nav` needs the browser to open the mobile
menu and to watch which section is on screen (an `IntersectionObserver` watches
a thin band 40% down the screen). The menu is a native `<dialog>` opened with
`showModal()`, which traps focus and closes on Escape with no extra code;
`globals.css` stops the page behind from scrolling while it's open
(`html:has(dialog[open])`). `accordion` only corrects the scroll position when
an Experience row opens; the rows themselves are plain HTML and open and close
without it. Everything else is static.

### Styling

- Each component has its own `styles.module.css`. Next.js renames the classes,
  so two components can both use `.title` without clashing.
- `globals.css` holds only what can't belong to one component: the reset, the
  color tokens, the font stacks, `.sr-only`, focus and selection styles, and
  the page-change animations.
- **Color tokens** on `:root`: `--bg`, `--surface`, `--surface-2`,
  `--surface-3`, `--raised`, `--line`, `--line-strong`, `--text`,
  `--text-dim`, `--text-faint`, `--accent`, `--accent-hover`, `--on-accent`,
  `--on-accent-dim`, plus `--nav-bg*` and `--panel-shadow`.
- **Layout tokens:** `--page-width` (1360px), `--gutter` (40px, 20px on phones),
  and two easing curves, `--ease-out` and `--ease-spring`.
- **One breakpoint:** 760px. At 760px wide or narrower the layout is the phone
  layout.
- **Per-item values** like stagger delays and stack offsets come from
  `:nth-child` rules that set a custom property (`--n`, `--s`, `--b`), never
  from a `style` prop. This is why some sections have a fixed number of styled
  slots (see the "Hidden limits" table in §5).

### Fonts

`layout.tsx` loads Barlow (text, weights 400–600) and Barlow Condensed
(headings, weights 600–800) through `next/font/google`. Next.js hosts the files
itself, so there's no request to Google. They become the CSS variables
`--font-barlow` and `--font-barlow-condensed` on `<body>`, and `globals.css`
builds `--sans` and `--display` from them, also on `body`. That has to be on
`body` because the next/font variables don't exist higher up. Headings are set
in uppercase in CSS, not in the text.

### SEO

- **Metadata:** `layout.tsx` sets the title template (`%s | Mohammad Reza
  Ghasemi`), the description (from `profile.summary`), the canonical URL, and
  the Open Graph and Twitter tags. Case studies override them in
  `generateMetadata`.
- **Structured data (JSON-LD):** the home page has `WebSite` and `Person`. Each
  case study has `CreativeWork` and `BreadcrumbList`. The case study's `author`
  points at the home page's `Person` by its `@id`, so search engines can tell
  it's the same person.
- **Social images** are drawn in code at build time with `ImageResponse` from
  `next/og`.
- **`SITE_URL`** is the `www` host, because the bare domain redirects to it
  (308). Canonicals, the sitemap and social URLs all come from it. Keep it on
  the host that answers 200.
- **The hero `<h1>`** is split into one `<span>` per letter for the animation,
  and that's hidden from screen readers. The plain name sits next to it in an
  `.sr-only` span, so screen readers and search engines read the name as a
  whole.

## 3. The browser features this site relies on

These are newer CSS and HTML features. If you haven't met them, read this
section before you touch any motion.

### Scroll-driven animations

A normal CSS animation runs over time. A scroll-driven animation runs over
**scroll distance**: 0% at one scroll position, 100% at another. If you scroll
back, it plays backwards.

```css
.title {
  animation: rise linear both;      /* which keyframes; no duration */
  animation-timeline: view();       /* progress = this element crossing the screen */
  animation-range: entry 0% entry 70%;  /* from appearing to 70% in */
}
```

- `scroll(root)` ties progress to how far the whole page has scrolled. The hero
  name and the nav background use it.
- `view()` ties progress to the element moving through the viewport. Headings,
  About, skills and Contact use it.
- A **named timeline** lets one element drive another. The Work section
  publishes `--work`, and the panels inside it read it.

Every one of these is wrapped like this, so unsupported browsers and people who
turn motion off get a still page:

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    /* the animation */
  }
}
```

Where each one lives:

| Effect | File |
| --- | --- |
| Hero name shrinks and fades, tile rotates | `hero/styles.module.css` |
| Nav background fades in after 160px | `nav/styles.module.css` (on `::after`) |
| About words light up | `about/styles.module.css` |
| Section headings rise | `section/styles.module.css` |
| Work panels stack and sink (desktop) | `projects/styles.module.css` |
| Skill chips rise in turn | `skills/styles.module.css` |
| Contact block grows | `contact/styles.module.css` |

The hero letters, the marquee, the menu dialog and the Experience rows
(bullets rise in when a row opens) use ordinary time-based animations.

### View transitions (page changes)

When you go from the home page to a case study, the browser takes a snapshot of
the old page, renders the new one, and animates between the two. React 19's
`<ViewTransition>` component starts this, and the App Router supports it with
no config.

How it's wired here:

1. Links set a direction: `<Link transitionTypes={["nav-forward"]}>` toward a
   case study, `["nav-back"]` back to the Work section.
2. `page-transition` renders `<ViewTransition>` around an empty `<span>`. It's
   in each page (not the layout, because the layout never leaves the screen),
   so every page change starts a transition.
3. `globals.css` slides the `root` snapshot, which is one screen in size, left
   or right depending on the direction.
4. A project's screenshot and title are wrapped in
   `<ViewTransition name="shot-<slug>">` and `name="title-<slug>"` both on the
   home page card and on the case study, so they **morph** from one to the
   other.
5. The header has `data-site-header`, and `globals.css` gives it
   `view-transition-name: site-header` with no animation, so it holds still.

### CSS anchor positioning (the nav highlight)

The active nav link gets `anchor-name: --nav-active`. One `.indicator` element
is positioned with `anchor()` and sized with `anchor-size()` to match whichever
link holds that name, and a `transition` on `left` and `width` makes it slide.
Browsers without anchor positioning just fill the active link instead.

### The `<dialog>` element

`dialog.showModal()` opens the element above everything, makes the rest of the
page inert, moves focus into it and closes it on Escape. The mobile menu uses
it.

### One open at a time: `<details name>`

Each Experience row is a `<details>` with its `<summary>`, all sharing
`name="experience"`. Giving them one name makes the browser keep only one open:
opening a row closes the others, with no JavaScript (Chrome 120, Safari 17.2,
Firefox 130; older browsers just let several stay open). They work by keyboard
and screen readers announce them as expandable.

The catch: when the open row is above the one you click, closing it shrinks the
page above your row, and the row jumps up, often off screen. `accordion`
handles the click itself: it notes where the row is, opens it (which closes the
other one), measures again and scrolls the page back by the difference, all in
the same frame, so nothing visibly moves. It uses `behavior: "instant"`,
because `<html>` has smooth scrolling and a smooth scroll would show the jump.
Don't do the correction in `requestAnimationFrame` or the `toggle` event: both
run after the jump, and the first doesn't run at all in a background tab.

## 4. Rules

Each rule is here because breaking it caused a real problem, or would.

### Code

- **One component per folder**: `src/components/<kebab-name>/index.tsx`, a
  default export, and `styles.module.css` beside it when it has styles. Import
  with the `@/` alias (`@/components/section`, `@/data`).
- **Server Components by default.** Add `"use client"` only when a component
  needs state, effects or event handlers, and keep that component small.
- **Content goes in `src/data/index.tsx`,** not in components. Section
  headings and fixed UI labels ("Read case study", "Back to top") are the
  exception and live in the components.
- **Accessibility:** decorative things get `aria-hidden="true"`; text that's
  split or styled for looks keeps a readable copy in `.sr-only`; links that
  open a new tab get `rel="noopener noreferrer"`.

### Styling

- **CSS modules only.** No Tailwind or other utility framework, no inline
  `style` props. The social images are the one exception, because
  `ImageResponse` only understands inline styles.
- **No hex colors in components.** Use a token from `globals.css`, or add a new
  token there. Exceptions: the social images (they can't read CSS variables, so
  they repeat the hexes with a comment) and `themeColor` in `layout.tsx`.
- **When a shared component takes `className`,** the caller's class must not
  set a property the component's own class already sets. Both have the same
  specificity, so which one wins depends on the order the CSS files load,
  which can change between builds. That's why `UnderlineLink` takes its color
  from its parent, and why `Screenshot`'s `className` should set only size and
  aspect ratio.
- **`view-transition-name` can't go in a CSS module,** because the module
  would rename it. Set it in `globals.css` on a data attribute, like
  `[data-site-header]`.

### Motion and performance (leave these alone)

Each of these fixed a measured problem on phones:

- **Never wrap `<main>` in a `<ViewTransition>`.** The browser would snapshot
  the whole home page, about 7,800px tall, and iPhones dropped frames badly.
  Slide the `root` snapshot instead.
- **Scroll-driven animations animate only `transform` and `opacity`.** Any
  other property repaints on every scroll frame. The nav's background fades in
  on a pseudo-element for this reason, and Contact only scales. *Known
  exception:* the Work panels' `sink` keyframe also dims with
  `filter: brightness()`, on desktop only.
- **No `filter: blur()` in transitions.** It's one of the most expensive
  effects on phone GPUs.
- **The stacking Work panels are desktop-only** (above 760px).
- **About words are `inline-block`.** An inline span takes its `view()`
  position from the whole paragraph, so every line would light up at once.
- **Keep `data-scroll-behavior="smooth"` on `<html>`.** It lets Next.js turn
  off smooth scrolling during page changes. Without it, case studies opened
  scrolled near the bottom.
- **Every animation has a reduced-motion path.** Wrap new ones as shown in §3.

## 5. How to

### Add a fourth project

The Work section handles two or three panels by itself: `.stack` sets
`--share` (each panel's slice of the sink animation) to 50%, and to 33.33%
when it has a third child. For a fourth, add the entry to `projects` (see
README), then in `src/components/projects/styles.module.css`:

1. Add a slot for the new panel, below the existing ones:

   ```css
   .panel:nth-child(4) {
     --n: 3;
     background: var(--raised);
   }
   ```

2. Give four panels a quarter each:

   ```css
   .stack:has(> :nth-child(4)) {
     --share: 25%;
   }
   ```

3. Check the Work section on desktop: each panel should sit 28px lower than the
   one before and sink as the next one covers it.

### Add a section to the home page

1. Add the text to `src/data/index.tsx`.
2. Create `src/components/<name>/index.tsx` and wrap the content in
   `<Section title="Name">`. That gives it the id `name`, the heading and its
   rise animation.
3. Place it in `src/app/page.tsx`, inside `<main>`, in the order you want.
4. To link it from the nav, add `{ label: "Name", href: "/#name" }` to
   `navLinks`. The `href` must match the lowercased title, or the nav
   highlight won't find it.

### Add a component

Copy the shape of a small one, like `skills`:

```tsx
import Section from "@/components/section";
import { skillGroups } from "@/data";
import styles from "./styles.module.css";

export default function Skills() {
  return <Section title="Skills">{/* ... */}</Section>;
}
```

Use tokens for every color and size that already has one (`var(--gutter)`,
`var(--page-width)`), and add the 760px rules at the bottom of the module.

### Add a scroll animation

1. Write the keyframes using only `transform` (or `translate`, `scale`,
   `rotate`) and `opacity`.
2. Wrap the rule in `prefers-reduced-motion: no-preference` and
   `@supports (animation-timeline: view())`, as in §3.
3. Pick the timeline: `view()` for "as this scrolls into view",
   `scroll(root)` for "as the page scrolls".
4. Check it with reduced motion on (the page must still look finished) and on
   a real phone if it's large.

### Change a color

Change the value in `:root` in `globals.css`. If it's `--bg`, `--text`,
`--text-faint` or `--accent`, also change the copies in
`src/app/opengraph-image.tsx` and `src/app/work/[slug]/opengraph-image.tsx`,
and `themeColor` in `layout.tsx` for `--bg`. Check contrast: unlit About words
at 0.4 opacity are tuned to stay at 3.5:1 against `--bg`.

### Screenshots

The sizes and where each image goes are in the README ("Screenshots"). How it's
wired:

- `Screenshot` (`src/components/screenshot`) renders the main image with
  `next/image` and `fill`, `object-fit: cover` and `object-position: top left`,
  so the frame decides the shape: the Work panel's height on desktop, 2:1 on a
  case study, 4:3 on phones. Without `src` it draws the striped placeholder.
- The frame is a bleed: a dark well (`--bg`, so it reads on every Work panel
  shade) with the image wrapper (`.media`) inset from the top and left and
  running 16px past the right and bottom edges. Only its top-left corner shows,
  so only that corner is rounded. The Work panel's hover slides `.media` up
  and left by 10px; keep that under the 16px overshoot or the well shows.
  It takes `sizes`, so the browser downloads a file that fits the slot, and
  `preload` for the case study's image, which is the largest thing on screen.
- The `<ViewTransition name="shot-...">` wrappers in `projects` and
  `case-study` stay around `Screenshot`, so the morph still works with real
  images.
- The gallery is in `case-study`: desktop and phone shots go in two separate
  grids (two and four columns, one and two on phones). Their images use fixed
  `width`/`height` (1600 × 1000 and 780 × 1688), so a gallery image of another
  size would be stretched. Each links to its file, opening in a new tab.
- Gallery shots are matted, not bled: the whole screen has to show. The link
  is the mat (`--surface-3`, light enough to stand out from the dark
  screenshots) and its padding; the image's corner is `--corner` minus
  `--mat`, so the curves stay parallel. Change both variables together.

### Hidden limits

Some styles cover a fixed number of items. Going past them doesn't break the
build; it just looks wrong.

| What | Styled for | Where to extend |
| --- | --- | --- |
| Projects in the Work stack | 2 or 3 | `projects/styles.module.css` (see above) |
| Gallery image sizes | 1600 × 1000 desktop, 780 × 1688 phone | `width`/`height` in `case-study/index.tsx` |
| Words in your name (hero lines) | 4 | `.line:nth-child` in `hero/styles.module.css` |
| Letters per word with their own delay | 10 (the rest drop together) | `.char:nth-child` in the same file |
| Skill chips per group with their own delay | 7 | `.chip:nth-child` in `skills/styles.module.css` |
| Years of experience spelled as a word | 20 (then digits) | `NUMBER_WORDS` in `src/data/index.tsx` |

## 6. Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Dev server fails with `Cannot find module './NNN.js'` | `npm run build` ran while it was up and replaced `.next/` | Stop the dev server, run the build, start it again |
| A page-change animation doesn't play | View transitions are skipped in a background tab | Make sure the browser window is visible and in front |
| No scroll animations at all | Reduced motion is on, or the browser doesn't support scroll-driven animations yet | Expected: that's the static fallback. Test in Chrome with reduced motion off |
| Motion is smooth in the iOS Simulator but drops frames on an iPhone | The Simulator uses the Mac's GPU | Always judge motion on a real phone |
| A case study opens scrolled down | `data-scroll-behavior="smooth"` was removed from `<html>` | Put it back in `layout.tsx` |
| The nav highlight doesn't move to a new section | The `navLinks` href doesn't match the section id | The id is the `Section` title in lowercase |
| A style from `className` sometimes wins, sometimes not | The caller and the component set the same property | Set it on only one of them (see §4) |
| The years of experience are wrong | A `period` isn't in `Mon YYYY - ...` format | Fix the format in `experience` |
| Clicking an Experience row makes it jump up, off screen | The rows aren't inside `<Accordion>`, or its scroll correction was moved into `requestAnimationFrame` or the `toggle` event | Keep the rows inside `<Accordion>` and correct the scroll in the click handler itself (see §3) |
| Several Experience jobs stay open at once | The browser is older than Chrome 120, Safari 17.2 or Firefox 130, or the rows no longer share one `name` | Old browsers: expected. Otherwise give every `<details>` the same `name` |
| `/work/new-thing` is a 404 | The slug isn't in `projects` | Add it; every page is built from that list |

## 7. Workflow: branch, commit, PR, release

### Branches

[Conventional Branch](https://conventional-branch.github.io): a prefix plus a
short kebab-case description.

| Prefix | For |
| --- | --- |
| `feature/` | New things on the site |
| `bugfix/` | Fixes |
| `hotfix/` | Urgent fixes to production |
| `chore/` | Docs, dependencies, tooling |
| `release/` | Preparing a release |

Example: `feature/real-screenshots`. A few old branches use `feat/`; use
`feature/` for new ones. Never commit straight to `master`.

### Commits

[Conventional Commits](https://www.conventionalcommits.org):
`type(optional scope): description`, in the imperative, lowercase after the
colon.

| Type | For |
| --- | --- |
| `feat` | Something new or changed on the site |
| `fix` | A bug fix (scopes in use: `a11y`, `seo`) |
| `perf` | A performance change |
| `content` | Copy-only changes in `src/data` |
| `docs` | Documentation |
| `chore` | Tooling, dependencies, version bumps |

Examples from the history: `fix(a11y): raise the contrast of unlit about text`,
`perf: make page transitions and scroll animations cheap on mobile`.

**Every commit is approved first.** Claude shows you what will be staged and
the exact message, and commits only after your yes, once per commit. See
[CLAUDE.md](CLAUDE.md).

### Before you open a PR

```bash
npm run lint
```

```bash
npm run type-check
```

```bash
npm run build
```

Then serve the build (`npm run start`) and check:

- at **375px** and **1440px** wide;
- with **reduced motion** on and off (in Chrome DevTools: Rendering → Emulate
  CSS `prefers-reduced-motion`);
- for SEO or accessibility changes, a Lighthouse run on the home page and one
  case study.

Prettier is installed but has no config or script. Run `npx prettier --check`
on the files you changed if you want consistent formatting.

**If your change affects what a doc describes, update the doc in the same PR.**
README for content and usage, this file for how things work, CLAUDE.md for the
rules agents follow.

### Pull requests

Open the PR against `master`. Vercel posts a preview URL on it; check your
change there. Merging deploys to production.

### Releases

A release is a version bump in `package.json` (semver: patch for fixes, minor
for features, major for a redesign), committed on its own as
`chore: bump version to X.Y.Z` on `master` after the merge.
