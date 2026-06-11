import { motion } from 'framer-motion'
import CinematicSection from '@/components/terminal/CinematicSection'
import SectionHeader from '@/components/terminal/SectionHeader'
import { testimonials } from '@/data/testimonials'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

export default function Testimonials() {
  return (
    <CinematicSection id="testimonials" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader command='grep -r "mukul" ./feedback/' comment="what people say" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 gap-5"
        >
          {testimonials.map((t) => (
            <motion.blockquote key={t.name} variants={item} className="term-frame hud-corners p-6">
              <span className="hud-b" />
              <p className="text-[10px] text-text-dim mb-3">
                ./feedback/{t.name.toLowerCase().replace(/[\s&]+/g, '_')}.log
              </p>
              <p className="text-text-muted text-sm leading-relaxed">
                <span className="text-accent text-lg leading-none mr-1">"</span>
                {t.quote}
                <span className="text-accent text-lg leading-none ml-1">"</span>
              </p>
              <footer className="mt-4 pt-3 border-t border-line-dim text-[12px]">
                <span className="text-cyan">{t.name}</span>
                <span className="text-text-dim"> — {t.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </CinematicSection>
  )
}
