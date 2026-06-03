import { motion } from 'framer-motion'
import { Trophy, Bot, Zap, Globe } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Achievement } from '@/data/achievements'

const iconMap: Record<string, LucideIcon> = { Trophy, Bot, Zap, Globe }

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = iconMap[achievement.iconName] ?? Trophy
  return (
    <motion.div
      whileHover={{ x: 6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className="glass rounded-xl p-4 flex items-start gap-4"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${achievement.color}20`, border: `1px solid ${achievement.color}30` }}>
        <Icon size={18} style={{ color: achievement.color }} />
      </div>
      <div>
        <h4 className="text-sm font-bold">{achievement.title}</h4>
        <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{achievement.description}</p>
      </div>
    </motion.div>
  )
}
