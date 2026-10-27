"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { springSoft } from "@/lib/motion-config";

type MotionButtonProps = {
  children: ReactNode;
  className?: string;
};

export function MotionButton({ children, className }: MotionButtonProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={`motion-button-wrap inline-block ${className ?? ""}`}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={springSoft}
    >
      {children}
    </motion.span>
  );
}
