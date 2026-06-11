import { useState, cloneElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import AsciiBar from '@/components/terminal/AsciiBar'
import ContactForm from '@/components/contact/ContactForm'
import { experiences } from '@/data/experiences'
import { achievements } from '@/data/achievements'
import { skillCategories } from '@/data/skills'
import { techColumns } from '@/data/techStack'
import { certifications } from '@/data/certifications'
import { testimonials } from '@/data/testimonials'
import { heroStats } from '@/data/stats'

/* ───────────────────────── about.txt ───────────────────────── */

const CAPABILITIES = [
  { flag: '--ai-agents', desc: 'Claude + tool-calling, MCP servers, agentic workflows' },
  { flag: '--automation', desc: 'n8n, Make, Zapier. Lead capture, ops, reporting' },
  { flag: '--genai', desc: 'Claude, GPT-4, Gemini integrations in production' },
  { flag: '--mcp-dev', desc: 'Custom MCP servers — tools LLMs actually use' },
  { flag: '--fullstack', desc: 'React, Vite, Tailwind, TypeScript. Fast & responsive' },
  { flag: '--apis', desc: 'REST, OAuth, webhooks, third-party integrations' },
]

export function AboutApp() {
  return (
    <div className="p-5 text-[13px] leading-7 text-text-muted space-y-4">
      <p className="text-text-dim text-[11px]"># about.txt · read-only · {heroStats[0].value}+ production projects</p>
      <p>
        <span className="text-accent">&gt;</span> <span className="text-text font-semibold">Mukul Gupta</span> —
        AI Automation Engineer & GenAI developer based in India. I turn manual business
        workflows into AI-driven systems that run themselves: WhatsApp bots, lead pipelines,
        agent workflows.
      </p>
      <p>
        <span className="text-accent">&gt;</span> Won 1st place at a college hackathon by shipping a
        working AI attendance bot in 24 hours. Built MCP servers for the Solana ecosystem.
        Shipped production sites for international clients.
      </p>
      <p>
        <span className="text-accent">&gt;</span> Currently automating operations at Shalom Tours &
        Travels. Open to full-time AI/automation roles + contract work.
      </p>
      <div className="pt-3 border-t border-line-dim space-y-2">
        <p className="text-text-dim text-[11px]"># mukul --help</p>
        {CAPABILITIES.map((c) => (
          <div key={c.flag} className="flex flex-col sm:flex-row sm:gap-3">
            <span className="text-cyan w-32 shrink-0">{c.flag}</span>
            <span>{c.desc}</span>
          </div>
        ))}
      </div>
      <a href="/resume.pdf" download className="btn-term-ghost !py-2 !px-3 text-[11px]">
        wget resume.pdf
      </a>
      <p className="text-text-dim text-[11px]">-- END OF FILE --</p>
    </div>
  )
}

/* ───────────────────────── skills.sys ───────────────────────── */

const SKILL_LEVELS: Record<string, number> = {
  'ai-automation': 95,
  'genai': 90,
  'webdev': 85,
  'apis': 88,
}

const ICON_SLUGS: Record<string, string> = {
  'Python': 'python', 'JavaScript': 'javascript', 'C': 'c', 'HTML5': 'html5', 'CSS3': 'css',
  'Claude (Anthropic)': 'claude', 'GPT-4 (OpenAI)': 'openai', 'Google Gemini': 'googlegemini',
  'n8n': 'n8n', 'Make.com': 'make', 'Zapier': 'zapier', 'Git & GitHub': 'github',
  'Vercel': 'vercel', 'OpenAI API': 'openai', 'Anthropic API': 'anthropic',
  'Vite': 'vite', 'React': 'react', 'Tailwind CSS': 'tailwindcss',
}

export function SkillsApp() {
  const [tab, setTab] = useState<'skills' | 'stack' | 'certs'>('skills')
  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-line bg-surface-2 text-[12px] shrink-0">
        {(['skills', 'stack', 'certs'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 border-r border-line-dim transition-colors ${
              tab === t ? 'text-accent bg-accent/5' : 'text-text-muted hover:text-text'
            }`}
          >
            ./{t}
          </button>
        ))}
      </div>
      <div className="p-5 overflow-y-auto">
        {tab === 'skills' && (
          <div className="space-y-6">
            {skillCategories.map((cat) => (
              <div key={cat.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <p className="text-text text-[13px]">
                    <span className="text-accent mr-2">$&gt;</span>{cat.title}
                  </p>
                  <AsciiBar percent={SKILL_LEVELS[cat.id] ?? 80} width={14} className="text-[13px]" />
                </div>
                <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-[11px] text-text-muted pl-5">
                  {cat.tags.map((t) => <span key={t}>[{t}]</span>)}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 'stack' && (
          <div className="space-y-6">
            {techColumns.map((col) => (
              <div key={col.title}>
                <p className="text-text-dim text-[11px] uppercase tracking-[0.2em] mb-3"># {col.title}</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {col.items.map((item) => {
                    const slug = ICON_SLUGS[item]
                    return (
                      <div key={item} className="term-frame p-2.5 flex flex-col items-center gap-1.5 text-center">
                        {slug ? (
                          <img src={`https://cdn.simpleicons.org/${slug}/00ff41`} alt={item} loading="lazy" className="w-6 h-6 opacity-80" />
                        ) : (
                          <span className="text-accent text-lg leading-6 glow-soft">▣</span>
                        )}
                        <span className="text-[9px] text-text-muted leading-tight">{item}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 'certs' && (
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.title} className="term-frame p-4">
                <p className="text-[10px] text-text-dim uppercase tracking-[0.2em]">certificate.verified</p>
                <h3 className="mt-1.5 text-text font-semibold text-[14px]">
                  <span className="text-accent mr-1.5">✓</span>{cert.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1 text-[11px] text-cyan/80">
                  {cert.topics.map((t) => <span key={t}>--{t.toLowerCase().replace(/[\s.]+/g, '-')}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ───────────────────────── experience.log ───────────────────────── */

const hash = (s: string) => {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return (h >>> 0).toString(16).padStart(7, '0').slice(0, 7)
}

export function ExperienceApp() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div>
      <p className="px-5 pt-4 pb-2 text-text-dim text-[11px]">$ git log --author=mukul --oneline</p>
      <div className="divide-y divide-line-dim">
        {experiences.map((exp, i) => {
          const isOpen = open === i
          return (
            <div key={exp.role}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left px-5 py-3.5 hover:bg-accent/5 transition-colors flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[12px]"
              >
                <span className="text-amber">{hash(exp.role)}</span>
                <span className="text-text font-medium">{exp.role}</span>
                <span className="text-text-dim">@ {exp.company}</span>
                <span className="ml-auto text-cyan text-[11px]">({exp.duration})</span>
                <span className="text-text-dim text-[11px]">{isOpen ? '[-]' : '[+]'}</span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden px-5 text-[12px] text-text-muted"
                  >
                    {exp.bullets.map((b) => (
                      <li key={b} className="pb-1.5"><span className="text-accent mr-2">+</span>{b}</li>
                    ))}
                    <li className="pb-3" />
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
      <div className="p-5 grid sm:grid-cols-2 gap-3">
        {achievements.map((a) => (
          <div key={a.title} className="term-frame p-3.5">
            <p className="text-accent text-[10px] uppercase tracking-widest">★ {a.title}</p>
            <p className="mt-1.5 text-text-muted text-[11px] leading-relaxed">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────── github ───────────────────────── */

const calendarTheme = { dark: ['#0a0d0a', '#053b16', '#0a7a2b', '#00cc34', '#00ff41'] }

export function GitHubApp() {
  return (
    <div className="p-5">
      <p className="text-text-dim text-[11px] mb-4">$ git shortlog -sn --author=mukulcodezz</p>
      <div className="overflow-x-auto">
        <GitHubCalendar
          username="mukulcodezz"
          colorScheme="dark"
          theme={calendarTheme}
          blockSize={10}
          blockMargin={3}
          fontSize={11}
          renderBlock={(block, activity) =>
            cloneElement(block, {
              title: `${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${activity.date}`,
            } as Partial<typeof block.props>)
          }
        />
      </div>
      <div className="mt-4 pt-3 border-t border-line-dim flex flex-wrap justify-between gap-2 text-[11px] text-text-dim">
        <span># +438 commits from previous account not shown</span>
        <a href="https://github.com/mukulcodezz" target="_blank" rel="noopener noreferrer" className="text-accent hover:glow transition-all">
          [view_profile ↗]
        </a>
      </div>
    </div>
  )
}

/* ───────────────────────── feedback/ ───────────────────────── */

export function FeedbackApp() {
  return (
    <div className="p-5 space-y-4">
      <p className="text-text-dim text-[11px]">$ grep -r "mukul" ./feedback/</p>
      {testimonials.map((t) => (
        <blockquote key={t.name} className="term-frame p-4">
          <p className="text-[10px] text-text-dim mb-2">
            ./feedback/{t.name.toLowerCase().replace(/[\s&]+/g, '_')}.log
          </p>
          <p className="text-text-muted text-[13px] leading-relaxed break-words">
            <span className="text-accent">"</span>{t.quote}<span className="text-accent">"</span>
          </p>
          <footer className="mt-3 pt-2 border-t border-line-dim text-[12px]">
            <span className="text-cyan">{t.name}</span>
            <span className="text-text-dim"> — {t.role}</span>
          </footer>
        </blockquote>
      ))}
    </div>
  )
}

/* ───────────────────────── ssh hire-me ───────────────────────── */

const channels = [
  { label: 'EMAIL', value: 'mukulwork1@gmail.com', href: 'mailto:mukulwork1@gmail.com' },
  { label: 'GITHUB', value: 'github.com/mukulcodezz', href: 'https://github.com/mukulcodezz' },
  { label: 'LINKEDIN', value: '/in/mukul-gupta', href: 'https://www.linkedin.com/in/mukul-gupta-430724413/' },
]

export function ContactApp() {
  return (
    <div className="p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="status-badge"><span className="dot" />ACCEPTING CONNECTIONS</span>
        <span className="text-[10px] text-text-dim uppercase tracking-widest">reply &lt; 24h</span>
      </div>
      <div className="space-y-1 text-[12px]">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="flex justify-between gap-3 group py-2 border-b border-line-dim hover:border-line transition-colors"
          >
            <span className="text-text-dim">{c.label}</span>
            <span className="text-cyan group-hover:text-accent transition-colors truncate">{c.value} ↗</span>
          </a>
        ))}
      </div>
      <ContactForm />
    </div>
  )
}
