'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface Trail {
  id: number
  x: number
  y: number
}

export function CursorTrail() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const nextIdRef = useRef(0)

  useEffect(() => {
    // Check if device is mobile
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    // Don't show cursor trail on mobile devices
    if (isMobile) return

    let lastTime = Date.now()
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      // Throttle trail creation to every 50ms
      if (now - lastTime < 50) return
      lastTime = now

      const newTrail: Trail = {
        id: nextIdRef.current,
        x: e.clientX,
        y: e.clientY
      }
      
      nextIdRef.current += 1
      setTrails(prev => [...prev.slice(-15), newTrail]) // Keep last 15 trails
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  // Don't render on mobile
  if (isMobile) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: trail.x,
            top: trail.y,
            background: `radial-gradient(circle, rgba(255, 182, 193, ${0.8 - index * 0.05}), transparent)`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
