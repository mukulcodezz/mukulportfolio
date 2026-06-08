import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WelcomeScreen() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem('welcomed'))

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => dismiss(), 2800)
    return () => clearTimeout(t)
  }, [visible])

  function dismiss() {
    setVisible(false)
    sessionStorage.setItem('welcomed', '1')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          onClick={dismiss}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(16,185,129,0.08) 0%, #0a0a0a 70%)',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {/* Noise overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />

          {/* Glow ring */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              width: 320, height: 320,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Name */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Geist', system-ui, sans-serif",
              fontSize: 'clamp(3.5rem, 12vw, 7rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: '#ededed',
              lineHeight: 1,
            }}
          >
            mukul<span style={{ color: '#10b981' }}>.</span>
          </motion.div>

          {/* Tag */}
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: 16,
              fontFamily: "'Geist Mono', monospace",
              fontSize: 'clamp(0.65rem, 2.2vw, 0.85rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
            }}
          >
            AI · Automation · Portfolio
          </motion.p>

          {/* Welcome line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            style={{
              marginTop: 40,
              fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
              color: 'rgba(255,255,255,0.55)',
              fontFamily: "'Geist', system-ui, sans-serif",
              fontWeight: 400,
            }}
          >
            welcome to my portfolio
          </motion.p>

          {/* Tap to enter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ delay: 1.5, duration: 1.2, repeat: Infinity }}
            style={{
              position: 'absolute',
              bottom: 48,
              fontFamily: "'Geist Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            tap to skip
          </motion.p>

          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.8, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
