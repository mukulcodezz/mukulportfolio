import { motion } from 'framer-motion'

interface SectionHeaderProps {
  command: string
  path?: string
  comment?: string
}

export default function SectionHeader({ command, path = '~/portfolio', comment }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="mb-10"
    >
      <p className="prompt-header">
        <span className="p-user">mukul@portfolio</span>
        <span className="text-text-dim">:</span>
        <span className="p-path">{path}</span>
        <span className="text-text-dim">$ </span>
        <span className="p-cmd glow-soft">{command}</span>
      </p>
      {comment && (
        <p className="text-text-dim text-xs mt-2"># {comment}</p>
      )}
    </motion.div>
  )
}
