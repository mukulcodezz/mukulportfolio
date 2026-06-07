import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const shouldReduce = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 })

  if (shouldReduce) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[200] origin-left"
      style={{ scaleX }}
    />
  )
}
