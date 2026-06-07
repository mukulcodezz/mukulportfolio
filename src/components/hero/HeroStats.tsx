import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { heroStats } from '@/data/stats'

function StatItem({ value, suffix, label }: { value: number | string; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!inView || typeof value !== 'number') return
    const duration = 1400
    const startTime = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [inView, value])

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div className="text-3xl md:text-4xl font-semibold text-text leading-none tracking-tight">
        {typeof value === 'number' ? count : value}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="text-xs text-text-muted text-mono uppercase tracking-[0.14em]">{label}</div>
    </div>
  )
}

export default function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-line"
    >
      {heroStats.map((stat, i) => (
        <StatItem key={i} {...stat} />
      ))}
    </motion.div>
  )
}
