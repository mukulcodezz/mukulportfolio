import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CinematicSection from '@/components/terminal/CinematicSection'
import SectionHeader from '@/components/terminal/SectionHeader'
import TerminalWindow from '@/components/terminal/TerminalWindow'
import { experiences } from '@/data/experiences'
import { achievements } from '@/data/achievements'

/* Deterministic fake commit hash per role */
const hash = (s: string) => {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return (h >>> 0).toString(16).padStart(7, '0').slice(0, 7)
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <CinematicSection id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader command="git log --author=mukul --oneline" comment="work history · click to view diff" />

        <TerminalWindow title="experience.log" statusText={`[${experiences.length} COMMITS]`}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="divide-y divide-line-dim"
          >
            {experiences.map((exp, i) => {
              const isOpen = open === i
              return (
                <motion.div key={exp.role} variants={item}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left px-5 py-4 hover:bg-accent/5 transition-colors flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[13px]"
                  >
                    <span className="text-amber glow-amber">{hash(exp.role)}</span>
                    <span className="text-text font-medium">{exp.role}</span>
                    <span className="text-text-dim">@ {exp.company}</span>
                    <span className="ml-auto text-cyan text-[11px]">({exp.duration})</span>
                    <span className="text-text-dim text-[11px]">{isOpen ? '[-]' : '[+]'}</span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="px-5 pb-5 pt-1 space-y-1.5 text-[13px] text-text-muted">
                          {exp.bullets.map((b) => (
                            <li key={b}>
                              <span className="text-accent mr-2">+</span>{b}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </TerminalWindow>

        {/* Achievements strip */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {achievements.map((a) => (
            <motion.div key={a.title} variants={item} className="term-frame p-4 hover:border-line-strong transition-colors">
              <p className="text-accent text-[11px] uppercase tracking-widest glow-soft">
                ★ {a.title}
              </p>
              <p className="mt-2 text-text-muted text-[12px] leading-relaxed">{a.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </CinematicSection>
  )
}
