'use client'

import { motion } from 'framer-motion'

const promises = [
  {
    emoji: '🌅',
    title: 'Every Morning',
    promise: 'I promise to choose you, every single day, even on the hard ones.'
  },
  {
    emoji: '🤝',
    title: 'Through Everything',
    promise: 'I promise to stand by you, through every storm and every sunshine.'
  },
  {
    emoji: '👂',
    title: 'Always Listen',
    promise: 'I promise to hear you, not just your words, but your heart.'
  },
  {
    emoji: '🌱',
    title: 'Grow Together',
    promise: 'I promise to grow with you, not apart, no matter how we change.'
  },
  {
    emoji: '😊',
    title: 'Make You Smile',
    promise: 'I promise to make you laugh, especially when you need it most.'
  },
  {
    emoji: '🏠',
    title: 'Be Your Home',
    promise: 'I promise to be your safe place, always and forever.'
  }
]

export function PromisesSection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 bg-transparent">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 text-white drop-shadow-lg px-4">
            My Promises to You
          </h2>
          <p className="text-lg sm:text-xl text-white/90 drop-shadow-md px-4">
            These are the vows I make to you, today and always
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-elegant border border-rose/10"
            >
              <motion.div
                className="text-5xl sm:text-6xl mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.2
                }}
              >
                {promise.emoji}
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-normal text-accent mb-3">
                {promise.title}
              </h3>
              <p className="text-sm sm:text-base text-foreground leading-relaxed italic">
                "{promise.promise}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-lg sm:text-xl text-white/90 drop-shadow-md italic px-4">
            "These aren't just words. They're my commitment to us." 💕
          </p>
        </motion.div>
      </div>
    </section>
  )
}
