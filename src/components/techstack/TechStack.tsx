import { motion } from 'framer-motion'
import SectionWrapper from '@/components/common/SectionWrapper'
import TechColumnCard from './TechColumn'
import { techColumns } from '@/data/techStack'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

export default function TechStack() {
  return (
    <SectionWrapper id="techstack" className="bg-[#0d0d1f]">
      <div className="text-center mb-12">
        <motion.span variants={fadeUpVariant} className="section-label justify-center">Tools & Technologies</motion.span>
        <motion.h2 variants={fadeUpVariant} className="text-4xl font-black tracking-tight mt-2">
          My <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Tech Stack</span>
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-white/50 mt-3 max-w-md mx-auto">
          Technologies powering real AI products.
        </motion.p>
      </div>
      <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-5">
        {techColumns.map((col) => (
          <motion.div key={col.title} variants={fadeUpVariant}>
            <TechColumnCard column={col} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
