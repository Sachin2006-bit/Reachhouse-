# ReachHouse — Marketing Website

Next.js 15 / Tailwind v4 / Framer Motion marketing site for ReachHouse, a premium influencer-reel production studio in Hyderabad.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to swap logos

Replace the SVG files in `/public/logo/`:

- `reachhouse-full-light.svg` — horizontal logo (navbar desktop, footer)
- `reachhouse-mark.svg` — icon-only mark (navbar mobile, favicon source)

Keep the same filenames. Both are referenced directly from components.

## How to add a reel

Open `content/site.ts` and append an item to the `reels` array:

```ts
{
  id: 'my-brand-reel',          // unique slug
  brand: 'My Brand',
  type: 'Product launch reel',
  tier: 'Gold',                 // 'Silver' | 'Gold' | 'Platinum'
  duration: '0:30',
  poster: '/posters/my-brand.jpg',   // place image in /public/posters/
  videoSrc: 'https://cdn.example.com/my-reel.mp4',  // optional: hosted MP4
  withInfluencer: true,
},
```

For video playback, `videoSrc` (hosted MP4) is preferred over `embedUrl` (iframe) because embeds cannot be hover-previewed due to third-party autoplay restrictions.

## How to change contact details

Search the codebase for `TODO: CONFIRM` — there are three in `components/Contact.tsx`:

- Phone: `+91 7416 393 958`
- Email: `info@reachhouse.in`
- Address: `AltF Begumpet, Hyderabad`

Update the `href` attributes and display text in that file. Also update `app/layout.tsx` JSON-LD (the `telephone` field).

## How to deploy

Push to GitHub, then import the repo into [Vercel](https://vercel.com/new). Zero configuration needed — Vercel auto-detects Next.js.

For the dashboard URL (the "Go to Dashboard" button), set:

```
NEXT_PUBLIC_DASHBOARD_URL=https://your-dashboard.com
```

as an environment variable in Vercel project settings.

## Brand palette

All colors are defined as CSS custom properties in `app/globals.css` and referenced via `var(--rh-*)`. **No purple anywhere.**

| Token | Value | Usage |
|---|---|---|
| `--rh-navy` | `#0D1321` | Page background |
| `--rh-navy-raised` | `#131B2E` | Alternate section BG |
| `--rh-card` | `#171F33` | Card surface |
| `--rh-blue` | `#1F60FD` | Primary accent / CTAs |
| `--rh-text` | `#E8ECF5` | Body text |
| `--rh-muted` | `#9AA6C2` | Secondary text |

## Tech stack

- **Next.js 16** (App Router, static export)
- **Tailwind CSS v4** (theme tokens in `app/globals.css`)
- **Framer Motion 13** (animations, layout, AnimatePresence)
- **Lucide React** (icons)
- **TypeScript** (strict mode)
