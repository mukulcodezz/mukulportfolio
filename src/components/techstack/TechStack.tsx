import { motion } from 'framer-motion'
import { Terminal, Brain, Layers } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionWrapper from '@/components/common/SectionWrapper'
import { techColumns } from '@/data/techStack'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

const iconMap: Record<string, LucideIcon> = { Terminal, Brain, Layers }

export default function TechStack() {
  return (
    <SectionWrapper id="techstack">
      <motion.div variants={fadeUpVariant} className="mb-12 max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-text">
          The stack.
        </h2>
        <p className="text-text-muted mt-4 leading-relaxed">
          Tools used in production. No checkbox skills.
        </p>
      </motion.div>

      <motion.div variants={staggerContainer} className="surface divide-y divide-line">
        {techColumns.map((col) => {
          const Icon = iconMap[col.iconName] ?? Terminal
          return (
            <motion.div
              key={col.title}
              variants={fadeUpVariant}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[220px_1fr] gap-4 md:gap-10 px-6 py-7"
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-accent" strokeWidth={1.75} />
                <h3 className="text-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  {col.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {col.items.map((item) => (
                  <span
                    key={item}
                    className="text-mono text-[11px] px-2 py-1 rounded border border-line text-text hover:border-line-strong transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
