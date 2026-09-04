'use client'
import { useEffect, useState } from 'react'

export function useScrollSpy(ids: string[], options?: IntersectionObserverInit): string {
  const [activeId, setActiveId] = useState('')
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { threshold: 0.3, rootMargin: '-10% 0px -60% 0px', ...options }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [ids])
  return activeId
}
