"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/SiteIcons";
import { storyEase, storyMotion } from "@/lib/motion";

const promises = [
  {
    icon: "sun",
    title: "Every Morning",
    promise:
      "I promise to choose you, every single day, even on the hard ones.",
  },
  {
    icon: "linked",
    title: "Through Everything",
    promise:
      "I promise to stand by you, through every storm and every sunshine.",
  },
  {
    icon: "listen",
    title: "Always Listen",
    promise: "I promise to hear you, not just your words, but your heart.",
  },
  {
    icon: "leaf",
    title: "Grow Together",
    promise: "I promise to grow with you, not apart, no matter how we change.",
  },
  {
    icon: "smile",
    title: "Make You Smile",
    promise: "I promise to make you laugh, especially when you need it most.",
  },
  {
    icon: "home",
    title: "Be Your Home",
    promise: "I promise to be your safe place, always and forever.",
  },
] as const;

export function PromisesSection() {
  const reduceMotion = useReducedMotion();
  const { item, group } = storyMotion(reduceMotion);

  return (
    <section
      id="promises"
      className="chapter-section night-section"
      aria-labelledby="promises-heading"
    >
      <div className="section-shell">
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="section-heading"
        >
          <motion.p variants={item} className="eyebrow mb-5">
            The vows I mean
          </motion.p>
          <motion.h2
            variants={item}
            id="promises-heading"
            className="display-title mb-6"
          >
            My Promises to You
          </motion.h2>
          <motion.p variants={item} className="section-description">
            These are the vows I make to you, today and always
          </motion.p>
        </motion.div>

        <div className="promises-grid grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {promises.map((promise, index) => (
            <motion.div
              key={promise.title}
              variants={item}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.22,
                  ease: storyEase,
                }}
                className="night-card interactive-card h-full min-h-[280px] p-6 sm:p-8"
                aria-labelledby={`promise-title-${index + 1}`}
              >
                <div className="mb-7 flex items-center justify-between">
                  <span className="icon-badge text-accent" aria-hidden="true">
                    <Icon name={promise.icon} size={22} />
                  </span>
                  <span className="eyebrow">
                    {String(index + 1).padStart(2, "0")} / 06
                  </span>
                </div>
                <h3
                  id={`promise-title-${index + 1}`}
                  className="mb-4 font-serif text-2xl leading-snug"
                >
                  {promise.title}
                </h3>
                <p className="body-copy">&ldquo;{promise.promise}&rdquo;</p>
              </motion.article>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto mt-14 max-w-2xl text-center sm:mt-16"
        >
          <div className="section-rule mb-8" aria-hidden="true" />
          <blockquote className="handwritten text-2xl leading-relaxed sm:text-3xl">
            &ldquo;These aren't just words. They're my commitment to us.&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
