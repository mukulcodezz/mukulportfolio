import { motion } from 'framer-motion'
import SectionWrapper from '@/components/common/SectionWrapper'
import SkillCard from './SkillCard'
import { skillCategories } from '@/data/skills'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="text-center mb-12">
        <motion.span variants={fadeUpVariant} className="section-label justify-center">Core Expertise</motion.span>
        <motion.h2 variants={fadeUpVariant} className="text-4xl font-black tracking-tight mt-2">
          What I <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Specialize</span> In
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-white/50 mt-3 max-w-md mx-auto">
          From AI automation to web development — full-stack AI engineering.
        </motion.p>
      </div>
      <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-5">
        {skillCategories.map((cat) => (
          <motion.div key={cat.id} variants={fadeUpVariant}>
            <SkillCard category={cat} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
