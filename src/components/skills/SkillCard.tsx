import { motion } from 'framer-motion'
import { Zap, Brain, Code2, Plug } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import GlassCard from '@/components/common/GlassCard'
import AnimatedTag from '@/components/common/AnimatedTag'
import { staggerContainer } from '@/lib/variants'
import type { SkillCategory } from '@/data/skills'

const iconMap: Record<string, LucideIcon> = { Zap, Brain, Code2, Plug }

export default function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = iconMap[category.iconName] ?? Zap
  return (
    <GlassCard hover className="p-6 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${category.gradientFrom}, ${category.gradientTo})` }}
        >
          <Icon size={22} className="text-white" />
        </div>
        <h3 className="text-base font-bold">{category.title}</h3>
      </div>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-wrap gap-2">
        {category.tags.map((tag) => (
          <AnimatedTag key={tag} label={tag} />
        ))}
      </motion.div>
    </GlassCard>
  )
}
