export interface Experience {
  role: string
  company: string
  duration: string
  iconName: string
  accent: string
  bullets: string[]
}

export const experiences: Experience[] = [
  {
    role: 'AI Automation Engineer & Web Developer',
    company: 'Shalom Tours & Travels',
    duration: '2024 - Present',
    iconName: 'Briefcase',
    accent: '#10b981',
    bullets: [
      'Developed and deployed the official company website',
      'Created lead generation systems',
      'Implemented analytics tracking',
      'Improved SEO structure',
      'Designed customer inquiry workflows',
      'Enhanced overall digital presence',
    ],
  },
  {
    role: 'Web Developer (Private Contracts)',
    company: 'Additional Client Work · International',
    duration: 'Contract',
    iconName: 'ShieldCheck',
    accent: '#7c3aed',
    bullets: [
      'Developed websites for an Italy-based organization under private contracts',
      'Built client-facing web solutions not publicly disclosed due to NDA restrictions',
      'Worked with international teams on digital projects',
    ],
  },
  {
    role: 'Web Developer & Social Media Manager',
    company: 'On Chain Bucaneers',
    duration: '3 Months',
    iconName: 'Hexagon',
    accent: '#06b6d4',
    bullets: [
      'Developed the website for an NFT platform',
      'Managed social media presence',
      'Supported community growth and engagement',
    ],
  },
]
