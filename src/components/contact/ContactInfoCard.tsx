import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Inline SVG components for brand icons not in lucide-react v1+
function LinkedInIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

const contacts = [
  { icon: Mail as LucideIcon, label: 'Email', value: 'mukulwork1@gmail.com', href: 'mailto:mukulwork1@gmail.com', gradient: 'from-[#7c3aed] to-[#ec4899]', isBrand: false },
  { icon: Phone as LucideIcon, label: 'Phone', value: '+91 8448989323', href: 'tel:+918448989323', gradient: 'from-[#06b6d4] to-[#7c3aed]', isBrand: false },
  { icon: null, label: 'LinkedIn', value: 'mukul-gupta-430724413', href: 'https://www.linkedin.com/in/mukul-gupta-430724413/', gradient: 'from-[#0077b5] to-[#005885]', isBrand: true, BrandIcon: LinkedInIcon },
  { icon: null, label: 'GitHub', value: 'mukulcodezz', href: 'https://github.com/mukulcodezz', gradient: 'from-[#333] to-[#555]', isBrand: true, BrandIcon: GitHubIcon },
] as const

export default function ContactInfoCards() {
  return (
    <div className="flex flex-col gap-3">
      {contacts.map((contact) => (
        <motion.a
          key={contact.label}
          href={contact.href}
          target={contact.href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          whileHover={{ x: 6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
          className="glass rounded-xl p-4 flex items-center gap-4 no-underline group"
        >
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center flex-shrink-0`}>
            {contact.isBrand && 'BrandIcon' in contact
              ? <contact.BrandIcon size={18} className="text-white" />
              : contact.icon && <contact.icon size={18} className="text-white" />
            }
          </div>
          <div>
            <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">{contact.label}</p>
            <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{contact.value}</p>
          </div>
        </motion.a>
      ))}
    </div>
  )
}
