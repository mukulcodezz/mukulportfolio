import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { staggerContainer } from '@/lib/variants'

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export default function SectionWrapper({ id, children, className, containerClassName }: SectionWrapperProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id={id} ref={ref} className={cn('py-24 md:py-32 px-6 border-t border-line', className)}>
      <div className={cn('max-w-6xl mx-auto', containerClassName)}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
