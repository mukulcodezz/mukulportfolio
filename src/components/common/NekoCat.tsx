import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type CatState = 'idle' | 'walking' | 'running' | 'sleeping' | 'awaking'

const SCALE = 4
const WALK_SPEED = 2.5
const RUN_SPEED = 7
const STOP_DIST = 16
const MIN_TRAVEL_DIST = 80

const PAL: Record<number, string> = {
  1: '#2d2926',
  2: '#f5e0b5',
  3: '#ff8fa3',
  4: '#111111',
}

type Px = number[][]

const IDLE: Px = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,1,2,1,0,0,0,0,1,2,1,0,0,0,0,0],
  [0,1,3,1,1,1,1,1,1,3,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,4,2,2,2,2,4,2,2,1,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,2,2,3,2,2,2,2,2,1,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,1,1,0,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,1,1,0,0],
  [0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

const IDLE2: Px = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,1,2,1,0,0,0,0,1,2,1,0,0,0,0,0],
  [0,1,3,1,1,1,1,1,1,3,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,4,2,2,2,2,4,2,2,1,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,2,2,3,2,2,2,2,2,1,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,0,0,1,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,0,1,0,0,0],
  [0,1,2,2,2,2,2,2,2,1,1,1,0,0,0,0],
  [0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

const WALK1: Px = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,1,2,1,0,0,0,0,1,2,1,0,0,0,0,0],
  [0,1,3,1,1,1,1,1,1,3,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,4,2,2,2,2,4,2,2,1,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,2,2,3,2,2,2,2,2,1,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,1,1,1,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,0,1,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
]

const WALK2: Px = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,1,2,1,0,0,0,0,1,2,1,0,0,0,0,0],
  [0,1,3,1,1,1,1,1,1,3,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,4,2,2,2,2,4,2,2,1,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,2,2,3,2,2,2,2,2,1,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,1,1,1,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,0,1,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

const SLEEP: Px = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,2,2,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [1,3,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [1,2,2,1,1,2,2,2,2,2,2,1,0,0,0,0],
  [1,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [1,2,2,2,2,3,2,2,2,2,2,1,0,0,0,0],
  [0,1,1,1,1,1,1,1,2,2,2,1,0,0,0,0],
  [0,0,0,0,0,0,0,1,2,2,2,1,0,0,0,0],
  [0,0,0,0,0,0,1,2,2,2,2,1,0,0,0,0],
  [0,0,0,0,0,1,2,2,2,2,2,1,0,0,0,0],
  [0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0],
  [0,0,0,1,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

const AWAKE: Px = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,1,2,1,0,0,0,0,1,2,1,0,0,0,0,0],
  [0,1,3,1,1,1,1,1,1,3,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,1,2,1,2,2,1,2,2,2,1,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,2,2,3,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,1,2,2,2,2,2,1,2,1,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,1,1,0,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,1,1,0,0],
  [0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

const FRAMES: Record<CatState, Px[]> = {
  idle: [IDLE, IDLE2],
  walking: [WALK1, WALK2],
  running: [WALK1, WALK2],
  sleeping: [SLEEP],
  awaking: [AWAKE],
}

function drawSprite(canvas: HTMLCanvasElement, sprite: Px, flip: boolean) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, 16, 16)
  sprite.forEach((row, y) => {
    row.forEach((c, x) => {
      if (!c) return
      ctx.fillStyle = PAL[c]
      ctx.fillRect(flip ? 15 - x : x, y, 1, 1)
    })
  })
}

function getViewportSpots(currentPos: { x: number; y: number }): Array<{ x: number; y: number }> {
  const spots: Array<{ x: number; y: number }> = []
  const vh = window.innerHeight
  const vw = window.innerWidth
  const seen = new Set<string>()

  const selectors = [
    'section',
    'nav',
    'header',
    'footer',
    '[id]',
    '[class*="card"]',
    '[class*="Card"]',
    '[class*="panel"]',
    '[class*="box"]',
    '[class*="Box"]',
  ]

  selectors.forEach(sel => {
    try {
      document.querySelectorAll(sel).forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.width < 40 || r.height < 40) return
        if (r.bottom < 0 || r.top > vh) return

        const key = `${Math.round(r.left / 40)},${Math.round(r.top / 40)}`
        if (seen.has(key)) return
        seen.add(key)

        // Sit on top edge
        spots.push({
          x: r.left + r.width * (0.2 + Math.random() * 0.6),
          y: r.top + 4,
        })

        // Sit on bottom edge for tall elements
        if (r.height > 100) {
          spots.push({
            x: r.left + r.width * (0.2 + Math.random() * 0.6),
            y: r.bottom - 4,
          })
        }
      })
    } catch (_) {
      // ignore selector errors
    }
  })

  // Add random viewport spots as fallback wandering
  for (let i = 0; i < 4; i++) {
    spots.push({
      x: vw * (0.08 + Math.random() * 0.84),
      y: vh * (0.1 + Math.random() * 0.8),
    })
  }

  // Filter out spots too close to current position
  const far = spots.filter(s => {
    const dx = s.x - currentPos.x
    const dy = s.y - currentPos.y
    return Math.sqrt(dx * dx + dy * dy) >= MIN_TRAVEL_DIST
  })

  return far.length > 0 ? far : spots
}

