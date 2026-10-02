export const SITE_URL = "https://mrghasemi1992.ir";

export const profile = {
  name: "Mohammad Reza Ghasemi",
  role: "Frontend Engineer",
  stack: "React / Next.js",
  intro:
    "Six years building production React and Next.js apps in fintech, insurance and e-commerce.",
  summary:
    "Frontend engineer with over six years of experience building production React and Next.js apps in fintech, insurance, and e-commerce. I have worked on step-by-step migrations of live applications, and I build internal tools that make daily work easier for the team.",
  // Words of the summary drawn in the accent color.
  summaryHighlight: ["internal", "tools"],
  email: "mrghasemi1992@gmail.com",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/mrghasemi1992" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mrghasemi1992/" },
];

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
];

export const contactLink = { label: "Contact", href: "/#contact" };

export type Job = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export const experience: Job[] = [
  {
    company: "SnappPay",
    role: "Frontend Engineer",
    period: "Nov 2024 - Present",
    bullets: [
      "Led the migration of the Vehicle Insurance app to React Query for server-state management: replaced custom fetch and global-store logic with declarative queries and mutations, cut redundant API calls through caching and request deduplication, standardized loading, error and retry handling, and kept data fresh with background refetching and cache invalidation after mutations.",
      "Built Pado, a plugin-based internal dev-tools package used by the team's engineers and QA. Plugins include an in-app debug console (Eruda), a JWT token fetcher, and a form filler that completes forms in one click. The token fetcher also ships as a standalone CLI, Tokenizer.",
      "Built vpnctl, a macOS and Windows CLI (bash and PowerShell) that switches between the Fortinet SSL VPN and OpenVPN with one command. It generates 2FA codes on the device with a TOTP (RFC 6238) implementation written from scratch, and keeps credentials out of plain text.",
      "Improved frontend error reporting in Sentry: source maps for readable stack traces, noise filtering, release tagging, and better grouping and alerts. Added a shared helper for firing custom Sentry events.",
      "Built the testing foundation for one of our apps: unit and integration tests with Vitest and React Testing Library, API mocking with MSW, and coverage reporting.",
      "Contributed to the incremental migration of the Vehicle Insurance app from JavaScript to TypeScript, catching type mistakes at build time instead of in production and making the code easier to maintain.",
      "Contributed to the migration of the old Vehicle Insurance app to the new one, moving existing features and screens into the new codebase.",
      "Built a reusable A/B testing component that standardized how experiments are implemented across the app.",
      "Made AI part of my daily development workflow, using Claude with skills and MCP tools for following our code conventions, handling repeated development tasks, and finding answers in the codebase.",
    ],
  },
  {
    company: "SADAD",
    role: "Frontend Developer",
    period: "Feb 2024 - Nov 2024",
    bullets: [
      "Developed and maintained web applications with Angular.",
      "Replaced the team's date picker, which was incompatible with the newer Angular version, with one built from scratch - removing a blocker to the framework upgrade.",
      "Built a permission-driven sidebar navigation with unlimited nesting, rendering menu depth dynamically from user permissions returned by the API.",
    ],
  },
  {
    company: "TashilCar",
    role: "Frontend Developer",
    period: "Dec 2022 - Nov 2023",
    bullets: [
      "Built production features with React, Next.js, TypeScript and styled-components, using React Query for API state management and caching.",
      "Built an internal icon package with a Figma-to-React pipeline that imports icons from a Figma file and exports them as React components, keeping design and code icon sets in sync.",
    ],
  },
  {
    company: "Fanap Plus",
    role: "Frontend Developer",
    period: "Jan 2021 - Dec 2022",
    bullets: [
      "The company's app was an educational platform for children and teenagers. Built its frontend from scratch with React, Next.js, TypeScript and Tailwind CSS.",
    ],
  },
  {
    company: "Arsh",
    role: "Frontend Developer",
    period: "Nov 2019 - Dec 2020",
    bullets: [
      "Built admin panels, e-commerce and map-based web apps with React, Redux, Redux Saga, Formik and styled-components, and maintained the company's website on WordPress.",
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  status?: "In progress";
  /** One or two sentences for the card on the home page. */
  summary: string;
  /** Short tech list for the card. */
  tags: string[];
  /** Text for the screenshot slot until a real image is added. */
  screenshot: string;
  links: { label: string; href: string }[];
  /** Opening paragraph of the case study. */
  intro: string;
  scope: string[];
  decisions: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "orange",
    name: "Orange",
    status: "In progress",
    summary:
      "A modern, read-only Hacker News reader with its own design system, documented in Storybook.",
    tags: ["Next.js", "TanStack Query", "Zod", "Base UI"],
    screenshot: "Orange screenshot, 1600 x 1200",
    links: [
      { label: "Live site", href: "https://orange-hn.vercel.app" },
      { label: "Storybook", href: "https://orange-storybook.vercel.app" },
      { label: "Code", href: "https://github.com/mrghasemi1992/orange" },
    ],
    intro:
      "A modern, read-only Hacker News reader. Built to show clean architecture, a custom design system and good UX.",
    scope: [
      "Story lists: Top, New, Best, Ask, Show and Jobs",
      "Story page with the full comment tree, including polls",
      "User profiles and search",
      "Saved stories and read tracking, stored in the browser only",
      "Keyboard shortcuts, for example j/k navigation",
      "PWA and offline support",
    ],
    decisions: [
      "Every API request runs on the Next.js server, so the browser never calls Firebase or Algolia directly and first loads stay fast.",
      "Every response is parsed with Zod. One bad item never crashes a page.",
      "Light and dark themes as tokens, set before the first paint, so the wrong theme never flashes.",
      "Long comment threads are virtualized with TanStack Virtual.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "Zod",
      "Base UI",
      "CSS Modules",
      "TanStack Virtual",
      "Storybook",
    ],
  },
  {
    slug: "money",
    name: "Money",
    status: "In progress",
    summary:
      "A Persian, right-to-left personal accounting app. Record transactions by hand, or by talking to Claude through the app's MCP connector.",
    tags: ["Next.js", "Postgres", "Drizzle", "Better Auth", "MCP"],
    screenshot: "Money screenshot, 1600 x 1200",
    links: [{ label: "Code", href: "https://github.com/mrghasemi1992/money" }],
    intro:
      "A personal accounting app with a Persian, right-to-left interface. Users record income, expenses and transfers by hand, or by talking to Claude, which saves them through the app's MCP connector.",
    scope: [
      "Sign in with username and password, by invite only",
      "Accounts with a starting balance and a live current balance",
      "Income, expense and transfer transactions with categories, tags and notes",
      "A Claude connector (MCP) with OAuth sign-in, so Claude can add, find, edit and delete the user's transactions",
      "Monthly budgets per category, repeating every Jalali month",
      "Reports, a dashboard, and CSV import and export",
    ],
    decisions: [
      "Next.js over Vite, because the MCP endpoint, the OAuth server, sign-in and database access all live in one project as Route Handlers and Server Actions, with no separate backend.",
      "Dates are stored as Gregorian and converted to the Jalali calendar only at the edges: in the UI and at the MCP boundary.",
      "Every row belongs to a user, and the user id always comes from the session or the OAuth token, never from client input.",
      "Zod validates every form, Server Action input, MCP tool input and CSV row.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Postgres",
      "Drizzle ORM",
      "Better Auth",
      "MCP",
      "Zod",
      "Base UI",
      "CSS Modules",
      "Storybook",
    ],
  },
  {
    slug: "portfolio",
    name: "This portfolio",
    summary: "The site you are reading. Server-rendered with Next.js.",
    tags: ["Next.js", "React", "CSS Modules"],
    screenshot: "Portfolio screenshot, 1600 x 1200",
    links: [{ label: "Code", href: "https://github.com/mrghasemi1992/portfolio" }],
    intro:
      "The site you are reading. It is server-rendered with Next.js, so every page arrives as finished HTML for readers and search engines.",
    scope: [
      "A home page with About, Experience, Work, Skills and Contact",
      "A case-study page for each project, built ahead of time",
      "Layouts for desktop and mobile",
    ],
    decisions: [
      "Server Components by default. Only the mobile menu and the experience dialog ship client-side JavaScript.",
      "Scroll motion runs on CSS scroll-driven animations, with no animation library.",
      "Page changes use React's ViewTransition to carry a project's screenshot and title into its case study.",
      "Every animation turns off when the system's reduced-motion setting is on.",
      "Each page has its own title, description and social preview image, plus a sitemap and structured data.",
    ],
    stack: ["Next.js", "React", "TypeScript", "CSS Modules", "View Transitions"],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const skillGroups = [
  {
    title: "Languages & Frameworks",
    items: ["JavaScript", "TypeScript", "HTML", "CSS", "React", "Next.js"],
  },
  {
    title: "Data & State",
    items: ["React Query", "Redux", "Redux Toolkit", "Zod"],
  },
  {
    title: "Styling & UI",
    items: [
      "Tailwind CSS",
      "SASS",
      "MUI",
      "Ant Design",
      "shadcn/ui",
      "Bootstrap",
      "Framer Motion",
      "Storybook",
    ],
  },
  {
    title: "Testing",
    items: ["Vitest", "React Testing Library", "MSW (Mock Service Worker)"],
  },
  {
    title: "Tools",
    items: ["Vite", "Git", "GitLab", "GitHub"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express"],
  },
];

/** The scrolling strip under the hero. */
export const marqueeItems = [
  "React",
  "Next.js",
  "TypeScript",
  "React Query",
  "Vitest",
  "MSW",
  "Storybook",
  "Framer Motion",
];
