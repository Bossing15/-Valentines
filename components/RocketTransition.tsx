"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/SiteIcons";
import { storyEase, storyMotion } from "@/lib/motion";

export function RocketTransition() {
  const reduceMotion = useReducedMotion();
  const { item, group } = storyMotion(reduceMotion);
  const videoRef = useRef<HTMLVideoElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  const closeVideo = useCallback(() => {
    setShowVideo(false);
  }, []);

  useEffect(() => {
    if (!showVideo) return;
    const originalOverflow = document.body.style.overflow;
    const content = document.getElementById("site-content");
    const wasInert = content?.inert ?? false;
    if (content) content.inert = true;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeVideo();
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.body.style.overflow = originalOverflow;
      if (content) content.inert = wasInert;
      document.removeEventListener("keydown", keyHandler);
    };
  }, [showVideo, closeVideo]);

  return (
    <>
      <section
        id="beyond"
        className="rocket-section night-section"
        aria-labelledby="beyond-title"
      >
        <div className="cosmic-orbit cosmic-orbit-one" aria-hidden="true" />
        <div className="cosmic-orbit cosmic-orbit-two" aria-hidden="true" />
        <div className="section-shell rocket-content">
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              variants={item}
              className="cosmic-emblem"
              aria-hidden="true"
            >
              <Icon name="star" size={36} />
            </motion.div>
            <motion.p variants={item} className="eyebrow">
              From our little world, to the universe
            </motion.p>
            <motion.h2
              variants={item}
              id="beyond-title"
              className="display-title"
            >
              Until the <em>very end.</em>
            </motion.h2>
            <motion.p variants={item} className="rocket-subtitle handwritten">
              I will still choose you.
            </motion.p>
            <motion.button
              variants={item}
              ref={launchRef}
              type="button"
              className="quiet-button launch-button"
              onClick={() => {
                setVideoError(false);
                setShowVideo(true);
              }}
            >
              <Icon name="play" size={16} /> A little trip to the stars{" "}
              <span className="button-time">PLAY FILM</span>
            </motion.button>
            <motion.p variants={item} className="rocket-caption">
              Our story doesn’t end here.
            </motion.p>
          </motion.div>
        </div>
        <span className="rocket-bottom-line" aria-hidden="true" />
      </section>
      {portalRoot &&
        createPortal(
          <AnimatePresence onExitComplete={() => launchRef.current?.focus()}>
            {showVideo && (
              <motion.div
                className="cinema-overlay"
                role="dialog"
                aria-modal="true"
                aria-label="A little trip to the stars"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  ease: storyEase,
                }}
              >
                <button
                  ref={closeRef}
                  type="button"
                  className="cinema-close quiet-button"
                  onClick={closeVideo}
                >
                  <Icon name="close" size={18} /> Skip film
                </button>
                {videoError ? (
                  <div className="cinema-error">
                    <Icon name="star" size={40} />
                    <p>
                      The stars will have to wait. You can still keep reading
                      our story.
                    </p>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    className="cinema-video"
                    autoPlay
                    muted
                    playsInline
                    preload="none"
                    onEnded={closeVideo}
                    onError={() => setVideoError(true)}
                    onCanPlay={() => {
                      videoRef.current?.play().catch(() => setVideoError(true));
                    }}
                  >
                    <source
                      src="/videos/vecteezy_rockets-flying-in-space-moving-stars-rocket-launch-and_39892892-_1_.mp4"
                      type="video/mp4"
                      onError={() => setVideoError(true)}
                    />
                    <track kind="captions" />
                  </video>
                )}
                <p className="cinema-note">
                  Until the very end, I will still choose you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          portalRoot,
        )}
    </>
  );
}
