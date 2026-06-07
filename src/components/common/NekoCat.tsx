import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type CatState = 'idle' | 'walking' | 'running' | 'sleeping' | 'awaking'

const SCALE = 4
const WALK_SPEED = 2.5
const RUN_SPEED = 7
const STOP_DIST = 48
const SLEEP_AFTER = 6000

// 0=transparent 1=dark-outline 2=cream-body 3=pink 4=eye-black
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

// idle tail wag variant
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

function getStatusBoxPos() {
  const el = document.getElementById('hero-status')
  if (!el) return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  const r = el.getBoundingClientRect()
  return {
    x: Math.round(r.left + r.width / 2),
    y: Math.round(r.top - 8), // sit just above top edge
  }
}

export default function NekoCat() {
  const initPos = getStatusBoxPos()
  const posRef = useRef(initPos)
  const targetRef = useRef(initPos)
  const stateRef = useRef<CatState>('idle')
  const lastMoveRef = useRef(Date.now())
  const dirXRef = useRef(1)
  const rafRef = useRef(0)
  const lastTickRef = useRef(0)
  const frameIdxRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [pos, setPos] = useState(initPos)
  const [catState, setCatState] = useState<CatState>('idle')
  const [sleeping, setSleeping] = useState(false)

  // Re-snap to status box after hero animates in (delay matches hero animation)
  useEffect(() => {
    const t = setTimeout(() => {
      const p = getStatusBoxPos()
      posRef.current = p
      targetRef.current = p
      setPos(p)
    }, 1000)
    return () => clearTimeout(t)
  }, [])

  // Redraw canvas whenever frame changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const frames = FRAMES[catState]
    const sprite = frames[frameIdxRef.current % frames.length]
    drawSprite(canvas, sprite, dirXRef.current < 0)
  })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      lastMoveRef.current = Date.now()
      if (stateRef.current === 'sleeping') {
        stateRef.current = 'awaking'
        setSleeping(false)
        setTimeout(() => {
          if (stateRef.current === 'awaking') stateRef.current = 'idle'
        }, 900)
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const tick = (time: number) => {
      rafRef.current = requestAnimationFrame(tick)
      const interval = stateRef.current === 'running' ? 80 : 160
      if (time - lastTickRef.current < interval) return
      lastTickRef.current = time

      const p = posRef.current
      const t = targetRef.current
      const dx = t.x - p.x
      const dy = t.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const timedOut = Date.now() - lastMoveRef.current > SLEEP_AFTER

      let next = stateRef.current

      if (next !== 'sleeping' && next !== 'awaking') {
        if (dist < STOP_DIST) {
          next = timedOut ? 'sleeping' : 'idle'
        } else {
          const speed = dist > 160 ? RUN_SPEED : WALK_SPEED
          next = dist > 160 ? 'running' : 'walking'
          p.x += (dx / dist) * speed
          p.y += (dy / dist) * speed
          if (Math.abs(dx) > 1) dirXRef.current = dx > 0 ? 1 : -1
        }
        stateRef.current = next
      }

      frameIdxRef.current++
      setSleeping(next === 'sleeping')
      setCatState(next)
      setPos({ x: p.x, y: p.y })
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
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
