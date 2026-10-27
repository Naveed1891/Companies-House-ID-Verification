"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

type Step = readonly [number: string, title: string, description: string];

/**
 * Cinematic "How it works" steps driven by GSAP ScrollTrigger:
 * a connecting progress line scrubs with scroll while step cards
 * slide in with depth and the numbers pop one by one.
 */
export function HowItWorksTimeline({ steps }: { steps: readonly Step[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hiw-track__fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            end: "bottom 82%",
            scrub: 0.6,
          },
        },
      );

      gsap.from(".hiw-dot", {
        scale: 0,
        autoAlpha: 0,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.14,
        scrollTrigger: { trigger: root, start: "top 78%" },
      });

      gsap.utils.toArray<HTMLElement>(".hiw-card").forEach((card, index) => {
        gsap.from(card, {
          y: 72,
          autoAlpha: 0,
          rotateX: 7,
          transformPerspective: 900,
          transformOrigin: "top center",
          duration: 0.95,
          ease: "power3.out",
          delay: index * 0.09,
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      gsap.from(".hiw-num", {
        scale: 0.4,
        autoAlpha: 0,
        duration: 0.7,
        ease: "back.out(1.8)",
        stagger: 0.14,
        scrollTrigger: { trigger: root, start: "top 74%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <div className="hiw-track" aria-hidden>
        <span className="hiw-track__base" />
        <span className="hiw-track__fill" />
        <div className="hiw-dots">
          {steps.map(([number]) => (
            <span key={number} className="hiw-dot" />
          ))}
        </div>
      </div>
      <div className="hiw-grid responsive-grid grid grid-cols-1 gap-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-2 xl:grid-cols-4">
        {steps.map(([number, title, description]) => (
          <article
            key={number}
            className="hiw-card card premium-card p-[clamp(1.5rem,3vw,1.875rem)]"
            data-cursor-hover
          >
            <p className="hiw-num m-0 mb-[18px] font-serif text-[34px] font-medium text-orange-accent">
              {number}
            </p>
            <p className="m-0 mb-2.5 text-[17.5px] font-extrabold">{title}</p>
            <p className="m-0 text-[14.5px] leading-[1.7] text-muted-text">{description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
