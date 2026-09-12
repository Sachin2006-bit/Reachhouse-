'use client'
import { useState, useCallback } from 'react'
import { reels } from './reels'
import type { Reel } from './reels'
import { ArcCarousel } from './ArcCarousel'
import { ReelLightbox } from './ReelLightbox'
import './work.css'

export function WorkSection() {
  const [lightboxReel, setLightboxReel]   = useState<Reel | null>(null)

  const currentIndex = lightboxReel ? reels.findIndex(r => r.id === lightboxReel.id) : -1

  const handlePlay = useCallback((reel: Reel) => {
    setLightboxReel(reel)
  }, [])

  const handleClose = useCallback(() => {
    setLightboxReel(null)
  }, [])

  const handlePrev = useCallback(() => {
    setLightboxReel(prev => {
      if (!prev) return null
      const idx = reels.findIndex(r => r.id === prev.id)
      return reels[(idx - 1 + reels.length) % reels.length]
    })
  }, [])

  const handleNext = useCallback(() => {
    setLightboxReel(prev => {
      if (!prev) return null
      const idx = reels.findIndex(r => r.id === prev.id)
      return reels[(idx + 1) % reels.length]
    })
  }, [])

  return (
    <section id="work" className="work-section" aria-label="Our work">
      {/* Heading */}
      <div className="work-heading">
        <h2>Reels that did the numbers.</h2>
        <p>
          Short-form video for brands that need to convert — shot with India&apos;s
          top creators, edited for the feed.
        </p>
      </div>

      {/* Arc carousel — paused while the lightbox is open */}
      <ArcCarousel
        reels={reels}
        onPlay={handlePlay}
        paused={!!lightboxReel}
      />

      <div className="work-section-bottom" />

      {/* Lightbox */}
      <ReelLightbox
        reel={lightboxReel}
        reels={reels}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  )
}
