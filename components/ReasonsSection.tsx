"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@/components/SiteIcons";
import { storyEase, storyMotion } from "@/lib/motion";

const reasons = [
  {
    front: "You notice the small things I forget.",
    back: "Like how you always remember which side of the bed I prefer, or that I need a moment of quiet in the morning before I can talk.",
  },
  {
    front: "You're soft with me even when you're angry.",
    back: "Even in our worst moments, you never make me feel small. You fight fair, and you always come back.",
  },
  {
    front: "You feel like home, not excitement I have to chase.",
    back: "Being with you doesn't drain me. It fills me up. You're my safe place.",
  },
  {
    front: "You let me be quiet.",
    back: "You don't need me to perform or entertain. You're okay with my silence, and that means everything.",
  },
  {
    front: "You make me want to be better.",
    back: "Not because you demand it, but because you inspire it just by being you.",
  },
  {
    front: "You choose me, even on hard days.",
    back: "When I'm difficult, when I'm distant, when I'm too much or not enough - you stay.",
  },
];

export function ReasonsSection() {
  const reduceMotion = useReducedMotion();
  const { item, group } = storyMotion(reduceMotion);

  return (
    <section
      id="reasons"
      className="chapter-section night-section"
      aria-labelledby="reasons-heading"
    >
      <div className="section-shell">
        <motion.div
          className="section-heading"
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.p variants={item} className="eyebrow mb-5">
            The everyday kind of love
          </motion.p>
          <motion.h2
            variants={item}
            id="reasons-heading"
            className="display-title mb-6"
          >
            Why I Still Choose You
          </motion.h2>
          <motion.p variants={item} className="section-description">
            Tap each card to read more
          </motion.p>
        </motion.div>

        <div className="reasons-grid grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <ReasonCard key={reason.front} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonCard({
  reason,
  index,
}: {
  reason: (typeof reasons)[0];
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const reduceMotion = useReducedMotion();
  const { item } = storyMotion(reduceMotion);
  const detailId = `reason-detail-${index + 1}`;

  return (
    <motion.div
      variants={item}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.button
        type="button"
        className={`night-card interactive-card flex min-h-[260px] w-full flex-col items-start p-6 text-left transition-colors sm:p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c697a4] focus-visible:ring-offset-4 focus-visible:ring-offset-[#21151c] ${isFlipped ? "border-[#c697a4]/60" : "hover:border-[#c697a4]/40"}`}
        whileHover={reduceMotion ? undefined : { y: -4 }}
        whileTap={reduceMotion ? undefined : { scale: 0.99 }}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: storyEase }}
        aria-expanded={isFlipped}
        aria-controls={detailId}
        aria-labelledby={`reason-title-${index + 1}`}
        onClick={() => setIsFlipped((previous) => !previous)}
      >
        <span className="mb-7 flex w-full items-center justify-between">
          <span className="eyebrow">
            Reason {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-accent" aria-hidden="true">
            <Icon name="heart" size={20} />
          </span>
        </span>

        <span
          id={`reason-title-${index + 1}`}
          className="block font-serif text-2xl leading-snug"
        >
          {reason.front}
        </span>

        <span id={detailId} className="block w-full" aria-hidden={!isFlipped}>
          <AnimatePresence initial={false}>
            {isFlipped && (
              <motion.span
                key="detail"
                className="block overflow-hidden"
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.25,
                  ease: storyEase,
                }}
              >
                <span className="body-copy mt-5 block border-t border-[#f4ede2]/15 pt-5">
                  {reason.back}
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <span className="section-description mt-auto flex items-center gap-2 pt-7 text-sm">
          {isFlipped ? "Show less" : "Read more"}
          <span aria-hidden="true">
            <Icon name={isFlipped ? "arrow-up" : "arrow-down"} size={16} />
          </span>
        </span>
      </motion.button>
    </motion.div>
  );
}
