import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  '[ OK ] BIOS check complete',
  '[ OK ] Loading kernel mukul-os v2.0.26',
  '[ OK ] Mounting /dev/skills',
  '[ OK ] Starting ai-agents.service',
  '[ OK ] Starting automation-engine.service',
  '[ OK ] Neural interface online',
  '[ OK ] All systems operational',
]

const SESSION_KEY = 'boot-done'

export default function BootSequence({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !sessionStorage.getItem(SESSION_KEY)
  })
  const [lineCount, setLineCount] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!visible) {
      onComplete?.()
      return
    }
    let line = 0
    const lineTimer = setInterval(() => {
      line += 1
      setLineCount(line)
      if (line >= BOOT_LINES.length) clearInterval(lineTimer)
    }, 180)

    let pct = 0
    const progTimer = setInterval(() => {
      pct = Math.min(100, pct + Math.floor(Math.random() * 14) + 4)
      setProgress(pct)
      if (pct >= 100) clearInterval(progTimer)
    }, 120)

    const doneTimer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(false)
      onComplete?.()
    }, 2200)

    return () => {
      clearInterval(lineTimer)
      clearInterval(progTimer)
      clearTimeout(doneTimer)
    }
  }, [visible, onComplete])

  const bar = '█'.repeat(Math.round(progress / 5)) + '░'.repeat(20 - Math.round(progress / 5))

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] bg-bg flex items-center justify-center px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full max-w-md text-[13px] leading-relaxed">
            <p className="text-accent glow mb-4 text-sm tracking-widest">
              MUKUL.SYS — BOOTING<span className="cursor-blink ml-1" />
            </p>
            <div className="space-y-1 text-text-muted min-h-[170px]">
              {BOOT_LINES.slice(0, lineCount).map((l, i) => (
                <p key={i}>
                  <span className="text-accent">{l.slice(0, 6)}</span>
                  {l.slice(6)}
                </p>
              ))}
            </div>
            <p className="mt-4 text-accent">
              {bar} {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
