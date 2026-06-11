const year = new Date().getFullYear()

const links = [
  { label: 'github', href: 'https://github.com/mukulcodezz' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/mukul-gupta-430724413/' },
  { label: 'email', href: 'mailto:mukulwork1@gmail.com' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px]">
        <p className="text-text-dim">
          <span className="text-accent">mukul@portfolio</span>:~$ exit 0
          <span className="text-text-dim ml-3">// © {year} Mukul Gupta</span>
        </p>
        <div className="flex gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              [{l.label}]
            </a>
          ))}
        </div>
        <p className="text-text-dim hidden md:block"># built with react · vite · framer-motion</p>
      </div>
    </footer>
  )
}
