export interface Stat {
  value: number | string
  suffix: string
  label: string
}

export const heroStats: Stat[] = [
  { value: 5, suffix: '+', label: 'Projects Built' },
  { value: 1, suffix: 'st', label: 'Hackathon Place' },
  { value: 10, suffix: '+', label: 'AI Tools Mastered' },
  { value: '∞', suffix: '', label: 'Automation Ideas' },
]
