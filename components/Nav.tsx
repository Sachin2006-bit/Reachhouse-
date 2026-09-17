'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { Button } from './ui/Button'
import { MobileMenu } from './MobileMenu'
import { useScrollSpy } from '@/lib/useScrollSpy'
import { WA_URL } from '@/lib/constants'

const navLinks = [
  { label: 'Work',     href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process',  href: '#process' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Contact',  href: '#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeId = useScrollSpy(['work', 'services', 'process', 'pricing', 'contact'])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(13,19,33,0.72)] backdrop-blur-xl border-b border-[var(--rh-border)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <a href="#top" className="shrink-0">
            <Image
              src="https://res.cloudinary.com/drf5dacrb/image/upload/e_background_removal/v1789130569/image_2_we456a.png"
              alt="ReachHouse"
              width={200}
              height={48}
              className="h-12 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center" aria-label="Main navigation">
            {navLinks.map(link => {
              const id = link.href.replace('#', '')
              const active = activeId === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-inter transition-colors duration-200 ${
                    active ? 'text-[var(--rh-white)]' : 'text-[var(--rh-muted)] hover:text-[var(--rh-white)]'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Desktop buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="primary" size="sm" href={WA_URL}>
              Start a project
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-[var(--rh-muted)] hover:text-white transition-colors p-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  )
}
