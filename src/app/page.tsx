"use client";

import { useState, useEffect } from "react";
import {
  navLinks,
  sectionNum,
  socials,
  experience,
  projects,
  skillGroups,
  SHOW_PROJECTS,
} from "@/data";
import { LOGO_PATH, LOGO_VIEWBOX } from "@/data/logo";

const NAME = "Mohammad Reza Ghasemi";
const EMAIL = "mrghasemi1992@gmail.com";
const RESUME_URL = "/resume-final-2026.09.17-17.23.pdf";
const RESUME_FILENAME = "Mohammad-Reza-Ghasemi-Frontend-Engineer-Resume.pdf";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const mono = "var(--font-mono), 'JetBrains Mono', monospace";
  const sans =
    "var(--font-manrope), 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <div
      data-theme={theme}
      data-accent="cyan"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg)",
        backgroundImage: "var(--dot-grid)",
        backgroundSize: "24px 24px",
        color: "var(--text)",
        fontFamily: sans,
        WebkitFontSmoothing: "antialiased",
        transition: "background-color 0.4s ease, color 0.4s ease",
      }}
    >
      {/* ── NAV ── */}
      <nav
        className="site-nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "0 28px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <a
            href="#top"
            style={{
              display: "flex",
              alignItems: "center",
              color: "var(--text)",
            }}
          >
            <svg
              width="29"
              height="22"
              viewBox={LOGO_VIEWBOX}
              preserveAspectRatio="none"
              fill="currentColor"
              role="img"
              aria-label="Mohammad Reza Ghasemi"
            >
              <path d={LOGO_PATH} />
            </svg>
          </a>

          <div
            className="nav-center"
            style={{
              alignItems: "center",
              gap: 30,
              fontFamily: mono,
              fontSize: 13,
              color: "var(--text-dim)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                style={{ color: "var(--text-dim)", textDecoration: "none" }}
              >
                <span style={{ color: "var(--accent)" }}>{link.num}</span>{" "}
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="theme-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              height: 36,
              padding: "0 12px",
              borderRadius: 9,
              border: "1px solid var(--border)",
              background: "var(--bg-elev)",
              color: "var(--text-dim)",
              cursor: "pointer",
              fontFamily: mono,
              fontSize: 12,
            }}
          >
            {theme === "dark" ? (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="4.2" />
                  <line x1="12" y1="2.5" x2="12" y2="5" />
                  <line x1="12" y1="19" x2="12" y2="21.5" />
                  <line x1="2.5" y1="12" x2="5" y2="12" />
                  <line x1="19" y1="12" x2="21.5" y2="12" />
                  <line x1="5.2" y1="5.2" x2="7" y2="7" />
                  <line x1="17" y1="17" x2="18.8" y2="18.8" />
                  <line x1="5.2" y1="18.8" x2="7" y2="17" />
                  <line x1="17" y1="7" x2="18.8" y2="5.2" />
                </svg>
                <span>LIGHT</span>
              </>
            ) : (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
                </svg>
                <span>DARK</span>
              </>
            )}
          </button>
        </div>
      </nav>

      <main
        id="top"
        style={{ maxWidth: 1080, margin: "0 auto", padding: "0 28px" }}
      >
        {/* ── HERO ── */}
        <header
          style={{
            padding: "clamp(70px,14vh,150px) 0 clamp(60px,10vh,110px)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(42px,7.5vw,78px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 800,
            }}
          >
            {NAME}
          </h1>
          <p
            style={{
              margin: "18px 0 0",
              fontSize: "clamp(20px,3vw,30px)",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              fontWeight: 600,
              color: "var(--text-dim)",
              maxWidth: 760,
            }}
          >
            Frontend Engineer building web interfaces with React &amp; Next.js.
          </p>
          <p
            style={{
              margin: "22px 0 0",
              fontSize: 17,
              lineHeight: 1.7,
              color: "var(--text-dim)",
              maxWidth: 600,
            }}
          >
            Over six years building production React and Next.js apps in
            fintech, insurance, and e-commerce — from step-by-step migrations of
            live applications to internal tools that make the team&apos;s daily
            work easier.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              marginTop: 34,
            }}
          >
            <a
              href="#contact"
              className="btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                height: 48,
                padding: "0 22px",
                borderRadius: 11,
                border: "1px solid var(--border)",
                background: "var(--bg-elev)",
                color: "var(--text)",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Get in touch
            </a>
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              className="btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                height: 48,
                padding: "0 22px",
                borderRadius: 11,
                border: "1px solid var(--border)",
                background: "var(--bg-elev)",
                color: "var(--text)",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              marginTop: 40,
              fontFamily: mono,
              fontSize: 13,
              color: "var(--text-dim)",
            }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="ul-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--text-dim)",
                }}
              >
                <span style={{ color: "var(--accent)" }}>{s.arrow}</span>{" "}
                {s.label}
              </a>
            ))}
          </div>
        </header>

        {/* ── ABOUT ── */}
        <section
          id="about"
          style={{
            padding: "clamp(50px,9vh,90px) 0",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 13,
              color: "var(--accent)",
              marginBottom: 14,
            }}
          >
            {sectionNum("About")} / About
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 24,
              maxWidth: 760,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(26px,4vw,38px)",
                letterSpacing: "-0.03em",
                fontWeight: 800,
                lineHeight: 1.15,
              }}
            >
              A little about me.
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--text-dim)",
              }}
            >
              I&apos;m Mohammad Reza Ghasemi — a Frontend Engineer with{" "}
              <span style={{ color: "var(--text)" }}>
                over six years of experience
              </span>{" "}
              building production React and Next.js apps in fintech, insurance,
              and e-commerce. I&apos;ve worked on step-by-step migrations of
              live applications, and I build internal tools that make daily work
              easier for the team.
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--text-dim)",
              }}
            >
              Along the way I&apos;ve worked at{" "}
              <span style={{ color: "var(--text)" }}>
                SnappPay, SADAD, TashilCar, and Fanap Plus
              </span>{" "}
              — modernizing live applications through step-by-step migrations,
              strengthening testing and error reporting, and building the
              internal tools and shared packages my teams rely on every day.
            </p>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section
          id="experience"
          style={{
            padding: "clamp(50px,9vh,90px) 0",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 13,
              color: "var(--accent)",
              marginBottom: 14,
            }}
          >
            {sectionNum("Experience")} / Experience
          </div>
          <h2
            style={{
              margin: "0 0 40px",
              fontSize: "clamp(26px,4vw,38px)",
              letterSpacing: "-0.03em",
              fontWeight: 800,
            }}
          >
            Where I&apos;ve worked
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {experience.map((job, i) => (
              <div key={i} className="experience-grid">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 13,
                      color: "var(--accent)",
                    }}
                  >
                    {job.period}
                  </div>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 12,
                      color: "var(--text-faint)",
                    }}
                  >
                    {job.type}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      gap: 8,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 20,
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {job.role}
                    </h3>
                    <span style={{ color: "var(--text-faint)" }}>·</span>
                    <span
                      style={{
                        color: "var(--accent)",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    >
                      {job.company}
                    </span>
                  </div>
                  <ul
                    style={{
                      margin: "16px 0 0",
                      padding: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 11,
                    }}
                  >
                    {job.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        style={{
                          display: "flex",
                          gap: 12,
                          fontSize: 15.5,
                          lineHeight: 1.6,
                          color: "var(--text-dim)",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--accent)",
                            flexShrink: 0,
                            fontFamily: mono,
                            fontSize: 13,
                            paddingTop: 2,
                          }}
                        >
                          →
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        {SHOW_PROJECTS && (
          <section
            id="projects"
            style={{
              padding: "clamp(50px,9vh,90px) 0",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontFamily: mono,
                fontSize: 13,
                color: "var(--accent)",
                marginBottom: 14,
              }}
            >
              {sectionNum("Projects")} / Projects
            </div>
            <h2
              style={{
                margin: "0 0 40px",
                fontSize: "clamp(26px,4vw,38px)",
                letterSpacing: "-0.03em",
                fontWeight: 800,
              }}
            >
              Selected work
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                gap: 20,
              }}
            >
              {projects.map((p, i) => (
                <article
                  key={i}
                  className="project-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 26,
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    background: "var(--bg-elev)",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 18,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: mono,
                        fontSize: 12,
                        color: "var(--text-faint)",
                      }}
                    >
                      {p.num}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        fontFamily: mono,
                        fontSize: 12,
                      }}
                    >
                      <a
                        href={p.demo}
                        className="ul-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--text-dim)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        demo
                      </a>
                      {p.repo !== "#" && (
                        <a
                          href={p.repo}
                          className="ul-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "var(--text-dim)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.72c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.81c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
                          </svg>
                          repo
                        </a>
                      )}
                    </div>
                  </div>
                  <h3
                    style={{
                      margin: "0 0 8px",
                      fontSize: 20,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 20px",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--text-dim)",
                      flex: 1,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: mono,
                          fontSize: 11.5,
                          padding: "4px 9px",
                          borderRadius: 7,
                          background: "var(--bg-elev-2)",
                          border: "1px solid var(--border)",
                          color: "var(--text-dim)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── SKILLS ── */}
        <section
          id="skills"
          style={{
            padding: "clamp(50px,9vh,90px) 0",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 13,
              color: "var(--accent)",
              marginBottom: 14,
            }}
          >
            {sectionNum("Skills")} / Skills
          </div>
          <h2
            style={{
              margin: "0 0 40px",
              fontSize: "clamp(26px,4vw,38px)",
              letterSpacing: "-0.03em",
              fontWeight: 800,
            }}
          >
            Toolkit
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 18,
            }}
          >
            {skillGroups.map((g, i) => (
              <div
                key={i}
                style={{
                  padding: 22,
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  background: "var(--bg-elev)",
                }}
              >
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 12,
                    color: "var(--text-faint)",
                    marginBottom: 14,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {g.title}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {g.items.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: 13.5,
                        fontWeight: 500,
                        padding: "6px 12px",
                        borderRadius: 8,
                        background:
                          "color-mix(in srgb, var(--accent) 9%, transparent)",
                        border:
                          "1px solid color-mix(in srgb, var(--accent) 22%, var(--border))",
                        color: "var(--text)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section
          id="contact"
          style={{
            padding: "clamp(60px,11vh,120px) 0",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 13,
              color: "var(--accent)",
              marginBottom: 14,
            }}
          >
            {sectionNum("Contact")} / Contact
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 28,
              maxWidth: 680,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(30px,5.5vw,54px)",
                letterSpacing: "-0.035em",
                fontWeight: 800,
                lineHeight: 1.05,
              }}
            >
              Let&apos;s build something
              <br />
              <span style={{ color: "var(--accent)" }}>worth shipping.</span>
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.7,
                color: "var(--text-dim)",
                maxWidth: 520,
              }}
            >
              Questions, ideas, or just a hello — the fastest way to reach me
              is email.
            </p>
            <div>
              <a
                href={`mailto:${EMAIL}`}
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 11,
                  height: 52,
                  padding: "0 24px",
                  borderRadius: 12,
                  background: "var(--accent)",
                  color: "var(--bg)",
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: "none",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                  <polyline points="3 6 12 13 21 6" />
                </svg>
                {EMAIL}
              </a>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
                marginTop: 6,
                fontFamily: mono,
                fontSize: 13,
                color: "var(--text-dim)",
              }}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="ul-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--text-dim)",
                  }}
                >
                  <span style={{ color: "var(--accent)" }}>{s.arrow}</span>{" "}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "26px 28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            fontFamily: mono,
            fontSize: 12,
            color: "var(--text-faint)",
          }}
        >
          <span>
            © {new Date().getFullYear()} Mohammad Reza Ghasemi — built with
            React &amp; Next.js
          </span>
          <a
            href="#top"
            className="ul-link"
            style={{ color: "var(--text-faint)" }}
          >
            back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
