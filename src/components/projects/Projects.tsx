import { motion } from 'framer-motion'
import SectionWrapper from '@/components/common/SectionWrapper'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <motion.div
        variants={fadeUpVariant}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
      >
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-text">
            Selected work.
          </h2>
          <p className="text-text-muted text-base leading-relaxed max-w-[55ch]">
            Six projects shipped for real users. Agents, automation, full client
            sites, an MCP server, a hackathon win.
          </p>
        </div>
        <a
          href="https://github.com/mukulcodezz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-mono text-xs text-text-muted hover:text-text transition-colors"
        >
          github.com/mukulcodezz →
        </a>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {projects.map((project, idx) => (
          <motion.div key={project.id} variants={fadeUpVariant}>
            <ProjectCard project={project} index={idx} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
