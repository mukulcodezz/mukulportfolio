import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

const LINKS = [
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Stack',          href: '#techstack' },
]

const SECTION_IDS = ['projects', 'certifications', 'techstack']

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function FloatingPillNav() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 380))

  // Track active section via IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { threshold: 0.35 },
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="pill-nav"
          initial={{ y: 80, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          style={{
            position: 'fixed',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9000,
            pointerEvents: 'auto',
          }}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Outer glow */}
          <div style={{
            position: 'absolute',
            inset: -12,
            borderRadius: 9999,
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Pill shell */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              padding: '6px 8px',
              borderRadius: 9999,
              // Liquid glass core
              background: 'rgba(255,255,255,0.055)',
              backdropFilter: 'blur(32px) saturate(200%) brightness(1.08)',
              WebkitBackdropFilter: 'blur(32px) saturate(200%) brightness(1.08)',
              border: '1px solid rgba(255,255,255,0.13)',
              boxShadow: [
                '0 0 0 0.5px rgba(255,255,255,0.07) inset',
                '0 1.5px 0 rgba(255,255,255,0.16) inset',  // top specular
                '0 -1px 0 rgba(0,0,0,0.4) inset',          // bottom shadow
                '0 12px 40px rgba(0,0,0,0.55)',
                '0 4px 12px rgba(0,0,0,0.35)',
                '0 0 0 0.5px rgba(0,0,0,0.6)',
              ].join(', '),
              // Prismatic edge gradient overlay via outline trick
              overflow: 'hidden',
            }}
          >
            {/* Prismatic shimmer layer */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 9999,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(16,185,129,0.04) 40%, rgba(99,179,237,0.04) 70%, rgba(255,255,255,0.03) 100%)',
              pointerEvents: 'none',
            }} />

            {LINKS.map((link) => {
              const isActive = active === link.href
              const isHovered = hovered === link.href
              return (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  onMouseEnter={() => setHovered(link.href)}
                  whileTap={{ scale: 0.93 }}
                  style={{
                    position: 'relative',
                    padding: '7px 16px',
                    borderRadius: 9999,
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    fontFamily: "'Geist', system-ui, sans-serif",
                    color: isActive ? '#10b981' : isHovered ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.18s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {/* Button hover glass fill */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        layoutId="pill-hover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: 9999,
                          background: 'rgba(255,255,255,0.09)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>

                  {/* Active dot */}
                  {isActive && (
                    <motion.span
                      layoutId="pill-dot"
                      style={{
                        position: 'absolute',
                        bottom: 3,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        background: '#10b981',
                        boxShadow: '0 0 6px #10b981',
                      }}
                    />
                  )}
                </motion.button>
              )
            })}

            {/* Divider */}
            <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)', margin: '0 2px', flexShrink: 0 }} />

            {/* Contact CTA */}
            <motion.button
              onClick={() => scrollTo('#contact')}
              whileTap={{ scale: 0.93 }}
              onMouseEnter={() => setHovered('contact')}
              style={{
                padding: '7px 14px',
                borderRadius: 9999,
                fontSize: '0.8125rem',
                fontWeight: 600,
                fontFamily: "'Geist', system-ui, sans-serif",
                color: '#0a0a0a',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 12px rgba(16,185,129,0.4)',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.01em',
              }}
            >
              Hire me
            </motion.button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
