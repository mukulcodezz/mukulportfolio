export interface TechColumn {
  title: string
  iconName: string
  dotColor: string
  items: string[]
}

export const techColumns: TechColumn[] = [
  {
    title: 'Programming',
    iconName: 'Terminal',
    dotColor: '#06b6d4',
    items: ['Python', 'JavaScript', 'C', 'HTML5', 'CSS3'],
  },
  {
    title: 'AI & Automation',
    iconName: 'Brain',
    dotColor: '#7c3aed',
    items: ['Claude (Anthropic)', 'GPT-4 (OpenAI)', 'Google Gemini', 'MCP Protocol', 'n8n', 'Make.com', 'Zapier', 'AI Agents', 'Prompt Engineering'],
  },
  {
    title: 'Development',
    iconName: 'Layers',
    dotColor: '#ec4899',
    items: ['Git & GitHub', 'REST APIs', 'Vercel', 'OpenAI API', 'Anthropic API', 'Vite', 'React', 'Tailwind CSS'],
  },
]
