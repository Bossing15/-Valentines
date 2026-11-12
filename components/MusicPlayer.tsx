"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Icon } from "@/components/SiteIcons";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
      setHasError(false);
    } catch {
      setHasError(true);
    }
  };

  return (
    <>
      {/* biome-ignore lint/a11y/useMediaCaption: Audio-only music has no spoken dialogue. */}
      <audio
        ref={audioRef}
        src="/audio/yung kai - blue (official music video).mp3"
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
          setHasError(true);
        }}
      />
      <motion.button
        type="button"
        className={`music-player ${isPlaying ? "is-playing" : ""}`}
        onClick={togglePlay}
        aria-label={
          isPlaying ? "Pause Blue by Yung Kai" : "Play Blue by Yung Kai"
        }
        aria-pressed={isPlaying}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="music-symbol">
          <Icon name={isPlaying ? "pause" : "play"} size={17} />
        </span>
        <span className="music-label">
          <span>{hasError ? "Tap to try again" : "A song for us"}</span>
          <span>blue · yung kai</span>
        </span>
        <span className="music-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </motion.button>
    </>
  );
}
