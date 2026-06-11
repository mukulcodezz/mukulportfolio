import { motion } from 'framer-motion'
import CinematicSection from '@/components/terminal/CinematicSection'
import SectionHeader from '@/components/terminal/SectionHeader'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

export default function Projects() {
  return (
    <CinematicSection id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader command="ls -la ~/projects/" comment={`${projects.length} entries · sorted by impact`} />

        <p className="text-text-dim text-xs mb-6 hidden sm:block">
          total {projects.length} drwxr-xr-x mukul mukul
        </p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>
      </div>
    </CinematicSection>
  )
}
