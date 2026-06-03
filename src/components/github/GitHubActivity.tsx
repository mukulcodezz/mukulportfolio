import { useEffect, useState, cloneElement } from 'react'
import { motion } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import SectionWrapper from '@/components/common/SectionWrapper'
import { fadeUpVariant } from '@/lib/variants'

const USERNAME = 'mukulcodezz'
// Commits from a previous GitHub account, not reflected in the live graph below.
const LEGACY_COMMITS = 438

const calendarTheme = {
  dark: ['#1b1b2f', '#3b2f63', '#5b3fa8', '#7c3aed', '#a78bfa'],
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
    <SectionWrapper id="activity" className="bg-[#0d0d1f]">
      <motion.div variants={fadeUpVariant} className="text-center mb-10">
        <span className="section-label justify-center">Live Activity</span>
        <h2 className="text-4xl font-black tracking-tight mt-2">
          GitHub <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Contributions</span>
        </h2>
        <p className="text-white/50 mt-3 max-w-md mx-auto">
          A live snapshot of what I'm shipping — updated straight from GitHub.
        </p>
      </motion.div>

      {/* Combined total */}
      <motion.div variants={fadeUpVariant} className="flex justify-center mb-10">
        <div className="glass rounded-2xl px-8 py-5 text-center">
          <div className="text-4xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent leading-none">
            {combined.toLocaleString()}+
          </div>
          <div className="text-xs text-white/45 mt-2 font-medium uppercase tracking-wider">
            Total Commits
          </div>
          <div className="text-[11px] text-white/30 mt-1">
            incl. {LEGACY_COMMITS} from a previous account
          </div>
        </div>
      </motion.div>

      {/* Live heatmap */}
      <motion.div
        variants={fadeUpVariant}
        className="glass rounded-2xl p-6 overflow-x-auto flex justify-center"
      >
        <GitHubCalendar
          username={USERNAME}
          colorScheme="dark"
          theme={calendarTheme}
          blockSize={12}
          blockMargin={4}
          fontSize={13}
          renderBlock={(block, activity) =>
            cloneElement(block, {
              title: `${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${activity.date}`,
            } as Partial<typeof block.props>)
          }
        />
      </motion.div>

      <motion.a
        variants={fadeUpVariant}
        href={`https://github.com/${USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-xs text-white/40 hover:text-white/70 transition-colors mt-5"
      >
        View full profile on GitHub →
      </motion.a>
    </SectionWrapper>
  )
}
