'use client'

import { motion } from 'framer-motion'

const moments = [
  {
    image: '/images/moment1.jpg',
    caption: 'That night we stayed up too late talking about nothing.'
  },
  {
    image: '/images/moment2.jpg',
    caption: 'The way you always reach for my hand without thinking.'
  },
  {
    image: '/images/moment3.jpg',
    caption: 'When you look at me like I\'m the only person in the room.'
  },
  {
    image: '/images/moment4.jpg',
    caption: 'The quiet mornings where we don\'t need to say anything.'
  },
  {
    image: '/images/moment5.jpg',
    caption: 'How you make me laugh when I\'m trying to stay mad at you.'
  },
  {
    image: '/images/moment6.jpg',
    caption: 'Every time you\'ve held me when words weren\'t enough.'
  }
]

export function MomentsSection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-24 bg-transparent">
      <div className="w-full max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl text-center mb-20 px-6 text-foreground font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          Little Things That Meant Everything
        </motion.h2>

        <div className="space-y-32">
          {moments.map((moment, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              {/* Image placeholder */}
              <div className="w-full aspect-[16/9] bg-blush/30 rounded-lg mb-8 flex items-center justify-center text-warm-gray">
                Add your photo here
              </div>

              {/* Caption */}
              <motion.p
                className="text-2xl md:text-3xl text-center text-foreground font-light leading-relaxed px-6 italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {moment.caption}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
