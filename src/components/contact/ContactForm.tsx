import { useState } from 'react'
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

  const labelClass = 'text-[10px] uppercase tracking-[0.18em] text-text-dim mb-1.5'
  const inputClass =
    'w-full bg-bg border border-line-dim px-3.5 py-2.5 text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent/60 transition-colors font-mono'

  const buttonLabel = {
    idle:    '$ ./send_message.sh',
    sending: '$ transmitting...',
    sent:    '[ OK ] message delivered',
    error:   '[ ERR ] transmission failed — retry',
  }[status]

  return (
    <div>
      <p className="text-[10px] text-text-dim uppercase tracking-[0.18em] mb-3 pt-2 border-t border-line-dim">
        # new_message.form {emailjsReady ? '[SMTP READY]' : '[MAILTO MODE]'}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className={labelClass}>&gt; from.name</span>
            <input
              className={inputClass}
              placeholder="your_name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </label>
          <label className="flex flex-col">
            <span className={labelClass}>&gt; from.email</span>
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
          <span className={labelClass}>&gt; subject</span>
          <input
            className={inputClass}
            placeholder="role | project | intro"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span className={labelClass}>&gt; payload</span>
          <textarea
            className={`${inputClass} resize-none`}
            rows={5}
            placeholder="what are you building?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </label>

        <button
          type="submit"
          disabled={status === 'sending'}
          className={`btn-term justify-center disabled:opacity-60 ${
            status === 'error' ? '!border-red !bg-red/10 !text-red' : ''
          } ${status === 'sent' ? '!bg-transparent !text-accent' : ''}`}
        >
          {buttonLabel}
          {status === 'sending' && <span className="cursor-blink" />}
        </button>
      </form>
    </div>
  )
}
