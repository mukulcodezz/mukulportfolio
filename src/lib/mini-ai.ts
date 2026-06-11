/**
 * MINI.AI — local rule-based brain for the chatbot.
 * Answers the important recruiter/visitor questions instantly, free, offline.
 * Unmatched questions fall through to the Groq API (return null).
 */

interface Intent {
  /* strong keywords = 2 points, weak = 1. Answer fires at score >= 2 */
  strong: string[]
  weak: string[]
  answer: string
}

const INTENTS: Intent[] = [
  {
    strong: [' hello ', ' hey ', ' hi ', ' yo ', ' sup ', ' namaste ', ' hii ', ' helo '],
    weak: [],
    answer:
      "[OK] Connection established. I'm MUKUL.AI — Mukul's portfolio assistant. Ask me about his projects, skills, experience, or availability.",
  },
  {
    strong: ['project', 'built', 'gympulse', 'portfolio piece', 'showcase'],
    weak: ['build', 'made', 'created', 'work on'],
    answer:
      "Mukul has shipped 6 production projects: GymPulse (WhatsApp bot running a gym's entire front desk), Anchor Scaffold MCP (English spec → Solana Anchor code), an AI WhatsApp Attendance Bot (1st place hackathon win, built in 24h), a LinkedIn Outreach Claude Skill, the Shalom Tours & Travels client website, and a Web3 NFT landing page. Scroll to ./work for live links.",
  },
  {
    strong: ['mcp', 'anchor', 'solana'],
    weak: ['server', 'protocol'],
    answer:
      'Anchor Scaffold MCP converts an IDL or plain-English spec into production-ready Solana Anchor code — Rust programs, TypeScript clients, test scaffolding. Ships as both an MCP server and a CLI. Source: github.com/mukulcodezz/anchor-scaffold-mcp',
  },
  {
    strong: ['skill', 'tech stack', 'technolog', 'tools'],
    weak: ['stack', 'know', 'use', 'languages'],
    answer:
      'Core skills: AI agents (Claude + tool-calling, MCP servers), automation (n8n, Make.com, Zapier), GenAI integrations (Claude, GPT-4, Gemini), full-stack web (React, TypeScript, Vite, Tailwind), Python, and API/webhook integrations. Check the ./skills tab for the full readout.',
  },
  {
    strong: ['experience', 'work history', 'job history', 'companies', 'employment'],
    weak: ['worked', 'career', 'background'],
    answer:
      'Current: AI Automation Engineer & Web Developer at Shalom Tours & Travels (2024–present) — built their site, lead-gen systems, and automation workflows. Past: private international web contracts (NDA) and web dev + community for On Chain Buccaneers (NFT platform).',
  },
  {
    strong: ['hire', 'hiring', 'available', 'availability', 'freelance', 'recruit', 'open to'],
    weak: ['role', 'position', 'opportunity', 'contract', 'full-time', 'fulltime', 'remote'],
    answer:
      '[STATUS: AVAILABLE] Mukul is open to full-time AI/automation roles AND contract work, remote-friendly worldwide. Fastest channel: mukulwork1@gmail.com — he replies within 24 hours. The contact form below works too.',
  },
  {
    strong: ['contact', 'email', 'reach', 'linkedin', 'github', 'connect'],
    weak: ['talk', 'message', 'dm'],
    answer:
      'Channels: email mukulwork1@gmail.com · github.com/mukulcodezz · linkedin.com/in/mukul-gupta-430724413. Replies within 24h.',
  },
  {
    strong: ['hackathon', 'award', 'achievement', 'won', 'win'],
    weak: ['prize', 'first place', 'competition'],
    answer:
      '1st place at his college hackathon — built a working AI WhatsApp Attendance Bot in 24 hours that cut manual effort by 90%. 3 hackathons total, 5+ production apps shipped, automation saving clients 40+ hours/week.',
  },
  {
    strong: ['education', 'college', 'degree', 'university', 'study'],
    weak: ['student', 'graduate'],
    answer:
      'Mukul studies at ITS Engineering College (AKTU), India. Certifications: Python Fundamentals, and Generative AI & LLM Applications (Claude API, Gemini, prompt engineering, MCP).',
  },
  {
    strong: ['who is mukul', 'about mukul', 'who are you', 'tell me about mukul'],
    weak: ['who', 'tell me about'],
    answer:
      'Mukul Gupta — AI Automation Engineer & GenAI Developer from India. He turns manual business workflows into AI systems that run themselves: WhatsApp bots, agent workflows, MCP servers, lead pipelines. Hackathon winner. Ships to production, not just demos.',
  },
  {
    strong: ['automation', 'n8n', 'zapier', 'make.com', 'workflow'],
    weak: ['automate', 'bot'],
    answer:
      'Automation is Mukul\'s core weapon: n8n, Make.com, and Zapier pipelines for lead capture, ops, and reporting. Example: GymPulse automates an entire gym front desk over WhatsApp — bookings, reminders, check-ins, win-back campaigns. Saved clients 40+ hours/week.',
  },
]

export function miniAI(input: string): string | null {
  // normalize: lowercase, strip punctuation so " hi! " still matches " hi "
  const q = ` ${input.toLowerCase().replace(/[^\w\s.@-]/g, ' ').replace(/\s+/g, ' ').trim()} `
  let best: { score: number; answer: string } | null = null

  for (const intent of INTENTS) {
    let score = 0
    for (const k of intent.strong) if (q.includes(k)) score += 2
    for (const k of intent.weak) if (q.includes(k)) score += 1
    if (score >= 2 && (!best || score > best.score)) {
      best = { score, answer: intent.answer }
    }
  }

  return best?.answer ?? null
}
