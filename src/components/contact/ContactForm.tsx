import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string

const CONTACT_EMAIL = 'mukulwork1@gmail.com'

const emailjsReady = [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY].every(
  (v) => v && !v.startsWith('your_'),
)

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
          from_name:  formData.name,
          from_email: formData.email,
          subject:    formData.subject || 'Portfolio Contact',
          message:    formData.message,
          reply_to:   formData.email,
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

  const labelClass = 'text-mono text-[10px] uppercase tracking-[0.16em] text-text-muted mb-1.5'
  const inputClass =
    'w-full bg-surface-2 border border-line rounded-md px-3.5 py-2.5 text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors'

  return (
    <form onSubmit={handleSubmit} className="surface p-7 flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className={labelClass}>Name</span>
          <input
            className={inputClass}
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>
        <label className="flex flex-col">
          <span className={labelClass}>Email</span>
          <input
            className={inputClass}
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </label>
      </div>

      <label className="flex flex-col">
        <span className={labelClass}>Subject</span>
        <input
          className={inputClass}
          placeholder="Role, project, or intro"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        />
      </label>

      <label className="flex flex-col">
        <span className={labelClass}>Message</span>
        <textarea
          className={`${inputClass} resize-none`}
          rows={5}
          placeholder="What are you building?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary justify-center disabled:opacity-60"
      >
        {status === 'idle'    && <><Send size={14} /> Send message</>}
        {status === 'sending' && <><span className="w-3.5 h-3.5 border-2 border-bg/30 border-t-bg rounded-full animate-spin" /> Sending</>}
        {status === 'sent'    && <><CheckCircle size={14} /> Message sent</>}
        {status === 'error'   && <><AlertCircle size={14} /> Failed, try again</>}
      </button>
    </form>
  )
}
