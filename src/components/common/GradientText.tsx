import type { ElementType } from 'react'
import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: ElementType
}

export default function GradientText({ children, className, as: Tag = 'span' }: GradientTextProps) {
  const Component = Tag as 'span'
  return (
    <Component className={cn('bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent', className)}>
      {children}
    </Component>
  )
}
