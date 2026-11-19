"use client";

import type { MouseEvent, ReactNode } from "react";

type Props = {
  className?: string;
  /** <details> elements that share a `name`, so only one is open at a time. */
  children: ReactNode;
};

/**
 * Keeps a clicked row where it was. Opening one <details> closes the open one,
 * and when that one is above, the page shrinks above the row and the row jumps
 * up, often off screen. Here the click opens the row itself, then scrolls the
 * page back by however far the row moved, all before the browser paints.
 * Before this script loads, the rows still open and close natively.
 */
export default function Accordion({ className, children }: Props) {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const summary = (e.target as Element).closest("summary");
    const details = summary?.parentElement;
    if (!summary || !(details instanceof HTMLDetailsElement)) return;
    e.preventDefault();
    const before = summary.getBoundingClientRect().top;
    // Opening also closes the other rows with the same `name`, right away.
    details.open = !details.open;
    const shift = summary.getBoundingClientRect().top - before;
    // "instant": <html> has smooth scrolling, which would show the jump.
    if (Math.abs(shift) > 1) window.scrollBy({ top: shift, behavior: "instant" });
  };

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}
