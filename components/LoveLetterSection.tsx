"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/SiteIcons";
import { storyEase, storyMotion } from "@/lib/motion";

export function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const envelopeRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);
  const reduceMotion = useReducedMotion();
  const { item, group } = storyMotion(reduceMotion);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus({ preventScroll: true });
    } else if (!isClosing && returnFocus.current) {
      envelopeRef.current?.focus({ preventScroll: true });
      returnFocus.current = false;
    }
  }, [isOpen, isClosing]);

  const closeLetter = () => {
    returnFocus.current = true;
    setIsClosing(true);
    setIsOpen(false);
  };

  return (
    <section
      id="letter"
      className="chapter-section night-section"
      aria-labelledby="letter-heading"
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
            For Joanne, from James
          </motion.p>
          <motion.h2
            variants={item}
            id="letter-heading"
            className="display-title mb-6"
          >
            A Letter For You
          </motion.h2>
          <motion.p
            variants={item}
            id="letter-instruction"
            className="section-description"
          >
            {isOpen ? "From my heart to yours" : "Click the envelope to open"}
          </motion.p>
        </motion.div>

        <div className="mx-auto w-full max-w-3xl">
          <button
            ref={envelopeRef}
            type="button"
            hidden={isOpen || isClosing}
            className={`envelope-button mx-auto w-full max-w-[420px] rounded-xl text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c697a4] focus-visible:ring-offset-8 focus-visible:ring-offset-[#21151c] ${isOpen || isClosing ? "hidden" : "block"}`}
            onClick={() => setIsOpen(true)}
            aria-label="Open James's letter to Joanne"
            aria-expanded={isOpen}
            aria-controls="love-letter-content"
            aria-describedby="letter-instruction"
          >
            <div className="envelope">
              <span className="envelope-flap" aria-hidden="true" />
              <span className="envelope-seal" aria-hidden="true">
                <Icon name="heart" size={24} />
              </span>
              <span className="envelope-label">A letter, just for you</span>
              <span className="envelope-address">
                To Joanne
                <br />
                <span className="handwritten">From James</span>
              </span>
            </div>
            <span className="section-description mt-7 inline-flex items-center gap-2 text-sm">
              Open the letter
              <span className="text-accent" aria-hidden="true">
                <Icon name="arrow-right" size={16} />
              </span>
            </span>
          </button>

          <AnimatePresence onExitComplete={() => setIsClosing(false)}>
            {isOpen && (
              <motion.article
                key="letter"
                id="love-letter-content"
                aria-labelledby="letter-salutation"
                className="letter-paper w-full rounded-[20px] border border-[#dccbbc] bg-[#f4ede2] p-6 text-[#34232a] sm:p-10 md:p-14"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 8,
                  transition: {
                    duration: reduceMotion ? 0 : 0.35,
                    ease: "easeOut",
                  },
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  ease: storyEase,
                }}
              >
                <header className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                  <p className="eyebrow text-[#8a4e60]">
                    A little piece of my heart
                  </p>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeLetter}
                    className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#34232a]/25 px-4 py-2 text-sm text-inherit transition-colors hover:bg-[#34232a]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a4e60] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4ede2]"
                  >
                    <span aria-hidden="true">
                      <Icon name="close" size={16} />
                    </span>
                    Close Letter
                  </button>
                </header>

                <p
                  id="letter-salutation"
                  className="handwritten mb-8 text-2xl text-inherit sm:text-3xl"
                >
                  To my dearest Joanne,
                </p>

                <div className="body-copy space-y-6 text-inherit">
                  <p className="text-inherit">
                    Five years ago, I didn't know what forever meant. I thought
                    it was just a word people said when they were in love. But
                    now I understand—forever isn't about time. It's about
                    choosing someone, over and over again.
                  </p>

                  <p className="text-inherit">
                    You've taught me what it means to be truly seen. Not the
                    version of me I try to show the world, but the real me—the
                    messy, uncertain, sometimes difficult me. And somehow, you
                    love that person too.
                  </p>

                  <p className="text-inherit">
                    I don't have all the answers. I don't know what the future
                    holds. But I know that whatever comes, I want to face it
                    with you. Because you make everything better. You make me
                    better.
                  </p>

                  <p className="text-inherit">
                    Thank you for five years of patience, laughter, growth, and
                    love. Thank you for being my home.
                  </p>

                  <p className="handwritten pt-4 text-center text-2xl text-inherit sm:text-3xl">
                    I love you, always and forever.
                  </p>
                </div>

                <p className="handwritten mt-10 text-right text-xl text-inherit sm:text-2xl">
                  Yours eternally,
                  <br />
                  James
                </p>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
