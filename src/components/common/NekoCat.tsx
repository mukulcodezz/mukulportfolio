import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type CatState = 'idle' | 'walking' | 'running' | 'sleeping' | 'awaking' | 'grooming' | 'stretching'

const SCALE = 4
const STOP_DIST = 14
const MIN_TRAVEL_DIST = 80
const MAX_WALK = 3.2
const MAX_RUN = 9
const ACCEL = 0.55
const DECEL_DIST = 55
const FRICTION = 0.80

const PAL: Record<number, string> = {
  1: '#2d2926',
  2: '#f5e0b5',
  3: '#ff8fa3',
  4: '#111111',
}

const FRAME_MS: Record<CatState, number> = {
  idle: 500,
  walking: 140,
  running: 65,
  sleeping: 1000,
  awaking: 200,
  grooming: 280,
  stretching: 550,
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

// Running — tail streaks straight back, legs at max gallop spread
const RUN1: Px = [
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
  [0,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1],
  [0,1,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
]

const RUN2: Px = [
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
  [0,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1],
  [0,1,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
  [0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0],
]

// Grooming — front paw raised to face
const GROOM1: Px = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,1,2,1,0,0,0,0,1,2,1,0,0,0,0,0],
  [0,1,3,1,1,1,1,1,1,3,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,4,2,2,2,2,4,2,2,1,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,2,2,3,2,2,2,2,2,1,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,0,1,1,0,0,0],
  [0,0,1,2,2,2,2,2,2,0,0,1,2,1,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,1,1,0,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,0,1,1,0,0],
  [0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

// Grooming — paw closer to mouth (licking)
const GROOM2: Px = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,1,2,1,0,0,0,0,1,2,1,0,0,0,0,0],
  [0,1,3,1,1,1,1,1,1,3,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,4,2,2,2,2,4,2,2,1,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,1,2,2,2,3,2,2,2,2,2,1,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,0,1,1,0,0,0,0],
  [0,0,1,2,2,2,2,2,0,1,2,1,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,0,0,1,0,0],
  [0,1,2,2,2,2,2,2,2,2,1,0,1,0,0,0],
  [0,1,2,2,2,2,2,2,2,1,1,1,0,0,0,0],
  [0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

// Stretching — front bow, tail up
const STRETCH1: Px = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,1,2,1,0,0,0,1,2,1,0,0,0,0,0],
  [0,0,1,3,1,1,1,1,1,3,1,0,0,0,0,0],
  [0,0,1,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,0,1,2,4,2,2,2,4,2,2,1,0,0,0,0],
  [0,0,1,2,2,2,2,2,2,2,2,1,0,0,0,0],
  [0,0,1,2,2,3,2,2,2,2,2,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,1,2,2,2,2,2,1,0,0,0,0,0],
  [0,0,0,1,2,2,2,2,2,1,0,1,1,0,0,0],
  [0,0,1,2,2,2,2,2,1,0,1,0,0,0,0,0],
  [0,1,2,2,2,2,2,1,0,1,0,0,0,0,0,0],
  [1,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0],
  [1,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

// Stretching — back arch, tail high
const STRETCH2: Px = [
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
  [0,1,2,2,2,2,2,2,2,2,1,0,1,0,0,0],
  [0,1,2,2,2,2,2,2,2,1,0,1,0,0,0,0],
  [0,1,2,2,2,2,2,2,1,0,1,0,0,0,0,0],
  [0,1,1,2,2,2,2,1,0,0,0,0,0,0,0,0],
  [0,0,1,1,2,2,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0],
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
  running: [RUN1, RUN2],
  sleeping: [SLEEP],
  awaking: [AWAKE],
  grooming: [GROOM1, GROOM2],
  stretching: [STRETCH1, STRETCH2],
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

function getViewportSpots(cur: { x: number; y: number }): Array<{ x: number; y: number }> {
  const spots: Array<{ x: number; y: number }> = []
  const vh = window.innerHeight
  const vw = window.innerWidth
  const seen = new Set<string>()
  const sels = ['section','nav','header','footer','[id]','[class*="card"]','[class*="Card"]','[class*="panel"]','[class*="Box"]']

  sels.forEach(sel => {
    try {
      document.querySelectorAll(sel).forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.width < 40 || r.height < 40 || r.bottom < 0 || r.top > vh) return
        const key = `${Math.round(r.left/40)},${Math.round(r.top/40)}`
        if (seen.has(key)) return
        seen.add(key)
        spots.push({ x: r.left + r.width * (0.2 + Math.random() * 0.6), y: r.top + 4 })
        if (r.height > 100) spots.push({ x: r.left + r.width * (0.2 + Math.random() * 0.6), y: r.bottom - 4 })
      })
    } catch (_) {}
  })

  for (let i = 0; i < 4; i++) spots.push({ x: vw * (0.08 + Math.random() * 0.84), y: vh * (0.1 + Math.random() * 0.8) })

  const far = spots.filter(s => {
    const dx = s.x - cur.x; const dy = s.y - cur.y
    return Math.sqrt(dx*dx + dy*dy) >= MIN_TRAVEL_DIST
  })
  return far.length > 0 ? far : spots
}

type DustP = { id: number; x: number; y: number; tx: number; ty: number }
let dustId = 0

export default function NekoCat() {
  const sp = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posRef = useRef({ ...sp })
  const targetRef = useRef({ ...sp })
  const velRef = useRef({ x: 0, y: 0 })
  const stateRef = useRef<CatState>('idle')
  const dirXRef = useRef(1)
  const rafRef = useRef(0)
  const lastTickRef = useRef(0)
  const frameIdxRef = useRef(0)
  const behaviorRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idleScheduledRef = useRef(false)
  const holdRef = useRef(false)
  const travelStartDistRef = useRef(0)

  const [pos, setPos] = useState(sp)
  const [arcY, setArcY] = useState(0)
  const [catState, setCatState] = useState<CatState>('idle')
  const [sleeping, setSleeping] = useState(false)
  const [showHeart, setShowHeart] = useState(false)
  const [dust, setDust] = useState<DustP[]>([])

  // Redraw sprite every render
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const frames = FRAMES[catState]
    const sprite = frames[frameIdxRef.current % frames.length]
    drawSprite(canvas, sprite, dirXRef.current < 0)
  })

  useEffect(() => {
    function spawnDust(x: number, y: number) {
      const size = 16 * SCALE
      const particles: DustP[] = Array.from({ length: 5 }, () => ({
        id: dustId++,
        x: x + size / 2 + (Math.random() - 0.5) * size,
        y: y + size - 4,
        tx: (Math.random() - 0.5) * 28,
        ty: -Math.random() * 18 - 4,
      }))
      setDust(prev => [...prev.slice(-12), ...particles])
      setTimeout(() => setDust(prev => prev.filter(p => !particles.find(np => np.id === p.id))), 700)
    }

    function squash() {
      const el = wrapperRef.current
      if (!el) return
      el.style.transition = 'none'
      el.style.transform = 'scaleX(1.4) scaleY(0.6)'
      requestAnimationFrame(() => {
        if (!el) return
        el.style.transition = 'transform 380ms cubic-bezier(0.34,1.56,0.64,1)'
        el.style.transform = 'scaleX(1) scaleY(1)'
      })
    }

    function flashHeart() {
      setShowHeart(true)
      setTimeout(() => setShowHeart(false), 1400)
    }

    function pickNext() {
      const spots = getViewportSpots(posRef.current)
      if (spots.length > 0) {
        targetRef.current = spots[Math.floor(Math.random() * spots.length)]
        const dx = targetRef.current.x - posRef.current.x
        const dy = targetRef.current.y - posRef.current.y
        travelStartDistRef.current = Math.sqrt(dx*dx + dy*dy)
        idleScheduledRef.current = false
      }
    }

    function scheduleBehavior() {
      if (behaviorRef.current) clearTimeout(behaviorRef.current)
      const roll = Math.random()

      if (roll < 0.3) {
        // Sleep
        stateRef.current = 'sleeping'
        setSleeping(true)
        behaviorRef.current = setTimeout(() => {
          stateRef.current = 'awaking'
          setSleeping(false)
          behaviorRef.current = setTimeout(() => {
            pickNext()
            holdRef.current = true
            stateRef.current = 'stretching'
            behaviorRef.current = setTimeout(() => {
              holdRef.current = false
              stateRef.current = 'idle'
            }, 1200)
          }, 900)
        }, 4000 + Math.random() * 6000)

      } else if (roll < 0.6) {
        // Groom then go
        stateRef.current = 'grooming'
        behaviorRef.current = setTimeout(() => {
          pickNext()
          holdRef.current = true
          stateRef.current = 'stretching'
          behaviorRef.current = setTimeout(() => {
            holdRef.current = false
            stateRef.current = 'idle'
          }, 1200)
        }, 2500 + Math.random() * 2500)

      } else {
        // Idle briefly then stretch then go
        behaviorRef.current = setTimeout(() => {
          pickNext()
          holdRef.current = true
          stateRef.current = 'stretching'
          behaviorRef.current = setTimeout(() => {
            holdRef.current = false
            stateRef.current = 'idle'
          }, 1000)
        }, 1500 + Math.random() * 3500)
      }
    }

    // Snap to hero status, start behavior
    const snapT = setTimeout(() => {
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
      const state = stateRef.current
      const interval = FRAME_MS[state]
      if (time - lastTickRef.current < interval) return
      lastTickRef.current = time

      // States that block movement
      if (state === 'sleeping' || state === 'awaking' || state === 'grooming' || state === 'stretching') {
        frameIdxRef.current++
        setCatState(state)
        setSleeping(state === 'sleeping')
        return
      }

      if (holdRef.current) {
        frameIdxRef.current++
        setCatState(stateRef.current)
        return
      }

      const p = posRef.current
      const t = targetRef.current
      const v = velRef.current
      const dx = t.x - p.x
      const dy = t.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      let next: CatState

      if (dist < STOP_DIST) {
        // Arrived
        v.x *= 0.4
        v.y *= 0.4
        next = 'idle'
        stateRef.current = next

        if (!idleScheduledRef.current) {
          idleScheduledRef.current = true
          squash()
          spawnDust(p.x - (16 * SCALE) / 2, p.y - (16 * SCALE) / 2)
          flashHeart()
          travelStartDistRef.current = 0
          setArcY(0)
          scheduleBehavior()
        }
      } else {
        idleScheduledRef.current = false
        const isRun = dist > 130
        const maxSpeed = isRun ? MAX_RUN : MAX_WALK
        const nx = dx / dist
        const ny = dy / dist

        v.x += nx * ACCEL
        v.y += ny * ACCEL

        const spd = Math.sqrt(v.x * v.x + v.y * v.y)
        if (spd > maxSpeed) { v.x = (v.x / spd) * maxSpeed; v.y = (v.y / spd) * maxSpeed }

        if (dist < DECEL_DIST) {
          const frac = dist / DECEL_DIST
          v.x *= frac * FRICTION + (1 - frac) * 0.5
          v.y *= frac * FRICTION + (1 - frac) * 0.5
        }

        p.x += v.x
        p.y += v.y

        if (Math.abs(v.x) > 0.3) dirXRef.current = v.x > 0 ? 1 : -1

        next = isRun ? 'running' : 'walking'
        stateRef.current = next

        // Arc: sine wave Y offset for long journeys
        if (travelStartDistRef.current > 120) {
          const progress = 1 - Math.min(dist / travelStartDistRef.current, 1)
          const peak = Math.min(travelStartDistRef.current * 0.12, 50)
          setArcY(-Math.sin(progress * Math.PI) * peak)
        }
      }

      frameIdxRef.current++
      setSleeping(false)
      setCatState(next)
      setPos({ x: p.x, y: p.y })
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(snapT)
      if (behaviorRef.current) clearTimeout(behaviorRef.current)
    }
  }, [])

  const size = 16 * SCALE

  return (
    <>
      {/* Dust particles */}
      {dust.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: 3,
            height: 3,
            background: '#c9a97a',
            borderRadius: 0,
            pointerEvents: 'none',
            zIndex: 9997,
            imageRendering: 'pixelated',
          }}
          initial={{ x: 0, y: 0, opacity: 0.85 }}
          animate={{ x: p.tx, y: p.ty, opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        />
      ))}

      {/* Cat */}
      <div
        ref={wrapperRef}
        style={{
          position: 'fixed',
          left: pos.x - size / 2,
          top: pos.y - size / 2 + arcY,
          pointerEvents: 'none',
          zIndex: 9998,
          userSelect: 'none',
          transformOrigin: 'center bottom',
        }}
      >
        {/* Heart on arrival */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -28, scale: 1.3 }}
              exit={{}}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: -18,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 13,
                color: '#ff6b9d',
                pointerEvents: 'none',
                fontFamily: 'sans-serif',
              }}
            >
              ♥
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sleep bubble */}
        <AnimatePresence>
          {sleeping && (
            <motion.div
              initial={{ opacity: 0, scale: 0, originX: '100%', originY: '100%' }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: -46,
                right: -12,
                background: 'rgba(240,236,228,0.95)',
                border: '2px solid #2d2926',
                borderRadius: '10px 10px 10px 2px',
                padding: '3px 7px',
                pointerEvents: 'none',
                display: 'flex',
                gap: 2,
                alignItems: 'flex-end',
              }}
            >
              {(['z','z','Z'] as const).map((z, idx) => (
                <motion.span
                  key={idx}
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: 8 + idx * 2,
                    color: '#2d2926',
                    lineHeight: 1,
                  }}
                  animate={{ y: [-1, -4, -1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.8, delay: idx * 0.35, repeat: Infinity }}
                >
                  {z}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shadow */}
        <div
          style={{
            position: 'absolute',
            bottom: -3,
            left: '50%',
            transform: 'translateX(-50%)',
            width: size * 0.7,
            height: 4,
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        {/* Sprite */}
        <canvas
          ref={canvasRef}
          width={16}
          height={16}
          style={{
            width: size,
            height: size,
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 5px rgba(180,220,160,0.35))',
            display: 'block',
          }}
        />
      </div>
    </>
  )
}
