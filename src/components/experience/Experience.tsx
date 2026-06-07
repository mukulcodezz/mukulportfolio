import { motion } from 'framer-motion'
import SectionWrapper from '@/components/common/SectionWrapper'
import AchievementCard from './AchievementCard'
import WorkExperience from './WorkExperience'
import { achievements } from '@/data/achievements'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <motion.div variants={fadeUpVariant} className="mb-12 max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-text">
          Experience.
        </h2>
        <p className="text-text-muted mt-4 leading-relaxed">
          Three roles. One full-time client, one private NDA contract, one
          early-stage NFT startup.
        </p>
      </motion.div>

      <WorkExperience />

      <motion.div variants={fadeUpVariant} className="mt-20">
        <h3 className="text-mono text-[11px] uppercase tracking-[0.18em] text-text-muted mb-5">
          Highlights
        </h3>
        <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-3">
          {achievements.map((achievement, i) => (
            <motion.div key={i} variants={fadeUpVariant}>
              <AchievementCard achievement={achievement} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