export default function NekoCat() {
  const startPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

  const posRef = useRef({ ...startPos })
  const targetRef = useRef({ ...startPos })
  const stateRef = useRef<CatState>('idle')
  const dirXRef = useRef(1)
  const rafRef = useRef(0)
  const lastTickRef = useRef(0)
  const frameIdxRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const behaviorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idleScheduledRef = useRef(false)

  const [pos, setPos] = useState(startPos)
  const [catState, setCatState] = useState<CatState>('idle')
  const [sleeping, setSleeping] = useState(false)

  // Redraw canvas on every render
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const frames = FRAMES[catState]
    const sprite = frames[frameIdxRef.current % frames.length]
    drawSprite(canvas, sprite, dirXRef.current < 0)
  })

  useEffect(() => {
    function pickNext() {
      const spots = getViewportSpots(posRef.current)
      if (spots.length > 0) {
        targetRef.current = spots[Math.floor(Math.random() * spots.length)]
        idleScheduledRef.current = false
      }
    }

    function scheduleBehavior() {
      if (behaviorTimerRef.current) clearTimeout(behaviorTimerRef.current)

      const idleMs = 2000 + Math.random() * 5000
      const shouldSleep = Math.random() < 0.3

      behaviorTimerRef.current = setTimeout(() => {
        if (shouldSleep) {
          stateRef.current = 'sleeping'
          setSleeping(true)

          const sleepMs = 3500 + Math.random() * 6000
          behaviorTimerRef.current = setTimeout(() => {
            stateRef.current = 'awaking'
            setSleeping(false)

            behaviorTimerRef.current = setTimeout(() => {
              pickNext()
              stateRef.current = 'walking'
            }, 900)
          }, sleepMs)
        } else {
          pickNext()
        }
      }, idleMs)
    }

    // Snap to hero status box, then start wandering
    const snapTimer = setTimeout(() => {
      const el = document.getElementById('hero-status')
      if (el) {
        const r = el.getBoundingClientRect()
        const p = { x: Math.round(r.left + r.width / 2), y: Math.round(r.top - 8) }
        posRef.current = p
        targetRef.current = p
        setPos(p)
      }
      scheduleBehavior()
    }, 1500)

    const tick = (time: number) => {
      rafRef.current = requestAnimationFrame(tick)
      const interval = stateRef.current === 'running' ? 80 : 160
      if (time - lastTickRef.current < interval) return
      lastTickRef.current = time

      const state = stateRef.current

      // Sleeping/awaking: just animate, timers handle transitions
      if (state === 'sleeping' || state === 'awaking') {
        frameIdxRef.current++
        setCatState(state)
        return
      }

      const p = posRef.current
      const t = targetRef.current
      const dx = t.x - p.x
      const dy = t.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      let next: CatState

      if (dist < STOP_DIST) {
        next = 'idle'
        stateRef.current = next
        // Schedule behavior only once per stop
        if (!idleScheduledRef.current) {
          idleScheduledRef.current = true
          scheduleBehavior()
        }
      } else {
        idleScheduledRef.current = false
        const speed = dist > 160 ? RUN_SPEED : WALK_SPEED
        next = dist > 160 ? 'running' : 'walking'
        p.x += (dx / dist) * speed
        p.y += (dy / dist) * speed
        if (Math.abs(dx) > 1) dirXRef.current = dx > 0 ? 1 : -1
        stateRef.current = next
      }

      frameIdxRef.current++
      setSleeping(false)
      setCatState(next)
      setPos({ x: p.x, y: p.y })
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(snapTimer)
      if (behaviorTimerRef.current) clearTimeout(behaviorTimerRef.current)
    }
  }, [])

  const size = 16 * SCALE

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x - size / 2,
        top: pos.y - size / 2,
        pointerEvents: 'none',
        zIndex: 9998,
        userSelect: 'none',
      }}
    >
      <AnimatePresence>
        {sleeping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', top: -32, right: -8, fontFamily: 'monospace' }}
          >
            {['z', 'z', 'Z'].map((z, i) => (
              <motion.span
                key={i}
                style={{
                  position: 'absolute',
                  right: i * 7,
                  fontSize: 10 + i * 3,
                  color: `rgba(100,100,100,${0.9 - i * 0.2})`,
                }}
                animate={{ y: [-2, -8, -2], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
              >
                {z}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <canvas
        ref={canvasRef}
        width={16}
        height={16}
        style={{ width: size, height: size, imageRendering: 'pixelated' }}
      />
    </div>
  )
}
