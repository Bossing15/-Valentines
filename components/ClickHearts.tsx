'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Heart {
  id: number
  x: number
  y: number
  emoji: string
}

export function ClickHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [nextId, setNextId] = useState(0)

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const emojis = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🌸', '✨', '⭐']
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
      
      let clientX: number, clientY: number
      
      if ('touches' in e) {
        // Touch event
        clientX = e.touches[0]?.clientX || e.changedTouches[0]?.clientX || 0
        clientY = e.touches[0]?.clientY || e.changedTouches[0]?.clientY || 0
      } else {
        // Mouse event
        clientX = e.clientX
        clientY = e.clientY
      }
      
      const newHeart: Heart = {
        id: nextId,
        x: clientX,
        y: clientY,
        emoji: randomEmoji
      }
      
      setHearts(prev => [...prev, newHeart])
      setNextId(prev => prev + 1)
      
      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id))
      }, 2000)
    }

    window.addEventListener('click', handleClick as EventListener)
    window.addEventListener('touchstart', handleClick as EventListener)
    return () => {
      window.removeEventListener('click', handleClick as EventListener)
      window.removeEventListener('touchstart', handleClick as EventListener)
    }
  }, [nextId])

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className="absolute text-4xl"
            style={{
              left: heart.x,
              top: heart.y,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 1, y: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [1, 1, 0],
              y: -100,
              rotate: [0, 10, -10, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
