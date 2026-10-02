# How I built v3 of this site with Claude

This is the story of version 3 of my portfolio, from the first brief to the
mobile performance fixes. I worked with Claude (Claude Code in the Claude
desktop app) the whole way: it researched the design, made the design
options, wrote the code, tested it, and opened the pull request. I made the
decisions.

Below is every step in order, with the prompts I used, the skills and tools
Claude used, and what came out of each step.

## Contents

1. [Ground rules](#1-ground-rules)
2. [Earlier rounds](#2-earlier-rounds)
3. [The brief](#3-the-brief)
4. [Questions before guesses](#4-questions-before-guesses)
5. [Design research with skills](#5-design-research-with-skills)
6. [Three directions on a canvas](#6-three-directions-on-a-canvas)
7. [Choosing and refining](#7-choosing-and-refining)
8. [Implementation](#8-implementation)
9. [The pull request](#9-the-pull-request)
10. [SSR and SEO](#10-ssr-and-seo)
11. [Fixes from my own review](#11-fixes-from-my-own-review)
12. [A photo for the hero](#12-a-photo-for-the-hero)
13. [Mobile performance](#13-mobile-performance)
14. [Docs](#14-docs)
15. [Making the swipe obvious](#15-making-the-swipe-obvious)
16. [Skills and tools used](#16-skills-and-tools-used)
17. [What I learned](#17-what-i-learned)

## 1. Ground rules

Two rules shaped the whole project.

**In my prompt:** "If anything in my request is unclear, ask me about it. Do
not fill the gap with your own guess."

**In [`CLAUDE.md`](../CLAUDE.md):** every commit needs my approval first.
Claude shows me what it will stage and the exact commit message, then waits.
One approval covers one commit only.

Between them, nothing on the site was invented without my say, and nothing was
committed without my review.

## 2. Earlier rounds

v3 did not start on day one. In earlier sessions (late September 2026) Claude
and I explored several concepts that didn't make it:

- Three hero prototypes built on tool metaphors: a design-tool canvas, a live
  performance recorder and a WebGL pixel zoom. I rejected all of them. I don't
  want frame rates and paint timings on my portfolio; the site should feel
  crafted, not instrumented.
- Concepts built on my university degrees. Also rejected: this is a frontend
  engineer's site.
- Five full-page wireframes (Playground, Liquid, Morph, Kinetic, Swarm). I
  picked **Morph**, then put it on hold.

Claude kept these decisions in its memory between sessions, so it remembered
the hold when I came back.

## 3. The brief

On 2 October 2026 I started over with this prompt, my resume attached as a
PDF:

> I want you to create a new portfolio website for me. I have attached my
> resume. I also have three projects to include in my portfolio: Money,
> Orange, and this portfolio.
> I have added many design skills, like UI/UX Pro Max. Use them.
> If anything in my request is unclear, ask me about it. Do not fill the gap
> with your own guess.

Before replying, Claude:
- read the resume, extracting its text through macOS PDFKit;
- read its memory of the earlier rounds;
- looked through the local `money` and `orange` repositories, their READMEs
  and `CLAUDE.md` files, to learn what the projects are.

## 4. Questions before guesses

Instead of starting, Claude came back with nine questions:

1. Build the on-hold Morph concept, or start a new direction?
2. Replace v2 in this repo, or start a new one?
3. How should Money appear?
4. Are Orange's links right, and what about its image?
5. What should the portfolio's own project entry say?
6. Should each project get its own page?
7. Resume titles, full bullets, education, phone number?
8. Should the hero be my name or a tagline?
9. Dark, light or both?

My answers:

> 1. b
> 2. on feature/redesign-v3 then merge with master/main to replace v2
> 3. In progress, check CLAUDE.md in branch feature/phase-0-design-system and
>    you will get all info about this project
> 4. just pass a placeholder for screenshot, i will pass it later
> 5. yes
> 6. own page
> 7. follow resume
> 8. my name and a tagline
> 9. dark
>
> use my logo in v2. i like it
> consider this website should be ssr with good seo. because of that i chose
> next.js.

## 5. Design research with skills

Claude used three design skills:

- **UI/UX Pro Max.** Its `--design-system` search produced a starting palette,
  type pairing and style. Then focused searches across the `landing`,
  `product`, `style`, `typography` and `color` domains. The key finding: for a
  personal portfolio it recommends a motion-driven layout in a minimal Swiss
  style, laid out as a story.
- **design-taste-frontend.** An "anti-slop" rule set. It made Claude:
  - state a one-line design read before designing;
  - set three dials (layout variance, motion and density);
  - avoid the usual AI tells: purple gradients, three identical cards, small
    labels above every heading, long dashes in the copy, fake screenshots
    built from boxes.
- **Claude Design.** A canvas artifact type for laying designs out as
  artboards. Every design option in this project lived on one shared canvas.

## 6. Three directions on a canvas

Claude built three complete dark home pages, using my real resume content, the
v2 logo and the three projects:

- **A. Grid:** a strict Swiss grid with a red accent.
- **B. Kinetic:** huge expressive type, an acid-yellow accent and the most
  motion.
- **C. Bento:** tiles, a cobalt glow, and an experience section you can click
  through.

With them came a short list of open questions: the tagline, education and
phone, the copy it had drafted, and the project links.

## 7. Choosing and refining

The prompts, in order:

> I like B, but use the work and skills layout of C. Work on its mobile view.
> add animation and transition too

Claude merged the two:
- a 390px mobile artboard with a full-screen menu and a swipeable experience
  row;
- letter-by-letter name animation;
- About text that lights up as you scroll;
- a pinned sideways experience row;
- a dialog with every resume bullet;
- the Orange card expanding into a case study.

> Use Work section of B layout

The Work section went back to B's stacked panels: each one pins, and the next
slides over it.

> i don't like the fonts

Rather than guess a replacement, Claude put six font pairings on one board,
with the same colors and only the type changing. Options 1, 4 and 6 came from
UI/UX Pro Max's font search; Claude added 2, 3 and 5 for a wider range.

> number 4

That was **Barlow Condensed** for uppercase headings with **Barlow** for text.

## 8. Implementation

> implement it

Four answers were still open, so Claude asked them in one form:
- Copy: keep the design's wording.
- Education and phone: neither.
- Money: link to its GitHub repo.
- Orange's links: correct.

Then it built the site on `feature/redesign-v3`:

- **Routes and SEO.** Next.js 16 App Router; `/work/[slug]` case studies
  prerendered with `generateStaticParams`; per-page metadata and OG images;
  JSON-LD; sitemap and robots.
- **Components.** One folder per component with a CSS module, following the
  rules in [`CLAUDE.md`](../CLAUDE.md): no inline styles, color tokens only.
- **Motion.** CSS scroll-driven animations for scroll motion, with no
  animation library. React `<ViewTransition>` for page changes and the
  screenshot and title morph.
- **Accessibility.** Native `<dialog>` for the menu and the experience sheet, a
  skip link, and reduced-motion support throughout.

The safety check blocked deleting the v2 files, so Claude rewrote each existing
component folder in place. Every v2 folder got a v3 job and nothing was left
over.

It checked its own work in the app's built-in browser:
- at 1440px and 375px wide;
- the pinned row, the dialogs and the mobile menu;
- `npm run lint`, `type-check` and `build`.

It caught and fixed two bugs along the way. One dialog inherited a card's dark
text color, and one button was being squashed.

## 9. The pull request

Claude proposed two commits, a feature commit and a docs commit, and waited.
When I clicked "Create PR", the safety check blocked the commit, because
`CLAUDE.md` asks for explicit per-commit approval. Claude stopped and asked.

> do two commits and open the pr then work on ssr and seo

That opened
[PR #14](https://github.com/mrghasemi1992/portfolio/pull/14). Every commit
after it went through the same show, approve, commit, push loop.

## 10. SSR and SEO

> Is the app SSR? Did you work on its SEO?

Yes: every page is prerendered as static HTML. Claude then:

- Started the production build in a second preview server and ran
  **Lighthouse through the Chrome DevTools MCP** on the home page and a case
  study. Both scored **SEO 100** and **Accessibility 100**. The only
  Best Practices finding was Vercel Analytics returning 404 locally.
- **Checked the live domain** and found that `mrghasemi1992.ir` redirects to
  `www.` (308). The canonical URLs it had set pointed at the address that
  redirects, so it moved them, the sitemap and OG URLs to `www`.
- Added `WebSite` and `BreadcrumbList` structured data.
- Raised the contrast of the dimmed About text: Lighthouse flagged it at
  1.76:1, and it's now 3.5:1.
- Ran a **performance trace**: LCP of 363ms and CLS of 0 on a throttled phone
  profile.

## 11. Fixes from my own review

I tested the site myself and reported what I saw:

> the above section in the artifact was low opacity and by scrolling line by
> line the opacity set to 100% but the current code set opacity to 100% for
> whole paragraph

Claude measured each word's animation in the browser and found the cause: an
inline `<span>` takes its scroll timeline from the whole paragraph. Making each
word an `inline-block` fixed it, and it confirmed line-by-line progress.

> in work section when i click on a project a new page will open but scrolled
> to the end of the page!

Claude logged every scroll call during a navigation and read Next.js's own
scroll code. The global smooth scrolling was turning Next's jump to the top
into a slow scroll. Adding `data-scroll-behavior="smooth"` to `<html>` lets
Next turn it off during page changes.

> i want the header show me the active section. is it clear?

Claude asked three questions (style, edge cases, scope), then built:
- an `IntersectionObserver` to track the active section;
- a grey highlight that slides between nav items, using CSS anchor
  positioning;
- the current section highlighted in the mobile menu;
- Work kept active on case-study pages.

## 12. A photo for the hero

> what about adding my photo instead of the logo with yellow back.?

I gave Claude three portraits. It reviewed them:
- It recommended the studio shot.
- It skipped one because of a watermark baked into the corner.
- It explained it wouldn't merge photos into a new face.

It removed the background **on my Mac**, using Apple's Vision subject cut-out
from a small Swift script, so the photos never left my computer. It put three
options on the canvas at their real size.

I preferred the color photo with B's crop and the yellow background, and asked
for a ChatGPT prompt to make it. Claude wrote one, and warned that image
generators tend to redraw faces slightly. The final photo is still to come.

## 13. Mobile performance

> why in mobile (iphone 13), the animation of work section (im in work page)
> are not smooth? or when i press back button of work page and navigate to
> home i see animations are not smooth... check it with ios simulator

Claude booted an **iPhone 13 Simulator** and ran the site there. Because the
Simulator renders with the Mac's GPU and can't show real frame drops, it also
measured frame times in Chrome at phone size with the CPU slowed 6x.

The cause was the page transition photographing the entire 7,800px home page,
plus a blur filter in the morph. The fix:
- slide only the one-screen root snapshot instead;
- drop the blur;
- keep scroll animations to `transform` and `opacity`.

The worst frame went from 350ms to 50ms.

## 14. Docs

> Update docs: CLAUDE.md, README.md, DEVELOPMENT.md. Describe how I created
> this website with Claude, step by step: skills, prompts, and so on, in an MD
> file. I mean the v3. Mention the link in README.md too

Claude rewrote `README.md` and `DEVELOPMENT.md` for v3. It added a Docs section
to `CLAUDE.md`, with a rule to keep the docs current in the same PR, and wrote
this file.

## 15. Making the swipe obvious

> in mobile view: the experience section: Use your creativity so the user
> realizes they need to scroll horizontally here. is it clear?

This time I left the design to Claude. It combined three cues, all in CSS:

- **A bigger peek.** The cards got narrower, so about 48px of the next card
  shows at the right edge.
- **A nudge.** As the row scrolls into view, it slides about 56px left and
  springs back, once.
- **A slider.** A small track under the cards, with a yellow thumb that
  follows the swipe through a named `scroll-timeline`.

Browsers without scroll-driven animations still get the peek.

When I asked "did you update all docs?", Claude admitted it had missed this
file and added this step.

## 16. Skills and tools used

| Skill or tool | What it did |
| --- | --- |
| UI/UX Pro Max | Design-system search: style, palette and font pairings |
| design-taste-frontend | Anti-cliché rules, layout and motion dials, a final checklist |
| Claude Design (artifact canvas) | All design options, side by side, shareable |
| Artifact assets | Hosted the photo previews on the canvas |
| Built-in browser (Claude desktop app) | Previews, interaction tests, layout checks |
| Chrome DevTools MCP | Lighthouse audits, performance traces, frame timing |
| iOS Simulator | Ran the site on an iPhone 13 |
| macOS PDFKit, Apple Vision (Swift) | Read the resume; cut the photos out on-device |
| `gh` CLI and the PR panel | Opened PR #14 and showed its CI status |
| Memory | Carried my preferences and decisions between sessions |

## 17. What I learned

- **"Ask, don't guess" pays off.** Every round of questions cost a minute and
  saved a redesign. Claude showed options, like the six fonts and three
  photos, instead of picking for me.
- **Show, then decide.** Seeing designs as real pages on a canvas made it easy
  to mix and match: "B, but with C's skills".
- **Test on the real thing.** The worst bugs, the dimmed paragraph and the
  scroll position and mobile jank, only showed up when I used the site myself.
  Each one took one short message to report.
- **Rules in `CLAUDE.md` hold.** The commit-approval rule held even when a
  button tried to skip it.
