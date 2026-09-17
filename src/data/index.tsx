// Temporarily hide the "Selected work" section. Flip to true to bring it back.
export const SHOW_PROJECTS = false;

const sections = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  ...(SHOW_PROJECTS ? [{ label: "Projects", href: "#projects" }] : []),
  { label: "Skills", href: "#skills" },
];

export const navLinks = sections.map((s, i) => ({
  ...s,
  num: String(i + 1).padStart(2, "0"),
}));

export const sectionNum = (label: string) =>
  String(
    label === "Contact"
      ? navLinks.length + 1
      : navLinks.findIndex((l) => l.label === label) + 1
  ).padStart(2, "0");

export const socials = [
  { label: "GitHub", href: "https://github.com/luckydevboy", arrow: "↗" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mrghasemi1992/", arrow: "↗" },
];

export const experience = [
  {
    period: "Nov 2024 — Present",
    type: "Full-time",
    role: "Frontend Developer",
    company: "SnappPay",
    bullets: [
      "Led the migration of the Vehicle Insurance app to React Query for server-state management — replacing custom fetch and global-store logic with declarative queries and mutations, cutting redundant API calls through caching and request deduplication, and standardizing loading, error and retry handling.",
      "Built Pado, a plugin-based internal dev-tools package used by the team's engineers and QA, with an in-app debug console (Eruda), a JWT token fetcher, and a one-click form filler. The token fetcher also ships as a standalone CLI, Tokenizer.",
      "Built vpnctl, a macOS and Windows CLI (bash and PowerShell) that switches between Fortinet SSL VPN and OpenVPN with one command, generating 2FA codes on-device with a from-scratch TOTP (RFC 6238) implementation and keeping credentials out of plain text.",
      "Improved frontend error reporting in Sentry: source maps for readable stack traces, noise filtering, release tagging, better grouping and alerts, plus a shared helper for firing custom events.",
      "Built the testing foundation for one of our apps: unit and integration tests with Vitest and React Testing Library, API mocking with MSW, and coverage reporting.",
      "Contributed to the incremental JavaScript-to-TypeScript migration of the Vehicle Insurance app, and to moving features and screens from the old app into the new codebase.",
      "Built a reusable A/B testing component that standardized how experiments are implemented across the app.",
      "Made AI part of my daily workflow, using Claude with skills and MCP tools to follow code conventions, handle repeated tasks, and find answers in the codebase.",
    ],
  },
  {
    period: "Feb 2024 — Nov 2024",
    type: "Full-time",
    role: "Frontend Developer",
    company: "SADAD",
    bullets: [
      "Developed and maintained web applications with Angular.",
      "Replaced the team's date picker, which was incompatible with the newer Angular version, with one built from scratch — removing a blocker to the framework upgrade.",
      "Built a permission-driven sidebar navigation with unlimited nesting, rendering menu depth dynamically from user permissions returned by the API.",
    ],
  },
  {
    period: "Dec 2022 — Nov 2023",
    type: "Full-time",
    role: "Frontend Developer",
    company: "TashilCar",
    bullets: [
      "Built production features with React, Next.js, TypeScript and styled-components, using React Query for API state management and caching.",
      "Built an internal icon package with a Figma-to-React pipeline that imports icons from a Figma file and exports them as React components, keeping design and code icon sets in sync.",
    ],
  },
  {
    period: "Jan 2021 — Dec 2022",
    type: "Full-time",
    role: "Frontend Developer",
    company: "Fanap Plus",
    bullets: [
      "Built the frontend of the company's educational platform for children and teenagers from scratch with React, Next.js, TypeScript and Tailwind CSS.",
    ],
  },
  {
    period: "Nov 2019 — Dec 2020",
    type: "Full-time",
    role: "Frontend Developer",
    company: "Arsh",
    bullets: [
      "Built admin panels, e-commerce and map-based web apps with React, Redux, Redux Saga, Formik and styled-components, and maintained the company's WordPress website.",
    ],
  },
];

export const projects = [
  {
    num: "01",
    title: "Nazanin Portfolio",
    desc: "A multilingual personal portfolio built with Next.js, TailwindCSS, and i18n internationalization — pixel-perfect across all breakpoints.",
    tags: ["Next.js", "TailwindCSS", "i18n"],
    demo: "https://nazaninnamjoo.ir",
    repo: "#",
  },
  {
    num: "02",
    title: "Personal Portfolio",
    desc: "My own portfolio site — this one — built with Next.js, GSAP scroll animations, and Lenis smooth scrolling for a polished feel.",
    tags: ["Next.js", "GSAP", "Lenis", "TailwindCSS"],
    demo: "https://www.mrghasemi1992.ir",
    repo: "https://github.com/luckydevboy/portfolio",
  },
];

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
    items: ["Vitest", "React Testing Library", "MSW"],
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
