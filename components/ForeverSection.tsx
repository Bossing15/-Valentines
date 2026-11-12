"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/SiteIcons";
import { storyMotion } from "@/lib/motion";

export function ForeverSection() {
  const reduceMotion = useReducedMotion();
  const { item, group } = storyMotion(reduceMotion);

  return (
    <section
      id="forever"
      className="forever-section chapter-section night-section"
      aria-labelledby="forever-heading"
    >
      <div className="section-shell text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="section-heading"
          >
            <motion.span
              variants={item}
              className="icon-badge mx-auto mb-7 text-accent"
              aria-hidden="true"
            >
              <Icon name="infinity" size={28} />
            </motion.span>
            <motion.p variants={item} className="eyebrow mb-5">
              The story continues
            </motion.p>
            <motion.h2
              variants={item}
              id="forever-heading"
              className="display-title"
            >
              Forever &amp; Always
            </motion.h2>
          </motion.div>

          <motion.blockquote
            variants={item}
            className="handwritten text-2xl leading-relaxed sm:text-3xl md:text-4xl"
          >
            <span className="block">
              &ldquo;In a world of temporary things,
            </span>
            <span className="block">you are my forever.&rdquo;</span>
          </motion.blockquote>

          <motion.div
            variants={item}
            className="body-copy mt-10 space-y-2 sm:mt-12"
          >
            <p>Thank you for five beautiful years.</p>
            <p>Here's to forever more.</p>
          </motion.div>

          <motion.p
            variants={item}
            className="section-description mt-10 sm:mt-12"
          >
            With all my love,
            <br />
            <span className="handwritten text-accent mt-2 inline-block text-3xl sm:text-4xl">
              James
            </span>
          </motion.p>

          <motion.a
            variants={item}
            href="#top"
            className="quiet-button mt-12 inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c697a4] focus-visible:ring-offset-4 focus-visible:ring-offset-[#21151c]"
          >
            <span aria-hidden="true">
              <Icon name="arrow-up" size={18} />
            </span>
            Read our story again
          </motion.a>
        </motion.div>

        <div className="section-rule mt-16 sm:mt-20" aria-hidden="true" />
        <footer className="section-description pt-8 text-sm">
          Made with love, by James for Joanne.
        </footer>
      </div>
    </section>
  );
}
