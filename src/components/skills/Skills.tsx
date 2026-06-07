import { motion } from 'framer-motion'
import { Bot, Zap, Brain, Code, Code2, Plug } from 'lucide-react'
import SectionWrapper from '@/components/common/SectionWrapper'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'
import { fadeUpVariant } from '@/lib/variants'

const timelineData = [
  {
    id: 1,
    title: 'AI Agents',
    date: 'Core',
    content: 'Claude + tool-calling, MCP servers, agentic workflows built for real business logic.',
    category: 'AI',
    icon: Bot,
    relatedIds: [3, 4],
    status: 'completed' as const,
    energy: 95,
  },
  {
    id: 2,
    title: 'Automation',
    date: 'Core',
    content: 'n8n, Make, Zapier. Lead capture, ops pipelines, and reporting — wired and running.',
    category: 'Automation',
    icon: Zap,
    relatedIds: [6],
    status: 'completed' as const,
    energy: 90,
  },
  {
    id: 3,
    title: 'GenAI Integrations',
    date: 'Core',
    content: 'Claude, GPT-4, Gemini wired into real products. Not demos — shipped features.',
    category: 'AI',
    icon: Brain,
    relatedIds: [1, 4],
    status: 'completed' as const,
    energy: 92,
  },
  {
    id: 4,
    title: 'MCP Development',
    date: 'Emerging',
    content: 'Custom MCP servers + Claude Agent Skills. Extending AI with domain-specific tools.',
    category: 'AI',
    icon: Code,
    relatedIds: [1, 3],
    status: 'in-progress' as const,
    energy: 75,
  },
  {
    id: 5,
    title: 'Full-Stack Web',
    date: 'Core',
    content: 'React, Vite, Tailwind. Production sites — responsive, fast, and deployed.',
    category: 'Web',
    icon: Code2,
    relatedIds: [6],
    status: 'completed' as const,
    energy: 85,
  },
  {
    id: 6,
    title: 'APIs & Webhooks',
    date: 'Core',
    content: 'REST, OAuth, third-party platform glue. Everything talking to everything else.',
    category: 'Integration',
    icon: Plug,
    relatedIds: [2, 5],
    status: 'completed' as const,
    energy: 88,
  },
]

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <motion.div variants={fadeUpVariant} className="mb-8 max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-text">
          What I do.
        </h2>
        <p className="text-text-muted mt-4 leading-relaxed">
          Six focus areas. Click any node to explore. All backed by shipped work.
        </p>
      </motion.div>

      <motion.div variants={fadeUpVariant}>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </motion.div>
    </SectionWrapper>
  )
}
