import { motion } from 'framer-motion'
import CinematicSection from '@/components/terminal/CinematicSection'
import SectionHeader from '@/components/terminal/SectionHeader'
import TerminalWindow from '@/components/terminal/TerminalWindow'
import ContactForm from './ContactForm'

const CONTACT_EMAIL = 'mukulwork1@gmail.com'

const channels = [
  { label: 'EMAIL', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'GITHUB', value: 'github.com/mukulcodezz', href: 'https://github.com/mukulcodezz' },
  { label: 'LINKEDIN', value: '/in/mukul-gupta', href: 'https://www.linkedin.com/in/mukul-gupta-430724413/' },
]

export default function Contact() {
  return (
    <CinematicSection id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[min(640px,100vw)] h-[min(640px,100vw)] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <SectionHeader command="ssh mukul@hire-me" comment="connection established · awaiting input" />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <TerminalWindow title="channels.cfg" statusText="[REPLY < 24H]">
              <div className="p-6 space-y-5">
                <p className="text-text-muted text-sm leading-relaxed">
                  <span className="text-accent">&gt;</span> Hiring for an AI / automation role, or
                  have a build in mind? Open a channel below or transmit directly.
                </p>
                <div className="space-y-3 text-[13px]">
                  {channels.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex justify-between gap-4 group py-2 border-b border-line-dim hover:border-line transition-colors"
                    >
                      <span className="text-text-dim">{c.label}</span>
                      <span className="text-cyan group-hover:text-accent group-hover:glow-soft transition-all truncate">
                        {c.value} ↗
                      </span>
                    </a>
                  ))}
                </div>
                <p className="status-badge mt-2">
                  <span className="dot" />
                  ACCEPTING NEW CONNECTIONS
                </p>
              </div>
            </TerminalWindow>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </CinematicSection>
  )
}
