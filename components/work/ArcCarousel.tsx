'use client'
import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'
import type { Reel } from './reels'
import { ReelCard } from './ReelCard'

// ── Geometry tunables ────────────────────────────────────────────────────────
// These must match the CSS custom properties in work.css.
const SPEED      = 1 / 3.5   // progress units/second — one card past centre every 3.5 s
const TILT_GAIN  = 0.65       // multiplier on the geometric tangent angle
const DECAY      = 0.88       // inertia velocity multiplier per 60fps frame
const CARD_TOP   = 24         // px from arc-area top to the arc apex (centre card top-edge)
const NEAR_THRESH = 1.5       // |t| below which preview video is mounted

interface ArcConfig {
  radius: number
  spacing: number
  visibleCount: number
  cardW: number
  cardH: number
}

// Responsive config — matches the breakpoints in work.css
function computeConfig(vpWidth: number): ArcConfig {
  const cardW = Math.min(Math.max(180, vpWidth * 0.15), 280)
  const cardH = Math.round((cardW * 16) / 9)
  if (vpWidth >= 1280) return { radius: 2500, spacing: 280, visibleCount: 7, cardW, cardH }
  if (vpWidth >= 768)  return { radius: 1800, spacing: 230, visibleCount: 5, cardW, cardH }
  return                      { radius: 800,  spacing: 190, visibleCount: 3, cardW, cardH }
}

// Wrap v into [-N/2, N/2) so cards recycle with no visible jump
function wrap(v: number, N: number): number {
  v = ((v % N) + N) % N
  if (v >= N / 2) v -= N
  return v
}

interface ArcCarouselProps {
  reels: Reel[]
  onPlay: (reel: Reel) => void
  paused: boolean // true while lightbox is open
}

