'use client'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface HorizonArcProps {
  scrollContainer: React.RefObject<HTMLElement | null>
}

export function HorizonArc({ scrollContainer }: HorizonArcProps) {
  const { scrollYProgress } = useScroll({
    target: scrollContainer,
    offset: ['start start', 'end end'],
  })

  // Only translateY and scale — never translateX, so centring is not disturbed
  const rawY     = useTransform(scrollYProgress, [0, 1], ['0vmax', '-6vmax'])
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.97])
  const rawBloom = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0])

  const y     = useSpring(rawY,     { stiffness: 60, damping: 20, mass: 1 })
  const scale = useSpring(rawScale, { stiffness: 60, damping: 20, mass: 1 })
  const bloom = useSpring(rawBloom, { stiffness: 80, damping: 25, mass: 1 })

  return (
    /*
     * Outer div: the ONLY thing that centres the arc.
     * left:50% + transform:translateX(-50%) live here in CSS and are
     * never written by Framer Motion.
     */
    <div className="hero-arc-outer" aria-hidden="true">
      {/*
       * Inner motion.div: ONLY receives translateY + scale from Framer Motion.
       * translateX is intentionally absent so the centering above is preserved.
       */}
      <motion.div className="hero-arc-inner" style={{ y, scale }}>
        <div className="hero-arc" />
        <motion.div className="hero-arc-bloom" style={{ opacity: bloom }} />
      </motion.div>
    </div>
  )
}
