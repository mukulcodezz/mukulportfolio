import { lazy, Suspense } from 'react'
import ScrollProgress from '@/components/common/ScrollProgress'
import Navbar from '@/components/navbar/Navbar'
import Hero from '@/components/hero/Hero'
import BootSequence from '@/components/terminal/BootSequence'
import TerminalSkeleton from '@/components/terminal/TerminalSkeleton'

// Lazy-load everything below the fold — phone gets Hero fast, rest streams in
const About          = lazy(() => import('@/components/about/About'))
const Projects       = lazy(() => import('@/components/projects/Projects'))
const Experience     = lazy(() => import('@/components/experience/Experience'))
const Showcase       = lazy(() => import('@/components/showcase/Showcase'))
const GitHubActivity = lazy(() => import('@/components/github/GitHubActivity'))
const Testimonials   = lazy(() => import('@/components/testimonials/Testimonials'))
const Contact        = lazy(() => import('@/components/contact/Contact'))
const Footer         = lazy(() => import('@/components/footer/Footer'))
const ChatBot        = lazy(() => import('@/components/chatbot/ChatBot'))

export default function App() {
  return (
    <div className="bg-bg text-text font-mono overflow-x-hidden">
      <BootSequence />
      <div className="crt-overlay" aria-hidden />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<TerminalSkeleton title="cat about.txt" lines={4} />}>
          <About />
        </Suspense>
        <Suspense fallback={<TerminalSkeleton title="ls -la ~/projects" lines={6} />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<TerminalSkeleton title="git log --oneline" lines={4} />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<TerminalSkeleton title="./showcase --interactive" lines={5} />}>
          <Showcase />
        </Suspense>
        <Suspense fallback={<TerminalSkeleton title="git shortlog -sn" lines={3} />}>
          <GitHubActivity />
        </Suspense>
        <Suspense fallback={<TerminalSkeleton title="grep -r feedback" lines={3} />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<TerminalSkeleton title="ssh mukul@hire-me" lines={5} />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  )
}
