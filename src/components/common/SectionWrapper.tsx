import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
  direction?: 'up' | 'left' | 'right'
}

export default function SectionWrapper({
  id,
  children,
  className,
  containerClassName,
  direction = 'up',
}: SectionWrapperProps) {
  const ref = useRef(null)
  const shouldReduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const initial = shouldReduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0,
        y: direction === 'up' ? 24 : 0,
      }

  return (
    <section
      id={id}
      ref={ref}
      className={cn('py-16 md:py-24 lg:py-32 px-4 sm:px-6 border-t border-line', className)}
    >
      <motion.div
        className={cn('max-w-6xl mx-auto', containerClassName)}
        initial={initial}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}
