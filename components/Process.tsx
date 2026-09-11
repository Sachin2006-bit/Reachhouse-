'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, PenLine, Clapperboard, Scissors, Send } from 'lucide-react'
import { processSteps } from '@/content/site'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { useReducedMotion } from '@/lib/useReducedMotion'

const iconMap: Record<string, React.ElementType> = {
  Search, PenLine, Clapperboard, Scissors, Send,
}

export function Process() {
  const reduced = useReducedMotion()
  const lineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(lineRef, { once: true, amount: 0.3 })

  return (
    <section id="process" className="py-24 bg-[var(--rh-navy-raised)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title={<>From brief to viral —<br />our process.</>}
            centered
          />
        </Reveal>

        <div ref={lineRef} className="mt-16 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-[var(--rh-border)] z-0">
            <motion.div
              className="h-full bg-[var(--rh-blue)] origin-left"
              initial={{ scaleX: 0 }}
              animate={inView && !reduced ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon]
              return (
                <motion.div
                  key={step.number}
                  className="flex flex-col items-center text-center"
                  initial={reduced ? {} : { opacity: 0, y: 20 }}
                  animate={inView && !reduced ? { opacity: 1, y: 0 } : reduced ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.09 }}
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--rh-card)] border border-[var(--rh-border)] flex items-center justify-center mb-4">
                    {Icon && <Icon size={24} className="text-[var(--rh-blue)]" strokeWidth={1.5} />}
                  </div>
                  <span className="text-[13px] text-[var(--rh-blue)] font-inter font-medium tracking-widest mb-2">
                    {step.number}
                  </span>
                  <h3 className="font-outfit font-bold text-[20px] text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--rh-muted)] font-inter leading-relaxed">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
