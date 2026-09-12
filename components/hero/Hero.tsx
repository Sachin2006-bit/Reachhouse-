'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GradientField } from './GradientField'
import { HorizonArc } from './HorizonArc'
import { ServiceMarquee } from './ServiceMarquee'
import { WA_URL } from '@/lib/constants'
import './hero.css'

export function Hero() {
  const outerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // Fade marquee out as arc rises and starts crowding it
  const rawMarqueeOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const marqueeOpacity = useSpring(rawMarqueeOpacity, { stiffness: 80, damping: 25, mass: 1 })

  return (
    <section ref={outerRef} id="top" className="hero-outer">
      {/* Sticky viewport-height stage — flex column, absolute layers sit behind flex children */}
      <div className="hero-stage">

        {/* Absolute layer: living gradient field */}
        <GradientField />

        {/* Absolute layer: glowing arc / horizon — centred by its own outer div */}
        <HorizonArc scrollContainer={outerRef} />

        {/* Absolute layer: film-grain texture */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E"
          aria-hidden="true"
          alt=""
          className="hero-grain hero-layer"
        />

        {/* Flex child 1: content block (grows to fill space, centres its items) */}
        <div className="hero-content">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-5"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--rh-blue-300)' }}
          >
            India&apos;s Creator-First Video Studio
          </p>

          <h1 className="hero-headline">
            We take brands<br />
            <em style={{ fontStyle: 'normal', color: 'var(--rh-blue-300)' }}>from reel</em><br />
            to revenue.
          </h1>

          <p className="hero-subhead">
            With India&apos;s most glamorous creator network — 500+ influencers,
            1000+ reels delivered, results that compound.
          </p>

          <div className="hero-buttons" id="hero-buttons">
            <Button variant="primary" size="lg" href={WA_URL} className="group">
              Start a project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="ghost" size="lg" href="#work">
              See our work
            </Button>
          </div>
        </div>

        {/* Flex child 2: service marquee — rides just above the arc rim */}
        <motion.div style={{ opacity: marqueeOpacity }}>
          <ServiceMarquee />
        </motion.div>

      </div>
    </section>
  )
}
