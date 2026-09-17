import { Users, TrendingUp, Sparkles, Calendar, Clapperboard, Video } from 'lucide-react'
import { services, serviceTags } from '@/content/services'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'
import { WA_URL } from '@/lib/constants'

const iconMap = {
  Users, TrendingUp, Sparkles, Calendar, Clapperboard, Video,
}

export function WhatWeDo() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 bg-[var(--rh-navy)] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div id="services-heading">
            <SectionHeading
              eyebrow="WHAT WE DO"
              title={
                <>
                  Everything your brand needs to{' '}
                  <em style={{ fontStyle: 'normal', color: 'var(--rh-blue-300)' }}>grow</em>
                  {' '}— under one house.
                </>
              }
              subtitle="From finding the right creators to running the ads that scale them — here's exactly how we work."
            />
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <Reveal key={service.number} delay={i * 0.08} className="h-full">
                <div className="rounded-2xl p-8 border border-[var(--rh-border)] bg-[var(--rh-card)] flex flex-col h-full transition-all duration-300 hover:border-[var(--rh-blue)] hover:-translate-y-1 hover:[box-shadow:0_8px_32px_-8px_rgba(31,96,253,0.35)]">
                  <div className="w-12 h-12 rounded-full bg-[var(--rh-card-hover)] border border-[var(--rh-border)] flex items-center justify-center mb-5">
                    <Icon size={22} className="text-[var(--rh-blue)]" strokeWidth={1.5} />
                  </div>

                  <span className="text-[13px] text-[var(--rh-blue)] font-inter font-medium tracking-widest mb-2">
                    {service.number}
                  </span>

                  <h3 className="font-outfit font-extrabold text-2xl text-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-[15px] text-[var(--rh-text)] font-inter leading-relaxed mb-5">
                    {service.summary}
                  </p>

                  <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--rh-muted)] font-inter font-medium mb-3">
                    How we do it
                  </p>
                  <ul className="space-y-2.5 mb-6">
                    {service.points.map(point => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-[var(--rh-text)] font-inter leading-relaxed"
                      >
                        <span className="block w-1.5 h-1.5 rounded-full bg-[var(--rh-blue)] shrink-0 mt-1.5" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5 border-t border-[var(--rh-border)]">
                    <p className="text-sm text-[var(--rh-muted)] font-inter">
                      <span className="text-[var(--rh-text)] font-medium">You get:</span>{' '}
                      {service.youGet}
                    </p>
                    {service.note && (
                      <p className="mt-2 text-xs text-[var(--rh-muted)] font-inter italic">
                        {service.note}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <div className="rounded-2xl border border-[var(--rh-border)] bg-[var(--rh-card)] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm text-[var(--rh-muted)] font-inter shrink-0">And more:</span>
              {serviceTags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-inter text-[var(--rh-text)] bg-[var(--rh-card-hover)] border border-[var(--rh-border)] rounded-full px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Button variant="primary" href={WA_URL} className="shrink-0 whitespace-nowrap">
              Not sure what you need? Book a strategy call
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
