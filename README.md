# Portfolio

The personal site of Mohammad Reza Ghasemi, Frontend Engineer. Live at
**[www.mrghasemi1992.ir](https://www.mrghasemi1992.ir)**.

It has a home page (hero, about, experience, work, skills, contact) and a
case-study page for each project. It's dark only, and its motion is driven by
scrolling. Every page is rendered on the server ahead of time, so readers and
search engines get finished HTML.

This file covers **using** the site: running it, changing what it says, and
deploying it. To change how it works, read [DEVELOPMENT.md](DEVELOPMENT.md).

## Quick start

You need Node 24 (pinned in `.nvmrc`; Next 16 needs at least 20.9).

```bash
nvm use
```

```bash
npm install
```

```bash
npm run dev
```

Open **[http://localhost:3002](http://localhost:3002)**. The port is 3002, not
the usual 3000. Edits to `src/` show up in the browser as you save.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 3002 |
| `npm run build` | Production build into `.next/` |
| `npm run start` | Serves the production build (port 3000 by default) |
| `npm run lint` | ESLint, with Next's Core Web Vitals and TypeScript rules |
| `npm run type-check` | TypeScript check (`tsc --noEmit`) |

There are no automated tests. `lint`, `type-check` and `build` are the checks,
and you look at the result in the browser.

> Stop the dev server before you run `npm run build`. Both write to `.next/`,
> and the dev server starts failing with `Cannot find module './NNN.js'`.

## Pages

| URL | What it is | Built from |
| --- | --- | --- |
| `/` | Home page | `src/app/page.tsx` |
| `/work/money` | Case study: Money, a Persian and English accounting app | `src/app/work/[slug]/page.tsx` |
| `/work/portfolio` | Case study: this site | same file |
| `/sitemap.xml` | Sitemap for search engines | `src/app/sitemap.ts` |
| `/robots.txt` | Crawler rules | `src/app/robots.ts` |

Any other `/work/...` URL is a 404. Each page also gets a social preview image
(what shows up when the link is shared), generated at build time.

## Changing the content

**Every word on the site lives in one file: [`src/data/index.tsx`](src/data/index.tsx).**
The components only lay that text out. For a copy change you edit this file,
save, and check the page.

| What you want to change | Where in `src/data/index.tsx` |
| --- | --- |
| Name, role, stack line, intro, About text, email | `profile` |
| Words drawn in the accent color in About | `profile.summaryHighlight` |
| Jobs and resume bullets | `experience` |
| Projects and their case studies | `projects` |
| Skill chips | `skillGroups` |
| The scrolling strip under the hero | `marqueeItems` |
| GitHub and LinkedIn links | `socials` |
| Links in the top nav | `navLinks`, `contactLink` |
| Your photo in the hero, and its description for screen readers | `profile.portrait` |
| The site's address | `SITE_URL` |

### Edit your intro or About text

Change `profile.intro` (under the name in the hero) or `profile.summary` (the
big About paragraph, also used as the site's meta description).

Don't type the years of experience. The `${yearsWord}` part is counted from the
start of your earliest job in `experience`, so "six" becomes "seven" on its
own. The site rebuilds once a day to pick that up.

### Add a job

Add an entry to the **top** of `experience`. The first job is treated as your
current one: it starts open, with its name in the accent color.

```ts
{
  company: "Acme",
  role: "Senior Frontend Engineer",
  period: "Jan 2027 - Present",
  bullets: ["What you did, as one sentence or two."],
},
```

Write `period` exactly like this: a three-letter English month, the year, then
` - ` with a space on each side. The years-of-experience count reads the start
date from it, and it can't read another format.

Each job is a row with the company name, role and dates. Clicking it opens
all its bullets, in two columns on desktop when there are more than three.
Only one job is open at a time.

### Add a project

Add an entry to `projects`. On the next build that creates the card in the Work
section, the page at `/work/<slug>`, its social image and its sitemap entry.

- `slug` is the URL, in lowercase with hyphens. It must be unique.
- The first item in `links` gets the filled button. Use the labels `"Code"` and
  `"Live site"` exactly, because the structured data for search engines looks
  for them.
- `status: "In progress"` adds the badge. Leave it out when the project is
  done.
- `image` is the main screenshot and `screenshot` its alt text (see
  "Screenshots" below). Without `image`, a striped placeholder shows the
  `screenshot` text.
- `facts` are the short label/value pairs under the links (role, year,
  platform...). `features` are groups of bullets, each with a heading; they
  make the Features section. `gallery` is the Screens section (optional).
- `hidden: true` takes the project off the site (its card, page and sitemap
  entry) without deleting its text. Orange is hidden this way for now; delete
  the `hidden` line to bring it back.

**The Work section is styled for two or three projects.** A fourth needs one
more CSS rule, or it lands at the wrong height and the stacking animation goes
wrong. See "Add a fourth project" in [DEVELOPMENT.md](DEVELOPMENT.md#add-a-fourth-project).

### Add or remove a skill

Edit `skillGroups`. Every chip there is also listed for search engines as
something you know (`knowsAbout` in the structured data). `marqueeItems` is
only decoration and can differ.

### Change your photo

Replace `src/assets/profile/portrait.png` with a new photo and keep the name.
It needs a transparent background (on a Mac, open the photo in Preview or
Photos and use "Remove Background", or drag the subject out of the photo), a
roughly square crop tight around your head and shoulders, and at least 1000
pixels across. It's shown in color, standing in the lime tile with your head
above its top edge, so leave a little room above your head and none below the
crop's bottom edge.

### Screenshots

Images live in `src/assets/work/<slug>/` and are imported at the top of
`src/data/index.tsx` (`import moneyReports from "@/assets/work/money/reports.png"`),
then used by that name in the project. To change one, replace the file with
another of the same size and keep the name; to add one, put the file there, add
an import line, and use its name in the project.

Importing them, instead of linking to a file in `public/`, is what makes them
load fast: each build gives every image a new URL when its file changes, so
browsers can keep it for a year without asking again, and each one shows a
blurred preview while the sharp version loads.

| Image | Size | Where it goes in `projects` |
| --- | --- | --- |
| Main screenshot | 1600 × 1200 (4:3) | `image`, with `screenshot` as its alt text |
| Gallery, desktop | 1600 × 1000 (16:10) | `gallery`: `{ src, alt, caption }`, `src` being the imported name |
| Gallery, phone | 780 × 1688 (a 390 × 844 screen at 2×) | `gallery`: `{ src, alt, caption, phone: true }` |

The main screenshot is cropped from the top: to 2:1 on a case study on
desktop, and to the panel's shape in the Work section, so keep what matters in
its top half. In the gallery, desktop shots come two to a row and phone shots
four to a row, so an even number of each looks best. Each image opens full size
when clicked.

Money's screenshots are taken from its Storybook (sample data, English, dark
theme), and the portfolio's from a production build of this site, with reduced
motion on so every section looks finished.

### Files in `public/`

Anything in `public/` is served as-is from the site root.
`public/resume-final-2026.09.17-17.23.pdf` is online at
`/resume-final-2026.09.17-17.23.pdf`, but nothing on the site links to it.

## Deploying

The site is hosted on **Vercel**, connected to the GitHub repo
`mrghasemi1992/portfolio`.

- **Push to `master`** → a production deploy at www.mrghasemi1992.ir.
- **Open a pull request** → a preview deploy with its own URL, posted on the PR.
  Check it there before you merge.
- **Every day** → Vercel rebuilds the pages in the background (no deploy
  needed). This keeps the years of experience current.

**To roll back**, open the project in the Vercel dashboard, go to
**Deployments**, find the last good one and choose **Instant Rollback**. Then
fix the problem on a branch.

The bare domain `mrghasemi1992.ir` redirects to `www.`, so `www` is the main
address everywhere in the code (`SITE_URL`).

Vercel Analytics and Speed Insights are on. Their numbers are in the Vercel
dashboard, not on the site.

## Stack

- **Next.js 16** (App Router) and **React 19**, in TypeScript
- **CSS modules**: one stylesheet per component, with colors as CSS variables
- **CSS scroll-driven animations** for scroll motion, with no animation library
- **React `<ViewTransition>`** for page changes
- **next/font** for the Barlow Condensed and Barlow fonts
- **next/og** for the social preview images
- **Vercel** for hosting, Analytics and Speed Insights

## More docs

- [**DEVELOPMENT.md**](DEVELOPMENT.md): how the code works, how to change it
  safely, the rules, and the git workflow.
- [**CLAUDE.md**](CLAUDE.md): the short version, for AI coding agents.
