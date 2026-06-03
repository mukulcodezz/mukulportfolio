import { useScroll, useTransform } from 'framer-motion'

export function useHeroParallax() {
  const { scrollY } = useScroll()
  const orb1Y = useTransform(scrollY, [0, 600], [0, -120])
  const orb2Y = useTransform(scrollY, [0, 600], [0, -80])
  const orb3Y = useTransform(scrollY, [0, 600], [0, -60])
  const textY = useTransform(scrollY, [0, 400], [0, -40])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  return { orb1Y, orb2Y, orb3Y, textY, heroOpacity }
}
