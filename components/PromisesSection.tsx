"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/SiteIcons";

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

  return (
    <section
      id="promises"
      className="chapter-section night-section"
      aria-labelledby="promises-heading"
    >
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="section-heading"
        >
          <p className="eyebrow mb-5">The vows I mean</p>
          <h2 id="promises-heading" className="display-title mb-6">
            My Promises to You
          </h2>
          <p className="section-description">
            These are the vows I make to you, today and always
          </p>
        </motion.div>

        <div className="promises-grid grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {promises.map((promise, index) => (
            <motion.article
              key={promise.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : index * 0.04,
              }}
              className="night-card min-h-[280px] p-6 sm:p-8"
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
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
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
