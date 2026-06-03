import { motion } from 'framer-motion'
import { Terminal, Brain, Layers } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import GlassCard from '@/components/common/GlassCard'
import { staggerContainer, fadeUpVariant } from '@/lib/variants'
import type { TechColumn } from '@/data/techStack'

const iconMap: Record<string, LucideIcon> = { Terminal, Brain, Layers }

export default function TechColumnCard({ column }: { column: TechColumn }) {
  const Icon = iconMap[column.iconName] ?? Terminal
  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${column.dotColor}20` }}>
          <Icon size={16} style={{ color: column.dotColor }} />
        </div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">{column.title}</h3>
      </div>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-wrap gap-2">
        {column.items.map((item) => (
          <motion.div
            key={item}
            variants={fadeUpVariant}
            whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400 } }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.06] text-xs font-medium text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: column.dotColor }} />
            {item}
          </motion.div>
        ))}
      </motion.div>
    </GlassCard>
  )
}
