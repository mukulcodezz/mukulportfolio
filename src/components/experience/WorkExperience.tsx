import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, ShieldCheck, Hexagon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { experiences } from '@/data/experiences'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

const iconMap: Record<string, LucideIcon> = { Briefcase, ShieldCheck, Hexagon }

export default function WorkExperience() {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div variants={staggerContainer} className="flex flex-col">
      {experiences.map((exp, i) => {
        const Icon = iconMap[exp.iconName] ?? Briefcase
        const isLast = i === experiences.length - 1
        return (
          <motion.div
            key={exp.company}
            variants={fadeUpVariant}
            whileHover={shouldReduce ? undefined : { x: 4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className={`grid grid-cols-1 sm:grid-cols-[auto_1fr] md:grid-cols-[180px_1fr] gap-2 sm:gap-4 md:gap-10 py-6 md:py-7 ${
              isLast ? '' : 'border-b border-line'
            }`}
          >
            <div className="text-mono text-[11px] text-text-muted uppercase tracking-[0.16em] pt-1">
              {exp.duration}
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Icon size={16} className="text-accent mt-1 shrink-0" strokeWidth={1.75} />
                <div>
                  <h4 className="text-base md:text-lg font-medium text-text">{exp.role}</h4>
                  <p className="text-sm text-text-muted mt-0.5">{exp.company}</p>
                </div>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-1 ml-7">
                {exp.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-text-muted leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-text-dim shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
