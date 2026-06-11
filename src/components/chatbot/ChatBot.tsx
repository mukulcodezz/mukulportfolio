import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { miniAI } from '@/lib/mini-ai'

interface Msg {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME =
  "MUKUL.AI v1.0 online. Ask me anything about Mukul — projects, skills, experience, availability. Type a question below."

const SUGGESTIONS = [
  'What projects has Mukul built?',
  'Is Mukul available for hire?',
  'What is his AI/automation experience?',
]

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('ai-hint-seen')) return
    const show = setTimeout(() => setHint(true), 4500)
    const hide = setTimeout(() => setHint(false), 12000)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  const dismissHint = () => {
    setHint(false)
    sessionStorage.setItem('ai-hint-seen', '1')
  }
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const localTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => () => {
    abortRef.current?.abort()
    if (localTimerRef.current) clearInterval(localTimerRef.current)
  }, [])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || streaming) return

    const history: Msg[] = [...messages, { role: 'user', content: trimmed }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setStreaming(true)

    const controller = new AbortController()
    abortRef.current = controller

    const appendToLast = (chunk: string) =>
      setMessages((prev) => {
        const next = [...prev]
        next[next.length - 1] = {
          ...next[next.length - 1],
          content: next[next.length - 1].content + chunk,
        }
        return next
      })

    // Local brain first — instant, free, offline. Falls through to Groq if no match.
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
          localTimerRef.current = null
          setStreaming(false)
        }
      }, 16)
      localTimerRef.current = timer
      return
    }

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
            ? '[ERR] Chat service not configured yet. Email mukulwork1@gmail.com instead.'
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
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          const data = line.replace(/^data: /, '').trim()
          if (!data || data === '[DONE]') continue
          try {
            const json = JSON.parse(data)
            const delta = json.choices?.[0]?.delta?.content
            if (delta) appendToLast(delta)
          } catch {
            // partial JSON line — ignored, completed on next chunk
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
    <>
      {/* First-visit hint bubble */}
      <AnimatePresence>
        {hint && !open && (
          <motion.button
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            onClick={() => { dismissHint(); setOpen(true) }}
            className="fixed bottom-6 right-20 z-[150] term-frame px-3.5 py-2 text-[12px] text-text-muted hover:text-accent transition-colors shadow-[0_0_24px_rgba(0,255,65,0.1)]"
          >
            <span className="text-accent">MUKUL.AI:</span> ask me anything about Mukul →
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => { dismissHint(); setOpen(!open) }}
        className="fixed bottom-5 right-5 z-[150] w-13 h-13 px-4 py-3 bg-surface border border-line-strong text-accent text-sm font-semibold hover:bg-accent hover:text-black transition-colors shadow-[0_0_24px_rgba(0,255,65,0.15)]"
        aria-label="Toggle MUKUL.AI chat"
      >
        {open ? '[x]' : '>_'}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-20 right-5 z-[150] w-[min(400px,calc(100vw-2.5rem))] term-frame shadow-[0_0_48px_rgba(0,255,65,0.12)] flex flex-col"
            role="dialog"
            aria-label="MUKUL.AI chat assistant"
          >
            {/* Titlebar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-line bg-surface-2">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <button onClick={() => setOpen(false)} className="w-2.5 h-2.5 rounded-full bg-red/70 hover:bg-red" aria-label="Close chat" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
                </div>
                <span className="text-[11px] tracking-widest uppercase text-text-muted">
                  MUKUL.AI v1.0
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] text-accent uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                online
              </span>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="h-[380px] overflow-y-auto p-4 space-y-4 text-[13px] leading-relaxed">
              <p className="text-text-muted">
                <span className="text-accent">MUKUL.AI:</span> {WELCOME}
              </p>

              {messages.length === 0 && (
                <div className="space-y-2 pt-2">
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
                <p key={i} className={m.role === 'user' ? 'text-text' : 'text-text-muted'}>
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

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-line px-3 py-2.5 bg-surface-2"
            >
              <span className="text-accent text-sm shrink-0">&gt;_</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={streaming ? 'awaiting response...' : 'ask about mukul...'}
                disabled={streaming}
                maxLength={500}
                className="flex-1 bg-transparent text-[13px] text-text placeholder-text-dim focus:outline-none disabled:opacity-50"
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                className="text-[11px] uppercase tracking-wider text-accent disabled:text-text-dim transition-colors"
              >
                [send]
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
