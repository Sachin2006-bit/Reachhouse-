import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'
import { WA_URL } from '@/lib/constants'

export function Contact() {
  return (
    <section id="contact" className="py-32 bg-[var(--rh-navy)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <SectionHeading
            eyebrow="LET'S WORK TOGETHER"
            title={<>Ready to make your brand<br />unforgettable?</>}
            subtitle="Every great brand starts with a conversation. Let's discuss how ReachHouse can transform your digital presence."
            centered
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Button variant="primary" size="lg" href={WA_URL} className="group">
            Get started today
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            {/* TODO: CONFIRM — verify number before launch */}
            <a
              href="tel:+919100982321"
              className="flex items-center gap-3 bg-[var(--rh-card)] border border-[var(--rh-border)] rounded-full px-5 py-3 text-sm text-[var(--rh-text)] font-inter hover:border-[var(--rh-blue)] transition-colors"
            >
              <Phone size={16} className="text-[var(--rh-blue)]" />
              +91 9100 982 321
            </a>
            {/* TODO: CONFIRM — verify email before launch */}
            <a
              href="mailto:info@reachhouse.in"
              className="flex items-center gap-3 bg-[var(--rh-card)] border border-[var(--rh-border)] rounded-full px-5 py-3 text-sm text-[var(--rh-text)] font-inter hover:border-[var(--rh-blue)] transition-colors"
            >
              <Mail size={16} className="text-[var(--rh-blue)]" />
              info@reachhouse.in
            </a>
            {/* TODO: CONFIRM — verify location before launch */}
            <a
              href="https://maps.google.com/?q=AltF+Coworking+Begumpet+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[var(--rh-card)] border border-[var(--rh-border)] rounded-full px-5 py-3 text-sm text-[var(--rh-text)] font-inter hover:border-[var(--rh-blue)] transition-colors"
            >
              <MapPin size={16} className="text-[var(--rh-blue)]" />
              AltF Begumpet, Hyderabad
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
