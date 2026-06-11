import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

interface CinematicSectionProps {
  id: string
  children: ReactNode
  className?: string
}

/* Cinematic scroll treatment: parallax drift + scale-in + scanner sweep on entry */
export default function CinematicSection({ id, children, className = '' }: CinematicSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 0.35], [60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.22], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.97, 1])

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      <motion.div style={reduced ? undefined : { y, opacity, scale }}>
        {/* Scanner sweep on entry */}
        {!reduced && (
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: [0, 1, 1, 0] }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, times: [0, 0.4, 0.6, 1], ease: 'easeInOut' }}
            className="absolute top-0 left-0 right-0 h-px bg-accent z-10 pointer-events-none"
            style={{ boxShadow: '0 0 12px rgba(0,255,65,0.6)' }}
          />
        )}
        {children}
      </motion.div>
    </section>
  )
}
