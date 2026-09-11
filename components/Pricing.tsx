import { Check, ArrowRight } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'
import { WA_URL } from '@/lib/constants'

const checkPoints = [
  'Custom scope per brand',
  'Strategy + creative direction included',
  'Priority turnaround on retainers',
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[var(--rh-navy-raised)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="PRICING"
            title="Built around your brand."
            subtitle="Every engagement is custom — scoped to your goals, content volume and budget. No fixed packages, just what your brand actually needs."
          />
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="rounded-2xl bg-[var(--rh-card)] border border-[var(--rh-border)] p-8 sm:p-12 hover:border-[var(--rh-blue)] transition-colors duration-300">

            {/* Price anchors */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0">
              {/* Option 1 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:pr-10">
                <span className="text-xs font-inter uppercase tracking-[0.15em] mb-1" style={{ color: 'var(--rh-muted)' }}>
                  From
                </span>
                <div className="flex items-baseline gap-2 flex-wrap justify-center sm:justify-start">
                  <span
                    className="font-outfit font-extrabold leading-none"
                    style={{ fontSize: 'clamp(2.6rem, 5vw, 3.75rem)', color: 'var(--rh-blue)' }}
                  >
                    ₹50,000
                  </span>
                  <span className="text-lg font-inter" style={{ color: 'var(--rh-muted)' }}>
                    / month
                  </span>
                </div>
                <p className="mt-1 text-sm font-inter" style={{ color: 'var(--rh-muted)' }}>
                  Retainer engagement
                </p>
              </div>

              {/* Divider */}
              <div className="flex sm:flex-col items-center gap-3 sm:px-10">
                <div
                  className="h-px w-12 sm:h-14 sm:w-px"
                  style={{ background: 'var(--rh-border)' }}
                />
                <span className="text-xs font-inter uppercase tracking-[0.18em]" style={{ color: 'var(--rh-muted)' }}>
                  or
                </span>
                <div
                  className="h-px w-12 sm:h-14 sm:w-px"
                  style={{ background: 'var(--rh-border)' }}
                />
              </div>

              {/* Option 2 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:pl-10">
                <span className="text-xs font-inter uppercase tracking-[0.15em] mb-1" style={{ color: 'var(--rh-muted)' }}>
                  From
                </span>
                <div className="flex items-baseline gap-2 flex-wrap justify-center sm:justify-start">
                  <span
                    className="font-outfit font-extrabold leading-none"
                    style={{ fontSize: 'clamp(2.6rem, 5vw, 3.75rem)', color: 'var(--rh-blue)' }}
                  >
                    ₹7,000
                  </span>
                  <span className="text-lg font-inter" style={{ color: 'var(--rh-muted)' }}>
                    / reel
                  </span>
                </div>
                <p className="mt-1 text-sm font-inter" style={{ color: 'var(--rh-muted)' }}>
                  Per influencer-based reel
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 h-px" style={{ background: 'var(--rh-border)' }} />

            {/* Check points */}
            <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
              {checkPoints.map(point => (
                <li key={point} className="flex items-center gap-2.5">
                  <Check size={15} className="shrink-0" style={{ color: 'var(--rh-blue)' }} />
                  <span className="text-sm font-inter" style={{ color: 'var(--rh-text)' }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-8 h-px" style={{ background: 'var(--rh-border)' }} />

            {/* CTA */}
            <div className="flex flex-col items-center gap-4">
              <Button variant="primary" size="lg" href={WA_URL} className="group">
                Book a strategy call
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="text-sm text-center font-inter max-w-md" style={{ color: 'var(--rh-muted)' }}>
                Get a tailored plan and commercial for your brand — founding-client rates for early partners.
              </p>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  )
}
