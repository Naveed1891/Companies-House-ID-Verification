"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type TargetAndTransition } from "framer-motion";
import type { ReactNode } from "react";
import { tweenPremium, viewportConfig } from "@/lib/motion-config";

type Direction = "up" | "down" | "left" | "right" | "scale" | "blur";

const hiddenByDirection: Record<Direction, TargetAndTransition> = {
  up: { opacity: 0, y: 56 },
  down: { opacity: 0, y: -56 },
  left: { opacity: 0, x: -64 },
  right: { opacity: 0, x: 64 },
  scale: { opacity: 0, scale: 0.92 },
  blur: { opacity: 0, y: 40, filter: "blur(10px)" },
};

const visibleByDirection: Record<Direction, TargetAndTransition> = {
  up: { opacity: 1, y: 0 },
  down: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  blur: { opacity: 1, y: 0, filter: "blur(0px)" },
};

type MotionInViewProps = Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition" | "children"> & {
  direction?: Direction;
  delay?: number;
  children?: ReactNode;
};

export function MotionInView({
  children,
  direction = "up",
  delay = 0,
  className,
  ...props
}: MotionInViewProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={hiddenByDirection[direction]}
      whileInView={visibleByDirection[direction]}
      viewport={viewportConfig}
      transition={{ ...tweenPremium, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
