import { motion } from 'framer-motion'
import SectionWrapper from '@/components/common/SectionWrapper'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="bg-[#0d0d1f]">
      <motion.div variants={fadeUpVariant} className="mb-12">
        <span className="section-label">Featured Work</span>
        <h2 className="text-4xl font-black tracking-tight mt-2">
          Projects That <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Make an Impact</span>
        </h2>
        <p className="text-white/50 mt-3 max-w-md">Real-world AI solutions built to solve actual business problems.</p>
      </motion.div>
      <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div key={project.id} variants={fadeUpVariant}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
