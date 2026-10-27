"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { easeOutExpo } from "@/lib/motion-config";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts from 0 to `value` when scrolled into view. */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  // Start at the real value so the server render, the pre-hydration paint and
  // reduced-motion users never see a misleading "0" (a price of £0 next to a
  // struck-through regular price reads as "£00"). The count-up begins only
  // once the element scrolls into view.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    const controls = animate(0, value, {
      duration,
      ease: easeOutExpo,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  // Reduced motion skips the tween entirely - always show the real value.
  const shown = reduceMotion ? value : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
