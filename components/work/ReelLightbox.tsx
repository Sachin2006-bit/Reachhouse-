'use client'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Reel } from '@/content/site'

interface ReelLightboxProps {
  reel: Reel | null
  onClose: () => void
}

export function ReelLightbox({ reel, onClose }: ReelLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (reel) {
      document.body.style.overflow = 'hidden'
      closeRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [reel])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {reel && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${reel.brand} — ${reel.type}`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Content */}
          <motion.div
            className="relative z-10 w-full max-w-sm"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* 9:16 player */}
            <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-black">
              {reel.embedUrl ? (
                <iframe
                  src={reel.embedUrl}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : reel.videoSrc ? (
                <video
                  src={reel.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[var(--rh-card)]">
                  <p className="text-[var(--rh-muted)] text-sm font-inter text-center px-6">
                    Video coming soon.<br />
                    <span className="text-xs opacity-60">Hosting in progress.</span>
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3 text-center">
              <p className="font-outfit font-semibold text-white">{reel.brand}</p>
              <p className="text-sm text-[var(--rh-muted)] font-inter">{reel.type} · {reel.tier}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
