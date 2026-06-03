import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string

const CONTACT_EMAIL = 'mukulwork1@gmail.com'

// EmailJS is wired only when real keys exist (not the placeholder values in .env).
const emailjsReady = [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY].every(
  (v) => v && !v.startsWith('your_'),
)

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Fallback: no EmailJS keys configured → open user's mail client with a prefilled draft.
    if (!emailjsReady) {
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Contact',
      )}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:    formData.name,
          from_email:   formData.email,
          subject:      formData.subject || 'Portfolio Contact',
          message:      formData.message,
          reply_to:     formData.email,
        },
        PUBLIC_KEY,
      )
      setStatus('sent')
      setTimeout(() => {
        setStatus('idle')
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#7c3aed]/60 focus:ring-1 focus:ring-[#7c3aed]/30 transition-all duration-200"

  return (
    <div className="glass rounded-2xl p-8">
      <h3 className="text-xl font-bold mb-1">Send a Message</h3>
      <p className="text-sm text-white/40 mb-6">I'll respond within 24 hours.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input className={inputClass} placeholder="Your Name" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <input className={inputClass} type="email" placeholder="Your Email" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <input className={inputClass} placeholder="Subject" value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
        <textarea className={`${inputClass} resize-none`} rows={4} placeholder="Your message..."
          value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />

        <button
          type="submit"
          disabled={status === 'sending'}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all
            ${status === 'error'
              ? 'bg-red-500/80 hover:bg-red-500'
              : status === 'sent'
              ? 'bg-emerald-500/80'
              : 'bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:opacity-90'}
            disabled:opacity-60`}
        >
          {status === 'idle'    && <><Send size={16} /> Send Message</>}
          {status === 'sending' && <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>}
          {status === 'sent'    && <><CheckCircle size={16} /> Message Sent!</>}
          {status === 'error'   && <><AlertCircle size={16} /> Failed — Try Again</>}
        </button>
      </form>
    </div>
  )
}
