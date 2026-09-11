import { serviceTiers } from '@/content/site'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'
import { Check } from 'lucide-react'

export function Services() {
  return (
    <section id="services" className="py-24 bg-[var(--rh-navy)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="PRODUCTION TIERS"
            title="Choose your tier."
            subtitle="Every reel is built to the highest standard — your tier determines the scope."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {serviceTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <div
                className={`rounded-2xl p-8 border flex flex-col h-full relative transition-all duration-300 ${
                  tier.mostPopular
                    ? 'bg-[var(--rh-card-hover)] border-[var(--rh-blue)] scale-[1.03]'
                    : 'bg-[var(--rh-card)] border-[var(--rh-border)] hover:border-[var(--rh-blue)]'
                }`}
              >
                {tier.mostPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--rh-blue)] text-white text-[11px] uppercase tracking-[0.15em] px-3 py-1 rounded-full font-inter font-medium">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="font-outfit font-extrabold text-3xl text-white">{tier.name}</h3>
                  <p className="mt-1 text-sm text-[var(--rh-muted)] font-inter">{tier.positioning}</p>
                  <ul className="mt-6 space-y-3">
                    {tier.includes.map(item => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[var(--rh-text)] font-inter">
                        <Check size={16} className="text-[var(--rh-blue)] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--rh-border)]">
                  <Button variant="ghost" href="#contact" className="w-full justify-center">
                    Talk to us
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
