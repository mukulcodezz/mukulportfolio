import { Calendar, Code, Trophy, Briefcase, Zap, Brain } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: LucideIcon
  relatedIds: number[]
  status: 'completed' | 'in-progress' | 'pending'
  energy: number
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: 'B.Tech Start',
    date: 'Aug 2022',
    content: 'Started B.Tech in Computer Science at ITS Engineering College (AKTU). Began exploring AI, machine learning, and full-stack development.',
    category: 'Education',
    icon: Calendar,
    relatedIds: [2],
    status: 'completed',
    energy: 100,
  },
  {
    id: 2,
    title: 'First AI Project',
    date: 'Mid 2023',
    content: 'Built first AI automation project — a workflow automation system integrating multiple APIs. Discovered passion for GenAI and agentic systems.',
    category: 'Development',
    icon: Code,
    relatedIds: [1, 3],
    status: 'completed',
    energy: 90,
  },
  {
    id: 3,
    title: 'Hackathon Winner',
    date: 'Early 2024',
    content: 'Won college hackathon with AI-powered WhatsApp Attendance Bot. Built in 24 hours using Python, WhatsApp Business API, and AI automation workflows.',
    category: 'Achievement',
    icon: Trophy,
    relatedIds: [2, 4],
    status: 'completed',
    energy: 100,
  },
  {
    id: 4,
    title: 'Shalom Tours',
    date: '2024–Present',
    content: 'Joined Shalom Tours & Travels as AI Automation Engineer & Web Developer. Building AI workflows, automation systems, and maintaining company digital presence.',
    category: 'Experience',
    icon: Briefcase,
    relatedIds: [3, 5],
    status: 'in-progress',
    energy: 85,
  },
  {
    id: 5,
    title: 'MCP Platform',
    date: '2025',
    content: 'Launched MCP & AI Agent Platform demonstrating Model Context Protocol, multi-agent coordination, and advanced prompt engineering techniques.',
    category: 'Development',
    icon: Zap,
    relatedIds: [4, 6],
    status: 'in-progress',
    energy: 75,
  },
  {
    id: 6,
    title: 'GenAI Mastery',
    date: '2025',
    content: 'Deep expertise in Claude, GPT-4, Gemini. Building production AI agents with tool calling, RAG, and agentic workflows for real business automation.',
    category: 'Skills',
    icon: Brain,
    relatedIds: [5],
    status: 'in-progress',
    energy: 70,
  },
]
