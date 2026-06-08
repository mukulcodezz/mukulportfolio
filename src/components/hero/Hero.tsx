import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ArrowRight, Download } from 'lucide-react'
import HeroStats from './HeroStats'
import MagneticButton from '@/components/common/MagneticButton'

const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const HEADLINE = 'I build AI agents and automation that ship to production.'

function WordStagger({ text, className }: { text: string; className?: string }) {
  const shouldReduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={shouldReduce ? false : { y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.08 + i * 0.045,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()
  const isFinePointer = useMediaQuery('(pointer: fine)')

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const glowX = useSpring(rawX, { stiffness: 60, damping: 18 })
  const glowY = useSpring(rawY, { stiffness: 60, damping: 18 })
  const translateX = useTransform(glowX, (v) => v - 220)
  const translateY = useTransform(glowY, (v) => v - 220)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || shouldReduce) return
    const rect = heroRef.current.getBoundingClientRect()
    rawX.set(e.clientX - rect.left)
    rawY.set(e.clientY - rect.top)
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg"
    >
      {/* Cursor-follow glow */}
      {!shouldReduce && isFinePointer && (
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 440,
            height: 440,
            x: translateX,
            y: translateY,
            background:
              'radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at 50% 0%, #000 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 0%, #000 20%, transparent 75%)',
        }}
      />

      {/* Static ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(640px,100vw)] h-[min(640px,100vw)] rounded-full bg-accent/[0.06] blur-[80px] md:blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-28 pb-16 md:pb-20 w-full">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-end">
          {/* Left */}
          <div className="flex flex-col gap-7 max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Available for AI / Automation work
            </motion.span>

            <h1 className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-text">
              <WordStagger text={HEADLINE} />
            </h1>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="text-base md:text-lg text-text-muted leading-relaxed max-w-[58ch]"
            >
              Mukul Gupta. AI Automation & GenAI engineer building Claude/MCP
              agents, n8n workflows, and full-stack web products for real clients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <MagneticButton>
                <button onClick={() => scrollTo('#projects')} className="btn-primary group">
                  View work
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              </MagneticButton>
              <MagneticButton>
                <a href="/resume.pdf" download className="btn-ghost">
                  <Download size={15} />
                  Resume
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: status panel */}
          <motion.aside
            id="hero-status"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="surface p-5 sm:p-6 text-mono text-[13px] text-text-muted leading-relaxed lg:self-end"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-text-dim uppercase tracking-[0.18em] text-[10px]">Status</span>
              <span className="flex items-center gap-1.5 text-accent text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                shipping
              </span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {[
                ['role', 'AI / Automation eng'],
                ['based', 'India, remote'],
                ['stack', 'Claude · MCP · n8n · React'],
                ['open to', 'FT roles + contract'],
              ].map(([key, val], i) => (
                <motion.li
                  key={key}
                  className="flex justify-between"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
                >
                  <span className="text-text-dim">{key}</span>
                  <span className="text-text">{val}</span>
                </motion.li>
              ))}
            </ul>
          </motion.aside>
        </div>

        <HeroStats />
      </div>
    </section>
  )
}
