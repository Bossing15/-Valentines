'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Try to autoplay after a short delay
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            // Autoplay blocked, but don't show prompt
            console.log('Autoplay blocked by browser')
          })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/audio/yung kai - blue (official music video).mp3"
        loop
        preload="auto"
      />

      {/* Floating music control button */}
      <motion.button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-rose-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-rose-600 transition-colors active:scale-95"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', bounce: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span
          className="text-2xl sm:text-3xl"
          animate={isPlaying ? {
            rotate: [0, 10, -10, 10, -10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          } : {}}
          transition={{
            duration: 0.8,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 0.5
          }}
        >
          {isPlaying ? '🎵' : '🔇'}
        </motion.span>
      </motion.button>
    </>
  )
}
