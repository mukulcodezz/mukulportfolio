import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Typed from 'typed.js'
import { ArrowRight, Mail, Download } from 'lucide-react'

const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroText() {
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!typedRef.current) return
    const typed = new Typed(typedRef.current, {
      strings: ['AI Automation Engineer', 'GenAI Developer', 'Web Developer', 'Prompt Engineer', 'AI Agent Builder'],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 2200,
      loop: true,
    })
    return () => typed.destroy()
  }, [])

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-[#7c3aed]/15 border border-[#7c3aed]/30 text-violet-300 text-xs font-bold tracking-widest uppercase"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
        Available for Projects
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight"
      >
        Hi, I'm{' '}
        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Mukul Gupta
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-xl font-semibold text-white/60 min-h-[2rem]"
      >
        <span ref={typedRef} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-base text-white/50 leading-relaxed"
      >
        Building AI Agents, Automation Systems, and Digital Experiences That Drive Business Growth.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-wrap gap-3"
      >
        <button
          onClick={() => scrollTo('#projects')}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:opacity-90 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#7c3aed]/30"
        >
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          View Projects
        </button>
        <button
          onClick={() => scrollTo('#contact')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/[0.1] hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/10 transition-all hover:-translate-y-0.5"
        >
          <Mail size={16} />
          Contact Me
        </button>
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-cyan-400 border border-cyan-400/20 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all hover:-translate-y-0.5"
        >
          <Download size={16} />
          Resume
        </a>
      </motion.div>
    </div>
  )
}
