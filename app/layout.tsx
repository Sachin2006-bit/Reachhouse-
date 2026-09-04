import type { Metadata } from 'next'
import { Outfit, Inter } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-outfit',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ReachHouse — Influencer reels that grow your brand',
  description: 'ReachHouse is a premium influencer-reel production studio in Hyderabad. We script, shoot, edit and strategize reels that grow your brand, drive sales, and capture leads.',
  openGraph: {
    title: 'ReachHouse — Influencer reels that grow your brand',
    description: 'Premium influencer-led reel production. Script · Shoot · Edit · Strategy.',
    url: 'https://reachhouse.in',
    siteName: 'ReachHouse',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ReachHouse' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReachHouse — Influencer reels that grow your brand',
    description: 'Premium influencer-led reel production in Hyderabad.',
    images: ['/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ReachHouse',
  url: 'https://reachhouse.in',
  logo: 'https://reachhouse.in/logo/reachhouse-mark.svg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'AltF Begumpet',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    addressCountry: 'IN',
  },
  telephone: '+917416393958',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
