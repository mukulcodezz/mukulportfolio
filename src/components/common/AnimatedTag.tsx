import { motion } from 'framer-motion'
import { tagVariant } from '@/lib/variants'
import { cn } from '@/lib/utils'

interface AnimatedTagProps {
  label: string
  className?: string
}

export default function AnimatedTag({ label, className }: AnimatedTagProps) {
  return (
    <motion.span
      variants={tagVariant}
      whileHover={{
        scale: 1.08,
        boxShadow: '0 0 16px rgba(124, 58, 237, 0.4)',
        transition: { type: 'spring', stiffness: 400, damping: 17 },
      }}
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold',
        'bg-white/[0.06] border border-white/[0.08] text-white/70',
        'hover:bg-[#7c3aed]/20 hover:border-[#7c3aed]/30 hover:text-violet-300',
        'transition-colors cursor-default',
        className,
      )}
    >
      {label}
    </motion.span>
  )
}
