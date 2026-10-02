import { ViewTransition, type ReactNode } from "react";

const directions = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

/**
 * Slides a page's content left when a link tagged "nav-forward" opens it and
 * right for "nav-back" (animations in globals.css). Untagged navigations, like
 * the browser's back button, swap without a slide. It belongs in each page,
 * not the layout, because a layout never enters or exits.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directions} exit={directions} default="none">
      {children}
    </ViewTransition>
  );
}
