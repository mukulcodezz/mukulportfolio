import { motion } from 'framer-motion'
import { Briefcase, ShieldCheck, Hexagon, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { experiences } from '@/data/experiences'
import { fadeUpVariant, staggerContainer } from '@/lib/variants'

const iconMap: Record<string, LucideIcon> = { Briefcase, ShieldCheck, Hexagon }

export default function WorkExperience() {
  return (
    <motion.div variants={staggerContainer} className="flex flex-col gap-4 max-w-3xl mx-auto">
      {experiences.map((exp) => {
        const Icon = iconMap[exp.iconName] ?? Briefcase
        return (
          <motion.div
            key={exp.company}
            variants={fadeUpVariant}
            className="glass rounded-2xl p-6 flex flex-col sm:flex-row gap-5"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${exp.accent}1f`, border: `1px solid ${exp.accent}33` }}
            >
              <Icon size={20} style={{ color: exp.accent }} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h4 className="text-base font-bold text-white/90">{exp.role}</h4>
                <span
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ background: `${exp.accent}1a`, color: exp.accent }}
                >
                  {exp.duration}
                </span>
              </div>
              <p className="text-sm font-medium text-white/50 mt-0.5">{exp.company}</p>

              <ul className="mt-3 flex flex-col gap-1.5">
                {exp.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-white/60 leading-relaxed">
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: exp.accent }} />
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
