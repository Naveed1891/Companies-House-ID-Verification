"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion-config";

const lineTransition = (delay: number) => ({
  duration: 0.95,
  ease: easeOutExpo,
  delay,
});

/**
 * Hero headline with line-by-line mask reveal and a refined
 * clip-path wipe on the orange "confidence" word.
 */
export function HeroHeadline() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <h1 className="hero-section__title display mb-[22px]">
        Complete your Companies House identity verification with{" "}
        <em className="text-emerald not-italic">confidence</em>
      </h1>
    );
  }

  return (
    <h1 className="hero-section__title display mb-[22px]">
      <span className="hero-line">
        <motion.span
          className="hero-line__inner"
          initial={{ y: "112%" }}
          animate={{ y: "0%" }}
          transition={lineTransition(0.18)}
        >
          Complete your Companies House
        </motion.span>
      </span>
      {" "}
      <span className="hero-line">
        <motion.span
          className="hero-line__inner"
          initial={{ y: "112%" }}
          animate={{ y: "0%" }}
          transition={lineTransition(0.3)}
        >
          identity verification
        </motion.span>
      </span>
      {" "}
      <span className="hero-line">
        <motion.span
          className="hero-line__inner"
          initial={{ y: "112%" }}
          animate={{ y: "0%" }}
          transition={lineTransition(0.42)}
        >
          with{" "}
          <span className="hero-confidence">
            <motion.em
              className="text-emerald not-italic"
              initial={{ clipPath: "inset(0 100% -0.2em 0)" }}
              animate={{ clipPath: "inset(0 0% -0.2em 0)" }}
              transition={{ duration: 0.85, ease: easeOutExpo, delay: 1.05 }}
            >
              confidence
            </motion.em>
            <motion.span
              className="hero-confidence__underline"
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 1.55 }}
            />
          </span>
        </motion.span>
      </span>
    </h1>
  );
}
