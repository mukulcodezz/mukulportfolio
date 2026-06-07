import { Trophy, Bot, Zap, Globe } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Achievement } from '@/data/achievements'

const iconMap: Record<string, LucideIcon> = { Trophy, Bot, Zap, Globe }

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = iconMap[achievement.iconName] ?? Trophy
  return (
    <div className="surface p-4 flex items-start gap-4 hover:border-line-strong transition-colors">
      <Icon size={18} className="text-accent shrink-0 mt-0.5" strokeWidth={1.75} />
      <div>
        <h4 className="text-sm font-medium text-text">{achievement.title}</h4>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">{achievement.description}</p>
      </div>
    </div>
  )
}
