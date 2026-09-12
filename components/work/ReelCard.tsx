'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import type { Reel } from './reels'

interface ReelCardProps {
  reel: Reel
  cardW: number
  cardH: number
  isNearCenter: boolean // mounts preview video
  isCenterCard: boolean // play button always visible
  saveData: boolean     // honour prefers-reduced-data
  onPlay: () => void
}

export function ReelCard({
  reel,
  cardW,
  cardH,
  isNearCenter,
  isCenterCard,
  saveData,
  onPlay,
}: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoVisible, setVideoVisible] = useState(false)

  // Mount/unmount preview video via isNearCenter
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.src = reel.preview
    video.load()

    const onCanPlay = () => {
      video.play().catch(() => {})
      setVideoVisible(true)
    }
    video.addEventListener('canplay', onCanPlay, { once: true })

    return () => {
      video.removeEventListener('canplay', onCanPlay)
      video.pause()
      video.src = ''
      setVideoVisible(false)
    }
  }, [reel.preview])

  const showVideo = isNearCenter && !saveData
  const showPlayAlways = isCenterCard

  return (
    <button
      className="arc-card"
      aria-label={`Play reel: ${reel.client} — ${reel.title}`}
      onClick={onPlay}
      style={{ width: cardW }}
    >
      {/* 9:16 media box */}
      <div className="arc-card-media" style={{ height: cardH }}>
        <Image
          src={reel.poster}
          alt={`${reel.client} — ${reel.title}`}
          fill
          unoptimized
          className="arc-card-img"
          sizes="(max-width: 767px) 55vw, (max-width: 1279px) 35vw, 20vw"
          loading="lazy"
        />

        {/* Preview video — only mounted when near centre */}
        {showVideo && (
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="metadata"
            className="arc-card-video"
            style={{ opacity: videoVisible ? 1 : 0 }}
          />
        )}

        {/* 1px inner rim */}
        <div className="arc-card-rim" aria-hidden="true" />

        {/* Play affordance */}
        <div
          className={`arc-card-play${showPlayAlways ? ' arc-card-play--visible' : ''}`}
          aria-hidden="true"
        >
          <div className="arc-card-play-btn">
            <Play size={20} fill="white" color="white" style={{ marginLeft: 2 }} />
          </div>
        </div>
      </div>

      {/* Meta — below the media box, outside the overflow:hidden */}
      <div className="arc-card-meta">
        <p className="arc-card-client">{reel.client}</p>
        <p className="arc-card-title">{reel.title}</p>
      </div>
    </button>
  )
}
