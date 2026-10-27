export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const springSoft = {
  type: "spring" as const,
  stiffness: 90,
  damping: 22,
  mass: 0.8,
};

export const tweenPremium = {
  duration: 0.85,
  ease: easeOutExpo,
};

export const staggerFast = 0.09;
export const staggerMedium = 0.12;

export const viewportConfig = {
  once: true,
  margin: "-10% 0px -8% 0px" as const,
  amount: 0.2 as const,
};
