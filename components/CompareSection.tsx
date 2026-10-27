"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo, viewportConfig } from "@/lib/motion-config";
import { MotionInView } from "./motion/MotionInView";
import { MotionSection } from "./motion/MotionSection";

/**
 * Competitors shown in the "Compare us" row. Clicking a pill opens ChatGPT in a
 * new tab with a short comparison query anchored on companieshouseidverification.com. The `?q=`
 * parameter makes ChatGPT auto-run the query.
 */
const competitors = [
  "1st Formations",
  "Icon Offices",
  "Your Company Formations",
  "Mint Formations",
  "Rapid Formations",
];

function compareUrl(company: string): string {
  const prompt = `"companieshouseidverification.com" Companies House ID Verification vs ${company}`;
  return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}

export function CompareSection() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionSection className="border-b border-soft-border bg-warm-cream" index={1}>
      <div className="site-container section text-center">
        <MotionInView direction="up" className="reading-copy mx-auto">
          <p className="eyebrow">Compare us</p>
          <h2 className="section-title m-0">
            See How <span className="text-orange-accent">Companies House ID Verification</span> Compares
          </h2>
        </MotionInView>

        <motion.div
          className="mt-[clamp(2rem,4vw,3rem)] flex flex-wrap items-center justify-center gap-3.5"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
          }}
        >
          {competitors.map((company) => (
            <motion.a
              key={company}
              href={compareUrl(company)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              aria-label={`Compare Companies House ID Verification with ${company} on ChatGPT (opens in a new tab)`}
              className="inline-flex items-center whitespace-nowrap rounded-full border border-soft-border bg-white px-6 py-3 text-[15px] font-bold text-charcoal no-underline shadow-card transition-[background-color,border-color,color,box-shadow] duration-300 hover:border-orange-accent hover:bg-orange-accent hover:text-white"
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOutExpo } },
              }}
              whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.25, ease: easeOutExpo } }}
            >
              {company}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
