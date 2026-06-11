import type { ReactNode } from 'react'

interface TerminalWindowProps {
  title: string
  children: ReactNode
  className?: string
  statusText?: string
}

export default function TerminalWindow({ title, children, className = '', statusText }: TerminalWindowProps) {
  return (
    <div className={`term-frame ${className}`}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-line bg-surface-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
          </div>
          <span className="text-[11px] tracking-widest uppercase text-text-muted select-none">
            {title}
          </span>
        </div>
        {statusText && (
          <span className="text-[10px] tracking-widest uppercase text-accent glow-soft hidden sm:block">
            {statusText}
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
