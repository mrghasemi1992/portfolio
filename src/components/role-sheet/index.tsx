"use client";

import { useId, useRef, useState } from "react";

import type { Job } from "@/data";
import styles from "./styles.module.css";

type Props = {
  job: Job;
  label: string;
  className?: string;
};

// Matches the closing animation in styles.module.css.
const CLOSE_MS = 240;

/** A button that opens every resume bullet of one job in a full-screen dialog. */
export default function RoleSheet({ job, label, className }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [closing, setClosing] = useState(false);

  const open = () => {
    setClosing(false);
    ref.current?.showModal();
  };

  const close = () => {
    const dialog = ref.current;
    if (!dialog) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      return;
    }
    setClosing(true);
    window.setTimeout(() => {
      dialog.close();
      setClosing(false);
    }, CLOSE_MS);
  };

  return (
    <>
      <button
        type="button"
        className={className ? `${styles.trigger} ${className}` : styles.trigger}
        aria-haspopup="dialog"
        onClick={open}
      >
        {label}
      </button>
      <dialog
        ref={ref}
        className={closing ? `${styles.sheet} ${styles.closing}` : styles.sheet}
        aria-labelledby={titleId}
        // Escape closes through the same animated path.
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
      >
        <div className={styles.bar}>
          <div className={styles.barInner}>
            <button type="button" className={styles.back} onClick={close}>
              ← Back
            </button>
            <span className={styles.period}>{job.period}</span>
          </div>
        </div>
        <div className={styles.body}>
          <h2 id={titleId} className={styles.title}>
            {job.company}
          </h2>
          <p className={styles.role}>{job.role}</p>
          <ul className={styles.bullets}>
            {job.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
