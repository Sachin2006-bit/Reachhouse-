'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/Button'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { WA_URL } from '@/lib/constants'

export function Hero() {
  const reduced = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 20 },
    animate: reduced ? {} : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-4 sm:px-6 text-center"
    >
      {/* Eyebrow — Geist Mono 500 */}
      <motion.span
        {...fadeUp(0)}
        className="block text-[13px] uppercase tracking-[0.22em] font-medium mb-8"
        style={{ fontFamily: 'var(--font-mono)', color: '#1A61FD' }}
      >
        REACHHOUSE PRESENTS
      </motion.span>

      {/* Headline — Clash Display 600 */}
      <motion.h1
        {...fadeUp(0.12)}
        className="text-[var(--rh-white)] font-semibold leading-[0.92] max-w-5xl"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
          letterSpacing: '-0.035em',
        }}
      >
        <span className="block">We take brands from</span>
        <span className="block">reel to revenue.</span>
      </motion.h1>

      {/* Sub-headline — Clash Display 600, muted */}
      <motion.p
        {...fadeUp(0.22)}
        className="mt-4 text-[var(--rh-muted)] font-semibold leading-snug md:leading-[0.95] max-w-4xl"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
          letterSpacing: '-0.02em',
        }}
      >
        With India&apos;s most glamorous creator network.
      </motion.p>

      {/* CTAs */}
      <motion.div
        {...fadeUp(0.34)}
        className="mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <Button variant="primary" size="lg" href={WA_URL} className="group">
          Get started today
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Button>
        <Button variant="ghost" size="lg" href="#work">
          See our work
        </Button>
      </motion.div>
    </section>
  )
}
