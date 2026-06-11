import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MatrixRain from '@/components/terminal/MatrixRain'
import Window from './Window'
import { APPS, getApp } from './registry'
import type { AppId, WinState } from './types'
import { AboutApp, SkillsApp, ExperienceApp, GitHubApp, FeedbackApp, ContactApp } from './apps/ContentApps'
import ProjectsApp from './apps/ProjectsApp'
import TerminalApp from './apps/TerminalApp'
import ChatApp from './apps/ChatApp'

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])
  return <span className="tabular-nums" suppressHydrationWarning>{time} IST</span>
}

export default function Desktop() {
  const [wins, setWins] = useState<WinState[]>([])
  const [projectArg, setProjectArg] = useState<string | undefined>()
  const zRef = useRef(10)
  const desktopRef = useRef<HTMLDivElement>(null)

  const openApp = (id: AppId, arg?: string) => {
    if (id === 'projects' && arg) setProjectArg(arg)
    setWins((prev) => {
      const existing = prev.find((w) => w.id === id)
      if (existing) {
        return prev.map((w) =>
          w.id === id ? { ...w, minimized: false, z: ++zRef.current } : w,
        )
      }
      const idx = prev.length
      return [...prev, {
        id,
        z: ++zRef.current,
        minimized: false,
        maximized: false,
        // spawn right of the desktop-icon column so icons stay clickable
        pos: { x: 232 + (idx % 5) * 44, y: 20 + (idx % 5) * 36 },
      }]
    })
  }

  const closeApp = (id: AppId) => {
    setWins((prev) => prev.filter((w) => w.id !== id))
    if (id === 'projects') setProjectArg(undefined)
  }
  const minimizeApp = (id: AppId) =>
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
  const maximizeApp = (id: AppId) =>
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized, z: ++zRef.current } : w)))
  const focusApp = (id: AppId) =>
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, z: ++zRef.current } : w)))

  // Open terminal on first load — the front door
  useEffect(() => {
    const t = setTimeout(() => openApp('terminal'), 400)
    return () => clearTimeout(t)
  }, [])

  const renderApp = (id: AppId) => {
    switch (id) {
      case 'terminal': return <TerminalApp openApp={openApp} />
      case 'about': return <AboutApp />
      case 'projects': return <ProjectsApp initialId={projectArg} />
      case 'skills': return <SkillsApp />
      case 'experience': return <ExperienceApp />
      case 'github': return <GitHubApp />
      case 'feedback': return <FeedbackApp />
      case 'contact': return <ContactApp />
      case 'ai': return <ChatApp />
    }
  }

  return (
    <div className="h-dvh w-screen flex flex-col overflow-hidden bg-bg">
      {/* Menu bar */}
      <header className="h-8 shrink-0 flex items-center justify-between px-4 border-b border-line bg-surface-2/90 backdrop-blur text-[11px] z-50">
        <div className="flex items-center gap-4">
          <span className="text-accent font-semibold tracking-widest glow-soft">⌬ MUKUL_OS</span>
          <span className="text-text-dim hidden sm:inline">v2.0 — AI Automation Engineer</span>
        </div>
        <div className="flex items-center gap-4 text-text-muted">
          <span className="hidden md:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            AVAILABLE_FOR_WORK
          </span>
          <Clock />
        </div>
      </header>

      {/* Desktop area */}
      <div ref={desktopRef} className="relative flex-1 min-h-0 overflow-hidden">
        <MatrixRain opacity={0.05} />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,255,65,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Desktop icons */}
        <div className="absolute top-5 left-5 grid gap-1.5 z-0">
          {APPS.map((app) => (
            <motion.button
              key={app.id}
              whileHover={{ scale: 1.04, x: 2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => openApp(app.id)}
              className="flex items-center gap-3 px-3 py-2 text-left hover:bg-accent/5 border border-transparent hover:border-line transition-colors group w-44"
            >
              <span className="text-xl leading-none w-7 text-center shrink-0">
                {app.icon === '>_' ? <span className="text-accent text-sm font-bold">&gt;_</span> : app.icon}
              </span>
              <span className="text-[12px] text-text-muted group-hover:text-accent transition-colors truncate">
                {app.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Hint */}
        {wins.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-text-dim text-[12px] tracking-widest uppercase">
              click an icon to begin<span className="cursor-blink ml-2" />
            </p>
          </div>
        )}

        {/* Windows */}
        <AnimatePresence>
          {wins.map((win) => {
            const meta = getApp(win.id)!
            return (
              <Window
                key={win.id}
                meta={meta}
                win={win}
                desktopRef={desktopRef}
                onClose={() => closeApp(win.id)}
                onMinimize={() => minimizeApp(win.id)}
                onMaximize={() => maximizeApp(win.id)}
                onFocus={() => focusApp(win.id)}
              >
                {renderApp(win.id)}
              </Window>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Taskbar */}
      <footer className="h-11 shrink-0 flex items-center gap-1.5 px-3 border-t border-line bg-surface-2/90 backdrop-blur z-50 overflow-x-auto">
        <span className="text-accent text-[11px] font-bold tracking-widest px-2 shrink-0 glow-soft select-none">
          [MUKUL_OS]
        </span>
        <div className="w-px h-5 bg-line shrink-0" />
        {APPS.map((app) => {
          const win = wins.find((w) => w.id === app.id)
          return (
            <button
              key={app.id}
              onClick={() => openApp(app.id)}
              className={`px-2.5 py-1.5 text-[11px] whitespace-nowrap transition-colors border ${
                win
                  ? win.minimized
                    ? 'text-text-dim border-line-dim'
                    : 'text-accent border-line bg-accent/5'
                  : 'text-text-dim border-transparent hover:text-text-muted hover:border-line-dim'
              }`}
              title={app.label}
            >
              {app.icon === '>_' ? '>_' : app.icon} <span className="hidden lg:inline">{app.label}</span>
            </button>
          )
        })}
        <div className="ml-auto shrink-0 text-[10px] text-text-dim pr-1 hidden sm:block">
          mukulwork1@gmail.com
        </div>
      </footer>
    </div>
  )
}
