import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface TypeWriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  showCursor?: boolean
}

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function TypeWriter({ text, speed = 28, delay = 0, className = '', showCursor = true }: TypeWriterProps) {
  const [count, setCount] = useState(() => (prefersReduced() ? text.length : 0))
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    if (!inView || prefersReduced()) return
    let i = 0
    const start = setTimeout(() => {
      const timer = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) clearInterval(timer)
      }, speed)
    }, delay)
    return () => clearTimeout(start)
  }, [inView, text, speed, delay])

  const done = count >= text.length

  return (
    <span ref={ref} className={className}>
      {text.slice(0, count)}
      {showCursor && !done && <span className="cursor-blink ml-0.5" />}
    </span>
  )
}
