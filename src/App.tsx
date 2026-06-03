import CustomCursor from '@/components/common/CustomCursor'
import Navbar from '@/components/navbar/Navbar'
import Hero from '@/components/hero/Hero'
import About from '@/components/about/About'
import Skills from '@/components/skills/Skills'
import Projects from '@/components/projects/Projects'
import Experience from '@/components/experience/Experience'
import TechStack from '@/components/techstack/TechStack'
import Testimonials from '@/components/testimonials/Testimonials'
import Contact from '@/components/contact/Contact'
import Footer from '@/components/footer/Footer'

export default function App() {
  return (
    <div className="bg-[#060611] text-white font-sans overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <TechStack />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
