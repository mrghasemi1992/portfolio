# Developer guide

Everything here is about *why* the code looks the way it does, and what to
check before changing it. For setup and scripts, see [README.md](README.md).

## How the site is put together

### One component, on purpose

`src/app/page.tsx` is a single client component holding every section — nav,
hero, about, experience, projects, skills, contact. It's around 900 lines and
there is no `components/` directory.

That's a deliberate trade for a site this size: one file to read, one place to
change, no prop-drilling for the theme. If you start extracting components,
extract all of them — a half-split codebase is worse than either end state.

The component is a client component because of the theme toggle. Everything
else on the page is static.

### Styling: inline, with CSS variables

The page styles almost entirely through inline `style` objects, not Tailwind
utility classes. Tailwind is installed for its base layer and config, but you
won't find `class="flex gap-4"` in the markup.

The exceptions live in `globals.css`, which holds nine real CSS classes —
`.site-nav`, `.nav-link`, `.ul-link`, `.btn-primary`, `.btn-secondary`,
`.project-card`, `.theme-btn`, `.experience-grid`, `.nav-center`. They exist
because inline styles can't express `:hover`, `::after` or media queries.

**Rule of thumb:** static styling goes inline; anything needing a pseudo-class,
pseudo-element or breakpoint goes in `globals.css` as a class.

### Theming

Colors are CSS custom properties, never hex values in the markup:

- `:root` defines the dark palette — `--bg`, `--bg-elev`, `--border`, `--text`,
  `--text-dim`, `--text-faint`, `--accent`, `--dot-grid`, `--shadow`.
- `[data-theme="light"]` redefines the same names for light mode.
- `[data-accent="lime" | "amber" | "violet"]` overrides `--accent` alone, with
  separate values under `[data-theme="light"]` so contrast holds in both modes.

`page.tsx` keeps the theme in React state and writes it to
`document.documentElement.dataset.theme` in an effect; the wrapper div also
carries `data-theme` and `data-accent`.

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
exposes them as `--font-manrope` and `--font-mono`. `page.tsx` reads them
through two local constants, `sans` and `mono`, used in the inline styles.

## Performance decisions to leave alone

These are already tuned and commented in `globals.css`. Each one exists because
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
npx tsc --noEmit
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
