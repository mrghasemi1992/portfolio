import styles from "./styles.module.css";

type Props = {
  /** Shown in the empty slot until the real image is added. */
  label: string;
  /** Size and aspect ratio only; the frame styles live here. */
  className?: string;
};

// TODO: swap the placeholder for next/image once the screenshots exist.
export default function Screenshot({ label, className }: Props) {
  return (
    <div className={className ? `${styles.frame} ${className}` : styles.frame}>
      <div className={styles.placeholder} role="img" aria-label={label}>
        {label}
      </div>
    </div>
  );
}
