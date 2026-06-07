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

export default function App() {
  return (
    <div className="bg-bg text-text font-sans overflow-x-hidden">
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
    </div>
  )
}
