import { useEffect, useRef, useState } from 'react'
import { miniAI } from '@/lib/mini-ai'

interface Msg {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME = 'MUKUL.AI v1.0 online. Ask me about projects, skills, experience, or availability.'

const SUGGESTIONS = [
  'What projects has Mukul built?',
  'Is Mukul available for hire?',
  'What is his AI experience?',
]

export default function ChatApp() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  useEffect(() => () => {
    abortRef.current?.abort()
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  const appendToLast = (chunk: string) =>
    setMessages((prev) => {
      const next = [...prev]
      next[next.length - 1] = {
        ...next[next.length - 1],
        content: next[next.length - 1].content + chunk,
      }
      return next
    })

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || streaming) return

    const history: Msg[] = [...messages, { role: 'user', content: trimmed }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setStreaming(true)

    // Local brain first — instant, free, offline
    const local = miniAI(trimmed)
    if (local) {
      let i = 0
      const timer = setInterval(() => {
        i += 3
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: local.slice(0, i) }
          return next
        })
        if (i >= local.length) {
          clearInterval(timer)
          timerRef.current = null
          setStreaming(false)
        }
      }, 16)
      timerRef.current = timer
      return
    }

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.filter((m) => !m.content.startsWith('[ERR]')) }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        appendToLast(
          res.status === 503
            ? '[ERR] Chat service not configured. Email mukulwork1@gmail.com instead.'
            : '[ERR] Connection failed. Try again or email mukulwork1@gmail.com.',
        )
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const segments = buffer.split('\n')
        buffer = segments.pop() ?? ''
        for (const line of segments) {
          const data = line.replace(/^data: /, '').trim()
          if (!data || data === '[DONE]') continue
          try {
            const json = JSON.parse(data)
            const delta = json.choices?.[0]?.delta?.content
            if (delta) appendToLast(delta)
          } catch {
            // partial JSON line — completed on next chunk
          }
        }
      }
    } catch {
      appendToLast('[ERR] Transmission interrupted.')
    } finally {
      setStreaming(false)
      abortRef.current = null
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3.5 text-[13px] leading-relaxed">
        <p className="text-text-muted break-words">
          <span className="text-accent">MUKUL.AI:</span> {WELCOME}
        </p>

        {messages.length === 0 && (
          <div className="space-y-2 pt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="block w-full text-left px-3 py-2 border border-line-dim text-text-muted hover:border-line-strong hover:text-accent transition-colors text-[12px]"
              >
                &gt; {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <p key={i} className={`break-words ${m.role === 'user' ? 'text-text' : 'text-text-muted'}`}>
            <span className={m.role === 'user' ? 'text-cyan' : 'text-accent'}>
              {m.role === 'user' ? '> you:' : 'MUKUL.AI:'}
            </span>{' '}
            {m.content}
            {m.role === 'assistant' && i === messages.length - 1 && streaming && (
              <span className="cursor-blink ml-1" />
            )}
          </p>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(input) }}
        className="flex items-center gap-2 border-t border-line px-3 py-2.5 bg-surface-2 shrink-0"
      >
        <span className="text-accent text-sm shrink-0">&gt;_</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={streaming ? 'awaiting response...' : 'ask about mukul...'}
          disabled={streaming}
          maxLength={500}
          className="flex-1 min-w-0 bg-transparent text-[13px] text-text placeholder-text-dim focus:outline-none disabled:opacity-50"
          aria-label="Chat message"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="text-[11px] uppercase tracking-wider text-accent disabled:text-text-dim transition-colors shrink-0"
        >
          [send]
        </button>
      </form>
    </div>
  )
}
