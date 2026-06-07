import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function CustomCursor() {
  const shouldReduce = useReducedMotion()

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  const ringScale = useMotionValue(1)

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 35, mass: 0.4 })
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 35, mass: 0.4 })
  const ringX = useSpring(mouseX, { stiffness: 110, damping: 18, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 110, damping: 18, mass: 0.6 })
  const ringScaleSpring = useSpring(ringScale, { stiffness: 280, damping: 24 })

  useEffect(() => {
    if (shouldReduce) return

    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e: PointerEvent) => {
      const interactive = (e.target as Element)?.closest('a, button, [role="button"], input, textarea, select, label')
      ringScale.set(interactive ? 1.7 : 1)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [shouldReduce, mouseX, mouseY, ringScale])

  if (shouldReduce) return null

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] w-[7px] h-[7px] rounded-full bg-accent"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed pointer-events-none z-[9998] w-7 h-7 rounded-full border border-accent/45"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScaleSpring,
        }}
      />
    </>
  )
}