export function ArcCarousel({ reels, onPlay, paused }: ArcCarouselProps) {
  const reduced = useReducedMotion()

  // ── Config: null on SSR, set after mount ──────────────────────────────────
  const configRef = useRef<ArcConfig>(computeConfig(1440))
  const [config, setConfig] = useState<ArcConfig | null>(null)

  // ── rAF progress ──────────────────────────────────────────────────────────
  const progressRef  = useRef(0)
  const velocityRef  = useRef(0) // extra velocity on top of ambient SPEED (for inertia)
  const lastTimeRef  = useRef<number | null>(null)
  const rafRef       = useRef<number | undefined>(undefined)

  // ── Pause flags ───────────────────────────────────────────────────────────
  // Start optimistically true so the first frames animate before the
  // IntersectionObserver fires (which only happens after config is set).
  const isInViewRef  = useRef(true)
  const isHiddenRef  = useRef(false)
  const isHoveredRef = useRef(false)
  const isDragging   = useRef(false)
  const lightboxOpen = useRef(paused)
  useEffect(() => { lightboxOpen.current = paused }, [paused])

  // ── DOM refs ──────────────────────────────────────────────────────────────
  const areaRef     = useRef<HTMLDivElement>(null)
  const cardRefs    = useRef<Map<string, HTMLDivElement>>(new Map())
  const originRef   = useRef<HTMLElement | null>(null) // focus return after lightbox

  // ── Near-centre tracking — drives video mounting (not every frame) ────────
  const nearCenterRef = useRef<string>('')   // sorted id list as string key
  const centerIdRef   = useRef<string | null>(null)
  const [nearCenterIds, setNearCenterIds] = useState<Set<string>>(new Set())
  const [centerReelId, setCenterReelId]   = useState<string | null>(null)

  // ── Drag state ────────────────────────────────────────────────────────────
  const dragStartRef = useRef<{ x: number; progress: number } | null>(null)
  const dragLastX    = useRef(0)
  const dragLastTime = useRef(0)
  const dragVel      = useRef(0)

  // ── saveData detection ────────────────────────────────────────────────────
  const saveData = useRef(false)

  // ── Imperative render: writes transform/opacity/zIndex directly to DOM ────
  const renderFrame = useCallback(() => {
    const cfg = configRef.current
    const N = reels.length
    if (N === 0) return

    const halfVisible = cfg.visibleCount / 2 + 1
    const progress = progressRef.current

    const newNearIds: string[] = []
    let newCenterId: string | null = null
    let minAbsT = Infinity

    reels.forEach((reel, i) => {
      const el = cardRefs.current.get(reel.id)
      if (!el) return

      const t = wrap(i - progress, N)
      const absT = Math.abs(t)

      if (absT > halfVisible) {
        if (el.style.visibility !== 'hidden') {
          el.style.visibility   = 'hidden'
          el.style.pointerEvents = 'none'
        }
        return
      }

      if (el.style.visibility !== 'visible') {
        el.style.visibility   = 'visible'
        el.style.pointerEvents = 'auto'
      }

      const x     = t * cfg.spacing
      const y     = cfg.radius - Math.sqrt(Math.max(0, cfg.radius ** 2 - x ** 2))
      const angle = (x / cfg.radius) * (180 / Math.PI) * TILT_GAIN
      const scale = 1 - Math.min(absT * 0.055, 0.3)
      const op    = 1 - Math.min(absT * 0.16, 0.65)
      const zi    = 1000 - Math.round(absT * 10)

      // x-offset so the card's centre sits at x (not its left edge)
      el.style.transform = `translate3d(${x - cfg.cardW / 2}px,${y}px,0) rotate(${angle}deg) scale(${scale})`
      el.style.opacity   = String(op)
      el.style.zIndex    = String(zi)

      if (absT < NEAR_THRESH) newNearIds.push(reel.id)
      if (absT < minAbsT) { minAbsT = absT; newCenterId = reel.id }
    })

    // Only trigger React re-render when the near-centre set or centre card changes
    const key = [...newNearIds].sort().join(',')
    if (key !== nearCenterRef.current) {
      nearCenterRef.current = key
      setNearCenterIds(new Set(newNearIds))
    }
    if (newCenterId !== centerIdRef.current) {
      centerIdRef.current = newCenterId
      setCenterReelId(newCenterId)
    }
  }, [reels])

  // ── rAF tick ──────────────────────────────────────────────────────────────
  const tick = useCallback((time: number) => {
    const dt = Math.min((time - (lastTimeRef.current ?? time)) / 1000, 0.1)
    lastTimeRef.current = time

    const advancing =
      isInViewRef.current &&
      !isHiddenRef.current &&
      !isHoveredRef.current &&
      !isDragging.current &&
      !lightboxOpen.current

    if (advancing) {
      velocityRef.current *= Math.pow(DECAY, dt * 60)
      if (Math.abs(velocityRef.current) < 0.001) velocityRef.current = 0
      progressRef.current += (SPEED + velocityRef.current) * dt
    }

    renderFrame()
    rafRef.current = requestAnimationFrame(tick)
  }, [renderFrame])

  const startRaf = useCallback(() => {
    if (rafRef.current) return
    lastTimeRef.current = null
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const stopRaf = useCallback(() => {
    if (rafRef.current !== undefined) { cancelAnimationFrame(rafRef.current); rafRef.current = undefined }
  }, [])

  // ── Mount: config, resize, IntersectionObserver, visibilitychange ─────────
  useLayoutEffect(() => {
    // saveData check
    saveData.current = !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData

    const updateConfig = () => {
      const cfg = computeConfig(window.innerWidth)
      configRef.current = cfg
      setConfig(cfg)
    }
    updateConfig()

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(updateConfig, 150) }
    window.addEventListener('resize', onResize)

    const onVisibility = () => { isHiddenRef.current = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    startRaf()

    return () => {
      stopRaf()
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [startRaf, stopRaf])

  // ── IntersectionObserver — separate effect so it runs after config is set ──
  // The main useLayoutEffect above runs while config=null (hydration guard
  // renders a placeholder with no ref), so areaRef.current is null there.
  // This effect runs only after config becomes non-null and the real arc-area
  // div is in the DOM with areaRef.current assigned.
  useEffect(() => {
    const area = areaRef.current
    if (!area) return
    const obs = new IntersectionObserver(
      ([entry]) => { isInViewRef.current = entry.isIntersecting },
      { threshold: 0.05 }
    )
    obs.observe(area)
    return () => obs.disconnect()
  }, [config])

  // ── Return focus to originating card when lightbox closes ─────────────────
  const prevPaused = useRef(paused)
  useEffect(() => {
    if (!paused && prevPaused.current) {
      originRef.current?.focus()
      originRef.current = null
    }
    prevPaused.current = paused
  }, [paused])

  // ── Pointer / wheel / keyboard ────────────────────────────────────────────
  useEffect(() => {
    const area = areaRef.current
    if (!area || reduced) return

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      area.setPointerCapture(e.pointerId)
      dragStartRef.current = { x: e.clientX, progress: progressRef.current }
      dragLastX.current    = e.clientX
      dragLastTime.current = e.timeStamp
      dragVel.current      = 0
      isDragging.current   = true
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragStartRef.current) return
      const dx = e.clientX - dragStartRef.current.x
      progressRef.current = dragStartRef.current.progress - dx / configRef.current.spacing

      const dt = e.timeStamp - dragLastTime.current
      if (dt > 0) {
        dragVel.current = -(e.clientX - dragLastX.current) / dt / configRef.current.spacing * 1000
      }
      dragLastX.current    = e.clientX
      dragLastTime.current = e.timeStamp
    }

    const onPointerUp = () => {
      if (!dragStartRef.current) return
      dragStartRef.current = null
      isDragging.current   = false
      velocityRef.current  = dragVel.current // hand off to inertia decay
    }

    const onPointerCancel = () => {
      dragStartRef.current = null
      isDragging.current   = false
    }

    const onWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey
      if (!horizontal) return // let plain vertical wheel scroll the page
      e.preventDefault()
      progressRef.current += (e.deltaX || e.deltaY) / configRef.current.spacing * 0.3
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); progressRef.current -= 1 }
      if (e.key === 'ArrowRight') { e.preventDefault(); progressRef.current += 1 }
    }

    const onMouseEnter = () => { isHoveredRef.current = true }
    const onMouseLeave = () => { isHoveredRef.current = false }
    const onFocusIn    = () => { isHoveredRef.current = true }
    const onFocusOut   = (e: FocusEvent) => {
      if (!area.contains(e.relatedTarget as Node)) isHoveredRef.current = false
    }

    area.addEventListener('pointerdown',  onPointerDown)
    area.addEventListener('pointermove',  onPointerMove)
    area.addEventListener('pointerup',    onPointerUp)
    area.addEventListener('pointercancel',onPointerCancel)
    area.addEventListener('wheel',        onWheel, { passive: false })
    area.addEventListener('keydown',      onKeyDown)
    area.addEventListener('mouseenter',   onMouseEnter)
    area.addEventListener('mouseleave',   onMouseLeave)
    area.addEventListener('focusin',      onFocusIn)
    area.addEventListener('focusout',     onFocusOut)

    return () => {
      area.removeEventListener('pointerdown',  onPointerDown)
      area.removeEventListener('pointermove',  onPointerMove)
      area.removeEventListener('pointerup',    onPointerUp)
      area.removeEventListener('pointercancel',onPointerCancel)
      area.removeEventListener('wheel',        onWheel)
      area.removeEventListener('keydown',      onKeyDown)
      area.removeEventListener('mouseenter',   onMouseEnter)
      area.removeEventListener('mouseleave',   onMouseLeave)
      area.removeEventListener('focusin',      onFocusIn)
      area.removeEventListener('focusout',     onFocusOut)
    }
  }, [reduced])

  // ── Reduced-motion: static scroll-snap row ────────────────────────────────
  if (reduced) {
    return (
      <div className="arc-reduced-row" role="region" aria-label="Reel showcase">
        {reels.map(reel => (
          <div key={reel.id} className="arc-reduced-item">
            <ReelCard
              reel={reel}
              cardW={220}
              cardH={Math.round(220 * 16 / 9)}
              isNearCenter={false}
              isCenterCard={false}
              saveData={false}
              onPlay={() => onPlay(reel)}
            />
          </div>
        ))}
      </div>
    )
  }

  // ── Hydration guard: render nothing until config is measured ──────────────
  if (!config) return <div className="arc-area" aria-hidden="true" />

  const { cardW, cardH } = config

  return (
    <div
      ref={areaRef}
      className="arc-area"
      role="region"
      aria-label="Reel showcase — drag, swipe or use arrow keys"
      tabIndex={0}
    >
      {/* Bloom behind the arc apex */}
      <div className="arc-bloom" aria-hidden="true" />

      {/*
       * Stage: left:50% anchors the coordinate origin at viewport centre.
       * The rAF loop NEVER writes transform here — only on .arc-card-wrap children.
       * This keeps left:50% intact so the arc apex stays exactly centred.
       */}
      <div className="arc-stage" style={{ top: CARD_TOP }}>
        {reels.map(reel => (
          <div
            key={reel.id}
            ref={el => {
              if (el) cardRefs.current.set(reel.id, el)
              else    cardRefs.current.delete(reel.id)
            }}
            className="arc-card-wrap"
            style={{ width: cardW }}
          >
            <ReelCard
              reel={reel}
              cardW={cardW}
              cardH={cardH}
              isNearCenter={nearCenterIds.has(reel.id)}
              isCenterCard={centerReelId === reel.id}
              saveData={saveData.current}
              onPlay={() => {
                originRef.current = document.activeElement as HTMLElement
                onPlay(reel)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
