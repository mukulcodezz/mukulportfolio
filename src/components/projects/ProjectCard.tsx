import { motion } from 'framer-motion'
import { ExternalLink, Lock } from 'lucide-react'
import type { Project } from '@/data/projects'

// Inline GitHub SVG — lucide-react v1+ removed brand icons
function GitHubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className="glass rounded-2xl overflow-hidden flex flex-col group"
    >
      {/* Screenshot / Placeholder */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#0d0d1f]">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={project.title}
            width={640}
            height={360}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="absolute inset-0"
              style={{ background: `radial-gradient(ellipse at center, ${project.accentColor}20 0%, transparent 70%)` }}
            />
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${project.accentColor}40, ${project.accentColor}20)`, border: `1px solid ${project.accentColor}30` }}
            >
              {project.emoji}
            </div>
            <div className="absolute bottom-3 left-3 text-xs text-white/30 font-medium">Screenshot coming soon</div>
          </div>
        )}

        {/* Hover overlay */}
        {project.links.live && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors"
            >
              <ExternalLink size={14} /> View Live
            </a>
          </div>
        )}

        {/* Badge */}
        {project.badge && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: `${project.badge.color}cc`, border: `1px solid ${project.badge.color}` }}
          >
            {project.badge.text}
          </div>
        )}
      </div>

      {/* Accent strip */}
      <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }} />

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <h3 className="text-lg font-bold">{project.title}</h3>
        <p className="text-sm text-white/55 leading-relaxed flex-1">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.05] border border-white/[0.06] text-white/50">
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-1">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 border border-cyan-400/20 hover:border-cyan-400/50 hover:bg-cyan-400/5 px-3 py-1.5 rounded-lg transition-all"
            >
              <ExternalLink size={12} /> Live Demo
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-white/50 border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] px-3 py-1.5 rounded-lg transition-all"
            >
              <GitHubIcon size={12} /> GitHub
            </a>
          )}
          {!project.links.live && !project.links.github && (
            <span className="flex items-center gap-1.5 text-xs text-white/30 border border-white/[0.05] px-3 py-1.5 rounded-lg">
              <Lock size={12} /> Private Project
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
