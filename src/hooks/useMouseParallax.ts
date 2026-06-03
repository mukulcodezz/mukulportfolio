import { useState, useEffect } from 'react'

export function useMouseParallax(strength = 0.02) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength * 100
      const y = (e.clientY / window.innerHeight - 0.5) * strength * 100
      setPosition({ x, y })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [strength])

  return position
}
