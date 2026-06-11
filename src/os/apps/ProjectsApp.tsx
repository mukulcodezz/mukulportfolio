import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, type Project } from '@/data/projects'

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.2 }}
      className="p-5"
    >
      <button onClick={onBack} className="text-[11px] text-text-dim hover:text-accent transition-colors uppercase tracking-widest mb-4">
        ← cd ..
      </button>

      {project.screenshot && (
        <div className="border border-line mb-4 overflow-hidden">
          <img src={project.screenshot} alt={project.title} loading="lazy" className="w-full object-cover object-top max-h-56" />
        </div>
      )}

      <div className="flex flex-wrap items-baseline gap-3">
        <h3 className="text-text font-semibold text-[16px]">
          <span className="text-accent mr-1.5">{'>'}</span>{project.title}
        </h3>
        {project.badge && (
          <span className="text-accent text-[10px] uppercase tracking-wider glow-soft">[{project.badge.text}]</span>
        )}
      </div>

      <p className="mt-3 text-text-muted text-[13px] leading-relaxed">{project.description}</p>

      {project.highlights && (
        <ul className="mt-4 space-y-1.5 text-[12px] text-text-muted">
          {project.highlights.map((h) => (
            <li key={h}><span className="text-accent mr-2">+</span>{h}</li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-x-2.5 gap-y-1 text-[11px] text-cyan/80">
        {project.tags.map((t) => <span key={t}>--{t.toLowerCase().replace(/[\s.]+/g, '-')}</span>)}
      </div>

      <div className="mt-5 pt-4 border-t border-line-dim flex gap-4 text-[12px]">
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-accent hover:glow transition-all uppercase tracking-wider">
            [open_live ↗]
          </a>
        )}
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors uppercase tracking-wider">
            [source]
          </a>
        )}
        {!project.links.live && !project.links.github && (
          <span className="text-text-dim uppercase tracking-wider">[private]</span>
        )}
      </div>
    </motion.div>
  )
}

export default function ProjectsApp({ initialId }: { initialId?: string }) {
  const [selected, setSelected] = useState<Project | null>(
    initialId ? projects.find((p) => p.id === initialId) ?? null : null,
  )

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        {selected ? (
          <ProjectDetail key="detail" project={selected} onBack={() => setSelected(null)} />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <p className="px-5 pt-4 pb-1 text-text-dim text-[11px]">
              $ ls -la ~/projects/ <span className="ml-2">— total {projects.length} · click to open</span>
            </p>
            <div className="divide-y divide-line-dim">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="w-full text-left px-5 py-3.5 hover:bg-accent/5 transition-colors flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] group"
                >
                  <span className="text-text-dim text-[11px] w-8">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg leading-none">{p.emoji}</span>
                  <span className="text-text font-medium group-hover:text-accent transition-colors">{p.title}</span>
                  {p.badge && (
                    <span className="text-accent text-[10px] uppercase tracking-wider">[{p.badge.text}]</span>
                  )}
                  <span className="ml-auto text-text-dim text-[11px] hidden sm:flex gap-2">
                    {p.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
                  </span>
                  <span className="text-text-dim group-hover:text-accent transition-colors">→</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
