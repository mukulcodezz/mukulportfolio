import { motion } from 'framer-motion'
import SectionWrapper from '@/components/common/SectionWrapper'
import ContactInfoCards from './ContactInfoCard'
import ContactForm from './ContactForm'
import { fadeUpVariant } from '@/lib/variants'

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[640px] h-[640px] rounded-full bg-accent/5 blur-[160px]" />
      </div>

      <div className="relative grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
        <motion.div variants={fadeUpVariant} className="flex flex-col gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-text">
              Let&rsquo;s work together.
            </h2>
            <p className="text-text-muted mt-4 leading-relaxed max-w-[45ch]">
              Hiring for an AI / automation role, or have a build in mind?
              Drop a line. I reply within 24 hours.
            </p>
          </div>
          <ContactInfoCards />
        </motion.div>

        <motion.div variants={fadeUpVariant}>
          <ContactForm />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
