export interface Certification {
  title: string
  topics: string[]
  accent: string
}

export const certifications: Certification[] = [
  {
    title: 'Python Fundamentals',
    topics: ['Python', 'Programming Logic', 'Data Structures', 'Scripting'],
    accent: '#06b6d4',
  },
  {
    title: 'Generative AI & LLM Applications',
    topics: ['Claude API', 'Google Gemini', 'Prompt Engineering', 'AI Agents', 'MCP', 'Workflow Automation'],
    accent: '#7c3aed',
  },
]
