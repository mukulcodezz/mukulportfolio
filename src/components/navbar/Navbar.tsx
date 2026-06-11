import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'

const links = [
  { label: './work', href: '#projects' },
  { label: './about', href: '#about' },
  { label: './exp', href: '#experience' },
  { label: './stack', href: '#techstack' },
  { label: './logs', href: '#activity' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState('')
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', (y) => setScrolled(y > 24))
    return unsub
  }, [scrollY])

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'bg-bg/90 backdrop-blur-md border-line' : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between text-[13px]">
        {/* Wordmark */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red/80" />
            <span className="w-2 h-2 rounded-full bg-amber/80" />
            <span className="w-2 h-2 rounded-full bg-accent/80" />
          </div>
          <span className="text-text tracking-wide">
            <span className="text-accent glow-soft">mukul</span>
            <span className="text-text-dim">@</span>
            <span className="text-text-muted">portfolio</span>
            <span className="text-text-dim">:~$</span>
          </span>
          <span className="cursor-blink hidden sm:inline-block" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-text-muted hover:text-accent hover:bg-accent/5 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="ml-3 px-3.5 py-1.5 border border-line-strong text-accent hover:bg-accent hover:text-black transition-colors uppercase text-[11px] tracking-widest font-semibold">
            [ hire_me ]
          </a>
          <span className="ml-4 text-text-dim text-[11px] tabular-nums hidden lg:block" suppressHydrationWarning>
            {time} IST
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-accent text-lg px-2"
          aria-label="Toggle menu"
        >
          {open ? '[x]' : '[≡]'}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-bg/95 backdrop-blur-md border-b border-line overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1 text-sm">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-text-muted hover:text-accent border-b border-line-dim"
                >
                  <span className="text-accent mr-2">&gt;</span>{l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="py-2.5 text-accent font-semibold"
              >
                <span className="mr-2">&gt;</span>[ hire_me ]
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
