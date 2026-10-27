"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { MotionInView } from "./MotionInView";

/**
 * Homepage closing CTA: charcoal depth background, parallax glow orbs,
 * scroll-triggered text reveal and magnetic CTA buttons.
 */
export function FinalCtaSection({ priceLabel = "£19" }: { priceLabel?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const orbA = useTransform(scrollYProgress, [0, 1], [110, -110]);
  const orbB = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const reduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="home-final-cta">
      {!reduceMotion && (
        <>
          <motion.span className="home-final-cta__orb home-final-cta__orb--a" style={{ y: orbA }} aria-hidden />
          <motion.span className="home-final-cta__orb home-final-cta__orb--b" style={{ y: orbB }} aria-hidden />
        </>
      )}
      <div className="site-container relative z-10 py-[clamp(4rem,8vw,8.5rem)] text-center">
        <MotionInView direction="blur" className="reading-copy mx-auto">
          <p className="eyebrow">Get started</p>
          <h2 className="section-title mb-4 text-white">Ready to complete your identity verification?</h2>
          <p className="body-copy m-0 mb-9 text-white/70">
            A guided process, a fixed {priceLabel} fee, and support wherever you are in the world.
          </p>
          <div className="button-row flex flex-wrap justify-center gap-3.5">
            <MagneticButton>
              <Link href="/checkout" className="button button-primary">
                Begin Your Verification
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <Link href="/requirements" className="button home-final-cta__secondary">
                Check requirements
              </Link>
            </MagneticButton>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}
