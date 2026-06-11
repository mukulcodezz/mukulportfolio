interface TerminalSkeletonProps {
  lines?: number
  title?: string
}

/* Terminal-styled loading placeholder for lazy sections */
export default function TerminalSkeleton({ lines = 4, title = 'loading' }: TerminalSkeletonProps) {
  const widths = ['w-3/4', 'w-1/2', 'w-5/6', 'w-2/3', 'w-1/3', 'w-4/5']
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24" aria-hidden>
      <p className="text-text-dim text-[13px] mb-6">
        <span className="text-accent/50">$</span> {title}
        <span className="skeleton-dots" />
      </p>
      <div className="term-frame p-6 space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`h-3.5 skeleton-shimmer ${widths[i % widths.length]}`}
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  )
}
