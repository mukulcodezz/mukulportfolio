import { useEffect, useState, cloneElement } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { GitHubCalendar } from 'react-github-calendar'
import CinematicSection from '@/components/terminal/CinematicSection'
import SectionHeader from '@/components/terminal/SectionHeader'
import TerminalWindow from '@/components/terminal/TerminalWindow'

const USERNAME = 'mukulcodezz'
const LEGACY_COMMITS = 438

const calendarTheme = {
  dark: ['#0a0d0a', '#053b16', '#0a7a2b', '#00cc34', '#00ff41'],
}

export default function GitHubActivity() {
  const [liveTotal, setLiveTotal] = useState<number | null>(null)
  const isMobile = useMediaQuery('(max-width: 767px)')

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
    <CinematicSection id="activity" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader command={`git shortlog -sn --author=${USERNAME}`} comment="live contribution feed" />

        <TerminalWindow
          title={`github.com/${USERNAME}`}
          statusText={`[${combined.toLocaleString()}+ COMMITS]`}
        >
          <div className="p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-0 flex justify-start sm:justify-center">
              <GitHubCalendar
                username={USERNAME}
                colorScheme="dark"
                theme={calendarTheme}
                blockSize={isMobile ? 8 : 12}
                blockMargin={isMobile ? 2 : 4}
                fontSize={isMobile ? 10 : 12}
                renderBlock={(block, activity) =>
                  cloneElement(block, {
                    title: `${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${activity.date}`,
                  } as Partial<typeof block.props>)
                }
              />
            </div>
            <div className="mt-4 pt-3 border-t border-line-dim flex flex-wrap justify-between gap-2 text-[11px] text-text-dim">
              <span># +{LEGACY_COMMITS} commits from previous account not shown</span>
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:glow transition-all"
              >
                [view_profile ↗]
              </a>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </CinematicSection>
  )
}
