"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** How strongly the wrapper is pulled towards the cursor (0–1). */
  strength?: number;
};

/**
 * Wraps a button/link and pulls it gently towards the cursor while hovered,
 * releasing with an elastic snap. Inert on touch devices and reduced motion.
 */
export function MagneticButton({ children, className = "", strength = 0.35 }: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return undefined;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}
