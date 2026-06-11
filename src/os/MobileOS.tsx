import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MatrixRain from '@/components/terminal/MatrixRain'
import { APPS, getApp } from './registry'
import type { AppId } from './types'
import { AboutApp, SkillsApp, ExperienceApp, GitHubApp, FeedbackApp, ContactApp } from './apps/ContentApps'
import ProjectsApp from './apps/ProjectsApp'
import TerminalApp from './apps/TerminalApp'
import ChatApp from './apps/ChatApp'

function StatusBar() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }))
    tick()
    const t = setInterval(tick, 10000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="h-9 shrink-0 flex items-center justify-between px-4 text-[11px] border-b border-line bg-surface-2/90 backdrop-blur">
      <span className="text-accent font-semibold tracking-widest glow-soft">⌬ MUKUL_OS</span>
      <div className="flex items-center gap-3 text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <span className="text-[10px]">ONLINE</span>
        </span>
        <span className="tabular-nums" suppressHydrationWarning>{time}</span>
      </div>
    </div>
  )
}

export default function MobileOS() {
  const [openId, setOpenId] = useState<AppId | null>(null)
  const [projectArg, setProjectArg] = useState<string | undefined>()

  const openApp = (id: AppId, arg?: string) => {
    if (id === 'projects' && arg) setProjectArg(arg)
    setOpenId(id)
  }

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

  const meta = openId ? getApp(openId) : null

  return (
    <div className="h-dvh w-screen flex flex-col overflow-hidden bg-bg relative">
      <StatusBar />

      {/* Home screen */}
      <div className="relative flex-1 min-h-0 overflow-y-auto">
        <MatrixRain opacity={0.05} />
        <div className="relative z-10 px-6 pt-8 pb-6">
          <p className="text-text-dim text-[11px] tracking-widest uppercase">welcome, guest</p>
          <h1 className="mt-2 text-[22px] font-bold leading-tight">
            <span className="text-accent glow">MUKUL GUPTA</span>
            <br />
            <span className="text-text text-[15px] font-medium">AI Automation Engineer & GenAI Dev</span>
          </h1>
          <p className="mt-2 text-text-muted text-[12px] leading-relaxed">
            <span className="text-accent">&gt;</span> AI agents · MCP servers · automation that ships to production
          </p>

          {/* App grid */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {APPS.map((app, i) => (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => openApp(app.id)}
                className="term-frame aspect-square flex flex-col items-center justify-center gap-2 active:bg-accent/10"
              >
                <span className="text-2xl leading-none">
                  {app.icon === '>_' ? <span className="text-accent text-lg font-bold">&gt;_</span> : app.icon}
                </span>
                <span className="text-[10px] text-text-muted leading-tight px-1 text-center">{app.label}</span>
              </motion.button>
            ))}
          </div>

          <p className="mt-8 text-center text-[10px] text-text-dim tracking-widest uppercase">
            tap mukul.ai to talk to my assistant
          </p>
        </div>
      </div>

      {/* Full-screen app */}
      <AnimatePresence>
        {openId && meta && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="absolute inset-0 z-40 flex flex-col bg-bg"
          >
            <div className="h-12 shrink-0 flex items-center gap-3 px-4 border-b border-line bg-surface-2">
              <button
                onClick={() => { setOpenId(null); setProjectArg(undefined) }}
                className="text-accent text-[13px] font-semibold"
                aria-label="Back to home"
              >
                ← home
              </button>
              <span className="text-[11px] tracking-widest uppercase text-text-muted truncate">
                {meta.title}
              </span>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
              {renderApp(openId)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
