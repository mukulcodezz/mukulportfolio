import { useEffect, useRef, useState } from 'react'

type CatState = 'idle' | 'walking' | 'running' | 'sleeping' | 'awaking'

const WALK_SPEED = 2.5
const RUN_SPEED = 7
const STOP_DIST = 48
const SLEEP_AFTER = 6000

function CatSVG({ state, frame, flip }: { state: CatState; frame: number; flip: boolean }) {
  const isMoving = state === 'walking' || state === 'running'
  const isSleeping = state === 'sleeping'
  const isAwaking = state === 'awaking'

  const legOffset = isMoving ? (frame % 2 === 0 ? 2.5 : -2.5) : 0
  const tailSwing = isMoving ? [0, 5, 0, -5][frame % 4] : isSleeping ? 5 : 0

  return (
    <svg
      width="52" height="52"
      viewBox="-6 -6 56 56"
      style={{ transform: flip ? 'scaleX(-1)' : undefined, overflow: 'visible' }}
    >
      {isSleeping ? (
        <>
          {/* curled body */}
          <ellipse cx="22" cy="32" rx="16" ry="9" fill="#f0ede8" stroke="#444" strokeWidth="1.2" />
          {/* head tucked */}
          <circle cx="11" cy="25" r="10" fill="#f0ede8" stroke="#444" strokeWidth="1.2" />
          {/* ears */}
          <polygon points="4,18 2,10 11,16" fill="#f0ede8" stroke="#444" strokeWidth="1" />
          <polygon points="5,17 3,11 10,16" fill="#ffb6c1" />
          <polygon points="14,17 13,9 20,15" fill="#f0ede8" stroke="#444" strokeWidth="1" />
          <polygon points="14,16 13,10 19,15" fill="#ffb6c1" />
          {/* closed eyes */}
          <line x1="6" y1="25" x2="10" y2="25" stroke="#444" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="12" y1="25" x2="16" y2="25" stroke="#444" strokeWidth="1.4" strokeLinecap="round" />
          {/* whiskers */}
          <line x1="1" y1="24" x2="8" y2="25" stroke="#bbb" strokeWidth="0.8" />
          <line x1="1" y1="26" x2="8" y2="26.5" stroke="#bbb" strokeWidth="0.8" />
          <line x1="14" y1="25" x2="20" y2="24" stroke="#bbb" strokeWidth="0.8" />
          <line x1="14" y1="26.5" x2="20" y2="26" stroke="#bbb" strokeWidth="0.8" />
          {/* tail curled around */}
          <path d="M35,28 Q46,20 42,15" stroke="#444" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          {/* ZZZ */}
          <text x="38" y="18" fontSize="7" fill="#999" fontFamily="Georgia, serif" fontStyle="italic">z</text>
          <text x="43" y="11" fontSize="9" fill="#888" fontFamily="Georgia, serif" fontStyle="italic">z</text>
          <text x="48" y="3" fontSize="11" fill="#777" fontFamily="Georgia, serif" fontStyle="italic">Z</text>
        </>
      ) : (
        <>
          {/* body — lean forward when running */}
          <ellipse
            cx={state === 'running' ? 23 : 22}
            cy="30"
            rx={state === 'running' ? 13 : 11}
            ry="8"
            fill="#f0ede8" stroke="#444" strokeWidth="1.2"
          />
          {/* head */}
          <circle cx="22" cy="17" r="10" fill="#f0ede8" stroke="#444" strokeWidth="1.2" />
          {/* left ear */}
          <polygon points="13,10 10,2 18,8" fill="#f0ede8" stroke="#444" strokeWidth="1" />
          <polygon points="13,9 11,4 17,8" fill="#ffb6c1" />
          {/* right ear */}
          <polygon points="31,10 34,2 26,8" fill="#f0ede8" stroke="#444" strokeWidth="1" />
          <polygon points="31,9 33,4 27,8" fill="#ffb6c1" />
          {/* eyes */}
          {isAwaking ? (
            <>
              <line x1="16" y1="17" x2="20" y2="17" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="24" y1="17" x2="28" y2="17" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="17" cy="17" r="2.2" fill="#222" />
              <circle cx="27" cy="17" r="2.2" fill="#222" />
              <circle cx="17.7" cy="16.2" r="0.7" fill="white" />
              <circle cx="27.7" cy="16.2" r="0.7" fill="white" />
            </>
          )}
          {/* nose */}
          <polygon points="22,20 20.5,21.5 23.5,21.5" fill="#ffb6c1" />
          {/* mouth */}
          <path d="M20.5,21.5 Q22,23 23.5,21.5" stroke="#444" strokeWidth="0.9" fill="none" />
          {/* whiskers */}
          <line x1="9" y1="19" x2="19" y2="20" stroke="#bbb" strokeWidth="0.8" />
          <line x1="9" y1="21" x2="19" y2="21.5" stroke="#bbb" strokeWidth="0.8" />
          <line x1="25" y1="20" x2="35" y2="19" stroke="#bbb" strokeWidth="0.8" />
          <line x1="25" y1="21.5" x2="35" y2="21" stroke="#bbb" strokeWidth="0.8" />
          {/* tail */}
          <path
            d={`M30,33 Q${40 + tailSwing * 0.5},${28 + tailSwing} ${36 + tailSwing},${19 + tailSwing * 0.8}`}
            stroke="#444" strokeWidth="2.8" fill="none" strokeLinecap="round"
          />
          {/* front legs */}
          <rect x="15" y="35" width="4" height={Math.max(4, 7 + legOffset)} rx="2" fill="#f0ede8" stroke="#444" strokeWidth="1" />
          <rect x="25" y="35" width="4" height={Math.max(4, 7 - legOffset)} rx="2" fill="#f0ede8" stroke="#444" strokeWidth="1" />
          {/* back legs */}
          <rect x="11" y="34" width="4" height={Math.max(4, 6 - legOffset)} rx="2" fill="#f0ede8" stroke="#444" strokeWidth="1" />
          <rect x="29" y="34" width="4" height={Math.max(4, 6 + legOffset)} rx="2" fill="#f0ede8" stroke="#444" strokeWidth="1" />
        </>
      )}
    </svg>
  )
}

