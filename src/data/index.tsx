import type { StaticImageData } from "next/image";

// The hero portrait: a cut-out PNG with a transparent background, 1100 x 1060.
import portrait from "@/assets/profile/portrait.png";

// Screenshots. Importing them (rather than linking to public/) gives each a
// fingerprinted URL that browsers can cache for a year, its size, and a blur preview.
import moneyBreakdown from "@/assets/work/money/breakdown.png";
import moneyBudgets from "@/assets/work/money/budgets.png";
import moneyConnector from "@/assets/work/money/connector.png";
import moneyDashboard from "@/assets/work/money/dashboard.png";
import moneyImport from "@/assets/work/money/import.png";
import moneyPhoneConsent from "@/assets/work/money/phone-consent.png";
import moneyPhoneDashboard from "@/assets/work/money/phone-dashboard.png";
import moneyPhoneForm from "@/assets/work/money/phone-form.png";
import moneyPhoneReports from "@/assets/work/money/phone-reports.png";
import moneyReports from "@/assets/work/money/reports.png";
import moneyTransactions from "@/assets/work/money/transactions.png";
import portfolioCaseStudy from "@/assets/work/portfolio/case-study.png";
import portfolioExperience from "@/assets/work/portfolio/experience.png";
import portfolioHome from "@/assets/work/portfolio/home.png";
import portfolioPhoneCaseStudy from "@/assets/work/portfolio/phone-case-study.png";
import portfolioPhoneExperience from "@/assets/work/portfolio/phone-experience.png";
import portfolioPhoneHome from "@/assets/work/portfolio/phone-home.png";
import portfolioPhoneMenu from "@/assets/work/portfolio/phone-menu.png";
import portfolioSkills from "@/assets/work/portfolio/skills.png";
import portfolioWork from "@/assets/work/portfolio/work.png";

// The www host is the primary one: the bare domain redirects to it (308).
export const SITE_URL = "https://www.mrghasemi1992.ir";

// Temporarily hides the photo tile in the hero, until there's a sharper photo
// for `profile.portrait`. Flip to true to show it.
export const SHOW_HERO_PHOTO = false;

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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];

/** The first month of a period such as "Nov 2019 - Dec 2020". */
function periodStart(period: string) {
  const [month, year] = period.split(" - ")[0].split(" ");
  return new Date(Date.UTC(Number(year), MONTHS.indexOf(month), 1));
}

/** Whole years from the start of the earliest job until today. */
function yearsOfExperience(now = new Date()) {
  const start = new Date(Math.min(...experience.map((job) => periodStart(job.period).getTime())));
  const months =
    (now.getUTCFullYear() - start.getUTCFullYear()) * 12 + now.getUTCMonth() - start.getUTCMonth();
  return Math.floor(months / 12);
}

const years = yearsOfExperience();
// "six", or digits past twenty.
const yearsWord = NUMBER_WORDS[years] ?? String(years);
const yearsWordCapitalized = yearsWord[0].toUpperCase() + yearsWord.slice(1);

// The years count comes from `experience`, so it moves up by itself each
// anniversary of the first job (the site rebuilds daily; see layout.tsx).
export const profile = {
  name: "Mohammad Reza Ghasemi",
  role: "Frontend Engineer",
  stack: "React / Next.js",
  intro: `${yearsWordCapitalized} years building production React and Next.js apps in fintech, insurance and e-commerce.`,
  summary: `Frontend engineer with over ${yearsWord} years of experience building production React and Next.js apps in fintech, insurance, and e-commerce. I have worked on step-by-step migrations of live applications, and I build internal tools that make daily work easier for the team.`,
  // Words of the summary drawn in the accent color.
  summaryHighlight: ["internal", "tools"],
  email: "mrghasemi1992@gmail.com",
  // Stands in the lime tile at the hero's bottom right (above the name on phones).
  portrait: {
    src: portrait,
    alt: "Mohammad Reza Ghasemi, smiling, arms crossed",
  },
};

export type Shot = {
  /** An image imported from src/assets/work/<slug>/, e.g. moneyReports. */
  src: StaticImageData;
  /** What the image shows, for screen readers. */
  alt: string;
  /** One sentence under the image. */
  caption: string;
  /** A phone screenshot (390 x 844): shown narrow and tall. */
  phone?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  status?: "In progress";
  /** Leaves the project off the site (card, page, sitemap) without deleting it. */
  hidden?: boolean;
  /** One or two sentences for the card on the home page. */
  summary: string;
  /** Short tech list for the card. */
  tags: string[];
  /** The main image's alt text, or the text in the empty slot when there's no image. */
  screenshot: string;
  /** The main image, 1600 x 1200 (4:3), imported from src/assets/work/<slug>/. */
  image?: StaticImageData;
  links: { label: string; href: string }[];
  /** Opening paragraph of the case study. Also its meta description. */
  intro: string;
  /** Short label/value pairs under the links: role, year, platform... */
  facts: { label: string; value: string }[];
  /** What the project does, in groups with a heading each. */
  features: { title: string; items: string[] }[];
  /** Screenshots after the features. Desktop ones first, then phone ones. */
  gallery?: Shot[];
  decisions: string[];
  stack: string[];
};

