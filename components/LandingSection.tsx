'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function LandingSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* Subtle floating hearts */}
      <FloatingHearts />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-7xl mb-10 text-foreground font-light tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          Almost five years ago,
          <br />
          <span className="text-accent font-normal">I met my favorite person.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-warm-gray font-light leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
        >
          This is just a small reminder of why I still choose you.
        </motion.p>

        {/* Heartbeat animation */}
        <motion.div
          className="mt-20 text-5xl opacity-60"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          💕
        </motion.div>
      </div>
    </section>
  )
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{
    id: number
    left: string
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    setHearts(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 10
      }))
    )
  }, [])

  if (hearts.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-4xl text-rose"
          style={{
            left: heart.left,
            bottom: '-50px'
          }}
          animate={{
            y: [0, -1200],
            opacity: [0, 0.3, 0.3, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  )
}
