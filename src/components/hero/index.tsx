import Logo from "@/components/logo";
import { profile } from "@/data";
import styles from "./styles.module.css";

/** One line per word and one span per letter, for the drop-in animation. */
function SplitName({ name }: { name: string }) {
  return name.split(" ").map((word) => (
    <span key={word} className={styles.line}>
      {[...word].map((char, i) => (
        <span key={i} className={styles.char}>
          {char}
        </span>
      ))}
    </span>
  ));
}

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.text}>
        <div className={styles.nameWrap}>
          <h1 className={styles.name}>
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden="true">
              <SplitName name={profile.name} />
            </span>
          </h1>
        </div>
        <div className={styles.tag}>
          <p className={styles.role}>
            {profile.role}
            <br />
            <span className={styles.stack}>{profile.stack}</span>
          </p>
          <p className={styles.intro}>{profile.intro}</p>
        </div>
      </div>
      <div className={styles.mark} aria-hidden="true">
        <Logo className={styles.markLogo} />
      </div>
    </section>
  );
}
