export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  badge: { text: string; color: string } | null
  links: { github?: string; live?: string }
  accentColor: string
  emoji: string
  screenshot: string | null
}

export const projects: Project[] = [
  {
    id: 'anchor-mcp',
    title: 'Anchor Scaffold MCP',
    description:
      'AI code generator for Solana Anchor programs — generates TypeScript clients, Rust accounts, tests, and full programs straight from your IDL. Ships as both an MCP server and a CLI.',
    tags: ['MCP', 'Claude API', 'TypeScript', 'Rust', 'Solana', 'CLI'],
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
      'AI-powered WhatsApp bot that automates attendance tracking and reporting. Cut manual effort by 90% and won 1st place at the college hackathon — built in 24 hours.',
    tags: ['Python', 'WhatsApp API', 'AI', 'Automation', 'n8n'],
    badge: { text: '🏆 Hackathon Winner', color: '#ec4899' },
    links: { github: 'https://github.com/mukulcodezz' },
    accentColor: '#ec4899',
    emoji: '💬',
    screenshot: null,
  },
  {
    id: 'linkedin-outreach',
    title: 'LinkedIn Outreach Assistant',
    description:
      'Config-driven Claude Agent Skill for personalized, nurture-first LinkedIn outreach. Fill one config file and reuse it for any business — profile analysis, lead scoring, and message drafting.',
    tags: ['Claude Agent Skills', 'Prompt Engineering', 'Automation', 'JavaScript'],
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
    title: 'Shalom Tours & Travels',
    description:
      'Production travel website for Shalom Tours & Travels — responsive, fast, and built to turn visitors into bookings. Live company site shipped end-to-end.',
    tags: ['React', 'Tailwind CSS', 'Vite', 'Vercel', 'Responsive'],
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
    badge: null,
    links: { github: 'https://github.com/mukulcodezz/spring-nftttt' },
    accentColor: '#f59e0b',
    emoji: '🌱',
    screenshot: '/screenshots/nft-spring.png',
  },
]
