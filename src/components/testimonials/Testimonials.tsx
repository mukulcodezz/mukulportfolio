import { motion } from 'framer-motion'
import SectionWrapper from '@/components/common/SectionWrapper'
import { testimonials } from '@/data/testimonials'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

export default function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <motion.div variants={fadeUpVariant} className="mb-12 max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-text">
          What clients say.
        </h2>
      </motion.div>

      <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-3">
        {testimonials.map((t) => (
          <motion.figure
            key={t.name}
            variants={fadeUpVariant}
            className="surface p-7 flex flex-col gap-6 hover:border-line-strong transition-colors"
          >
            <blockquote className="text-base text-text leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3 mt-auto pt-4 border-t border-line">
              <div className="w-9 h-9 rounded-md border border-line text-mono text-xs font-medium text-text bg-surface-2 flex items-center justify-center">
                {t.initials}
              </div>
              <div>
                <div className="text-sm font-medium text-text">{t.name}</div>
                <div className="text-xs text-text-muted">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
