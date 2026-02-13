'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface RocketTransitionProps {
  onInView: (inView: boolean) => void
}

export function RocketTransition({ onInView }: RocketTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })
  const [videoStarted, setVideoStarted] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [scrollLocked, setScrollLocked] = useState(false)
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false) // Track if video has played
  const savedScrollY = useRef(0)
  const videoEndedRef = useRef(false) // Use ref to avoid dependency array issues

  // Lock/unlock scroll when video is playing or after it ends
  useEffect(() => {
    if (scrollLocked) {
      // Lock scroll at the section position
      savedScrollY.current = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${savedScrollY.current}px`
      document.body.style.width = '100%'
    } else if (!scrollLocked && savedScrollY.current > 0) {
      // Unlock scroll
      const scrollY = savedScrollY.current
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      
      // Don't restore scroll position - let it stay where it is
      // This keeps the user at the text section after video ends
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [scrollLocked])

  useEffect(() => {
    onInView(isInView)
    
    // Don't do anything if video has already played once
    if (hasPlayedOnce) {
      return
    }
    
    // Only reset video state when scrolling back up past the section
    if (!isInView && videoEnded && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect()
      // Only reset if we scrolled back up (section is below viewport)
      if (rect.top > window.innerHeight) {
        videoEndedRef.current = false // Reset ref
        setVideoStarted(false)
        setVideoEnded(false)
        setShowVideo(false)
        setScrollLocked(false)
        setHasPlayedOnce(false) // Allow replay if scrolled back up
        if (videoRef.current) {
          videoRef.current.currentTime = 0
        }
      }
    }
    
    // Start video when section comes into view (only if hasn't played yet)
    if (isInView && !videoStarted && !videoEnded && !hasPlayedOnce) {
      // Immediately scroll to center the section
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      
      // Wait for scroll to complete, then lock scroll and play video
      setTimeout(() => {
        // Save scroll position and lock
        savedScrollY.current = window.scrollY
        setScrollLocked(true)
        setShowVideo(true)
        setVideoStarted(true)
        setHasPlayedOnce(true) // Mark that video has played
        
        // Small delay to ensure video element is mounted
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(err => {
              console.error('Video play failed:', err)
            })
          }
        }, 100)
      }, 1000) // Increased delay to ensure smooth scroll completes
    }
  }, [isInView, onInView, videoStarted, videoEnded, hasPlayedOnce])

  const handleVideoEnd = () => {
    videoEndedRef.current = true // Update ref
    setVideoEnded(true)
    // Keep video visible for fade out duration
    setTimeout(() => {
      setShowVideo(false)
      // Unlock scroll after video ends
      setScrollLocked(false)
    }, 1000)
  }

  return (
    <>
      {/* Full-screen video overlay - locked in place */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: videoEnded ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
              onEnded={handleVideoEnd}
            >
              <source src="/videos/vecteezy_rockets-flying-in-space-moving-stars-rocket-launch-and_39892892-_1_.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      <section 
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Text - shows after video ends, stays visible */}
        <div className="relative z-10 text-center w-full">
          <AnimatePresence mode="wait">
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-20"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 text-white drop-shadow-lg px-4">
                  Until the very end
                </h2>
                <p className="text-lg sm:text-xl font-light text-white/90 drop-shadow-md px-4">
                  I will still choose you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
