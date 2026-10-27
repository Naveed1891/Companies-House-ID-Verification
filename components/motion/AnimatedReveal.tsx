"use client";

import type { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type Direction = "up" | "down" | "left" | "right" | "scale" | "blur";

type AnimatedRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  /** Delay in milliseconds before the reveal transition starts. */
  delay?: number;
  /** When true, children reveal one-by-one with a CSS stagger. */
  stagger?: boolean;
};

/**
 * IntersectionObserver-driven reveal (react-intersection-observer).
 * Toggles the CSS `.reveal` classes defined in globals.css.
 */
export function AnimatedReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  stagger = false,
}: AnimatedRevealProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
    rootMargin: "0px 0px -8% 0px",
  });

  const base = stagger ? "reveal reveal-stagger" : `reveal reveal--${direction}`;

  return (
    <div
      ref={ref}
      className={`${base} ${inView ? "reveal--visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
