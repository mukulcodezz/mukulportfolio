import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import SectionWrapper from '@/components/common/SectionWrapper'
import { certifications } from '@/data/certifications'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <motion.div variants={fadeUpVariant} className="text-center mb-12">
        <span className="section-label justify-center">Credentials</span>
        <h2 className="text-4xl font-black tracking-tight mt-2">
          Certifications &amp; <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Learning</span>
        </h2>
      </motion.div>

      <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {certifications.map((cert) => (
          <motion.div key={cert.title} variants={fadeUpVariant} className="glass rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${cert.accent}1f`, border: `1px solid ${cert.accent}33` }}
              >
                <Award size={20} style={{ color: cert.accent }} />
              </div>
              <h3 className="text-base font-bold text-white/90">{cert.title}</h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cert.topics.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.05] border border-white/[0.06] text-white/55"
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
