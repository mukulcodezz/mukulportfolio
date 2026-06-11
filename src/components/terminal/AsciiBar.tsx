import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface AsciiBarProps {
  percent: number
  width?: number
  className?: string
}

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function AsciiBar({ percent, width = 20, className = '' }: AsciiBarProps) {
  const [current, setCurrent] = useState(() => (prefersReduced() ? percent : 0))
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (!inView || prefersReduced()) return
    let v = 0
    const timer = setInterval(() => {
      v = Math.min(percent, v + 3)
      setCurrent(v)
      if (v >= percent) clearInterval(timer)
    }, 24)
    return () => clearInterval(timer)
  }, [inView, percent])

  const filled = Math.round((current / 100) * width)
  return (
    <span ref={ref} className={`whitespace-nowrap ${className}`}>
      <span className="text-accent glow-soft">{'█'.repeat(filled)}</span>
      <span className="text-text-dim">{'░'.repeat(width - filled)}</span>
      <span className="text-text-muted ml-2 text-xs">{current}%</span>
    </span>
  )
}
