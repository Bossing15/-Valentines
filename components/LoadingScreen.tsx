"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/SiteIcons";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const skipRef = useRef<HTMLButtonElement>(null);
  const finish = useCallback(() => {
    setIsLoading(false);
    onLoadingComplete?.();
  }, [onLoadingComplete]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipRef.current?.focus();
    const timer = window.setTimeout(finish, 1600);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [finish]);

  useEffect(() => {
    if (!isLoading) document.body.style.overflow = "";
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="intro-screen"
          role="dialog"
          aria-modal="true"
          aria-label="A love story by James for Joanne"
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.65 }}
        >
          <div className="intro-frame" aria-hidden="true" />
          <motion.div
            className="intro-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="intro-monogram">
              J <Icon name="heart" size={24} /> J
            </div>
            <p className="eyebrow">One story. Two hearts.</p>
            <h2>
              Made with <em>love.</em>
            </h2>
            <p className="intro-dedication">by James, for Joanne</p>
            <span className="intro-line" aria-hidden="true" />
          </motion.div>
          <button
            ref={skipRef}
            type="button"
            onClick={finish}
            className="intro-skip"
          >
            Open our story <Icon name="arrow-right" size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
