// Everything a visitor can read lives here, so copy changes never touch components.

export const NAME = "Mohammad Reza Ghasemi";
export const TITLE = "Frontend Engineer";
export const EMAIL = "mrghasemi1992@gmail.com";

export const RESUME = {
  href: "/resume-final-2026.09.17-17.23.pdf",
  filename: "Mohammad-Reza-Ghasemi-Frontend-Engineer-Resume.pdf",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/mrghasemi1992" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mrghasemi1992/" },
];

export const hero = {
  intro:
    "Six years of building production React and Next.js apps. I care about the part of an interface people feel before they notice it: the spacing, the timing, the way it responds.",
};

export const about = {
  statement:
    "I build web interfaces for products people rely on every day, in fintech, insurance and e-commerce. Most of my work happens inside live applications: migrating them step by step, strengthening their testing and error reporting, and building the internal tools my teams use daily.",
  facts: [
    { label: "Now", value: "Frontend Engineer at SnappPay" },
    { label: "Stack", value: "React, Next.js, TypeScript" },
    { label: "Building since", value: "2019" },
  ],
};

export const experience = [
  {
    period: "Nov 2024 — Present",
    type: "Full-time",
    role: "Frontend Engineer",
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

export type Project = {
  title: string;
  year: string;
  status: string;
  description: string;
  stack: string[];
  links: { label: string; href: string }[];
};

// Newest first. Add projects to the top; the Work section renders whatever is here.
export const projects: Project[] = [
  {
    title: "This portfolio",
    year: "2026",
    status: "Live",
    description:
      "The site you're on, designed and built from scratch: Next.js 16 and React 19 with CSS modules, GSAP and Lenis for motion, and a single dark theme built on one blue.",
    stack: ["Next.js", "React", "TypeScript", "CSS Modules", "GSAP", "Lenis"],
    links: [
      { label: "Live", href: "https://mrghasemi1992.ir" },
      { label: "Source", href: "https://github.com/mrghasemi1992/portfolio" },
    ],
  },
  {
    title: "Orange",
    year: "2026",
    status: "In progress · design system done, app shell next",
    description:
      "A read-only Hacker News client with a modern reader UI, built on its own design system documented in Storybook.",
    stack: ["Next.js", "TypeScript", "TanStack Query", "Zod", "Storybook"],
    links: [
      { label: "Live", href: "https://orange-hn.vercel.app" },
      { label: "Source", href: "https://github.com/mrghasemi1992/orange" },
    ],
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
      "GSAP",
      "Lenis",
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

export const contact = {
  heading: ["Got something in mind?", "Let's talk."],
  text: "Questions, ideas, or just a hello — the fastest way to reach me is email.",
};
