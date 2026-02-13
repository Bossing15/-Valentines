'use client'

import { motion } from 'framer-motion'

export function ForeverSection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 bg-transparent relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl sm:text-5xl md:text-6xl opacity-10"
            style={{
              left: `${(i * 5.5) % 100}%`,
              top: `${(i * 7.3) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut'
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Main message */}
          <motion.div
            className="mb-12 sm:mb-16"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-6 sm:mb-8 text-white drop-shadow-2xl px-4">
              Forever & Always
            </h2>
            <motion.div
              className="text-6xl sm:text-7xl md:text-8xl mb-6 sm:mb-8"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              💖
            </motion.div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 sm:space-y-8"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl text-white/95 drop-shadow-lg font-light leading-relaxed px-4">
              "In a world of temporary things,
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl text-white/95 drop-shadow-lg font-light leading-relaxed px-4">
              you are my forever."
            </p>
          </motion.div>

          {/* Final message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 sm:mt-16 space-y-4 sm:space-y-6"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 drop-shadow-md italic px-4">
              Thank you for five beautiful years.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 drop-shadow-md italic px-4">
              Here's to forever more.
            </p>
            
            <motion.div
              className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 text-4xl sm:text-5xl md:text-6xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <span>💕</span>
              <span>💖</span>
              <span>💗</span>
            </motion.div>
          </motion.div>

          {/* Signature */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 sm:mt-16 text-lg sm:text-xl text-white/80 drop-shadow-md px-4"
          >
            With all my love,<br />
            <span className="text-2xl sm:text-3xl font-semibold text-rose-300">James</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
