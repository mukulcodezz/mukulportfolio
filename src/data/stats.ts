export interface Stat {
  value: number | string
  suffix: string
  label: string
}

export const heroStats: Stat[] = [
  { value: 4, suffix: '+', label: 'Production Projects' },
  { value: 3, suffix: '', label: 'Hackathons Participated' },
  { value: 1, suffix: '', label: 'Hackathon Win' },
  { value: 'Multiple', suffix: '', label: 'International Clients' },
]