const allProjects: Project[] = [
  {
    slug: "money",
    name: "Money",
    status: "In progress",
    summary:
      "A personal and family accounting app in Persian and English. Record money by hand, from a CSV file, or by telling Claude or ChatGPT, and see where it goes.",
    tags: ["Next.js", "Postgres", "Drizzle", "Better Auth", "MCP"],
    screenshot:
      "The Money dashboard: total balance, this month's income and expense, recent transactions and budgets",
    image: moneyDashboard,
    links: [
      { label: "Code", href: "https://github.com/mrghasemi1992/money" },
      { label: "Storybook", href: "https://money-storybook.vercel.app" },
    ],
    intro:
      "A personal accounting app for a person or a family, in Persian (right to left) and English. Record income, expenses and transfers by hand, from a CSV file, or by telling Claude or ChatGPT, which save them through the app's own MCP connector.",
    facts: [
      { label: "Role", value: "Solo: product, design, code and docs" },
      { label: "Year", value: "2026" },
      { label: "Platform", value: "Web app for desktop and phone" },
      { label: "Languages", value: "Persian (RTL) and English" },
      { label: "Availability", value: "Self-hosted, no public site yet" },
    ],
    features: [
      {
        title: "The book",
        items: [
          "One shared book for a person or a family: accounts, categories, transactions and budgets.",
          "Accounts with a starting balance and a live balance, in the order you drag them into.",
          "Income and expense categories with subcategories, a color and an icon.",
          "Items still in use are archived instead of deleted, so history stays intact. Every add, delete and archive can be undone.",
        ],
      },
      {
        title: "Transactions",
        items: [
          "Income, expense, and transfers between your own accounts. Transfers never count as income or expense.",
          "Listed by day for a month or a date range, with totals, filters, search and tags.",
          "One add and edit form, opened from every page, and as a bottom sheet on phones.",
          "Transactions without a category are marked unknown, with a notice to sort them later.",
        ],
      },
      {
        title: "Budgets and reports",
        items: [
          "A monthly limit per expense category that repeats every month. Warns from 80% and shows the state in words and icons, not color alone.",
          "Reports compare a period with the one before: by category, by account and month by month.",
          "Insights: biggest changes, savings rate, recurring spending, largest transactions and budget record.",
          "Every chart has a table view with the same figures.",
          "A dashboard with balances, this month, budgets, top spending and recent transactions.",
        ],
      },
      {
        title: "Claude and ChatGPT",
        items: [
          "Money is a remote MCP server. Add its URL to Claude or ChatGPT, sign in once and allow access.",
          "Paste a bank SMS or write a sentence, like “Spent 850k toman on groceries yesterday”, and the assistant records it in the right account and category.",
          "Ask about your spending: totals by category, unknown transactions, this month against last.",
          "Tools to read the book, add up to 100 transactions at once, edit and delete. Viewers get only the read tools.",
          "Everything an assistant adds carries a Claude or ChatGPT badge, and access can be revoked from settings.",
        ],
      },
      {
        title: "Languages and money",
        items: [
          "Persian, right to left and the default, and English. Each user picks their own.",
          "Jalali or Gregorian calendar per user, on the same shared book.",
          "Books in rial, dollar, euro or pound. Rial books can be shown and typed in toman.",
          "Amounts accepted in Persian, Arabic or Latin digits. Light and dark themes.",
        ],
      },
      {
        title: "Users, data and hosting",
        items: [
          "Invite only, with admin, editor and viewer roles, checked on the server on every request.",
          "CSV import in five steps (upload, columns, names, review, result), saved all or nothing. CSV export in both calendars that opens in Excel with Persian intact.",
          "Self-hosted: each family forks the repository and deploys it on free Vercel and Neon accounts in about 15 minutes, with no terminal.",
          "Updates with one click, and settings show when a new release is out.",
          "A user guide in English and Persian, with annotated screenshots of every screen.",
        ],
      },
    ],
    gallery: [
      {
        src: moneyTransactions,
        alt: "The transactions page for October 2026, grouped by day, with income, expense and net totals",
        caption:
          "Transactions by day, with the month's totals. The sparkle badge marks the ones Claude recorded.",
      },
      {
        src: moneyReports,
        alt: "The reports overview: income, expenses and net against the previous period, biggest changes and recurring spending",
        caption:
          "Reports compare the period with the one before and point out what changed.",
      },
      {
        src: moneyBreakdown,
        alt: "The reports breakdown: expenses and income by category and spending by account, as bar lists",
        caption: "Spending and income by category and by account. Every chart switches to a table.",
      },
      {
        src: moneyBudgets,
        alt: "The budget page: total spent against the total budget, and each category's progress and status",
        caption: "Monthly budgets, with near-limit and over-budget states in words, not color alone.",
      },
      {
        src: moneyConnector,
        alt: "The connector settings page: the connector URL, setup steps for Claude and ChatGPT, and example prompts",
        caption: "The connector page: the URL to add, the steps for Claude and ChatGPT, and things to say.",
      },
      {
        src: moneyImport,
        alt: "The CSV import on step two of five: amount type, date calendar and column mapping",
        caption: "CSV import, step two of five: map the file's columns and its calendar.",
      },
      {
        src: moneyPhoneDashboard,
        alt: "The dashboard on a phone, with the floating tab bar",
        caption: "The dashboard on a phone, with the floating tab bar.",
        phone: true,
      },
      {
        src: moneyPhoneForm,
        alt: "The new transaction form as a bottom sheet on a phone",
        caption: "Adding a transaction opens a bottom sheet.",
        phone: true,
      },
      {
        src: moneyPhoneReports,
        alt: "The reports page on a phone, with period options and income, expense and net cards",
        caption: "Reports on a phone.",
        phone: true,
      },
      {
        src: moneyPhoneConsent,
        alt: "The consent screen where Claude asks to access a Money account, listing what it will be able to do",
        caption: "Claude asks for access, and Money lists exactly what it will be able to do.",
        phone: true,
      },
    ],
    decisions: [
      "One Next.js project and no separate backend: pages, Server Actions, sign-in, the OAuth server and the MCP endpoint all deploy together on Vercel.",
      "Money is its own OAuth 2.1 server for the connector, built on Better Auth. Assistants identify with a Client ID Metadata Document and only claude.ai and chatgpt.com are accepted, so nothing has to be registered and no look-alike app can connect. Every MCP request checks the grant, the user and their role again in the database.",
      "Dates are stored in Gregorian and converted to the viewer's calendar only where they're shown or typed. At the MCP boundary the year tells the calendar, because language models are unreliable at Jalali arithmetic; Claude copies a bank SMS date as it is.",
      "Amounts are integers in the smallest unit of the book's one currency and are summed in Postgres. Rules that must hold at write time, like “delete only while unused” or “never demote the last admin”, are part of the SQL statement itself.",
      "Postgres on Neon over HTTP with Drizzle. Every preview deployment gets its own database branch, the database migrates only after the build succeeds, and migrations stay compatible with the previous release.",
      "Zod validates every form, Server Action, MCP tool input and CSV row, with the same schema in the browser and on the server.",
      "Its own design system: tokens and CSS Modules over unstyled Base UI parts, no component library. Logical CSS properties flip every screen with the text direction. About 40 components, each documented in Storybook with toolbars for theme, language, calendar and currency.",
      "Charts are hand-written in HTML and CSS and rendered on the server, with no chart library.",
      "Pages render on the server and stream each section with a skeleton that matches the final layout.",
      "Built with Claude Code, working from architecture, decision and convention docs that live in the repository and change with every pull request. Releases are cut by release-please from Conventional Commits.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Postgres (Neon)",
      "Drizzle ORM",
      "Better Auth",
      "MCP",
      "OAuth 2.1",
      "Zod",
      "next-intl",
      "Base UI",
      "CSS Modules",
      "Papa Parse",
      "Storybook",
      "Playwright",
      "Vercel",
    ],
  },
  {
    slug: "portfolio",
    name: "This portfolio",
    summary:
      "The site you are reading. Server-rendered with Next.js, with scroll-driven motion in plain CSS.",
    tags: ["Next.js", "React", "CSS Modules", "View Transitions"],
    screenshot: "The portfolio's home page: the hero with the name in large condensed letters",
    image: portfolioHome,
    links: [{ label: "Code", href: "https://github.com/mrghasemi1992/portfolio" }],
    intro:
      "The site you are reading. It is server-rendered with Next.js, so every page arrives as finished HTML for readers and search engines, and its motion runs on CSS that follows the scroll.",
    facts: [
      { label: "Role", value: "Solo: design and code" },
      { label: "Year", value: "2024, redesigned in 2026" },
      { label: "Platform", value: "Web, desktop and phone" },
      { label: "Hosting", value: "Vercel" },
    ],
    features: [
      {
        title: "Pages",
        items: [
          "A home page with About, Experience, Work, Skills and Contact.",
          "A case study for each project, with its features, screenshots, decisions and stack.",
          "Every page is built ahead of time. Adding a project to the data creates its page, social image and sitemap entry.",
        ],
      },
      {
        title: "Motion",
        items: [
          "The letters of the name drop in, then the name shrinks and fades as the page scrolls.",
          "The About text lights up line by line as it scrolls into view.",
          "Experience opens one job at a time, and the row you click stays where it is while the one above it closes.",
          "Work panels stack on top of each other, each sinking back as the next one covers it.",
          "Opening a case study slides the page and morphs the project's screenshot and title into place.",
        ],
      },
      {
        title: "Search and sharing",
        items: [
          "Each page has its own title, description and canonical URL.",
          "Social preview images are drawn in code for each page at build time.",
          "Structured data (WebSite, Person, CreativeWork, BreadcrumbList) linked by id, plus a sitemap and robots.txt.",
          "The years of experience are counted from the resume dates and go up by themselves, with a daily rebuild.",
        ],
      },
      {
        title: "Accessibility",
        items: [
          "Every animation turns off when the system's reduced-motion setting is on, and the page still looks finished.",
          "The mobile menu is a native dialog, which traps focus and closes on Escape. Experience rows are native details elements, usable by keyboard.",
          "Text split up for animation keeps a readable copy for screen readers.",
          "Contrast tuned even for the dimmed About words, and visible focus styles.",
        ],
      },
    ],
    gallery: [
      {
        src: portfolioExperience,
        alt: "The Experience section: company names as large rows, the current job open with its highlights in two columns",
        caption: "Experience lists each job as a big headline, with the current one open.",
      },
      {
        src: portfolioWork,
        alt: "The Work section: a project panel with its name, summary, tags and screenshot",
        caption: "Work panels stack and sink back as the next one slides over.",
      },
      {
        src: portfolioCaseStudy,
        alt: "The top of the Money case study: title, intro, links and facts",
        caption: "Each project gets a case study, built ahead of time from the same data.",
      },
      {
        src: portfolioSkills,
        alt: "The Skills and Contact sections: skill groups as chips and a large email link",
        caption: "Skills as chips that rise in turn, then the contact block.",
      },
      {
        src: portfolioPhoneHome,
        alt: "The home page on a phone",
        caption: "The hero on a phone.",
        phone: true,
      },
      {
        src: portfolioPhoneExperience,
        alt: "The Experience section on a phone: company names stacked, with SADAD open showing its highlights",
        caption: "On phones, the same list, one job open at a time.",
        phone: true,
      },
      {
        src: portfolioPhoneMenu,
        alt: "The mobile menu open, with the section links and social links",
        caption: "The mobile menu, a native dialog.",
        phone: true,
      },
      {
        src: portfolioPhoneCaseStudy,
        alt: "The Money case study on a phone",
        caption: "A case study on a phone.",
        phone: true,
      },
    ],
    decisions: [
      "Server Components by default. Only the mobile menu and a small helper that keeps an Experience row in place ship client-side JavaScript.",
      "All the text lives in one data file, so a copy change never touches a component.",
      "Scroll motion runs on CSS scroll-driven animations, with no animation library. It animates only transform and opacity, after phones dropped frames on anything else.",
      "Page changes use React's ViewTransition. Only the screen-sized root is animated, never the whole ~7,800px page, which stuttered on iPhones.",
      "The nav highlight slides between links with CSS anchor positioning, and falls back to a plain fill where it isn't supported.",
      "Pages are static and Vercel regenerates them once a day, which keeps the years of experience current without a deploy.",
      "Built with Claude Code, under written rules (CLAUDE.md) and a developer guide that are updated with every change.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "CSS Modules",
      "Scroll-driven animations",
      "View Transitions",
      "next/og",
      "Vercel",
    ],
  },
  {
    slug: "orange",
    name: "Orange",
    status: "In progress",
    // Off the site for now. Delete this line to bring it back (and add an image).
    hidden: true,
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
    facts: [],
    features: [
      {
        title: "Scope",
        items: [
          "Story lists: Top, New, Best, Ask, Show and Jobs",
          "Story page with the full comment tree, including polls",
          "User profiles and search",
          "Saved stories and read tracking, stored in the browser only",
          "Keyboard shortcuts, for example j/k navigation",
          "PWA and offline support",
        ],
      },
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
];

/** The projects on the site, in order. Hidden ones are left out everywhere. */
export const projects = allProjects.filter((p) => !p.hidden);

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
