'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const timelineData = [
  {
    year: 'Year One',
    period: '2021',
    reflection: 'Everything was new. Every conversation felt like discovering a secret. We were learning each other\'s rhythms, and somehow, it all felt easy.',
    image: '/pictures/year_one.jpg'
  },
  {
    year: 'Year Two',
    period: '2022',
    reflection: 'We learned how to argue, how to forgive, and how to sit in silence together. Somehow, that made everything stronger.',
    image: '/pictures/year_two.jpg'
  },
  {
    year: 'Year Three',
    period: '2023',
    reflection: 'The year we stopped trying to impress each other and started just being. Comfortable. Safe. Home.',
    image: '/pictures/year_three.jpg'
  },
  {
    year: 'Year Four',
    period: '2024',
    reflection: 'We grew. Not apart, but deeper. We faced things together that I never thought I could face with anyone.',
    image: '/pictures/year_four.jpg'
  },
  {
    year: 'Year Five',
    period: '2025',
    reflection: 'And here we are. Still choosing each other. Still learning. Still growing. Still us.',
    image: '/pictures/year_five.jpg'
  }
]

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Transform scroll progress - line only visible when section is in viewport
  const scaleYRaw = useTransform(scrollYProgress, 
    [0, 0.1, 0.9, 1], 
    [0, 1, 1, 0]
  )
  const scaleY = useSpring(scaleYRaw, { stiffness: 100, damping: 30, restDelta: 0.001 })
  
  // Opacity fades in/out with the line
  const opacity = useTransform(scrollYProgress, 
    [0, 0.1, 0.9, 1], 
    [0, 1, 1, 0]
  )
  
  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center py-24 px-6 bg-transparent">
      <div className="w-full max-w-6xl mx-auto">
        {/* Centered title section matching LandingSection style */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl text-foreground font-light mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            Five Years, Not Rushed
          </motion.h2>
        </div>

        <div className="relative">
          {/* Timeline line - animates based on scroll position */}
          <motion.div 
            className="absolute left-1/2 -ml-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 will-change-transform"
            style={{ 
              scaleY,
              opacity,
              transformOrigin: 'top'
            }}
          />
          
          {/* Animated glow effect on the line - simplified */}
          <motion.div
            className="absolute left-1/2 -ml-0.5 top-0 w-1 h-32 bg-gradient-to-b from-rose-300 to-transparent blur-sm will-change-transform"
            style={{ scaleY, opacity }}
            animate={{
              y: ['0%', '400%'],
              opacity: [0.6, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 0
            }}
          />

          {/* Timeline items */}
          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0
            
            return (
              <motion.div
                key={index}
                className="relative mb-32 last:mb-0"
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-rose border-4 border-paper shadow-lg z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(232, 180, 184, 0.4)',
                        '0 0 0 10px rgba(232, 180, 184, 0)',
                        '0 0 0 0 rgba(232, 180, 184, 0)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>

                {/* Content - alternating left/right on all screen sizes */}
                <div className={isLeft ? 'flex items-center flex-row' : 'flex items-center flex-row-reverse'}>
                  {/* Content side */}
                  <div className={isLeft ? 'flex-1 pl-0 pr-12 text-right' : 'flex-1 pl-12 pr-0 text-left'}>
                    <h3 className="text-xl sm:text-2xl md:text-3xl text-accent mb-3 font-normal tracking-tight">{item.year}</h3>
                    <p className="text-xs sm:text-sm text-warm-gray mb-6 uppercase tracking-wider">{item.period}</p>
                    <p className="text-sm sm:text-base md:text-lg text-foreground leading-relaxed mb-8">{item.reflection}</p>
                    
                    {/* Image */}
                    <div className="aspect-[4/3] bg-blush/30 rounded-xl overflow-hidden relative shadow-elegant">
                      <Image 
                        src={item.image} 
                        alt={`${item.year} memory`}
                        fill
                        className="object-cover brightness-90"
                        quality={100}
                        priority={index < 2}
                      />
                    </div>
                  </div>

                  {/* Spacer for layout - with GIFs for all years */}
                  <div className="flex-1 flex items-center justify-center">
                    {index === 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="w-32 sm:w-36 md:w-40 lg:w-44"
                      >
                        <Image
                          src="/pictures/dubu1.gif"
                          alt="Cute animation"
                          width={176}
                          height={176}
                          className="rounded-2xl"
                          style={{
                            mixBlendMode: 'multiply',
                            filter: 'contrast(1.1) brightness(1.05)'
                          }}
                          unoptimized
                        />
                      </motion.div>
                    )}
                    {index === 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="w-32 sm:w-36 md:w-40 lg:w-44"
                      >
                        <Image
                          src="/pictures/output-onlinegiftools 3.gif"
                          alt="Cute animation"
                          width={176}
                          height={176}
                          className="rounded-2xl"
                          style={{
                            mixBlendMode: 'multiply',
                            filter: 'contrast(1.1) brightness(1.05)'
                          }}
                          unoptimized
                        />
                      </motion.div>
                    )}
                    {index === 2 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="w-32 sm:w-36 md:w-40 lg:w-44"
                      >
                        <Image
                          src="/pictures/output-onlinegiftools 4.gif"
                          alt="Cute animation"
                          width={176}
                          height={176}
                          className="rounded-2xl"
                          style={{
                            mixBlendMode: 'multiply',
                            filter: 'contrast(1.1) brightness(1.05)'
                          }}
                          unoptimized
                        />
                      </motion.div>
                    )}
                    {index === 3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="w-32 sm:w-36 md:w-40 lg:w-44"
                      >
                        <Image
                          src="/pictures/dubu8.gif"
                          alt="Cute animation"
                          width={176}
                          height={176}
                          className="rounded-2xl"
                          style={{
                            mixBlendMode: 'multiply',
                            filter: 'contrast(1.1) brightness(1.05)'
                          }}
                          unoptimized
                        />
                      </motion.div>
                    )}
                    {index === 4 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="w-32 sm:w-36 md:w-40 lg:w-44"
                      >
                        <Image
                          src="/pictures/dubu11.gif"
                          alt="Cute animation"
                          width={176}
                          height={176}
                          className="rounded-2xl"
                          style={{
                            mixBlendMode: 'multiply',
                            filter: 'contrast(1.1) brightness(1.05)'
                          }}
                          unoptimized
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
