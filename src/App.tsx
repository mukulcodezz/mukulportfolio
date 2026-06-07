import { Github, Linkedin, Mail } from 'lucide-react'
import CustomCursor from '@/components/common/CustomCursor'
import ScrollProgress from '@/components/common/ScrollProgress'
import Navbar from '@/components/navbar/Navbar'
import Hero from '@/components/hero/Hero'
import About from '@/components/about/About'
import Skills from '@/components/skills/Skills'
import Projects from '@/components/projects/Projects'
import Experience from '@/components/experience/Experience'
import GitHubActivity from '@/components/github/GitHubActivity'
import Certifications from '@/components/certifications/Certifications'
import TechStack from '@/components/techstack/TechStack'
import Testimonials from '@/components/testimonials/Testimonials'
import Contact from '@/components/contact/Contact'
import Footer from '@/components/footer/Footer'
import FloatingActionMenu from '@/components/ui/floating-action-menu'

const socialOptions = [
  {
    label: 'GitHub',
    Icon: <Github className="w-4 h-4" />,
    onClick: () => window.open('https://github.com/mukulcodezz', '_blank'),
  },
  {
    label: 'LinkedIn',
    Icon: <Linkedin className="w-4 h-4" />,
    onClick: () => window.open('https://www.linkedin.com/in/mukul-gupta-430724413/', '_blank'),
  },
  {
    label: 'Email',
    Icon: <Mail className="w-4 h-4" />,
    onClick: () => window.location.href = 'mailto:mukulwork1@gmail.com',
  },
]

export default function App() {
  return (
    <div className="bg-bg text-text font-sans overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <TechStack />
        <GitHubActivity />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingActionMenu options={socialOptions} />
    </div>
  )
}
