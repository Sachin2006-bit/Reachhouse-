'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reel } from '@/content/site'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface ReelCardProps {
  reel: Reel
  onPlay: (reel: Reel) => void
  shouldPreload: boolean
  onVideoActive?: (id: string, video: HTMLVideoElement) => void
  onVideoPause?: (id: string) => void
}

export function ReelCard({ reel, onPlay, shouldPreload, onVideoActive, onVideoPause }: ReelCardProps) {
  const reduced = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const srcSet = useRef(false)

  const src = reel.previewSrc ?? reel.videoSrc

  // Eagerly load src + buffer as soon as section is visible
  useEffect(() => {
    if (reduced || !src || !shouldPreload || srcSet.current) return
    const video = videoRef.current
    if (!video) return
    video.src = src
    video.preload = 'auto'
    video.load()
    srcSet.current = true
  }, [shouldPreload, src, reduced])

  const play = () => {
    if (reduced || !src) return
    const video = videoRef.current
    if (!video) return
    // Ensure src is set (fallback if preload hadn't fired yet)
    if (!srcSet.current) {
      video.src = src
      video.preload = 'auto'
      srcSet.current = true
    }
    video.play().catch(() => {})
    setPlaying(true)
    onVideoActive?.(reel.id, video)
  }

  const pause = (resetTime = false) => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    if (resetTime) video.currentTime = 0
    setPlaying(false)
    onVideoPause?.(reel.id)
  }

  // Autoplay when ≥50% of the card is visible (all devices)
  useEffect(() => {
    if (reduced || reel.embedUrl || !src) return
    const card = cardRef.current
    if (!card) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) play()
        else if (entry.intersectionRatio < 0.2) pause()
      },
      { threshold: [0.2, 0.5] }
    )
    obs.observe(card)
    return () => obs.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, reel, src])

  const handleMouseEnter = () => {
    if (reduced || reel.embedUrl) return
    play()
  }

  const handleMouseLeave = () => {
    if (reduced || reel.embedUrl) return
    // Reset to start so rehover always begins fresh
    const video = videoRef.current
    if (video) video.currentTime = 0
  }

  return (
    <motion.div
      ref={cardRef}
      layout
      className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-[var(--rh-border)] cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onPlay(reel)}
      whileHover={reduced ? {} : { y: -6, borderColor: 'var(--rh-blue)', transition: { duration: 0.4 } }}
      tabIndex={0}
      role="button"
      aria-label={`Play ${reel.brand} ${reel.type}`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(reel) }
      }}
    >
      {/* Poster */}
      <Image
        src={reel.poster}
        alt={`${reel.brand} — ${reel.type}`}
        fill
        unoptimized
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />

      {/* Preview video — src injected on preload or first play, never before */}
      {!reel.embedUrl && src && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: playing ? 1 : 0 }}
        />
      )}

      {/* Duration badge */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className="text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.55)', color: 'white' }}
        >
          {reel.duration}
        </span>
      </div>

      {/* Play button — fades out while playing */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300"
        style={{ opacity: playing ? 0 : 1 }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.08]"
          style={{ background: 'rgba(31,96,253,0.9)' }}
        >
          <Play size={24} fill="white" className="text-white ml-1" />
        </div>
      </div>

      {/* Bottom gradient scrim */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 z-10"
        style={{
          background: 'linear-gradient(to top, rgba(13,19,33,0.95) 0%, transparent 100%)',
          paddingTop: '3rem',
        }}
      >
        <p className="text-[18px] font-medium text-white leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>
          {reel.brand}
        </p>
        <p className="text-[13px] mt-0.5" style={{ fontFamily: 'var(--font-sans)', color: 'var(--rh-muted)' }}>
          {reel.type}
        </p>
      </div>
    </motion.div>
  )
}
