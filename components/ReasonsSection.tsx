'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const reasons = [
  {
    front: 'You notice the small things I forget.',
    back: 'Like how you always remember which side of the bed I prefer, or that I need a moment of quiet in the morning before I can talk.'
  },
  {
    front: 'You\'re soft with me even when you\'re angry.',
    back: 'Even in our worst moments, you never make me feel small. You fight fair, and you always come back.'
  },
  {
    front: 'You feel like home, not excitement I have to chase.',
    back: 'Being with you doesn\'t drain me. It fills me up. You\'re my safe place.'
  },
  {
    front: 'You let me be quiet.',
    back: 'You don\'t need me to perform or entertain. You\'re okay with my silence, and that means everything.'
  },
  {
    front: 'You make me want to be better.',
    back: 'Not because you demand it, but because you inspire it just by being you.'
  },
  {
    front: 'You choose me, even on hard days.',
    back: 'When I\'m difficult, when I\'m distant, when I\'m too much or not enough - you stay.'
  }
]

export function ReasonsSection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 bg-transparent">
      <div className="w-full max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl text-center mb-6 sm:mb-8 font-light text-white drop-shadow-lg px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          Why I Still Choose You
        </motion.h2>

        <motion.p
          className="text-center mb-12 sm:mb-16 text-base sm:text-lg text-white/90 drop-shadow-md px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tap each card to read more
        </motion.p>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {reasons.map((reason, index) => (
            <ReasonCard key={index} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ReasonCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="h-48 sm:h-56 md:h-64 lg:h-72 cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onClick={() => setIsFlipped(!isFlipped)}
      onTouchStart={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white rounded-xl shadow-elegant p-3 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center text-center backface-hidden border border-rose/10"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-foreground leading-relaxed font-normal">{reason.front}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-blush/20 rounded-xl shadow-elegant p-3 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center text-center backface-hidden border border-accent/20"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground leading-relaxed">{reason.back}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
