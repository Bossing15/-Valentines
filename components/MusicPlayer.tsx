"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/SiteIcons";
import { storyEase } from "@/lib/motion";

const songs = [
  { title: "You", artist: "Jona", src: "/audio/You - Jona (Lyrics).mp3" },
  {
    title: "Wouldn't It Be Nice",
    artist: "1999 remaster",
    src: "/audio/Wouldn't It Be Nice (Remastered 1999).mp3",
  },
  {
    title: "blue",
    artist: "yung kai",
    src: "/audio/yung kai - blue (official music video).mp3",
  },
];

export function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const selectedIndex = useRef(0);
  const playIntent = useRef(false);
  const requestVersion = useRef(0);
  const reduced = useReducedMotion();
  const song = songs[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      requestVersion.current += 1;
      playIntent.current = false;
      audio?.pause();
    };
  }, []);

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const request = ++requestVersion.current;
    playIntent.current = true;
    setHasError(false);
    setIsPending(true);
    try {
      await audio.play();
      if (request === requestVersion.current) setIsPending(false);
    } catch {
      // A rapid skip or pause cancels an old play request, not the new song.
      if (request !== requestVersion.current) return;
      playIntent.current = false;
      setIsPlaying(false);
      setIsPending(false);
      setHasError(true);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playIntent.current || !audio.paused) {
      requestVersion.current += 1;
      playIntent.current = false;
      audio.pause();
      setIsPending(false);
      setIsPlaying(false);
    } else {
      if (audio.error) audio.load();
      void startPlayback();
    }
  };

  const changeTrack = (direction: number, resume = playIntent.current) => {
    const audio = audioRef.current;
    if (!audio) return;
    requestVersion.current += 1;
    playIntent.current = false;
    audio.pause();
    const next =
      (selectedIndex.current + direction + songs.length) % songs.length;
    selectedIndex.current = next;
    setTrackIndex(next);
    setIsPlaying(false);
    setIsPending(false);
    setHasError(false);
    // Switch synchronously inside the gesture so mobile browsers allow playback.
    // The JSX src stays constant; only this handler owns later source changes.
    audio.src = songs[next].src;
    audio.load();
    if (resume) void startPlayback();
  };

  return (
    <>
      {/* biome-ignore lint/a11y/useMediaCaption: Audio-only soundtrack; song names are provided in the player. */}
      <audio
        ref={audioRef}
        src={songs[0].src}
        preload="none"
        onPlaying={() => {
          if (!playIntent.current) {
            audioRef.current?.pause();
            return;
          }
          setIsPlaying(true);
          setIsPending(false);
          setHasError(false);
        }}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => {
          if (playIntent.current) setIsPending(true);
        }}
        onEnded={() => {
          if (audioRef.current?.ended) changeTrack(1, true);
        }}
        onError={() => {
          if (!audioRef.current?.error) return;
          requestVersion.current += 1;
          playIntent.current = false;
          setIsPlaying(false);
          setIsPending(false);
          setHasError(true);
        }}
      />
      <motion.fieldset
        className={`music-player ${isPlaying ? "is-playing" : ""}`}
        aria-label="Our three-song soundtrack"
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.5, ease: storyEase }}
      >
        <div className="music-copy" aria-live="polite" aria-atomic="true">
          <span className="music-kicker">
            A song for us{" "}
            <span className="track-counter">0{trackIndex + 1} / 03</span>
          </span>
          <motion.div
            key={song.src}
            className="music-track"
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: storyEase }}
          >
            <span className="music-title" title={song.title}>
              {song.title}
            </span>
            <span className="music-artist">{song.artist}</span>
          </motion.div>
        </div>
        <div className="music-controls">
          <button
            type="button"
            className="music-skip"
            aria-label="Previous song"
            title="Previous song"
            onClick={() => changeTrack(-1)}
          >
            <Icon name="skip-back" size={17} />
          </button>
          <button
            type="button"
            className={`music-toggle ${isPending ? "is-pending" : ""}`}
            aria-label={`${isPlaying || isPending ? "Pause" : "Play"} ${song.title} by ${song.artist}`}
            aria-pressed={isPlaying || isPending}
            title={
              hasError
                ? "Tap to retry playback"
                : isPlaying || isPending
                  ? "Pause"
                  : "Play"
            }
            onClick={togglePlay}
          >
            <Icon name={isPlaying || isPending ? "pause" : "play"} size={18} />
          </button>
          <button
            type="button"
            className="music-skip"
            aria-label="Next song"
            title="Next song"
            onClick={() => changeTrack(1)}
          >
            <Icon name="skip-forward" size={17} />
          </button>
        </div>
        <output className="music-status">
          {hasError
            ? "Can't play this song. Try play again or choose the next song."
            : isPending
              ? "Loading your song…"
              : ""}
        </output>
      </motion.fieldset>
    </>
  );
}
