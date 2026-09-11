'use client'
import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { reels, Reel } from '@/content/site'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { WA_URL } from '@/lib/constants'
import { FilterPills, FilterKey } from './FilterPills'
import { ReelCard } from './ReelCard'
import { ReelLightbox } from './ReelLightbox'

const MAX_CONCURRENT = 4

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [lightboxReel, setLightboxReel] = useState<Reel | null>(null)
  // Flips to true once the section enters the viewport — triggers preload on all cards
  const [preloadReady, setPreloadReady] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const activeVideos = useRef<Map<string, HTMLVideoElement>>(new Map())

  // Watch the section; preload all card videos when the top of the section is 20% in view
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPreloadReady(true)
          obs.disconnect()
        }
      },
      { threshold: 0.05 } // fires as soon as 5% of the section is visible
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  const filtered = reels.filter(reel => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'influencer') return reel.withInfluencer
    if (activeFilter === 'brand') return !reel.withInfluencer
    return reel.tier === activeFilter
  })

  const handleVideoActive = useCallback((id: string, video: HTMLVideoElement) => {
    activeVideos.current.set(id, video)
    if (activeVideos.current.size > MAX_CONCURRENT) {
      const firstKey = activeVideos.current.keys().next().value
      if (firstKey && firstKey !== id) {
        activeVideos.current.get(firstKey)?.pause()
        activeVideos.current.delete(firstKey)
      }
    }
  }, [])

  const handleVideoPause = useCallback((id: string) => {
    activeVideos.current.delete(id)
  }, [])

  return (
    <section ref={sectionRef} id="work" className="py-24 bg-[var(--rh-navy)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="OUR WORK"
            title="Reels that convert."
            subtitle="A curated wall of influencer-led and brand-led reels — real work for real brands."
          />
        </Reveal>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((reel, i) => (
              <motion.div
                key={reel.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <ReelCard
                  reel={reel}
                  onPlay={setLightboxReel}
                  shouldPreload={preloadReady}
                  onVideoActive={handleVideoActive}
                  onVideoPause={handleVideoPause}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Band */}
        <Reveal delay={0.1} className="mt-16">
          <div className="rounded-3xl bg-[var(--rh-card)] border border-[var(--rh-border)] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <h3 className="font-outfit font-bold text-[32px] text-[var(--rh-white)] leading-tight text-center sm:text-left">
              Want reels like these for your brand?
            </h3>
            <Button variant="primary" size="lg" href={WA_URL} className="shrink-0 group">
              Get your custom quote
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </Reveal>
      </div>

      <ReelLightbox reel={lightboxReel} onClose={() => setLightboxReel(null)} />
    </section>
  )
}
