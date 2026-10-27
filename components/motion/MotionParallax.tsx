"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type MotionParallaxProps = {
  children?: ReactNode;
  className?: string;
  offset?: number;
};

export function MotionParallax({
  children,
  className,
  offset = 80,
}: MotionParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.04]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`motion-parallax ${className ?? ""}`}>
      <motion.div style={{ y, scale }} className="motion-parallax__inner">
        {children}
      </motion.div>
    </div>
  );
}
