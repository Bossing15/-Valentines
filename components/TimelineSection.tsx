"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@/components/SiteIcons";
import { storyMotion } from "@/lib/motion";

const timelineData = [
  {
    year: "Year One",
    period: "2021",
    title: "The beginning of us.",
    reflection:
      "Everything was new. Every conversation felt like discovering a secret. We were learning each other's rhythms, and somehow, it all felt easy.",
    image: "/pictures/year_one.jpg",
    aspectRatio: 1536 / 3232,
    sticker: "/pictures/dubu1.gif",
  },
  {
    year: "Year Two",
    period: "2022",
    title: "A little closer, a little stronger.",
    reflection:
      "We learned how to argue, how to forgive, and how to sit in silence together. Somehow, that made everything stronger.",
    image: "/pictures/year_two.jpg",
    aspectRatio: 3232 / 1536,
    sticker: "/pictures/output-onlinegiftools 3.gif",
  },
  {
    year: "Year Three",
    period: "2023",
    title: "Somewhere that felt like home.",
    reflection:
      "The year we stopped trying to impress each other and started just being. Comfortable. Safe. Home.",
    image: "/pictures/year_three.jpg",
    aspectRatio: 3264 / 2448,
    sticker: "/pictures/output-onlinegiftools 4.gif",
  },
  {
    year: "Year Four",
    period: "2024",
    title: "Growing into something deeper.",
    reflection:
      "We grew. Not apart, but deeper. We faced things together that I never thought I could face with anyone.",
    image: "/pictures/year_four.jpg",
    // The source's EXIF orientation rotates its stored 720 × 960 dimensions.
    aspectRatio: 960 / 720,
    sticker: "/pictures/dubu8.gif",
  },
  {
    year: "Year Five",
    period: "2025",
    title: "Still learning. Still us.",
    reflection:
      "And here we are. Still choosing each other. Still learning. Still growing. Still us.",
    image: "/pictures/year_five.jpg",
    aspectRatio: 2448 / 3264,
    sticker: "/pictures/dubu11.gif",
  },
];

function photoSizes(aspectRatio: number) {
  // object-cover scales landscape photos by height inside the 4:5 frame.
  // Request enough pixels for that scale, not just the frame's visible width.
  const coverScale = Math.max(1, aspectRatio / (4 / 5));
  const mobileMax = Math.ceil(366 * coverScale);
  const mobileVw = (100 * coverScale).toFixed(2);
  const mobileInset = Math.floor(80 * coverScale);
  const desktopMax = Math.ceil(500 * coverScale);

  return `(max-width: 760px) min(${mobileMax}px, calc(${mobileVw}vw - ${mobileInset}px)), ${desktopMax}px`;
}

export function TimelineSection() {
  const reduceMotion = useReducedMotion();
  const { item: revealItem, group } = storyMotion(reduceMotion);

  return (
    <section
      id="story"
      className="timeline-section chapter-section"
      aria-labelledby="story-title"
    >
      <div className="section-shell">
        <motion.div
          className="section-heading"
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.p variants={revealItem} className="eyebrow">
            01 / Our story
          </motion.p>
          <motion.h2
            variants={revealItem}
            id="story-title"
            className="display-title"
          >
            Five years, <em>not rushed.</em>
          </motion.h2>
          <motion.p variants={revealItem} className="section-description">
            Not a perfect story. Just my favorite one.
          </motion.p>
        </motion.div>
        <motion.nav
          className="year-index"
          aria-label="Jump to a year"
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {timelineData.map((item) => (
            <motion.a
              variants={revealItem}
              key={item.period}
              href={`#year-${item.period}`}
            >
              {item.period}
              <span className="year-index-dot" />
            </motion.a>
          ))}
        </motion.nav>
        <div className="memory-list">
          {timelineData.map((item, index) => (
            <motion.article
              id={`year-${item.period}`}
              key={item.period}
              className={`memory-row ${index % 2 ? "memory-reversed" : ""}`}
              variants={group}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <motion.div variants={revealItem} className="memory-photo-wrap">
                <div className="photo-tape" aria-hidden="true" />
                <figure className="memory-photo">
                  <div className="memory-image">
                    <Image
                      src={item.image}
                      alt={`James and Joanne together — ${item.year}, ${item.period}`}
                      fill
                      sizes={photoSizes(item.aspectRatio)}
                      quality={90}
                      className="object-cover"
                    />
                  </div>
                  <figcaption>
                    <span>
                      {item.year} / {item.period}
                    </span>
                    <Icon name="heart" size={17} />
                  </figcaption>
                </figure>
                <span
                  className="photo-corner-note handwritten"
                  aria-hidden="true"
                >
                  a little moment, kept forever
                </span>
              </motion.div>
              <motion.div variants={revealItem} className="memory-copy">
                <div className="memory-label">
                  <span className="eyebrow">{item.year}</span>
                  <span className="memory-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <p className="memory-date">{item.period}</p>
                <h3>{item.title}</h3>
                <div className="tiny-rule" />
                <p className="body-copy">{item.reflection}</p>
                <div className="memory-sticker">
                  <Image
                    src={item.sticker}
                    alt=""
                    width={100}
                    height={100}
                    unoptimized
                  />
                  <span className="handwritten">you + me</span>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
        <div className="story-end">
          <span className="section-rule" />
          <Icon name="infinity" size={30} />
          <span className="section-rule" />
        </div>
        <p className="story-end-note handwritten">
          And this is only the beginning.
        </p>
      </div>
    </section>
  );
}
