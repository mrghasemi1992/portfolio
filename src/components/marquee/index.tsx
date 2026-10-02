import { Fragment } from "react";

import { marqueeItems } from "@/data";
import styles from "./styles.module.css";

/** A strip of skills scrolling sideways. Decorative: the Skills section lists them all. */
export default function Marquee() {
  // Two copies side by side, so moving the track by half loops seamlessly.
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {items.map((item, i) => (
          <Fragment key={i}>
            <span>{item}</span>
            <span className={styles.star}>✦</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
