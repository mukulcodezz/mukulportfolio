import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import HeroStats from './HeroStats'

const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg"
    >
      {/* Ambient backdrop: single soft glow + grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse at 50% 30%, #000 30%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 30%, #000 30%, transparent 75%)',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-accent/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 items-end">
          {/* Left: type */}
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

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-text"
            >
              I build AI agents and automation that ship to production.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-base md:text-lg text-text-muted leading-relaxed max-w-[58ch]"
            >
              Mukul Gupta. AI Automation & GenAI engineer building Claude/MCP
              agents, n8n workflows, and full-stack web products for real clients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button onClick={() => scrollTo('#projects')} className="btn-primary group">
                View work
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a href="/resume.pdf" download className="btn-ghost">
                <Download size={15} />
                Resume
              </a>
            </motion.div>
          </div>

          {/* Right: status panel */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="surface p-6 text-mono text-[13px] text-text-muted leading-relaxed self-end"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-text-dim uppercase tracking-[0.18em] text-[10px]">
                Status
              </span>
              <span className="flex items-center gap-1.5 text-accent text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                shipping
              </span>
            </div>
            <ul className="flex flex-col gap-2.5">
              <li className="flex justify-between">
                <span className="text-text-dim">role</span>
                <span className="text-text">AI / Automation eng</span>
              </li>
              <li className="flex justify-between">
                <span className="text-text-dim">based</span>
                <span className="text-text">India, remote</span>
              </li>
              <li className="flex justify-between">
                <span className="text-text-dim">stack</span>
                <span className="text-text">Claude · MCP · n8n · React</span>
              </li>
              <li className="flex justify-between">
                <span className="text-text-dim">open to</span>
                <span className="text-text">FT roles + contract</span>
              </li>
            </ul>
          </motion.aside>
        </div>

        <HeroStats />
      </div>
    </section>
  )
}
