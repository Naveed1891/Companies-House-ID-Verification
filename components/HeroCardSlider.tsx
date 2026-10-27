"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { useInView } from "react-intersection-observer";

const SLIDE_INTERVAL_MS = 4200;

const slides = [
  {
    step: "Step 1 of 4",
    title: "Check if verification applies",
    text: "Confirm whether you are a director, PSC, LLP member or company filer who needs Companies House identity verification.",
    badge: "Eligibility check",
    visualType: "image" as const,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Professional reviewing compliance checklist for identity verification eligibility",
  },
  {
    step: "Step 2 of 4",
    title: "Upload identity documents",
    text: "Securely upload your passport or national ID with clear document guidance.",
    badge: "Document upload",
    visualType: "image" as const,
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Passport and identity documents prepared for secure verification upload",
  },
  {
    step: "Step 3 of 4",
    title: "Complete liveness check",
    text: "Confirm facial likeness through a secure guided verification process.",
    badge: "Liveness verified",
    visualType: "image" as const,
    image:
      "https://images.unsplash.com/photo-1573164713714-d95e436fb8e6?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Professional completing secure facial identity verification on a device",
  },
  {
    step: "Step 4 of 4",
    title: "Receive your personal code",
    text: "Track progress and receive your Companies House personal code when verification is complete.",
    badge: "Code issued",
    visualType: "personal-code" as const,
    imageAlt: "Companies House personal code issued with verification complete",
  },
] as const;

type Slide = (typeof slides)[number];

/** Visual pose for each depth position in the deck (0 = front). */
const depthPoses = [
  { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 },
  { x: 36, y: -28, scale: 0.94, opacity: 0.55, rotate: 2.5 },
  { x: 66, y: -52, scale: 0.88, opacity: 0.26, rotate: 5 },
  { x: -18, y: 34, scale: 0.9, opacity: 0, rotate: -3 },
] as const;

const depthZ = [40, 30, 20, 10] as const;

function isImageSlide(slide: Slide): slide is Slide & { visualType: "image"; image: string } {
  return slide.visualType === "image";
}

function PersonalCodeVisual() {
  const checks = [
    "Identity verified",
    "Documents approved",
    "Liveness confirmed",
    "Personal code issued",
  ] as const;

  return (
    <div className="hero-slider__code-visual">
      <div className="hero-slider__code-panel">
        <div className="hero-slider__code-top">
          <span className="hero-slider__code-shield" aria-hidden="true">
            ✓
          </span>
          <div className="hero-slider__code-heading">
            <p className="hero-slider__code-label">Companies House Personal Code</p>
            <p className="hero-slider__code-value">XKJ4-••••-2223</p>
          </div>
        </div>
        <div className="hero-slider__code-divider" aria-hidden="true" />
        <p className="hero-slider__code-status">
          <span className="hero-slider__code-status-dot" aria-hidden="true" />
          Status: Code issued
        </p>
      </div>

      <div className="hero-slider__code-progress">
        <div className="hero-slider__code-progress-head">
          <span>Verification progress</span>
          <span className="hero-slider__code-progress-pct">100%</span>
        </div>
        <div className="hero-slider__code-bar" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
          <div className="hero-slider__code-bar-fill" />
        </div>
        <p className="hero-slider__code-step">Step 4 of 4 complete</p>
      </div>

      <ul className="hero-slider__code-checks">
        {checks.map((item) => (
          <li key={item}>
            <span className="hero-slider__code-check-icon" aria-hidden="true">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HeroCardSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const reduceMotion = useReducedMotion();
  const { ref: viewRef, inView } = useInView({ threshold: 0.2 });

  // Cursor-follow tilt + gravity drift on the whole deck.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltSpring = { stiffness: 120, damping: 18, mass: 0.7 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), tiltSpring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), tiltSpring);
  const driftX = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), tiltSpring);
  const driftY = useSpring(useTransform(py, [-0.5, 0.5], [-8, 8]), tiltSpring);

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    px.set(0);
    py.set(0);
    setPaused(false);
  };

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (paused || !inView) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, inView]);

  const cardTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 170, damping: 26, mass: 0.9 };

  return (
    <div
      ref={viewRef}
      className="hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-roledescription="carousel"
      aria-label="Verification process steps"
    >
      <motion.div
        className="hero-slider__stack"
        style={
          reduceMotion
            ? undefined
            : { rotateX, rotateY, x: driftX, y: driftY, transformPerspective: 1100 }
        }
        aria-live="polite"
      >
        <div className="hero-slider__layer hero-slider-float" aria-hidden="true" />

        {slides.map((slide, index) => {
          const depth = (index - activeIndex + slides.length) % slides.length;
          const pose = depthPoses[Math.min(depth, depthPoses.length - 1)];
          const isActive = depth === 0;
          const isPersonalCode = slide.visualType === "personal-code";
          const showFallback = !isPersonalCode && imageErrors[index];

          return (
            <div key={slide.title} className="hero-slider__slot" style={{ zIndex: depthZ[depth] }}>
              <motion.article
                className="hero-slider__card"
                initial={false}
                animate={{ ...pose }}
                transition={cardTransition}
                style={{ pointerEvents: isActive ? "auto" : "none" }}
                aria-hidden={!isActive}
                data-cursor-hover={isActive ? "" : undefined}
              >
                <div className={`hero-slider__image-wrap ${isPersonalCode ? "hero-slider__image-wrap--code" : ""}`}>
                  {isPersonalCode ? (
                    <PersonalCodeVisual />
                  ) : showFallback ? (
                    <div className="hero-slider__fallback" role="img" aria-label={slide.imageAlt}>
                      <span className="hero-slider__fallback-icon" aria-hidden="true">
                        ✓
                      </span>
                      <p className="hero-slider__fallback-label">Identity verification</p>
                    </div>
                  ) : isImageSlide(slide) ? (
                    <motion.div
                      className="hero-slider__image-zoom"
                      initial={false}
                      animate={{ scale: isActive ? 1 : 1.1 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
                      }
                    >
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 92vw, 420px"
                        className="object-cover"
                        priority={index === 0}
                        onError={() => setImageErrors((prev) => ({ ...prev, [index]: true }))}
                      />
                    </motion.div>
                  ) : null}
                  {!isPersonalCode && <div className="hero-slider__image-overlay" />}
                  <span className="hero-slider__badge">{slide.badge}</span>
                  <span className="hero-slider__step-pill">{slide.step}</span>
                </div>

                <div className="hero-slider__body">
                  <h2 className="hero-slider__title">{slide.title}</h2>
                  <p className="hero-slider__text">{slide.text}</p>
                </div>
              </motion.article>
            </div>
          );
        })}
      </motion.div>

      <div className="hero-slider__dots" role="tablist" aria-label="Verification steps">
        {slides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`${item.step}: ${item.title}`}
            className={`hero-slider__dot ${index === activeIndex ? "hero-slider__dot--active" : ""}`}
            onClick={() => goToSlide(index)}
          >
            {index === activeIndex && (
              <motion.span
                className="hero-slider__dot-fill"
                layoutId="hero-slider-dot"
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
