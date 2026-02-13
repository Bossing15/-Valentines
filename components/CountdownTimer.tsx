'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function CountdownTimer() {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set your anniversary date here (Year, Month-1, Day)
    const startDate = new Date(2021, 0, 1) // January 1, 2021 - adjust this to your actual date

    const updateTime = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      const years = Math.floor(days / 365)
      const months = Math.floor((days % 365) / 30)

      setTimeElapsed({
        years,
        months: months,
        days: (days % 365) % 30,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const timeUnits = [
    { value: timeElapsed.years, label: 'Years', emoji: '🎂' },
    { value: timeElapsed.months, label: 'Months', emoji: '📅' },
    { value: timeElapsed.days, label: 'Days', emoji: '☀️' },
    { value: timeElapsed.hours, label: 'Hours', emoji: '⏰' },
    { value: timeElapsed.minutes, label: 'Minutes', emoji: '⏱️' },
    { value: timeElapsed.seconds, label: 'Seconds', emoji: '⚡' }
  ]

  return (
    <section className="min-h-screen flex items-center justify-center py-24 px-6 bg-transparent">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-white drop-shadow-lg">
            Our Time Together
          </h2>
          <p className="text-xl text-white/90 drop-shadow-md">
            Every second counts
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-elegant"
            >
              <motion.div
                className="text-4xl mb-2"
                animate={{
                  scale: unit.label === 'Seconds' ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut'
                }}
              >
                {unit.emoji}
              </motion.div>
              <motion.div
                className="text-3xl md:text-4xl font-bold text-rose-600 mb-1"
                key={unit.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {unit.value}
              </motion.div>
              <div className="text-sm text-gray-600 font-medium">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 text-lg text-white/90 drop-shadow-md italic"
        >
          "And counting... forever with you 💕"
        </motion.p>
      </div>
    </section>
  )
}
