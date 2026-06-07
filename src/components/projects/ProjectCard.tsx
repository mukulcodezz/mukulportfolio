import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Lock } from 'lucide-react'
import type { Project } from '@/data/projects'

function GitHubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const idx = String(index + 1).padStart(2, '0')

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotX = useSpring(rotateX, { stiffness: 220, damping: 28 })
  const springRotY = useSpring(rotateY, { stiffness: 220, damping: 28 })

  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current || shouldReduce) return
    const rect = cardRef.current.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    const nx = (px - rect.width / 2) / (rect.width / 2)
    const ny = (py - rect.height / 2) / (rect.height / 2)

    rotateX.set(-ny * 6)
    rotateY.set(nx * 6)

    if (spotRef.current) {
      const pct_x = (px / rect.width) * 100
      const pct_y = (py / rect.height) * 100
      spotRef.current.style.background = `radial-gradient(220px circle at ${pct_x}% ${pct_y}%, rgba(16,185,129,0.09), transparent 80%)`
    }
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setHovered(false)
  }

  const handleMouseEnter = () => setHovered(true)

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={
        shouldReduce
          ? undefined
          : {
              rotateX: springRotX,
              rotateY: springRotY,
              transformPerspective: 900,
            }
      }
      whileHover={shouldReduce ? undefined : { y: -5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative surface flex flex-col overflow-hidden h-full group hover:border-line-strong transition-colors"
    >
      {/* Spotlight */}
      <div
        ref={spotRef}
        className="absolute inset-0 pointer-events-none z-10 rounded-[inherit] transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      />

      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-2 border-b border-line">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={project.title}
            width={640}
            height={400}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(16,185,129,0.05)), radial-gradient(circle at 30% 30%, rgba(16,185,129,0.1), transparent 60%)',
            }}
          />
        )}
        <span className="absolute top-3 left-3 text-mono text-[10px] text-text-dim tracking-[0.18em] select-none">
          {idx}
        </span>
        {project.badge && (
          <span className="absolute top-3 right-3 text-mono text-[10px] px-2 py-1 rounded-full bg-bg/80 backdrop-blur border border-accent/25 text-accent">
            {project.badge.text}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-4 flex-1 relative z-20">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-text leading-tight">
            {project.title}
          </h3>
          {project.links.live && (
            <motion.a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
              whileHover={shouldReduce ? undefined : { scale: 1.15, color: '#10b981' }}
              whileTap={shouldReduce ? undefined : { scale: 0.9 }}
              className="text-text-muted shrink-0"
            >
              <ArrowUpRight size={16} />
            </motion.a>
          )}
        </div>

        <p className="text-[13px] text-text-muted leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="flex flex-col gap-1.5 mt-1">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-start gap-2 text-[12px] text-text-muted">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.tags.slice(0, 4).map((tag) => (
            <motion.span
              key={tag}
              whileHover={shouldReduce ? undefined : { scale: 1.06 }}
              className="text-mono text-[10px] px-2 py-0.5 rounded border border-line text-text-muted hover:border-accent/30 hover:text-text transition-colors cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-3 border-t border-line">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors"
            >
              <GitHubIcon /> Code
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-accent hover:underline"
            >
              Live <ArrowUpRight size={12} />
            </a>
          )}
          {!project.links.live && !project.links.github && (
            <span className="flex items-center gap-1.5 text-xs text-text-dim">
              <Lock size={12} /> Private
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
