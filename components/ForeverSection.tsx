"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/SiteIcons";

export function ForeverSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="forever"
      className="forever-section chapter-section night-section"
      aria-labelledby="forever-heading"
    >
      <div className="section-shell text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.7 }}
        >
          <div className="section-heading">
            <span
              className="icon-badge mx-auto mb-7 text-accent"
              aria-hidden="true"
            >
              <Icon name="infinity" size={28} />
            </span>
            <p className="eyebrow mb-5">The story continues</p>
            <h2 id="forever-heading" className="display-title">
              Forever &amp; Always
            </h2>
          </div>

          <blockquote className="handwritten text-2xl leading-relaxed sm:text-3xl md:text-4xl">
            <span className="block">
              &ldquo;In a world of temporary things,
            </span>
            <span className="block">you are my forever.&rdquo;</span>
          </blockquote>

          <div className="body-copy mt-10 space-y-2 sm:mt-12">
            <p>Thank you for five beautiful years.</p>
            <p>Here's to forever more.</p>
          </div>

          <p className="section-description mt-10 sm:mt-12">
            With all my love,
            <br />
            <span className="handwritten text-accent mt-2 inline-block text-3xl sm:text-4xl">
              James
            </span>
          </p>

          <a
            href="#top"
            className="quiet-button mt-12 inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c697a4] focus-visible:ring-offset-4 focus-visible:ring-offset-[#21151c]"
          >
            <span aria-hidden="true">
              <Icon name="arrow-up" size={18} />
            </span>
            Read our story again
          </a>
        </motion.div>

        <div className="section-rule mt-16 sm:mt-20" aria-hidden="true" />
        <footer className="section-description pt-8 text-sm">
          Made with love, by James for Joanne.
        </footer>
      </div>
    </section>
  );
}
