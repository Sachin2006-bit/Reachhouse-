'use client'
import { useEffect, useRef } from 'react'
import './hero.css'

interface GradientFieldProps {
  style?: React.CSSProperties
}

export function GradientField({ style }: GradientFieldProps) {
  const fieldRef = useRef<HTMLDivElement>(null)

  // Pause keyframe animations when hero is off-screen or tab is hidden
  useEffect(() => {
    const field = fieldRef.current
    if (!field) return

    const blobs = field.querySelectorAll<HTMLElement>('.hero-blob')

    const setPaused = (paused: boolean) => {
      blobs.forEach(b => {
        b.style.animationPlayState = paused ? 'paused' : 'running'
      })
    }

    // Pause when tab hidden
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)

    // Pause when out of view
    const obs = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(field)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      obs.disconnect()
    }
  }, [])

  return (
    <div
      ref={fieldRef}
      className="hero-layer hero-field"
      aria-hidden="true"
      style={style}
    >
      <div className="hero-blob hero-blob-a" />
      <div className="hero-blob hero-blob-b" />
      <div className="hero-blob hero-blob-c" />
    </div>
  )
}
