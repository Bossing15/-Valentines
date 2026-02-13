'use client'

import { motion } from 'framer-motion'

export function LetterSection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-24 px-6 bg-transparent">
      <motion.div
        className="w-full max-w-3xl mx-auto bg-white/60 rounded-lg shadow-2xl p-12 md:p-16 border border-rose/20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl mb-12 text-foreground font-light text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A Letter, Not a Paragraph
        </motion.h2>

        <div className="space-y-8 text-lg md:text-xl leading-loose text-foreground">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            My love,
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I\'ve been thinking about how to say this without making it sound like every other love letter ever written. But maybe that\'s the point - maybe the reason these words have been said a thousand times before is because they\'re true.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Five years ago, I didn\'t know what I was looking for. I didn\'t know that love could feel this steady, this safe, this real. I thought love was supposed to be loud and dramatic and all-consuming. But with you, I learned that love is quiet mornings and inside jokes and knowing when to give each other space.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            You\'ve seen me at my worst - when I\'m anxious, when I\'m distant, when I\'m too much or not enough. And you\'ve never made me feel like I need to be anything other than exactly who I am. That\'s not something I take lightly.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            I don\'t love you loudly. I love you steadily. I love you in the way I think about you first when something good happens. I love you in the way I want to make your life easier, softer, better. I love you in the way I choose you - not just once, but every single day.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            And I choose you today, and every day after.
          </motion.p>

          <motion.p
            className="text-right italic text-rose mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            Forever yours
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
