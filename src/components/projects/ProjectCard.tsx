import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/data/projects'

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      variants={item}
      className="term-frame hud-corners group flex flex-col"
    >
      <span className="hud-b" />

      {/* File-entry header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-line bg-surface-2 text-[11px]">
        <span className="text-text-dim">
          -rwxr--r-- <span className="text-cyan">{num}</span>
        </span>
        {project.badge && (
          <span className="text-accent uppercase tracking-wider glow-soft">
            [{project.badge.text}]
          </span>
        )}
      </div>

      {/* Screenshot */}
      {project.screenshot && (
        <div className="relative overflow-hidden border-b border-line aspect-video">
          <img
            src={project.screenshot}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
            style={{ filter: 'saturate(0.7)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-text font-semibold text-[15px] chroma">
          <span className="text-accent mr-1.5">{'>'}</span>
          {project.title}
        </h3>

        <p className="mt-2.5 text-text-muted text-[13px] leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags as CLI flags */}
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-cyan/80">
          {project.tags.map((t) => (
            <span key={t}>--{t.toLowerCase().replace(/[\s.]+/g, '-')}</span>
          ))}
        </div>

        {/* Expandable highlights */}
        {project.highlights && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 text-left text-[11px] text-text-dim hover:text-accent transition-colors uppercase tracking-widest"
            >
              {expanded ? '[-] collapse' : '[+] expand_details'}
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden text-[12px] text-text-muted space-y-1 mt-2"
                >
                  {project.highlights.map((h) => (
                    <li key={h}>
                      <span className="text-accent mr-1.5">+</span>{h}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Links */}
        <div className="mt-5 pt-4 border-t border-line-dim flex gap-3 text-[12px]">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:glow transition-all uppercase tracking-wider"
            >
              [open_live ↗]
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors uppercase tracking-wider"
            >
              [src]
            </a>
          )}
          {!project.links.live && !project.links.github && (
            <span className="text-text-dim uppercase tracking-wider">[private]</span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
