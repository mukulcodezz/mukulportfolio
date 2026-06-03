export interface SkillCategory {
  id: string
  title: string
  iconName: string
  tags: string[]
  gradientFrom: string
  gradientTo: string
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-automation',
    title: 'AI Automation',
    iconName: 'Zap',
    tags: ['n8n', 'Make.com', 'Zapier', 'Workflow Design', 'Process Automation', 'Lead Generation', 'AI Operations'],
    gradientFrom: '#7c3aed',
    gradientTo: '#ec4899',
  },
  {
    id: 'genai',
    title: 'AI Agents & GenAI',
    iconName: 'Brain',
    tags: ['Claude API', 'OpenAI API', 'Gemini', 'MCP', 'Prompt Engineering', 'Agentic Workflows', 'Tool Calling', 'AI Integrations'],
    gradientFrom: '#7c3aed',
    gradientTo: '#06b6d4',
  },
  {
    id: 'webdev',
    title: 'Web Development',
    iconName: 'Code2',
    tags: ['React', 'Vite', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Responsive Design', 'Landing Pages'],
    gradientFrom: '#06b6d4',
    gradientTo: '#7c3aed',
  },
  {
    id: 'apis',
    title: 'APIs & Integrations',
    iconName: 'Plug',
    tags: ['REST APIs', 'OpenAI API', 'Anthropic API', 'Webhooks', 'Third-party Integrations', 'JSON', 'OAuth'],
    gradientFrom: '#ec4899',
    gradientTo: '#06b6d4',
  },
]
