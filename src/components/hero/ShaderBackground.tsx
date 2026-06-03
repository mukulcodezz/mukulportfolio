import { useEffect, useRef } from 'react'

export default function ShaderBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamically import to avoid SSR issues
    let cleanup: (() => void) | undefined

    const loadShader = async () => {
      try {
        const { ShaderGradient, ShaderGradientCanvas } = await import('@shadergradient/react')
        const { createRoot } = await import('react-dom/client')
        const { createElement } = await import('react')

        if (!mountRef.current) return

        const root = createRoot(mountRef.current)
        root.render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          createElement(ShaderGradientCanvas as any, { style: { width: '100%', height: '100%' } },
            createElement(ShaderGradient, {
              type: 'waterPlane',
              animate: 'on',
              uSpeed: 0.1,
              uStrength: 2,
              uDensity: 1.2,
              color1: '#7c3aed',
              color2: '#06b6d4',
              color3: '#060611',
              cameraZoom: 9,
              cAzimuthAngle: 180,
              cPolarAngle: 80,
            })
          )
        )
        cleanup = () => root.unmount()
      } catch (e) {
        // Shader gradient failed to load, use CSS fallback
        if (mountRef.current) {
          mountRef.current.style.background = 'radial-gradient(ellipse at top right, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(6,182,212,0.1) 0%, transparent 60%)'
        }
      }
    }

    loadShader()
    return () => { if (cleanup) cleanup() }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 opacity-[0.18] pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
