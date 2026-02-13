'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ValentineBackgroundProps {
  isSpaceMode?: boolean
}

export function ValentineBackground({ isSpaceMode = false }: ValentineBackgroundProps) {
  const [hearts, setHearts] = useState<Array<{
    id: number
    left: string
    delay: number
    duration: number
    size: number
    emoji: string
    rotation: number
  }>>([])
  const [stars, setStars] = useState<Array<{
    id: number
    left: string
    top: string
    size: number
    delay: number
  }>>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🌸', '🌺', '🦋']
    setHearts(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`, // Random horizontal position
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 18,
        size: 15 + Math.random() * 35,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        rotation: Math.random() * 360
      }))
    )
    
    // Generate stars for space mode
    setStars(
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: `${(i * 7.13) % 100}%`,
        top: `${(i * 5.37) % 100}%`,
        size: 1 + ((i * 3) % 3),
        delay: (i * 0.1) % 5
      }))
    )
  }, [])

  if (!isMounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence mode="wait">
        {!isSpaceMode ? (
          <motion.div
            key="valentine"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #fef5f5 0%, #ffe4e9 20%, #ffd4e5 40%, #ffe4e9 60%, #fff0f5 80%, #fef5f5 100%)',
                backgroundSize: '400% 400%'
              }}
              initial={{ opacity: 1 }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                opacity: 1
              }}
              transition={{
                backgroundPosition: {
                  duration: 25,
                  repeat: Infinity,
                  ease: 'linear'
                },
                opacity: { duration: 0.1 }
              }}
            />

            {/* Floating hearts and elements */}
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute"
                style={{
                  left: heart.left,
                  bottom: '-100px',
                  fontSize: `${heart.size}px`,
                  filter: 'blur(0.5px)'
                }}
                animate={{
                  y: [0, -1400],
                  x: [0, Math.sin(heart.id) * 100],
                  opacity: [0, 0.35, 0.35, 0],
                  rotate: [heart.rotation, heart.rotation + 360],
                  scale: [0.5, 1, 0.8, 0.5]
                }}
                transition={{
                  duration: heart.duration,
                  delay: heart.delay,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                {heart.emoji}
              </motion.div>
            ))}

            {/* Soft light particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-rose/15"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${15 + Math.random() * 30}px`,
                  height: `${15 + Math.random() * 30}px`,
                  filter: 'blur(15px)'
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                  x: [0, (Math.random() - 0.5) * 80],
                  y: [0, (Math.random() - 0.5) * 80]
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  delay: Math.random() * 5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}

            {/* Colorful floating orbs */}
            {Array.from({ length: 6 }).map((_, i) => {
              const colors = [
                'rgba(255, 182, 193, 0.3)', // light pink
                'rgba(255, 192, 203, 0.3)', // pink
                'rgba(255, 160, 180, 0.3)', // rose
                'rgba(230, 190, 255, 0.3)', // lavender
                'rgba(255, 218, 224, 0.3)', // blush
              ]
              return (
                <motion.div
                  key={`orb-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${30 + Math.random() * 50}px`,
                    height: `${30 + Math.random() * 50}px`,
                    background: colors[Math.floor(Math.random() * colors.length)],
                    filter: 'blur(20px)'
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.7, 0.4],
                    x: [0, (Math.random() - 0.5) * 120],
                    y: [0, (Math.random() - 0.5) * 120]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 5,
                    delay: Math.random() * 6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              )
            })}

            {/* Sparkles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                ✨
              </motion.div>
            ))}

            {/* Additional butterflies */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`butterfly-${i}`}
                className="absolute text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                  rotate: [0, (Math.random() - 0.5) * 60],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                🦋
              </motion.div>
            ))}

            {/* Floating petals */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, (Math.random() - 0.5) * 150],
                  x: [0, (Math.random() - 0.5) * 100],
                  rotate: [0, 360],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  delay: Math.random() * 5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                🌸
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="space"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Space gradient background - matching video blue */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, #1a5fb4 0%, #2b7cd3 50%, #1a5fb4 100%)'
              }}
            />

            {/* Stars - small dots and plus signs like in video */}
            {Array.from({ length: 80 }).map((_, i) => {
              const isPlusSign = i % 4 === 0
              return (
                <motion.div
                  key={`star-${i}`}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    color: 'white',
                    fontSize: isPlusSign ? '12px' : '4px'
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    delay: Math.random() * 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  {isPlusSign ? '✦' : '•'}
                </motion.div>
              )
            })}

            {/* White fluffy clouds - more realistic */}
            {[
              { left: '10%', top: '8%', size: 200, delay: 0 },
              { left: '70%', top: '12%', size: 160, delay: 2 },
              { left: '85%', top: '65%', size: 140, delay: 4 },
              { left: '5%', top: '75%', size: 180, delay: 1 },
              { left: '50%', top: '82%', size: 220, delay: 3 }
            ].map((cloud, i) => (
              <motion.div
                key={`cloud-${i}`}
                className="absolute"
                style={{
                  left: cloud.left,
                  top: cloud.top,
                  width: `${cloud.size}px`,
                  height: `${cloud.size * 0.5}px`,
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
                animate={{
                  x: [0, 15, 0],
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 10 + i * 2,
                  delay: cloud.delay,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                {/* More realistic cloud shape with better layering */}
                <div className="relative w-full h-full">
                  {/* Base layer */}
                  <div 
                    className="absolute bg-white rounded-full"
                    style={{
                      width: '35%',
                      height: '50%',
                      left: '5%',
                      bottom: '0%',
                      opacity: 0.95
                    }}
                  />
                  <div 
                    className="absolute bg-white rounded-full"
                    style={{
                      width: '45%',
                      height: '70%',
                      left: '20%',
                      bottom: '0%',
                      opacity: 0.95
                    }}
                  />
                  <div 
                    className="absolute bg-white rounded-full"
                    style={{
                      width: '40%',
                      height: '65%',
                      left: '45%',
                      bottom: '0%',
                      opacity: 0.95
                    }}
                  />
                  <div 
                    className="absolute bg-white rounded-full"
                    style={{
                      width: '30%',
                      height: '45%',
                      left: '65%',
                      bottom: '5%',
                      opacity: 0.95
                    }}
                  />
                  {/* Top puffs for volume */}
                  <div 
                    className="absolute bg-white rounded-full"
                    style={{
                      width: '38%',
                      height: '85%',
                      left: '15%',
                      top: '0%',
                      opacity: 0.98
                    }}
                  />
                  <div 
                    className="absolute bg-white rounded-full"
                    style={{
                      width: '42%',
                      height: '90%',
                      left: '35%',
                      top: '-5%',
                      opacity: 0.98
                    }}
                  />
                  <div 
                    className="absolute bg-white rounded-full"
                    style={{
                      width: '35%',
                      height: '75%',
                      left: '55%',
                      top: '5%',
                      opacity: 0.98
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Single realistic moon with better details */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '160px',
                height: '160px',
                left: '18%',
                top: '12%',
                background: 'radial-gradient(circle at 35% 35%, #fef9e7 0%, #f5e6d3 40%, #e8d4b8 100%)',
                boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.15), 0 0 40px rgba(255,255,255,0.3)',
                border: '2px solid rgba(255,255,255,0.2)'
              }}
              animate={{
                scale: [1, 1.01, 1],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {/* More realistic craters with depth */}
              <div 
                className="absolute rounded-full"
                style={{
                  width: '28px',
                  height: '28px',
                  top: '22%',
                  left: '28%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(200,180,150,0.4), rgba(180,160,130,0.5))',
                  boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.2)'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  width: '20px',
                  height: '20px',
                  top: '48%',
                  left: '58%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(200,180,150,0.35), rgba(180,160,130,0.45))',
                  boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.2)'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  width: '24px',
                  height: '24px',
                  top: '62%',
                  left: '22%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(200,180,150,0.38), rgba(180,160,130,0.48))',
                  boxShadow: 'inset 2px 2px 3px rgba(0,0,0,0.2)'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  width: '16px',
                  height: '16px',
                  top: '35%',
                  left: '68%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(200,180,150,0.3), rgba(180,160,130,0.4))',
                  boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.2)'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  width: '14px',
                  height: '14px',
                  top: '55%',
                  left: '42%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(200,180,150,0.32), rgba(180,160,130,0.42))',
                  boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.15)'
                }}
              />
              {/* Small surface details */}
              <div 
                className="absolute rounded-full"
                style={{
                  width: '10px',
                  height: '10px',
                  top: '40%',
                  left: '45%',
                  background: 'rgba(200,180,150,0.25)',
                  boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.1)'
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  width: '12px',
                  height: '12px',
                  top: '70%',
                  left: '55%',
                  background: 'rgba(200,180,150,0.28)',
                  boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.12)'
                }}
              />
            </motion.div>

            {/* Planet (light blue) - removed duplicate moon */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '100px',
                height: '100px',
                right: '15%',
                bottom: '20%',
                background: 'linear-gradient(135deg, #a8d8ea 0%, #7cb8d1 100%)',
                boxShadow: 'inset -8px -8px 15px rgba(0,0,0,0.15)'
              }}
              animate={{
                scale: [1, 1.03, 1],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Shooting stars - increased from 3 to 8 */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`shooting-${i}`}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  width: '100px',
                  left: `${10 + (i * 12) % 80}%`,
                  top: `${10 + (i * 15) % 70}%`,
                  rotate: '-45deg',
                  filter: 'drop-shadow(0 0 2px white)'
                }}
                animate={{
                  x: [0, 250],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.2 + (i % 3) * 0.3,
                  delay: (i * 2.5) % 10,
                  repeat: Infinity,
                  repeatDelay: 6 + (i % 4),
                  ease: 'easeOut'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
