"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export type Faq = { q: string; a: string };

export function FaqAccordion({ items, initialOpen = 0 }: { items: Faq[]; initialOpen?: number }) {
  const [open, setOpen] = useState(initialOpen);
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q} className="faq-item overflow-hidden rounded-[10px] border border-soft-border bg-white">
            <div className="m-0">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 border-0 bg-transparent px-[22px] py-5 text-left text-base font-bold text-charcoal"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                {item.q}
                <motion.span
                  className="shrink-0 text-lg font-normal text-emerald"
                  aria-hidden="true"
                  animate={{ rotate: expanded ? 45 : 0 }}
                  transition={
                    reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 22 }
                  }
                >
                  +
                </motion.span>
              </button>
            </div>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="content"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="m-0 px-[22px] pb-[22px] text-[15px] leading-[1.75] text-muted-text">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
