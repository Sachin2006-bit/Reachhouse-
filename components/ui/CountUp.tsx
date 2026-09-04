'use client'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface CountUpProps {
  value: string // e.g. "100+" or "2026"
  duration?: number
}

export function CountUp({ value, duration = 1400 }: CountUpProps) {
  const reduced = useReducedMotion()
  const hasPlus = value.endsWith('+')
  const numericStr = value.replace('+', '')
  const target = parseInt(numericStr, 10)
  const start = value === '2026' ? 2000 : 0
  const [current, setCurrent] = useState(reduced ? target : start)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (reduced) { setCurrent(target); return }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCurrent(Math.round(start + (target - start) * eased))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, start, duration, reduced])

  return (
    <span ref={ref}>
      {current}
      {hasPlus && '+'}
    </span>
  )
}
