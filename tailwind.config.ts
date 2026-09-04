import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'rh-navy':        'var(--rh-navy)',
        'rh-navy-raised': 'var(--rh-navy-raised)',
        'rh-card':        'var(--rh-card)',
        'rh-card-hover':  'var(--rh-card-hover)',
        'rh-border':      'var(--rh-border)',
        'rh-blue':        'var(--rh-blue)',
        'rh-blue-hover':  'var(--rh-blue-hover)',
        'rh-blue-soft':   'var(--rh-blue-soft)',
        'rh-white':       'var(--rh-white)',
        'rh-text':        'var(--rh-text)',
        'rh-muted':       'var(--rh-muted)',
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        inter:  ['var(--font-inter)',  'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
