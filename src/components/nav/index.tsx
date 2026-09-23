import { navLinks } from "@/data";
import { LOGO_PATH, LOGO_VIEWBOX } from "@/data/logo";
import styles from "./styles.module.css";

type NavProps = {
  theme: "dark" | "light";
  onToggleTheme: () => void;
};

export default function Nav({ theme, onToggleTheme }: NavProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="#top" className={styles.logo}>
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

        <div className={styles.links}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              <span className={styles.num}>{link.num}</span> {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={onToggleTheme}
          aria-label="Toggle color theme"
          className={styles.themeButton}
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
  );
}
