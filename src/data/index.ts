export const site = {
  name: "Mohammad Reza Ghasemi",
  role: "Frontend Engineer",
  tagline: "I build web interfaces with React & Next.js.",
  email: "mrghasemi1992@gmail.com",
  resumeUrl: "/resume-final-2026.09.17-17.23.pdf",
  resumeFilename: "Mohammad-Reza-Ghasemi-Frontend-Engineer-Resume.pdf",
};

export const navLinks = [
  { label: "About", href: "#about", num: "01" },
  { label: "Experience", href: "#experience", num: "02" },
  { label: "Built", href: "#built", num: "03" },
  { label: "Toolkit", href: "#toolkit", num: "04" },
  { label: "Contact", href: "#contact", num: "05" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/luckydevboy" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mrghasemi1992/" },
];

export const about = {
  heading: "Six years of shipping, mostly under load.",
  paragraphs: [
    "I'm a Frontend Engineer with over six years of experience building production React and Next.js apps in fintech, insurance, and e-commerce. I've worked on step-by-step migrations of live applications, and I build internal tools that make daily work easier for the team.",
    "Along the way I've worked at SnappPay, SADAD, TashilCar, and Fanap Plus — modernizing live applications through step-by-step migrations, strengthening testing and error reporting, and building the internal tools and shared packages my teams rely on every day.",
  ],
  stats: [
    { value: "6+", label: "Years building for the web" },
    { value: "5", label: "Engineering teams" },
    { value: "3", label: "Internal tools shipped" },
  ],
};

export const experience = [
  {
    period: "Nov 2024 — Present",
    from: "2024",
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
    from: "2024",
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
    from: "2022",
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
    from: "2021",
    type: "Full-time",
    role: "Frontend Developer",
    company: "Fanap Plus",
    bullets: [
      "Built the frontend of the company's educational platform for children and teenagers from scratch with React, Next.js, TypeScript and Tailwind CSS.",
    ],
  },
  {
    period: "Nov 2019 — Dec 2020",
    from: "2019",
    type: "Full-time",
    role: "Frontend Developer",
    company: "Arsh",
    bullets: [
      "Built admin panels, e-commerce and map-based web apps with React, Redux, Redux Saga, Formik and styled-components, and maintained the company's WordPress website.",
    ],
  },
];

/** Work pulled out of the experience bullets, where it was getting buried. */
export const built = [
  {
    num: "01",
    name: "Pado",
    kind: "Internal dev tools",
    where: "SnappPay",
    desc: "A plugin-based dev-tools package used by the team's engineers and QA: an in-app debug console, a JWT token fetcher, and a one-click form filler.",
    tags: ["TypeScript", "Plugin API", "Eruda"],
  },
  {
    num: "02",
    name: "vpnctl",
    kind: "Cross-platform CLI",
    where: "SnappPay",
    desc: "Switches between Fortinet SSL VPN and OpenVPN with one command on macOS and Windows, generating 2FA codes on-device with a from-scratch TOTP (RFC 6238) implementation and keeping credentials out of plain text.",
    tags: ["Bash", "PowerShell", "TOTP / RFC 6238"],
  },
  {
    num: "03",
    name: "Tokenizer",
    kind: "Standalone CLI",
    where: "SnappPay",
    desc: "The token fetcher from Pado, split out as a CLI so it can be scripted and used outside the browser.",
    tags: ["CLI", "JWT", "Node.js"],
  },
  {
    num: "04",
    name: "Icon pipeline",
    kind: "Shared package",
    where: "TashilCar",
    desc: "Imports icons straight from a Figma file and exports them as React components, keeping the design and code icon sets in sync.",
    tags: ["Figma API", "React", "Codegen"],
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
