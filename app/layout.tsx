import type { Metadata } from 'next'
import { Outfit, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

// Existing fonts — kept for logo wordmark and legacy components
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-outfit-var',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter-var',
  display: 'swap',
})

// New typography system
const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Semibold.woff2',
  weight: '600',
  variable: '--font-display-var',
  display: 'swap',
  adjustFontFallback: 'Arial',
})

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Satoshi-Medium.woff2',  weight: '500' },
  ],
  variable: '--font-sans-var',
  display: 'swap',
  adjustFontFallback: 'Arial',
})

const geistMono = localFont({
  src: '../public/fonts/GeistMono-Medium.woff2',
  weight: '500',
  variable: '--font-mono-var',
  display: 'swap',
  adjustFontFallback: 'Arial',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://reachhouse.in'),
  title: 'ReachHouse — Influencer reels that grow your brand',
  description: 'ReachHouse is a Hyderabad influencer and performance marketing agency: influencer marketing, Meta ads, branding, social media management and reel production.',
  openGraph: {
    title: 'ReachHouse — Influencer reels that grow your brand',
    description: 'ReachHouse is a Hyderabad influencer and performance marketing agency: influencer marketing, Meta ads, branding, social media management and reel production.',
    url: 'https://reachhouse.in',
    siteName: 'ReachHouse',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'ReachHouse' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReachHouse — Influencer reels that grow your brand',
    description: 'ReachHouse is a Hyderabad influencer and performance marketing agency: influencer marketing, Meta ads, branding, social media management and reel production.',
    images: ['/og-image.svg'],
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
  telephone: '+919100982321',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${outfit.variable} ${inter.variable} ${clashDisplay.variable} ${satoshi.variable} ${geistMono.variable}`}
    >
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
