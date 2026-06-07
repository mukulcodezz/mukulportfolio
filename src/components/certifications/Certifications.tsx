import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import SectionWrapper from '@/components/common/SectionWrapper'
import { certifications } from '@/data/certifications'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <motion.div variants={fadeUpVariant} className="mb-10 max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-text">
          Credentials.
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-3 max-w-4xl"
      >
        {certifications.map((cert) => (
          <motion.div
            key={cert.title}
            variants={fadeUpVariant}
            className="surface p-6 flex flex-col gap-4 hover:border-line-strong transition-colors"
          >
            <div className="flex items-center gap-3">
              <Award size={16} className="text-accent" strokeWidth={1.75} />
              <h3 className="text-sm font-medium text-text">{cert.title}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cert.topics.map((t) => (
                <span
                  key={t}
                  className="text-mono text-[11px] px-2 py-0.5 rounded border border-line text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
