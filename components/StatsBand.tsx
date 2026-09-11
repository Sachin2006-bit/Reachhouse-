'use client'
import { stats } from '@/content/site'
import { CountUp } from './ui/CountUp'
import { Reveal } from './ui/Reveal'

export function StatsBand() {
  return (
    <section className="bg-[var(--rh-navy-raised)] border-y border-[var(--rh-border)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-0">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div
                className={`flex flex-col items-center text-center py-6 px-10 ${
                  i < stats.length - 1 ? 'md:border-r border-[var(--rh-border)]' : ''
                }`}
              >
                <span className="font-outfit font-extrabold text-[52px] leading-none text-[var(--rh-blue)]">
                  <CountUp value={stat.value} />
                </span>
                <span className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--rh-muted)] font-inter">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
