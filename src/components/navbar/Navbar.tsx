import { useState } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Activity', href: '#activity' },
  { label: 'Stack', href: '#techstack' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? 'bg-bg/80 backdrop-blur-xl border-b border-line'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="text-mono text-sm font-semibold tracking-tight text-text"
          >
            mukul<span className="text-accent">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-text-muted hover:text-text transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <button onClick={() => scrollTo('#contact')} className="btn-ghost">
              Get in touch
            </button>
          </div>

          <button
            aria-label="Toggle menu"
            className="md:hidden text-text p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-medium text-text"
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo('#contact')} className="btn-primary mt-4">
              Get in touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
