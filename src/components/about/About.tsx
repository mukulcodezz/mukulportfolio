import { motion } from 'framer-motion'
import CinematicSection from '@/components/terminal/CinematicSection'
import SectionHeader from '@/components/terminal/SectionHeader'
import TerminalWindow from '@/components/terminal/TerminalWindow'

const capabilities = [
  { flag: '--ai-agents', desc: 'Claude + tool-calling, MCP servers, agentic workflows' },
  { flag: '--automation', desc: 'n8n, Make, Zapier. Lead capture, ops, reporting' },
  { flag: '--genai', desc: 'Claude, GPT-4, Gemini integrations in production' },
  { flag: '--mcp-dev', desc: 'Custom MCP servers — tools LLMs actually use' },
  { flag: '--fullstack', desc: 'React, Vite, Tailwind, TypeScript. Fast & responsive' },
  { flag: '--apis', desc: 'REST, OAuth, webhooks, third-party integrations' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

export default function About() {
  return (
    <CinematicSection id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader command="cat about.txt" comment="who is this guy" />

        <div className="grid lg:grid-cols-2 gap-8">
          <TerminalWindow title="about.txt" statusText="[READ-ONLY]">
            <div className="p-6 text-sm leading-7 text-text-muted space-y-4">
              <p>
                <span className="text-accent">&gt;</span> AI Automation Engineer & GenAI developer
                based in India. I turn manual business workflows into AI-driven systems that run
                themselves — WhatsApp bots, lead pipelines, agent workflows.
              </p>
              <p>
                <span className="text-accent">&gt;</span> Won 1st place at a college hackathon by
                shipping a working AI attendance bot in 24 hours. Built MCP servers for the Solana
                ecosystem. Shipped production sites for international clients.
              </p>
              <p>
                <span className="text-accent">&gt;</span> Currently: automating operations at Shalom
                Tours & Travels and open to full-time AI/automation roles.
              </p>
              <p className="text-text-dim text-xs pt-2">
                -- END OF FILE --
              </p>
            </div>
          </TerminalWindow>

          <TerminalWindow title="mukul --help" statusText="[6 FLAGS]">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="p-6 space-y-3.5 text-sm"
            >
              {capabilities.map((c) => (
                <motion.div key={c.flag} variants={item} className="flex flex-col sm:flex-row sm:gap-4 group">
                  <span className="text-cyan glow-cyan w-32 shrink-0 group-hover:text-accent transition-colors">
                    {c.flag}
                  </span>
                  <span className="text-text-muted">{c.desc}</span>
                </motion.div>
              ))}
            </motion.div>
          </TerminalWindow>
        </div>
      </div>
    </CinematicSection>
  )
}
