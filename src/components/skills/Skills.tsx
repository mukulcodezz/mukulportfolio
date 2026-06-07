import { motion } from 'framer-motion'
import SectionWrapper from '@/components/common/SectionWrapper'
import SkillCard from './SkillCard'
import { skillCategories } from '@/data/skills'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <motion.div variants={fadeUpVariant} className="mb-12 max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-text">
          What I do.
        </h2>
        <p className="text-text-muted mt-4 leading-relaxed">
          Four focus areas. Each one backed by shipped work, not tutorials.
        </p>
      </motion.div>

      <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-3">
        {skillCategories.map((cat) => (
          <motion.div key={cat.id} variants={fadeUpVariant}>
            <SkillCard category={cat} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
