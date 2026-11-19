import Image from "next/image";
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

/**
 * Black and white with a little contrast and film grain, kept to the photo's
 * own shape by its alpha. Used by `.portraitImage` as `filter: url(#portrait-grain)`.
 */
function GrainFilter() {
  return (
    <svg className={styles.defs} aria-hidden="true" focusable="false">
      <filter id="portrait-grain" colorInterpolationFilters="sRGB">
        <feColorMatrix
          in="SourceGraphic"
          type="saturate"
          values="0"
          result="mono"
        />
        <feComponentTransfer in="mono" result="contrast">
          <feFuncR type="linear" slope="1.12" intercept="-0.04" />
          <feFuncG type="linear" slope="1.12" intercept="-0.04" />
          <feFuncB type="linear" slope="1.12" intercept="-0.04" />
        </feComponentTransfer>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
        />
        {/* Grey noise at 35% opacity. */}
        <feColorMatrix
          type="matrix"
          values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0 0.35"
          result="noise"
        />
        <feBlend in="noise" in2="contrast" mode="overlay" result="grainy" />
        <feComposite in="grainy" in2="SourceGraphic" operator="in" />
      </filter>
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <GrainFilter />
      <div className={styles.portrait}>
        <Image
          className={styles.portraitImage}
          src={profile.portrait.src}
          alt={profile.portrait.alt}
          sizes="(max-width: 760px) 92vw, 790px"
          preload
        />
      </div>
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
    </section>
  );
}
