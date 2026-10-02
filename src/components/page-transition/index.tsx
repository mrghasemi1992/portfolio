import { ViewTransition } from "react";

const directions = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

/**
 * Starts a view transition, tagged "nav-forward" or "nav-back" by the link,
 * whenever the page changes. The slide itself is drawn on the root snapshot in
 * globals.css, which is only one screen in size.
 *
 * It wraps an empty marker, not the page: wrapping <main> made the browser
 * snapshot the whole page (the home page is ~7800px tall), which dropped frames
 * on phones. Render it in each page, not the layout, because a layout never
 * enters or exits.
 */
export default function PageTransition() {
  return (
    <ViewTransition enter={directions} exit={directions} default="none">
      <span className="sr-only" />
    </ViewTransition>
  );
}
