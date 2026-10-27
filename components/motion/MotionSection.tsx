"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo, springSoft, staggerMedium } from "@/lib/motion-config";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  index?: number;
};

export function MotionSection({ children, className = "", index = 0 }: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className={`motion-section ${className}`}
      data-section-index={index}
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={reduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
    >
      {!reduceMotion && (
        <motion.span
          className="motion-section__line"
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.1 }}
        />
      )}
      <div className="motion-section__inner">{children}</div>
    </motion.section>
  );
}

export function MotionHeroIntro({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerMedium, delayChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionHeroItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 48, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { ...springSoft },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionHeroSlider({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9, y: 32 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ ...springSoft, delay: 0.35 }}
    >
      {children}
    </motion.div>
  );
}
