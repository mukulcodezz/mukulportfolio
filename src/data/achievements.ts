export interface Achievement {
  iconName: string
  title: string
  description: string
  color: string
}

export const achievements: Achievement[] = [
  {
    iconName: 'Trophy',
    title: 'College Hackathon Winner',
    description: '1st place. Built WhatsApp Attendance Bot in 24 hours.',
    color: '#fbbf24',
  },
  {
    iconName: 'Bot',
    title: 'AI Agent Builder',
    description: 'Deployed production MCP server and multi-agent systems',
    color: '#7c3aed',
  },
  {
    iconName: 'Zap',
    title: 'Automation Expert',
    description: 'Automated business workflows saving 40+ hours/week',
    color: '#06b6d4',
  },
  {
    iconName: 'Globe',
    title: 'Full Stack Developer',
    description: 'Shipped 5+ live production apps across web, AI & automation',
    color: '#ec4899',
  },
]
