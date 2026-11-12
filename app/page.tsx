"use client";

import { MotionConfig, motion, useScroll } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ClickHearts } from "@/components/ClickHearts";
import { CursorTrail } from "@/components/CursorTrail";
import { ForeverSection } from "@/components/ForeverSection";
import { LandingSection } from "@/components/LandingSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { LoveLetterSection } from "@/components/LoveLetterSection";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PromisesSection } from "@/components/PromisesSection";
import { ReasonsSection } from "@/components/ReasonsSection";
import { RocketTransition } from "@/components/RocketTransition";
import { Icon } from "@/components/SiteIcons";
import { TimelineSection } from "@/components/TimelineSection";
import { ValentineBackground } from "@/components/ValentineBackground";

const chapters = [
  { id: "story", label: "Our story" },
  { id: "reasons", label: "Why you" },
  { id: "letter", label: "A letter" },
];

export default function Home() {
  const [isSpaceMode, setIsSpaceMode] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [activeChapter, setActiveChapter] = useState("");
  const { scrollYProgress } = useScroll();
  const handleLoadingComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const rocketSection = document.querySelector("[data-rocket-section]");
      if (rocketSection)
        setIsSpaceMode(rocketSection.getBoundingClientRect().top <= 100);
      let current = "";
      for (const chapter of chapters) {
        const element = document.getElementById(chapter.id);
        if (
          element &&
          element.getBoundingClientRect().top <= window.innerHeight * 0.4
        )
          current = chapter.id;
      }
      setActiveChapter(current);
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      <ValentineBackground isSpaceMode={isSpaceMode} />
      <div id="site-content" inert={!showContent}>
        <a className="skip-link" href="#story">
          Skip to our story
        </a>
        <header className={`site-header ${isSpaceMode ? "header-night" : ""}`}>
          <div className="header-inner">
            <a
              className="site-wordmark"
              href="#top"
              aria-label="James and Joanne — back to the beginning"
            >
              J <Icon name="heart" size={15} /> J
              <span className="wordmark-names">James & Joanne</span>
            </a>
            <nav className="chapter-nav" aria-label="Story chapters">
              {chapters.map((chapter) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  aria-current={
                    activeChapter === chapter.id ? "location" : undefined
                  }
                >
                  {chapter.label}
                </a>
              ))}
            </nav>
            <span className="header-dedication">For you, always.</span>
          </div>
          <motion.div
            className="reading-progress"
            style={{ scaleX: scrollYProgress }}
          />
        </header>
        <main>
          <LandingSection />
          <TimelineSection />
          <div className="night-journey" data-rocket-section>
            <div className="night-stars" aria-hidden="true" />
            <RocketTransition />
            <ReasonsSection />
            <PromisesSection />
            <LoveLetterSection />
            <ForeverSection />
          </div>
        </main>
        {showContent && (
          <>
            <MusicPlayer />
            <ClickHearts />
            <CursorTrail />
          </>
        )}
      </div>
    </MotionConfig>
  );
}
