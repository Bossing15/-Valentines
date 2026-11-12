"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/SiteIcons";
import { storyMotion } from "@/lib/motion";

export function LandingSection({ ready = true }: { ready?: boolean }) {
  const reduced = useReducedMotion();
  const { item, group } = storyMotion(reduced);
  return (
    <section
      id="top"
      className="landing-section"
      aria-labelledby="landing-title"
    >
      <div className="hero-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-flower hero-flower-left" aria-hidden="true">
        <Botanical />
      </div>
      <div className="hero-flower hero-flower-right" aria-hidden="true">
        <Botanical />
      </div>
      <motion.div
        className="hero-content section-shell"
        variants={group}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
      >
        <motion.p variants={item} className="eyebrow hero-eyebrow">
          <span className="tiny-rule" /> A little love, a whole lot of us{" "}
          <span className="tiny-rule" />
        </motion.p>
        <motion.h1 variants={item} id="landing-title" className="hero-title">
          Almost five years ago,
          <br />I met my <em>favorite person.</em>
        </motion.h1>
        <motion.p variants={item} className="hero-description">
          This is just a small reminder of why
          <br className="desktop-break" /> I still choose you.
        </motion.p>
        <motion.a
          variants={item}
          href="#story"
          className="rose-button hero-button"
        >
          Turn the first page <Icon name="arrow-down" size={17} />
        </motion.a>
      </motion.div>
      <div className="hero-footnote section-shell">
        <span>EST. 2021</span>
        <Icon name="heart" size={18} />
        <span>STILL CHOOSING YOU</span>
      </div>
    </section>
  );
}

function Botanical() {
  return (
    <svg
      viewBox="0 0 200 360"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M98 350C85 260 123 183 103 78M98 303C54 302 25 274 25 254c37-5 71 14 73 49ZM100 261c48-8 66-41 62-64-35 8-58 28-62 64ZM104 215c-44-6-60-40-56-62 37 5 54 27 56 62ZM107 163c39-8 53-35 50-56-29 5-48 24-50 56Z" />
      <path d="M103 83c-27-1-38-21-30-35 7-13 25-9 30 5-8-27 3-49 18-43s11 29-7 42c22-16 42-8 40 6s-21 22-40 17c14 13 13 34-1 36s-18-12-10-28Z" />
      <circle cx="106" cy="66" r="7" />
      <path d="M31 254c16 15 42 30 67 49m64-106c-20 20-45 44-62 64M48 153c17 20 34 46 56 62m53-108c-16 22-31 39-50 56" />
    </svg>
  );
}
