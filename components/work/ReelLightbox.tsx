'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import type { Reel } from './reels'

interface ReelLightboxProps {
  reel: Reel | null
  reels: Reel[]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function ReelLightbox({ reel, reels, onClose, onPrev, onNext }: ReelLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef  = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying]             = useState(true)
  const [isMuted, setIsMuted]                 = useState(false)
  const [showSoundPrompt, setShowSoundPrompt] = useState(false)

  const open = !!reel

  // ── Open / close the <dialog> and lock body scroll ──────────────────────
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      const scrollY = window.scrollY
      dialog.showModal()

      // Lock body scroll without layout shift (scrollbar width is preserved by overflow-y:scroll)
      document.body.style.position  = 'fixed'
      document.body.style.top       = `-${scrollY}px`
      document.body.style.width     = '100%'
      document.body.style.overflowY = 'scroll'

      return () => {
        // Guard: close() throws if called on a detached element
        if (document.contains(dialog)) dialog.close()
        document.body.style.position  = ''
        document.body.style.top       = ''
        document.body.style.width     = ''
        document.body.style.overflowY = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [open])

  // ── Load + autoplay on reel change ──────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video || !reel) return

    setShowSoundPrompt(false)
    setIsPlaying(true)

    video.src = reel.src
    video.muted = false
    video.currentTime = 0

    video.play()
      .then(() => setIsMuted(false))
      .catch(() => {
        video.muted = true
        setIsMuted(true)
        setShowSoundPrompt(true)
        video.play().catch(() => {})
      })

    return () => {
      video.pause()
      video.src = ''
    }
  }, [reel])

  // ── Sync play/pause state from video element events ──────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onPlay  = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [])

  // ── Keyboard: ← → for prev/next; Esc handled by <dialog> natively ───────
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); onPrev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); onNext() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onPrev, onNext])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) video.pause()
    else video.play().catch(() => {})
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
    if (!video.muted) setShowSoundPrompt(false)
  }

  const tapForSound = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    setIsMuted(false)
    setShowSoundPrompt(false)
  }

  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose]
  )

  const currentIndex = reel ? reels.findIndex(r => r.id === reel.id) : -1
  const total = reels.length

  return (
    <dialog
      ref={dialogRef}
      className="arc-lightbox"
      aria-modal="true"
      aria-labelledby="lb-reel-title"
      onClick={onBackdropClick}
      onCancel={e => { e.preventDefault(); onClose() }}
    >
      {/* Close button — top right, clears safe-area-inset-top */}
      <button className="arc-lb-close" onClick={onClose} aria-label="Close lightbox">
        <X size={18} />
      </button>

      {/* Inner panel — stops backdrop-click propagation */}
      <div
        className="arc-lb-inner"
        onClick={e => e.stopPropagation()}
        role="presentation"
      >
        {/* Accessible title (visually hidden) */}
        <span id="lb-reel-title" className="sr-only">
          {reel ? `${reel.client} — ${reel.title}` : 'Reel playback'}
        </span>

        <video
          ref={videoRef}
          playsInline
          preload="auto"
          className="arc-lb-video"
        />

        {showSoundPrompt && (
          <button
            className="arc-lb-sound-prompt"
            onClick={tapForSound}
            aria-label="Unmute video"
          >
            🔊 Tap for sound
          </button>
        )}

        <div className="arc-lb-controls" role="toolbar" aria-label="Video controls">
          <button
            className="arc-lb-btn"
            onClick={onPrev}
            aria-label={currentIndex > 0 ? `Previous: ${reels[currentIndex - 1]?.client}` : 'Previous reel'}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            className="arc-lb-btn arc-lb-btn--play"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying
              ? <Pause size={20} fill="white" color="white" />
              : <Play  size={20} fill="white" color="white" style={{ marginLeft: 2 }} />
            }
          </button>

          <button
            className="arc-lb-btn"
            onClick={onNext}
            aria-label={currentIndex < total - 1 ? `Next: ${reels[currentIndex + 1]?.client}` : 'Next reel'}
          >
            <ChevronRight size={18} />
          </button>

          <button
            className="arc-lb-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {total > 1 && (
          <p
            aria-live="polite"
            aria-label={`Reel ${currentIndex + 1} of ${total}`}
            style={{
              marginTop: '0.75rem',
              fontSize: '0.8rem',
              color: 'rgba(147,166,198,0.7)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {currentIndex + 1} / {total}
          </p>
        )}
      </div>
    </dialog>
  )
}
