"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerFast, tweenPremium, viewportConfig } from "@/lib/motion-config";
import { Children, isValidElement, type ReactNode } from "react";

type MotionStaggerProps = {
  children?: ReactNode;
  className?: string;
  stagger?: number;
  childClassName?: string;
};

export function MotionStagger({
  children,
  className,
  stagger = staggerFast,
  childClassName,
}: MotionStaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const items = Children.toArray(children).filter(isValidElement);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.05 },
        },
      }}
    >
      {items.map((child, index) => (
        <motion.div
          key={child.key ?? index}
          className={childClassName}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: tweenPremium,
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

type MotionStaggerItemProps = {
  children?: ReactNode;
  className?: string;
};

export function MotionStaggerItem({ children, className }: MotionStaggerItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: tweenPremium },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerGroup({
  children,
  className,
  stagger = staggerFast,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}
