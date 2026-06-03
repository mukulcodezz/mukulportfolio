import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { useHeroParallax } from '@/hooks/useHeroParallax'
import HeroText from './HeroText'
import HeroStats from './HeroStats'
import ShaderBackground from './ShaderBackground'

const NeuralMesh = lazy(() => import('./NeuralMesh'))

export default function Hero() {
  const { orb1Y, orb2Y, orb3Y } = useHeroParallax()

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#060611]">
      <ShaderBackground />

      {/* Orbs */}
      <motion.div style={{ y: orb1Y }} className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#7c3aed]/20 blur-[120px] pointer-events-none" />
      <motion.div style={{ y: orb2Y }} className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-[#06b6d4]/15 blur-[100px] pointer-events-none" />
      <motion.div style={{ y: orb3Y }} className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-[#ec4899]/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <HeroText />
          <HeroStats />
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <Suspense fallback={<div className="w-96 h-96 rounded-full border border-[#7c3aed]/20 animate-pulse" />}>
            <NeuralMesh />
          </Suspense>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase">
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-0.5 h-2 bg-[#06b6d4] rounded-full"
          />
        </div>
        Scroll
      </div>
    </section>
  )
}
