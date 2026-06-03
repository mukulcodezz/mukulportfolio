import { motion } from 'framer-motion'
import SectionWrapper from '@/components/common/SectionWrapper'
import ContactInfoCards from './ContactInfoCard'
import ContactForm from './ContactForm'
import { fadeUpVariant } from '@/lib/variants'

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[#7c3aed]/8 blur-[120px]" />
      </div>

      <div className="relative">
        <motion.div variants={fadeUpVariant} className="text-center mb-12">
          <span className="section-label justify-center">Get in Touch</span>
          <h2 className="text-4xl font-black tracking-tight mt-2">
            Let's Build Something <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Amazing</span>
          </h2>
          <p className="text-white/50 mt-3 max-w-md mx-auto">
            Have a project in mind? Let's talk about how AI automation can transform your business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div variants={fadeUpVariant}>
            <ContactInfoCards />
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
