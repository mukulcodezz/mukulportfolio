import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  hover?: boolean
  gradientBorder?: boolean
  children: React.ReactNode
  className?: string
}

export default function GlassCard({ hover = false, gradientBorder = false, children, className, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 20 } } : undefined}
      className={cn(
        'glass rounded-xl',
        gradientBorder && 'gradient-border',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
