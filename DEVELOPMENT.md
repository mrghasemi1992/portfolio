# Developer guide

Everything here is about *why* the code looks the way it does, and what to
check before changing it. For setup and scripts, see [README.md](README.md).

## How the site is put together

### One component per section

Every section lives in its own folder under `src/components/`, as an
`index.tsx` next to a `styles.module.css`:

- `nav`, `hero`, `about`, `experience`, `projects`, `skills`, `contact`,
  `footer` — one per section of the page.
- `section` — the shared `<section>` wrapper: it sets the `id` anchor, the top
  border and padding, and the `01 / About` label. Pass `spacious` for the
  larger padding the contact section uses.
- `social-links` — the GitHub/LinkedIn row, used by both hero and contact.
- `underline-link` — an `<a>` with the accent underline that slides in on
  hover.

`src/app/page.tsx` only composes them. It's a client component because it holds
the theme in state and passes it to `Nav`; everything else on the page is
static.

### Styling: CSS modules, with CSS variables

Each component styles itself through its own CSS module. There are no inline
`style` objects and no utility-class framework.

`src/app/globals.css` holds only what can't be scoped to a component: a small
reset, the theme variables, the `--sans` and `--mono` font stacks, text
selection, the scrollbar, and smooth scrolling.

**Rule of thumb:** if a style belongs to one component, it goes in that
component's module. Shared components take a `className` for layout tweaks such
as margins, but a caller's class should never set a property the component's
own class sets too. Both classes have the same specificity, and the winner
would depend on the order the CSS chunks load in. `UnderlineLink` takes its
color from its parent for this reason.

### Theming

Colors are CSS custom properties, never hex values in the markup:

- `:root` defines the dark palette — `--bg`, `--bg-elev`, `--border`, `--text`,
  `--text-dim`, `--text-faint`, `--accent`, `--dot-grid`, `--shadow`.
- `[data-theme="light"]` redefines the same names for light mode.
- `[data-accent="lime" | "amber" | "violet"]` overrides `--accent` alone, with
  separate values under `[data-theme="light"]` so contrast holds in both modes.

`page.tsx` keeps the theme in React state and writes it to
`document.documentElement.dataset.theme` in an effect; the wrapper div also
carries `data-theme` and `data-accent`. `Nav` receives the theme and a toggle
callback as props.

Adding a color means adding it to **both** the `:root` and the
`[data-theme="light"]` block. A variable defined in only one of them will look
fine while you work and break the moment someone toggles the theme.

Adding an accent means a `[data-accent="name"]` rule *and* a
`[data-theme="light"][data-accent="name"]` rule — light mode needs a darker
shade of the same hue to stay readable.

### Content

`src/data/index.tsx` holds everything editable: `navLinks`, `socials`,
`experience`, `projects`, `skillGroups`, and the `SHOW_PROJECTS` flag that
currently keeps the projects section off the page. Flip it to `true` to bring
the section back.

Section numbers (`01`, `02`, …) aren't hardcoded. `navLinks` derives them from
array order, and `sectionNum(label)` looks them up, with Contact always taking
the last number. Reordering or adding a nav entry renumbers every heading
automatically — which also means renaming a label without updating the section
it points at silently breaks the numbering.

### The logo and the OG image

`src/data/logo.ts` exports `LOGO_PATH` and `LOGO_VIEWBOX`. Both the nav SVG and
`src/app/opengraph-image.tsx` import them, so the social preview can't drift
away from the mark on the page. The OG image is generated at build time by
`next/og`'s `ImageResponse` — change the logo and the preview updates on the
next deploy.

### Fonts

`layout.tsx` loads Manrope and JetBrains Mono through `next/font/google` and
exposes them as `--font-manrope` and `--font-mono` on `<body>`. `globals.css`
builds the full stacks from them as `--sans` and `--mono`, also on `body`,
because a custom property referencing the next/font variables has to be
declared where they exist. CSS modules use `font-family: var(--mono)`.

## Performance decisions to leave alone

These are already tuned and commented, in `globals.css` (dot grid) and
`src/components/nav/styles.module.css` (backdrop blur). Each one exists because
the obvious approach was measurably worse:

- **The dot grid is an inline SVG data URI**, not a repeated `radial-gradient`.
  The gradient version repaints slowly in WebKit.
- **`backdrop-filter` on the nav is disabled below 720px and on touch devices**
  (`(hover: none)`), where the blur costs more than it's worth. Those devices
  get a near-opaque nav instead.
- **Scroll reveal animations were removed** (commit `33e2409`) because they made
  mobile scrolling stutter. Re-adding scroll-driven motion means re-testing on a
  real phone, not just a resized desktop window.
- **`scroll-behavior: smooth`** is set globally for anchor links and turned off
  under `prefers-reduced-motion`.

## Gotchas

- **Don't run `npm run build` while the dev server is running.** The build
  overwrites `.next` underneath it and the dev server starts failing with
  `Cannot find module './NNN.js'`. Stop it first, or restart it afterwards.
- **The dev server is on port 3002**, set in both `package.json` and
  `.claude/launch.json`. Changing one without the other is confusing later.
- **`metadataBase` in `layout.tsx` is the production URL.** Relative OG URLs
  resolve against it, so it stays pointed at the live domain even in local runs.

## Before you open a PR

```bash
npm run lint
npm run type-check
npm run build
```

Then check the page in a browser at a phone width and a desktop width, in
**both** themes — the light palette is easy to break without noticing.

## Git conventions

**Branches** follow [Conventional Branch](https://conventional-branch.github.io):
a `feature/`, `bugfix/`, `hotfix/`, `release/` or `chore/` prefix plus a short
kebab-case description, e.g. `feature/redesign-v3`. Some older branches in the
history use `feat/`; prefer `feature/` for new work.

**Commits** follow [Conventional Commits](https://www.conventionalcommits.org):
`type(optional scope): description`, imperative and lowercase after the colon.
Types used in this repo: `chore`, `feat`, `perf`, `fix`, and `content` for
copy-only changes.

**Releases** are a version bump in `package.json` committed as
`chore: bump version to X.Y.Z`.

**Every commit is reviewed before it's made** — see `CLAUDE.md` for how that
applies to Claude Code sessions.
