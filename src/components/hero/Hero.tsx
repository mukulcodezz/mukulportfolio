import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MatrixRain from '@/components/terminal/MatrixRain'
import TypeWriter from '@/components/terminal/TypeWriter'
import GlitchText from '@/components/terminal/GlitchText'
import { heroStats } from '@/data/stats'

const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const CAPABILITIES = [
  'AI Agents',
  'MCP Servers',
  'Claude API',
  'n8n Automation',
  'WhatsApp Bots',
  'Prompt Engineering',
  'GenAI Integrations',
  'Workflow Design',
  'React / TypeScript',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.15 + i * 0.12, ease: 'easeOut' as const },
  }),
}

function HudPanel() {
  const [uptime, setUptime] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setUptime((u) => u + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const fmt = (s: number) =>
    `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const rows = [
    ['ROLE', 'AI Automation Engineer'],
    ['SPEC', 'GenAI / Agents / MCP'],
    ['LOC', 'India [REMOTE-OK]'],
    ['STACK', 'Claude · n8n · React · Py'],
    ['STATUS', 'AVAILABLE_FOR_WORK'],
  ]

  return (
    <div className="term-frame hud-corners p-0 relative overflow-hidden">
      <span className="hud-b" />
      <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-surface-2">
        <span className="text-[10px] tracking-[0.2em] text-text-muted uppercase">sys.monitor</span>
        <span className="text-[10px] text-accent tabular-nums">UP {fmt(uptime)}</span>
      </div>
      <div className="p-5 space-y-2.5 text-[13px] relative">
        <div className="scan-line" />
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <span className="text-text-dim">{k}</span>
            <span className={k === 'STATUS' ? 'text-accent glow-soft' : 'text-text'}>{v}</span>
          </div>
        ))}
        <div className="pt-3 border-t border-line-dim space-y-1.5 text-xs">
          {heroStats.map((s) => (
            <div key={s.label} className="flex justify-between">
              <span className="text-text-dim">{s.label}</span>
              <span className="text-cyan glow-cyan tabular-nums">{s.value}{s.suffix}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-14">
      <MatrixRain opacity={0.07} />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,65,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-36 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center relative z-10 w-full">
        <div>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
            <span className="status-badge">
              <span className="dot" />
              SYSTEM ONLINE — ACCEPTING MISSIONS
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-7 text-[clamp(1.7rem,5vw,3.4rem)] font-bold leading-[1.15] tracking-tight"
          >
            <span className="text-text-dim text-[0.5em] block mb-2">$ whoami --verbose</span>
            <GlitchText text="MUKUL GUPTA" className="text-accent glow" />
            <br />
            <span className="text-text">
              <TypeWriter text="I build AI agents & automation that ship to production." speed={26} delay={600} />
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 text-text-muted text-sm sm:text-[15px] leading-relaxed max-w-xl"
          >
            <span className="text-accent">&gt;</span> GenAI developer specializing in Claude agents,
            MCP servers, and workflow automation. Hackathon winner. Production shipper.
            Currently automating operations at Shalom Tours & Travels.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap gap-4"
          >
            <button onClick={() => scrollTo('#projects')} className="btn-term">
              ./view_work.sh →
            </button>
            <a href="/resume.pdf" download className="btn-term-ghost">
              wget resume.pdf
            </a>
          </motion.div>
        </div>

        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show">
          <HudPanel />
        </motion.div>
      </div>

      {/* AI capabilities marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-14 left-0 right-0 border-y border-line bg-surface/60 backdrop-blur-sm overflow-hidden py-2.5 select-none"
        aria-hidden
      >
        <div className="flex w-max animate-marquee whitespace-nowrap text-[11px] tracking-[0.2em] uppercase text-text-muted">
          {[0, 1].map((dup) => (
            <span key={dup} className="flex">
              {CAPABILITIES.map((c) => (
                <span key={c} className="mx-5">
                  <span className="text-accent mr-2">▸</span>{c}
                </span>
              ))}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-text-dim text-[11px] tracking-widest uppercase"
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="inline-block">
          ▼ scroll_down
        </motion.span>
      </motion.div>
    </section>
  )
}
