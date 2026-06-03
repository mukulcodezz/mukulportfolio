import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionWrapper from '@/components/common/SectionWrapper'
import { testimonials } from '@/data/testimonials'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

export default function Testimonials() {
  return (
    <SectionWrapper id="testimonials" className="bg-[#0d0d1f]">
      <motion.div variants={fadeUpVariant} className="text-center mb-12">
        <span className="section-label justify-center">What People Say</span>
        <h2 className="text-4xl font-black tracking-tight mt-2">
          Trusted to <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Deliver</span>
        </h2>
      </motion.div>

      <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeUpVariant}
            className="glass rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden"
          >
            <div
              className="absolute -top-6 -right-2 opacity-[0.06]"
              style={{ color: t.accent }}
            >
              <Quote size={120} strokeWidth={1.5} />
            </div>
            <p className="text-white/70 leading-relaxed relative z-10">"{t.quote}"</p>
            <div className="flex items-center gap-3 mt-auto relative z-10">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}80)` }}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-white/90">{t.name}</p>
                <p className="text-xs text-white/40">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
