'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="min-h-screen flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 bg-transparent">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 text-white drop-shadow-lg px-4">
            A Letter For You
          </h2>
          <p className="text-lg sm:text-xl text-white/90 drop-shadow-md px-4">
            {isOpen ? 'From my heart to yours' : 'Click the envelope to open'}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="relative cursor-pointer"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Envelope */}
                <div className="relative w-64 sm:w-80 md:w-96 h-48 sm:h-56 md:h-64">
                  {/* Envelope body */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg shadow-2xl border-2 border-rose-300" />
                  
                  {/* Envelope flap */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-32 sm:h-36 md:h-40 bg-gradient-to-br from-rose-200 to-rose-300 origin-top border-2 border-rose-300"
                    style={{
                      clipPath: 'polygon(0 0, 50% 60%, 100% 0)'
                    }}
                    animate={{
                      rotateX: [0, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                  
                  {/* Heart seal */}
                  <motion.div
                    className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl md:text-6xl z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    💌
                  </motion.div>
                  
                  {/* Tap hint */}
                  <motion.p
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/80 text-sm sm:text-base whitespace-nowrap"
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    Tap to open 💕
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full max-w-2xl"
              >
                {/* Letter paper */}
                <motion.div
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 border-2 border-amber-200 relative overflow-hidden"
                  initial={{ rotateX: 90 }}
                  animate={{ rotateX: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  {/* Paper texture overlay */}
                  <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]" />
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 1 }}
                    >
                      <p className="text-right text-amber-600 mb-6 sm:mb-8 italic text-sm sm:text-base">
                        To my dearest Joanne,
                      </p>
                      
                      <div className="space-y-4 sm:space-y-6 text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed">
                        <p>
                          Five years ago, I didn't know what forever meant. I thought it was just a word people said when they were in love. But now I understand—forever isn't about time. It's about choosing someone, over and over again.
                        </p>
                        
                        <p>
                          You've taught me what it means to be truly seen. Not the version of me I try to show the world, but the real me—the messy, uncertain, sometimes difficult me. And somehow, you love that person too.
                        </p>
                        
                        <p>
                          I don't have all the answers. I don't know what the future holds. But I know that whatever comes, I want to face it with you. Because you make everything better. You make me better.
                        </p>
                        
                        <p>
                          Thank you for five years of patience, laughter, growth, and love. Thank you for being my home.
                        </p>
                        
                        <p className="text-center mt-8 sm:mt-12 text-rose-600 font-semibold text-lg sm:text-xl">
                          I love you, always and forever.
                        </p>
                      </div>
                      
                      <p className="text-right text-amber-600 mt-6 sm:mt-8 italic text-sm sm:text-base">
                        Yours eternally,<br />
                        James 💕
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Decorative hearts */}
                  <div className="absolute top-4 right-4 text-2xl opacity-20">💕</div>
                  <div className="absolute bottom-4 left-4 text-2xl opacity-20">💕</div>
                </motion.div>
                
                {/* Close button */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="mt-6 mx-auto block px-6 py-3 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 transition-colors text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close Letter
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
