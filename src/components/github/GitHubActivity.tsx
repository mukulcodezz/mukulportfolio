import { useEffect, useState, cloneElement } from 'react'
import { motion } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import { ArrowUpRight } from 'lucide-react'
import SectionWrapper from '@/components/common/SectionWrapper'
import { fadeUpVariant } from '@/lib/variants'

const USERNAME = 'mukulcodezz'
const LEGACY_COMMITS = 438

const calendarTheme = {
  dark: ['#161616', '#0d3d2f', '#0e5a3f', '#10b981', '#34d399'],
}

export default function GitHubActivity() {
  const [liveTotal, setLiveTotal] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=all`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((data: { total: Record<string, number> }) => {
        const sum = Object.values(data.total ?? {}).reduce((a, b) => a + b, 0)
        setLiveTotal(sum)
      })
      .catch(() => setLiveTotal(null))
    return () => controller.abort()
  }, [])

  const combined = (liveTotal ?? 0) + LEGACY_COMMITS

  return (
    <SectionWrapper id="activity" direction="right">
      <motion.div
        variants={fadeUpVariant}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
      >
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-text">
            Activity.
          </h2>
          <p className="text-text-muted mt-4 leading-relaxed">
            Live GitHub contributions. Updated direct from the source.
          </p>
        </div>
        <div className="flex items-center gap-8">
          <div>
            <div className="text-3xl md:text-4xl font-semibold text-text leading-none tracking-tight">
              {combined.toLocaleString()}
              <span className="text-accent">+</span>
            </div>
            <div className="text-mono text-[11px] text-text-muted uppercase tracking-[0.14em] mt-1.5">
              Total commits
            </div>
          </div>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-mono text-xs text-text-muted hover:text-text transition-colors"
          >
            @{USERNAME} <ArrowUpRight size={12} />
          </a>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUpVariant}
        className="surface p-6 overflow-x-auto flex justify-center"
      >
        <GitHubCalendar
          username={USERNAME}
          colorScheme="dark"
          theme={calendarTheme}
          blockSize={12}
          blockMargin={4}
          fontSize={12}
          renderBlock={(block, activity) =>
            cloneElement(block, {
              title: `${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${activity.date}`,
            } as Partial<typeof block.props>)
          }
        />
      </motion.div>

      <motion.p
        variants={fadeUpVariant}
        className="text-mono text-[11px] text-text-dim mt-4"
      >
        +{LEGACY_COMMITS} from previous account, not shown above.
      </motion.p>
    </SectionWrapper>
  )
}
