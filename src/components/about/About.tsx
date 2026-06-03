import { motion } from 'framer-motion'
import { Bot, Zap, Code, Plug, Brain, Network } from 'lucide-react'
import SectionWrapper from '@/components/common/SectionWrapper'
import ProfileCard from './ProfileCard'
import { slideInLeft, slideInRight } from '@/lib/variants'

const highlights = [
  { icon: Bot, label: 'AI Agent Development' },
  { icon: Zap, label: 'Workflow Automation' },
  { icon: Code, label: 'Web Development' },
  { icon: Plug, label: 'API Integrations' },
  { icon: Brain, label: 'Prompt Engineering' },
  { icon: Network, label: 'MCP Protocol' },
]

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-[#0d0d1f]">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div variants={slideInLeft} className="hidden lg:block">
          <ProfileCard />
        </motion.div>

        <motion.div variants={slideInRight} className="flex flex-col gap-6">
          <div>
            <span className="section-label">About Me</span>
            <h2 className="text-4xl font-black tracking-tight leading-tight mt-2">
              Building AI Solutions <br />
              That <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Actually Work</span>
            </h2>
          </div>

          <p className="text-white/60 leading-relaxed">
            I'm a B.Tech student at ITS Engineering College (AKTU) with hands-on experience in Generative AI, AI Agents, Workflow Automation, Prompt Engineering, MCP (Model Context Protocol), APIs, and Web Development.
          </p>
          <p className="text-white/60 leading-relaxed">
            I build practical AI solutions that automate business processes, improve efficiency, and create better user experiences. My focus is on transforming ideas into scalable AI-powered systems.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-2">
            {highlights.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-sm text-white/60 font-medium"
              >
                <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-violet-400" />
                </div>
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
