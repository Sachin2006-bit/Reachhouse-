import { packages } from '@/content/site'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'

export function Packages() {
  return (
    <section id="packages" className="py-24 bg-[var(--rh-navy-raised)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="PACKAGES"
            title="Pick your size."
            subtitle="Scale your content strategy — from testing the waters to owning the feed."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.label} delay={i * 0.08}>
              <div className="bg-[var(--rh-card)] border border-[var(--rh-border)] rounded-2xl p-8 flex flex-col items-center text-center hover:border-[var(--rh-blue)] transition-all duration-300 group">
                <span className="font-outfit font-extrabold text-7xl text-[var(--rh-blue)] leading-none">
                  {pkg.count}
                </span>
                <h3 className="mt-4 font-outfit font-bold text-xl text-white">{pkg.label}</h3>
                <p className="mt-2 text-sm text-[var(--rh-muted)] font-inter leading-relaxed">{pkg.description}</p>
                <div className="mt-6 w-full pt-6 border-t border-[var(--rh-border)]">
                  <p className="text-xs text-[var(--rh-muted)] font-inter mb-4 uppercase tracking-wider">Request pricing</p>
                  <Button variant="ghost" href="#contact" className="w-full justify-center">
                    Get a quote
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
