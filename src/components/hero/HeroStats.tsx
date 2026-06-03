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
    const duration = 2000
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
    <div ref={ref} className="text-left">
      <div className="text-3xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent leading-none">
        {typeof value === 'number' ? count : value}{suffix}
      </div>
      <div className="text-xs text-white/40 mt-1 font-medium">{label}</div>
    </div>
  )
}

export default function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="flex gap-8 pt-4 border-t border-white/[0.06] flex-wrap"
    >
      {heroStats.map((stat, i) => (
        <StatItem key={i} {...stat} />
      ))}
    </motion.div>
  )
}
