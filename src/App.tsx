import { lazy, Suspense } from 'react'
import BootSequence from '@/components/terminal/BootSequence'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const Desktop = lazy(() => import('@/os/Desktop'))
const MobileOS = lazy(() => import('@/os/MobileOS'))

function OsSkeleton() {
  return (
    <div className="h-dvh w-screen bg-bg flex items-center justify-center">
      <p className="text-text-dim text-[12px] tracking-widest uppercase">
        mounting filesystem<span className="skeleton-dots" />
      </p>
    </div>
  )
}

export default function App() {
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <div className="bg-bg text-text font-mono">
      <BootSequence />
      <div className="crt-overlay" aria-hidden />
      <Suspense fallback={<OsSkeleton />}>
        {isMobile ? <MobileOS /> : <Desktop />}
      </Suspense>
    </div>
  )
}
