import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import GlassCard from '@/components/common/GlassCard'

const tags = ['Claude', 'GPT-4', 'n8n', 'MCP', 'Python', 'React']

export default function ProfileCard() {
  return (
    <div className="relative">
      <GlassCard className="p-8" gradientBorder>
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center text-3xl font-black text-white mb-6">
          MG
        </div>
        <h3 className="text-xl font-bold mb-1">Mukul Gupta</h3>
        <p className="text-[#06b6d4] text-sm font-semibold mb-6">AI Automation Engineer · GenAI Developer</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-[#7c3aed]/15 border border-[#7c3aed]/25 text-violet-300">
              {tag}
            </span>
          ))}
        </div>
      </GlassCard>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/[0.08]"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ec4899] to-[#7c3aed] flex items-center justify-center text-base">🏆</div>
        <div>
          <p className="text-xs font-bold text-white leading-none">Hackathon Winner</p>
          <p className="text-[10px] text-white/40 mt-0.5">College Level · 2024</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -top-4 -right-8 glass rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/[0.08]"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#7c3aed] flex items-center justify-center">
          <GraduationCap size={16} className="text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-white leading-none">B.Tech · AKTU</p>
          <p className="text-[10px] text-white/40 mt-0.5">ITS Engineering College</p>
        </div>
      </motion.div>
    </div>
  )
}
