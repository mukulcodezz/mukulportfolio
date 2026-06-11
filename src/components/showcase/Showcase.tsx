import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CinematicSection from '@/components/terminal/CinematicSection'
import SectionHeader from '@/components/terminal/SectionHeader'
import TerminalWindow from '@/components/terminal/TerminalWindow'
import AsciiBar from '@/components/terminal/AsciiBar'
import { skillCategories } from '@/data/skills'
import { techColumns } from '@/data/techStack'
import { certifications } from '@/data/certifications'

type Tab = 'skills' | 'stack' | 'certs'

const TABS: { id: Tab; label: string }[] = [
  { id: 'skills', label: './skills' },
  { id: 'stack', label: './tech_stack' },
  { id: 'certs', label: './certs' },
]

/* simple-icons CDN slugs for known tech */
const ICON_SLUGS: Record<string, string> = {
  'Python': 'python',
  'JavaScript': 'javascript',
  'C': 'c',
  'HTML5': 'html5',
  'CSS3': 'css',
  'Claude (Anthropic)': 'claude',
  'GPT-4 (OpenAI)': 'openai',
  'Google Gemini': 'googlegemini',
  'n8n': 'n8n',
  'Make.com': 'make',
  'Zapier': 'zapier',
  'Git & GitHub': 'github',
  'Vercel': 'vercel',
  'OpenAI API': 'openai',
  'Anthropic API': 'anthropic',
  'Vite': 'vite',
  'React': 'react',
  'Tailwind CSS': 'tailwindcss',
}

const SKILL_LEVELS: Record<string, number> = {
  'ai-automation': 95,
  'genai': 90,
  'webdev': 85,
  'apis': 88,
}

const fadeSwap = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

function SkillsTab() {
  return (
    <div className="p-6 space-y-7">
      {skillCategories.map((cat) => (
        <div key={cat.id}>
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
            <p className="text-text text-sm font-medium">
              <span className="text-accent mr-2">$&gt;</span>
              skills --category={cat.id}
            </p>
            <AsciiBar percent={SKILL_LEVELS[cat.id] ?? 80} className="text-sm" />
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-muted pl-5">
            {cat.tags.map((t) => (
              <span key={t} className="hover:text-cyan transition-colors">[{t}]</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function StackTab() {
  return (
    <div className="p-6 space-y-8">
      {techColumns.map((col) => (
        <div key={col.title}>
          <p className="text-text-dim text-[11px] uppercase tracking-[0.2em] mb-4">
            # {col.title}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {col.items.map((item) => {
              const slug = ICON_SLUGS[item]
              return (
                <motion.div
                  key={item}
                  whileHover={{ y: -3, scale: 1.04 }}
                  className="term-frame p-3 flex flex-col items-center gap-2 text-center hover:border-line-strong transition-colors"
                >
                  {slug ? (
                    <img
                      src={`https://cdn.simpleicons.org/${slug}/00ff41`}
                      alt={item}
                      loading="lazy"
                      className="w-7 h-7 opacity-80"
                    />
                  ) : (
                    <span className="text-accent text-xl leading-7 glow-soft">▣</span>
                  )}
                  <span className="text-[10px] text-text-muted leading-tight">{item}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function CertsTab() {
  return (
    <div className="p-6 grid sm:grid-cols-2 gap-5">
      {certifications.map((cert) => (
        <div key={cert.title} className="term-frame hud-corners p-5">
          <span className="hud-b" />
          <p className="text-[10px] text-text-dim uppercase tracking-[0.2em]">certificate.verified</p>
          <h3 className="mt-2 text-text font-semibold text-[15px]">
            <span className="text-accent mr-1.5">✓</span>{cert.title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-cyan/80">
            {cert.topics.map((t) => (
              <span key={t}>--{t.toLowerCase().replace(/[\s.]+/g, '-')}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Showcase() {
  const [tab, setTab] = useState<Tab>('skills')

  return (
    <CinematicSection id="techstack" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader command="./showcase --interactive" comment="skills · stack · certifications" />

        <TerminalWindow title="showcase.sh" statusText="[INTERACTIVE]">
          {/* Tab bar */}
          <div className="flex border-b border-line bg-surface-2 text-[12px] overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-3 whitespace-nowrap transition-colors border-r border-line-dim relative ${
                  tab === t.id
                    ? 'text-accent bg-accent/5'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                    style={{ boxShadow: '0 0 8px rgba(0,255,65,0.6)' }}
                  />
                )}
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} variants={fadeSwap} initial="hidden" animate="show" exit="exit">
              {tab === 'skills' && <SkillsTab />}
              {tab === 'stack' && <StackTab />}
              {tab === 'certs' && <CertsTab />}
            </motion.div>
          </AnimatePresence>
        </TerminalWindow>
      </div>
    </CinematicSection>
  )
}
