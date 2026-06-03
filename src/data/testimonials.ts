export interface Testimonial {
  quote: string
  name: string
  role: string
  accent: string
  initials: string
}

// TODO: replace placeholder quotes with real recommendations (LinkedIn, manager, mentor).
export const testimonials: Testimonial[] = [
  {
    quote:
      'Mukul automated our entire attendance and reporting workflow with AI. What used to take hours every day now runs on its own — a genuine force multiplier for the team.',
    name: 'Shalom Tours & Travels',
    role: 'Operations Lead',
    accent: '#7c3aed',
    initials: 'ST',
  },
  {
    quote:
      'Shipped a working AI WhatsApp bot in 24 hours and walked away with first place. Sharp under pressure and ships real, usable software — not just demos.',
    name: 'Hackathon Mentor',
    role: 'College Hackathon',
    accent: '#06b6d4',
    initials: 'HM',
  },
]
