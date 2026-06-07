import { Zap, Brain, Code2, Plug } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SkillCategory } from '@/data/skills'

const iconMap: Record<string, LucideIcon> = { Zap, Brain, Code2, Plug }

export default function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = iconMap[category.iconName] ?? Zap
  return (
    <div className="surface p-6 flex flex-col gap-5 h-full hover:border-line-strong transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center">
          <Icon size={15} className="text-accent" strokeWidth={1.75} />
        </div>
        <h3 className="text-sm font-medium text-text">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {category.tags.map((tag) => (
          <span
            key={tag}
            className="text-mono text-[11px] px-2 py-0.5 rounded border border-line text-text-muted hover:text-text hover:border-line-strong transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
