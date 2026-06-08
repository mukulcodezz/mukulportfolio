import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useReducedMotion } from 'framer-motion'
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
  const [hovered, setHovered] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const shouldReduce = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="text-mono text-sm font-semibold tracking-tight text-text"
          >
            mukul<span className="text-accent">.</span>
          </a>

          <ul
            className="hidden md:flex items-center gap-7"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <button
                  onClick={() => scrollTo(link.href)}
                  onMouseEnter={() => setHovered(link.href)}
                  className="text-sm text-text-muted hover:text-text transition-colors py-1"
                >
                  {link.label}
                </button>
                {hovered === link.href && !shouldReduce && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <motion.button
              onClick={() => scrollTo('#contact')}
              whileHover={shouldReduce ? undefined : { scale: 1.02 }}
              whileTap={shouldReduce ? undefined : { scale: 0.97 }}
              className="btn-ghost"
            >
              Get in touch
            </motion.button>
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg/97 backdrop-blur-xl flex flex-col items-center justify-center gap-6 pt-16 pb-[env(safe-area-inset-bottom)]"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-medium text-text"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              onClick={() => scrollTo('#contact')}
              className="btn-primary mt-4"
            >
              Get in touch
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
