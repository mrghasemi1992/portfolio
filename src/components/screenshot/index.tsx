import Image from "next/image";

import styles from "./styles.module.css";

type Props = {
  /** The image's alt text, or the text in the empty slot when there's no image. */
  label: string;
  /** Path under public/. Without it, a striped placeholder shows `label`. */
  src?: string;
  /** How wide the slot is at each screen size, so the browser picks the right file. */
  sizes: string;
  /** Load it right away: for the main image at the top of a page. */
  preload?: boolean;
  /** Size and aspect ratio only; the frame styles live here. */
  className?: string;
};

export default function Screenshot({ label, src, sizes, preload, className }: Props) {
  return (
    <div className={className ? `${styles.frame} ${className}` : styles.frame}>
      {src ? (
        // The wrapper is what the Work panel scales on hover.
        <div className={styles.media}>
          <Image src={src} alt={label} fill sizes={sizes} preload={preload} className={styles.image} />
        </div>
      ) : (
        <div className={styles.placeholder} role="img" aria-label={label}>
          {label}
        </div>
      )}
    </div>
  );
}
