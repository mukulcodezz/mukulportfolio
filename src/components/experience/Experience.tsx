import { motion } from 'framer-motion'
import SectionWrapper from '@/components/common/SectionWrapper'
import AchievementCard from './AchievementCard'
import WorkExperience from './WorkExperience'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'
import { timelineData } from '@/data/timelineData'
import { achievements } from '@/data/achievements'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <motion.div variants={fadeUpVariant} className="text-center mb-10">
        <span className="section-label justify-center">Background</span>
        <h2 className="text-4xl font-black tracking-tight mt-2">
          Work <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Experience</span>
        </h2>
      </motion.div>

      <WorkExperience />

      <motion.div variants={fadeUpVariant} className="text-center mt-20 mb-4">
        <h3 className="text-2xl font-black tracking-tight">
          Journey & <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Milestones</span>
        </h3>
        <p className="text-white/50 mt-3 max-w-md mx-auto text-sm">
          Click any orbital node to explore the milestone. Watch connected nodes light up.
        </p>
      </motion.div>

      <motion.div variants={fadeUpVariant}>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </motion.div>

      <motion.div variants={fadeUpVariant} className="mt-8">
        <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Achievements</h3>
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
