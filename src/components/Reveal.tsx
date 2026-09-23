"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import { gsap, prefersReducedMotion, registerScroll } from "@/lib/motion";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds of delay, used to stagger neighbouring items. */
  delay?: number;
  id?: string;
};

/** Fades and lifts its children once they enter the viewport. */
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    registerScroll();
    const animation = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [delay]);

  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
