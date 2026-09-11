// Tailwind v4 — theme tokens are defined in app/globals.css via @theme
// This file sets content paths for class scanning.
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
}

export default config
