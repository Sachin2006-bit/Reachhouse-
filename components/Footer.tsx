import Image from 'next/image'

const navLinks = [
  { label: 'Work',     href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process',  href: '#process' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Contact',  href: '#contact' },
]

// Social icons as inline SVG (lucide-react v1 dropped brand icons)
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--rh-border)] bg-[var(--rh-navy)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#top">
            <Image
              src="https://res.cloudinary.com/drf5dacrb/image/upload/e_background_removal/v1789130569/image_2_we456a.png"
              alt="ReachHouse"
              width={130}
              height={30}
              className="h-8 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer navigation">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--rh-muted)] hover:text-white font-inter transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-[var(--rh-muted)] hover:text-white transition-colors">
              <InstagramIcon size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-[var(--rh-muted)] hover:text-white transition-colors">
              <LinkedinIcon size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="text-[var(--rh-muted)] hover:text-white transition-colors">
              <YoutubeIcon size={20} />
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-[var(--rh-border)] text-center">
          <p className="text-xs text-[var(--rh-muted)] font-inter">
            © 2026 ReachHouse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
