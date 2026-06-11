import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useDragControls } from 'framer-motion'
import type { AppMeta, WinState } from './types'

interface WindowProps {
  meta: AppMeta
  win: WinState
  desktopRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  children: ReactNode
}

export default function Window({ meta, win, desktopRef, onClose, onMinimize, onMaximize, onFocus, children }: WindowProps) {
  const dragControls = useDragControls()
  const constraintsRef = useRef(null)

  const maximized = win.maximized

  return (
    <motion.div
      ref={constraintsRef}
      drag={!maximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={desktopRef}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.92, x: win.pos.x, y: win.pos.y }}
      animate={{
        opacity: win.minimized ? 0 : 1,
        scale: win.minimized ? 0.9 : 1,
        ...(maximized ? { x: 0, y: 0 } : {}),
      }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onPointerDown={onFocus}
      className="absolute term-frame shadow-[0_8px_48px_rgba(0,0,0,0.7),0_0_24px_rgba(0,255,65,0.07)] flex flex-col overflow-hidden"
      style={{
        zIndex: win.z,
        width: maximized ? '100%' : `min(${meta.width}px, calc(100vw - 24px))`,
        height: maximized ? '100%' : `min(${meta.height}px, calc(100vh - 110px))`,
        pointerEvents: win.minimized ? 'none' : 'auto',
        visibility: win.minimized ? 'hidden' : 'visible',
      }}
    >
      {/* Titlebar — drag handle */}
      <div
        onPointerDown={(e) => { if (!maximized) dragControls.start(e) }}
        onDoubleClick={onMaximize}
        className="flex items-center justify-between px-3.5 py-2 border-b border-line bg-surface-2 select-none cursor-grab active:cursor-grabbing shrink-0 touch-none"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); onClose() }}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-3 h-3 rounded-full bg-red/70 hover:bg-red transition-colors"
              aria-label={`Close ${meta.label}`}
            />
            <button
              onClick={(e) => { e.stopPropagation(); onMinimize() }}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-3 h-3 rounded-full bg-amber/70 hover:bg-amber transition-colors"
              aria-label={`Minimize ${meta.label}`}
            />
            <button
              onClick={(e) => { e.stopPropagation(); onMaximize() }}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-3 h-3 rounded-full bg-accent/70 hover:bg-accent transition-colors"
              aria-label={`Maximize ${meta.label}`}
            />
          </div>
          <span className="text-[11px] tracking-widest uppercase text-text-muted truncate">
            {meta.title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-surface">
        {children}
      </div>
    </motion.div>
  )
}
