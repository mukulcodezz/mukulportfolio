export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  highlights?: string[]
  badge: { text: string; color: string } | null
  links: { github?: string; live?: string }
  accentColor: string
  emoji: string
  screenshot: string | null
}

export const projects: Project[] = [
  {
    id: 'gympulse',
    title: 'GymPulse',
    description:
      'WhatsApp automation bot that runs a gym\'s entire front desk — lead capture, trial booking, renewal reminders, check-in tracking, and win-back campaigns. No app install needed for members.',
    tags: ['WhatsApp API', 'Automation', 'AI', 'SaaS', 'n8n'],
    highlights: [
      '24/7 automated lead capture & qualification',
      'Free trial booking with slot availability',
      '7-day & 1-day renewal reminders',
      'Member check-in tracking via WhatsApp',
      'Win-back campaigns for inactive members',
      'Daily & weekly digest reports for staff',
    ],
    badge: { text: '🚀 Just Launched', color: '#f97316' },
    links: {
      live: 'https://gympulse-bot.vercel.app/',
    },
    accentColor: '#f97316',
    emoji: '💪',
    screenshot: '/screenshots/gympulse.png',
  },
  {
    id: 'anchor-mcp',
    title: 'Anchor Scaffold MCP',
    description:
      'Converts an IDL or plain-English spec into production-ready Solana Anchor code. Ships as both an MCP server and a CLI.',
    tags: ['MCP', 'Claude API', 'TypeScript', 'Rust', 'Solana', 'CLI'],
    highlights: [
      'MCP server + CLI',
      'TypeScript client generation',
      'Rust account & program generation',
      'Automated test scaffolding',
      'Solana ecosystem tooling',
    ],
    badge: { text: 'MCP Server', color: '#7c3aed' },
    links: {
      github: 'https://github.com/mukulcodezz/anchor-scaffold-mcp',
      live: 'https://anchor-scaffold-mcp-website.vercel.app/',
    },
    accentColor: '#7c3aed',
    emoji: '⚓',
    screenshot: '/screenshots/anchor-mcp.png',
  },
  {
    id: 'whatsapp-bot',
    title: 'AI WhatsApp Attendance Bot',
    description:
      'AI-powered WhatsApp bot that automates attendance tracking and reporting. Won 1st place at the college hackathon — built in 24 hours.',
    tags: ['Python', 'WhatsApp API', 'AI', 'Automation', 'n8n'],
    highlights: [
      'Automated attendance tracking',
      'WhatsApp Business API integration',
      'Real-time reporting',
      'Cut manual effort by 90%',
    ],
    badge: { text: '🏆 Hackathon Winner', color: '#ec4899' },
    links: { github: 'https://github.com/mukulcodezz' },
    accentColor: '#ec4899',
    emoji: '💬',
    screenshot: null,
  },
  {
    id: 'linkedin-outreach',
    title: 'LinkedIn Outreach Skill',
    description:
      'A configuration-driven Claude Agent Skill that turns LinkedIn profile screenshots into personalized outreach strategies.',
    tags: ['Claude Agent Skills', 'Prompt Engineering', 'Automation', 'JavaScript'],
    highlights: [
      'Claude-powered workflows',
      'Personalized prospecting',
      'Lead scoring',
      'Nurture-first outreach generation',
      'Multi-industry adaptability',
    ],
    badge: null,
    links: {
      github: 'https://github.com/mukulcodezz/linkedin-outreach-skill',
      live: 'https://mukulcodezz.github.io/linkedin-outreach-skill/',
    },
    accentColor: '#06b6d4',
    emoji: '🤝',
    screenshot: '/screenshots/linkedin-outreach.png',
  },
  {
    id: 'shalom-travel',
    title: 'Shalom Tours & Travels Website',
    description:
      'Official website for a travel and corporate travel management company — designed and developed end-to-end.',
    tags: ['React', 'Tailwind CSS', 'Vite', 'Vercel', 'Responsive'],
    highlights: [
      'Responsive, mobile-first design',
      'SEO optimization',
      'Lead generation forms',
      'Analytics integration',
      'Travel package showcase',
    ],
    badge: { text: 'Client Work', color: '#10b981' },
    links: {
      github: 'https://github.com/mukulcodezz/travel-web',
      live: 'https://shalomtoursandtravel.vercel.app/',
    },
    accentColor: '#10b981',
    emoji: '✈️',
    screenshot: '/screenshots/shalom-travel.png',
  },
  {
    id: 'nft-spring',
    title: 'Spring NFT Landing',
    description:
      'Where it all began — an NFT collection landing page. First real web build that kicked off the journey into shipping production-grade sites.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Web3'],
    highlights: [
      'NFT collection landing page',
      'Web3-themed UI',
      'Responsive layout',
      'Community launch support',
    ],
    badge: null,
    links: { github: 'https://github.com/mukulcodezz/spring-nftttt' },
    accentColor: '#f59e0b',
    emoji: '🌱',
    screenshot: '/screenshots/nft-spring.png',
  },
]
