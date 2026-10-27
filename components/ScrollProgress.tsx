"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.4 });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div className="scroll-progress" aria-hidden>
      <motion.div className="scroll-progress__bar" style={{ scaleX }} />
    </div>
  );
}
