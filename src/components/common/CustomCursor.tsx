import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)
  const ringX = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 })
  const ringY = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 })
  const ringScale = useSpring(1, { stiffness: 300, damping: 20 })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX - 4)
      dotY.set(e.clientY - 4)
      ringX.set(e.clientX - 12)
      ringY.set(e.clientY - 12)
    }
    const handleMouseEnter = () => ringScale.set(1.5)
    const handleMouseLeave = () => ringScale.set(1)

    window.addEventListener('mousemove', moveCursor)
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#7c3aed] pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-[#7c3aed]/60 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, scale: ringScale }}
      />
    </>
  )
}
