'use client'

import { useState, useEffect } from 'react'
import { LandingSection } from '@/components/LandingSection'
import { TimelineSection } from '@/components/TimelineSection'
import { RocketTransition } from '@/components/RocketTransition'
import { ReasonsSection } from '@/components/ReasonsSection'
import { PromisesSection } from '@/components/PromisesSection'
import { LoveLetterSection } from '@/components/LoveLetterSection'
import { ForeverSection } from '@/components/ForeverSection'
import { ValentineBackground } from '@/components/ValentineBackground'
import { LoadingScreen } from '@/components/LoadingScreen'
import { MusicPlayer } from '@/components/MusicPlayer'
import { ClickHearts } from '@/components/ClickHearts'
import { CursorTrail } from '@/components/CursorTrail'

export default function Home() {
  const [isSpaceMode, setIsSpaceMode] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Get the rocket section position
      const rocketSection = document.querySelector('[data-rocket-section]')
      if (rocketSection) {
        const rect = rocketSection.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // If rocket section is at or above the middle of viewport, switch to space mode
        // Otherwise, stay in valentine mode
        if (rect.top <= windowHeight / 2) {
          setIsSpaceMode(true)
        } else {
          setIsSpaceMode(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleRocketInView = (inView: boolean) => {
    if (inView) {
      setIsSpaceMode(true)
    }
  }

  const handleLoadingComplete = () => {
    setShowContent(true)
  }

  return (
    <>
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      <ValentineBackground isSpaceMode={isSpaceMode} />
      
      {/* Interactive Features */}
      {showContent && (
        <>
          <MusicPlayer />
          <ClickHearts />
          <CursorTrail />
        </>
      )}
      
      <main className="min-h-screen relative z-10">
        <LandingSection />
        <div className="h-32" /> {/* Spacer */}
        <TimelineSection />
        <div className="h-32" /> {/* Spacer */}
        <div data-rocket-section>
          <RocketTransition onInView={handleRocketInView} />
        </div>
        <div className="h-32" /> {/* Spacer */}
        <ReasonsSection />
        <div className="h-32" /> {/* Spacer */}
        <PromisesSection />
        <div className="h-32" /> {/* Spacer */}
        <LoveLetterSection />
        <div className="h-32" /> {/* Spacer */}
        <ForeverSection />
        <div className="h-48" /> {/* Bottom spacer */}
      </main>
    </>
  )
}
