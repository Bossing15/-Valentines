'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  const [confetti, setConfetti] = useState<Array<{
    id: number
    x: number
    y: number
    rotation: number
    emoji: string
    color: string
  }>>([])

  useEffect(() => {
    setIsMounted(true)
    
    // Simulate loading progress - 6 seconds total
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Trigger explosion
          setIsExploding(true)
          
          // Generate confetti
          const emojis = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🌸', '🌺', '🦋', '✨', '⭐']
          const colors = ['#ff69b4', '#ff1493', '#ff6b9d', '#ffc0cb', '#ff85a2']
          setConfetti(
            Array.from({ length: 50 }, (_, i) => ({
              id: i,
              x: 50,
              y: 50,
              rotation: Math.random() * 360,
              emoji: emojis[i % emojis.length],
              color: colors[i % colors.length]
            }))
          )
          
          setTimeout(() => {
            setIsLoading(false)
            onLoadingComplete?.()
          }, 1500)
          return 100
        }
        return prev + 1
      })
    }, 60)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-red-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating hearts background */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl opacity-20"
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: `${(i * 13) % 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                💕
              </motion.div>
            ))}
          </div>

          {/* Explosion confetti */}
          {isExploding && confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute text-4xl z-50"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 1000,
                y: (Math.random() - 0.5) * 1000,
                rotate: piece.rotation + 720,
                scale: [0, 1.5, 1],
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 1.2,
                ease: 'easeOut'
              }}
            >
              {piece.emoji}
            </motion.div>
          ))}

          {/* Main content */}
          <div className="relative z-10 text-center px-6">
            {/* Animated heart logo - bomb countdown effect */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 1, bounce: 0.5 }}
            >
              <motion.div
                className="text-8xl relative"
                animate={
                  isExploding
                    ? {
                        scale: [1, 3, 0],
                        rotate: [0, 180],
                        opacity: [1, 1, 0]
                      }
                    : progress > 50
                    ? {
                        scale: [1, 1.3, 0.9, 1.3, 0.9, 1],
                        rotate: [0, -10, 10, -10, 10, 0]
                      }
                    : {
                        scale: [1, 1.15, 1],
                      }
                }
                transition={
                  isExploding
                    ? { duration: 0.6, ease: 'easeOut' }
                    : progress > 50
                    ? { duration: 0.5, repeat: Infinity }
                    : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                💝
                {/* Countdown timer overlay when near 100% */}
                {progress > 90 && !isExploding && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {Math.ceil((100 - progress) / 10)}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isExploding ? 0 : 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-4xl font-light text-rose-900 mb-2">
                Made with Love
              </h1>
              <p className="text-xl md:text-2xl text-rose-600 font-light mb-8">
                by <span className="text-rose-800 font-semibold">James</span> for{' '}
                <span className="text-rose-800 font-semibold">Joanne</span>
              </p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-64 h-2 bg-rose-200 rounded-full overflow-hidden mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isExploding ? 0 : 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-red-400"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Loading percentage */}
            <motion.p
              className="mt-4 text-rose-400 text-sm font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: isExploding ? 0 : 1 }}
              transition={{ delay: 1 }}
            >
              {progress}%
            </motion.p>

            {/* Decorative hearts */}
            <div className="flex justify-center gap-4 mt-8">
              {['💕', '💖', '💗'].map((heart, i) => (
                <motion.span
                  key={i}
                  className="text-3xl"
                  animate={{
                    y: [0, -10, 0],
                    opacity: isExploding ? 0 : [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  {heart}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-10 left-10 text-6xl opacity-30"
            animate={{ rotate: 360, opacity: isExploding ? 0 : 0.3 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            🌸
          </motion.div>
          <motion.div
            className="absolute top-10 right-10 text-6xl opacity-30"
            animate={{ rotate: -360, opacity: isExploding ? 0 : 0.3 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            🌺
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-10 text-6xl opacity-30"
            animate={{ rotate: 360, opacity: isExploding ? 0 : 0.3 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            🦋
          </motion.div>
          <motion.div
            className="absolute bottom-10 right-10 text-6xl opacity-30"
            animate={{ rotate: -360, opacity: isExploding ? 0 : 0.3 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            💘
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