export default function NekoCat() {
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight - 100 })
  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight - 100 })
  const stateRef = useRef<CatState>('idle')
  const lastMoveRef = useRef(Date.now())
  const dirXRef = useRef(1)
  const rafRef = useRef(0)
  const lastTickRef = useRef(0)
  const frameCountRef = useRef(0)

  const [render, setRender] = useState<{
    x: number; y: number; state: CatState; frame: number; flip: boolean
  }>({
    x: window.innerWidth / 2,
    y: window.innerHeight - 100,
    state: 'idle',
    frame: 0,
    flip: false,
  })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      lastMoveRef.current = Date.now()
      if (stateRef.current === 'sleeping') {
        stateRef.current = 'awaking'
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
      if (time - lastTickRef.current < 110) return
      lastTickRef.current = time

      const pos = posRef.current
      const target = targetRef.current
      const dx = target.x - pos.x
      const dy = target.y - pos.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const timedOut = Date.now() - lastMoveRef.current > SLEEP_AFTER

      let next = stateRef.current

      if (next !== 'sleeping' && next !== 'awaking') {
        if (dist < STOP_DIST) {
          next = timedOut ? 'sleeping' : 'idle'
        } else {
          const speed = dist > 160 ? RUN_SPEED : WALK_SPEED
          next = dist > 160 ? 'running' : 'walking'
          pos.x += (dx / dist) * speed
          pos.y += (dy / dist) * speed
          if (Math.abs(dx) > 1) dirXRef.current = dx > 0 ? 1 : -1
        }
        stateRef.current = next
      }

      frameCountRef.current = (frameCountRef.current + 1) % 4
      setRender({ x: pos.x, y: pos.y, state: next, frame: frameCountRef.current, flip: dirXRef.current < 0 })
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        left: render.x - 26,
        top: render.y - 26,
        pointerEvents: 'none',
        zIndex: 9998,
        userSelect: 'none',
      }}
    >
      <CatSVG state={render.state} frame={render.frame} flip={render.flip} />
    </div>
  )
}
