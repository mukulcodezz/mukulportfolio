import { useEffect, useRef, useState } from 'react'
import { projects } from '@/data/projects'
import { skillCategories } from '@/data/skills'
import { experiences } from '@/data/experiences'
import { miniAI } from '@/lib/mini-ai'
import type { AppId } from '../types'

interface Line {
  type: 'cmd' | 'out' | 'err' | 'ok'
  text: string
}

const HELP = `AVAILABLE COMMANDS:
  help              this list
  ls [projects]     list directory / projects
  cat about.txt     who is mukul
  open <project>    open project window (e.g. open gympulse)
  skills            capability readout
  exp               work history
  whoami            current user
  contact           open hire_me window
  resume            download resume.pdf
  ai <question>     ask MUKUL.AI anything
  neofetch          system info
  clear             clear terminal
  exit              close window`

const NEOFETCH = `        ▄▄▄▄▄▄        mukul@portfolio
      ▄█  ▄▄  █▄      ───────────────
     ▄█  ▄██▄  █▄     OS:      MUKUL_OS v2.0
     ██  ▀██▀  ██     Host:    portfolio.web
     ▀█▄  ▀▀  ▄█▀     Kernel:  react 19 + vite 8
      ▀█▄▄▄▄▄▄█▀      Shell:   terminal.tsx
        ▀▀▀▀▀▀        Uptime:  since 2024
                      Role:    AI Automation Engineer
                      Status:  AVAILABLE_FOR_WORK`

const ABOUT_TXT = `Mukul Gupta — AI Automation Engineer & GenAI Developer.
India based, remote-ok. Turns manual business workflows into
AI systems that run themselves: WhatsApp bots, agent workflows,
MCP servers, lead pipelines. Hackathon winner. Ships to
production, not just demos.

Currently: automating ops @ Shalom Tours & Travels.
Open to: full-time AI/automation roles + contract work.
Contact: mukulwork1@gmail.com`

export default function TerminalApp({ openApp }: { openApp: (id: AppId, arg?: string) => void }) {
  const [lines, setLines] = useState<Line[]>([
    { type: 'ok', text: 'MUKUL_OS terminal v2.0 — type `help` to begin' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const print = (newLines: Line[]) => setLines((prev) => [...prev, ...newLines])

  const run = (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return
    print([{ type: 'cmd', text: cmd }])
    setHistory((h) => [cmd, ...h])
    setHistIdx(-1)

    const [head, ...rest] = cmd.toLowerCase().split(/\s+/)
    const arg = rest.join(' ')

    switch (head) {
      case 'help':
        print([{ type: 'out', text: HELP }])
        break
      case 'ls':
        if (arg.startsWith('project')) {
          print(projects.map((p, i) => ({
            type: 'out' as const,
            text: `${String(i + 1).padStart(2, '0')}  ${p.id.padEnd(20)} ${p.tags.slice(0, 3).join(', ')}`,
          })))
          print([{ type: 'ok', text: `→ open <name> to view (e.g. open ${projects[0].id})` }])
        } else {
          print([{ type: 'out', text: 'projects/   about.txt   skills.sys   experience.log   resume.pdf' }])
        }
        break
      case 'cat':
        if (arg.includes('about')) print([{ type: 'out', text: ABOUT_TXT }])
        else print([{ type: 'err', text: `cat: ${arg || 'missing operand'}: no such file` }])
        break
      case 'open': {
        const p = projects.find((x) => x.id.includes(arg) || x.title.toLowerCase().includes(arg))
        if (p) {
          print([{ type: 'ok', text: `[ OK ] launching ${p.title}...` }])
          openApp('projects', p.id)
        } else {
          print([{ type: 'err', text: `open: '${arg}' not found. Try: ${projects.map((x) => x.id).join(', ')}` }])
        }
        break
      }
      case 'skills':
        print(skillCategories.map((c) => ({
          type: 'out' as const,
          text: `${c.title.padEnd(22)} ${c.tags.slice(0, 4).join(', ')}`,
        })))
        break
      case 'exp':
      case 'experience':
        print(experiences.map((e) => ({
          type: 'out' as const,
          text: `${e.duration.padEnd(14)} ${e.role} @ ${e.company}`,
        })))
        break
      case 'whoami':
        print([{ type: 'out', text: 'guest — visitor with hiring privileges' }])
        break
      case 'contact':
      case 'hire':
        print([{ type: 'ok', text: '[ OK ] opening secure channel...' }])
        openApp('contact')
        break
      case 'resume':
        print([{ type: 'ok', text: '[ OK ] downloading resume.pdf...' }])
        window.open('/resume.pdf', '_blank')
        break
      case 'ai': {
        if (!arg) {
          print([{ type: 'err', text: 'usage: ai <question>  — e.g. ai what projects has mukul built?' }])
          break
        }
        const ans = miniAI(arg)
        if (ans) print([{ type: 'out', text: `MUKUL.AI: ${ans}` }])
        else {
          print([{ type: 'ok', text: 'MUKUL.AI: deeper question — opening full chat...' }])
          openApp('ai')
        }
        break
      }
      case 'neofetch':
        print([{ type: 'out', text: NEOFETCH }])
        break
      case 'sudo':
        print([{ type: 'err', text: 'guest is not in the sudoers file. This incident will be reported.' }])
        break
      case 'clear':
        setLines([])
        break
      case 'exit':
        print([{ type: 'out', text: 'use the red button, this shell is immortal' }])
        break
      default:
        print([{ type: 'err', text: `command not found: ${head} — type \`help\`` }])
    }
  }

  return (
    <div
      className="h-full flex flex-col font-mono text-[12.5px] leading-relaxed cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4 space-y-1">
        {lines.map((l, i) => (
          <pre key={i} className={`whitespace-pre-wrap break-words ${
            l.type === 'cmd' ? 'text-text' : l.type === 'err' ? 'text-red' : l.type === 'ok' ? 'text-accent' : 'text-text-muted'
          }`}>
            {l.type === 'cmd' ? <><span className="text-accent">mukul@portfolio</span><span className="text-text-dim">:~$ </span>{l.text}</> : l.text}
          </pre>
        ))}
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); run(input); setInput('') }}
        className="flex items-center gap-2 px-4 py-2.5 border-t border-line-dim shrink-0"
      >
        <span className="text-accent shrink-0">mukul@portfolio<span className="text-text-dim">:~$</span></span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              e.preventDefault()
              const next = Math.min(histIdx + 1, history.length - 1)
              if (history[next]) { setHistIdx(next); setInput(history[next]) }
            } else if (e.key === 'ArrowDown') {
              e.preventDefault()
              const next = histIdx - 1
              setHistIdx(next)
              setInput(next < 0 ? '' : history[next])
            }
          }}
          className="flex-1 bg-transparent text-text focus:outline-none min-w-0"
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
        />
      </form>
    </div>
  )
}
