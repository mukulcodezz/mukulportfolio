import { motion, useReducedMotion } from 'framer-motion'
import { Bot, Zap, Brain, Network, Code, Plug } from 'lucide-react'
import SectionWrapper from '@/components/common/SectionWrapper'
import { fadeUpVariant } from '@/lib/variants'

const capabilities = [
  { icon: Bot, label: 'AI Agents', desc: 'Claude + tool-calling, MCP servers, agentic workflows.' },
  { icon: Zap, label: 'Automation', desc: 'n8n, Make, Zapier. Lead capture, ops, reporting.' },
  { icon: Brain, label: 'GenAI Integrations', desc: 'Claude, GPT-4, Gemini wired into real products.' },
  { icon: Network, label: 'MCP Development', desc: 'Custom MCP servers + Claude Agent Skills.' },
  { icon: Code, label: 'Full-Stack Web', desc: 'React, Vite, Tailwind. Production sites.' },
  { icon: Plug, label: 'APIs & Webhooks', desc: 'REST, OAuth, third-party platform glue.' },
]

function CapabilityTile({ icon: Icon, label, desc }: typeof capabilities[0]) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      whileHover={
        shouldReduce
          ? undefined
          : { y: -3, borderColor: 'rgba(255,255,255,0.14)' }
      }
      transition={{ type: 'spring', stiffness: 340, damping: 24 }}
      className="surface p-5 flex flex-col gap-3 cursor-default group"
    >
      <motion.div
        whileHover={shouldReduce ? undefined : { scale: 1.12, rotate: 6 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center"
      >
        <Icon size={16} className="text-accent" strokeWidth={1.75} />
      </motion.div>
      <div>
        <div className="text-sm font-medium text-text mb-1 group-hover:text-accent transition-colors duration-200">
          {label}
        </div>
        <p className="text-xs text-text-muted leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
        <motion.div variants={fadeUpVariant} className="flex flex-col gap-6">
          <span className="eyebrow">About</span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-text">
            B.Tech AI engineer shipping production agents and automation for paying clients.
          </h2>
          <div className="flex flex-col gap-4 text-text-muted leading-relaxed max-w-[55ch]">
            <p>
              I study at ITS Engineering College (AKTU), but the bulk of my work
              lives outside the classroom. I build for a travel company in India,
              a private contract for an Italy-based org, and an NFT studio.
            </p>
            <p>
              Most of my time goes into AI agents, MCP servers, Claude Agent
              Skills, and the workflows that quietly run businesses. I care
              about systems that ship, not demos.
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUpVariant} className="grid sm:grid-cols-2 gap-3">
          {capabilities.map(({ icon, label, desc }) => (
            <CapabilityTile key={label} icon={icon} label={label} desc={desc} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
