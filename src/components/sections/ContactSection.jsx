import { ArrowUpRight, Code2, Globe, Mail } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '../../data/portfolio.js'

const HISTORY_KEY = 'faruk-portfolio-contact-history'

export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'))

  useEffect(() => localStorage.setItem(HISTORY_KEY, JSON.stringify(history)), [history])

  async function handleSubmit(event) {
    event.preventDefault()
    setSending(true)
    setError('')
    const form = event.currentTarget
    const details = Object.fromEntries(new FormData(form))
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(details) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Message could not be sent.')
      setHistory((items) => [{ ...details, id: result.message.id, created_at: result.message.created_at }, ...items].slice(0, 20))
      form.reset()
      setSent(true)
      window.setTimeout(() => setSent(false), 3200)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSending(false)
    }
  }

  return <section id="contact" className="relative grid gap-12 py-24 md:py-36 lg:grid-cols-[.95fr_1.05fr] lg:gap-24"><div><p className="font-mono text-[10px] uppercase tracking-[.09em] text-indigo-300">06 / Get in touch</p><h2 className="mt-4 text-5xl font-extrabold leading-tight tracking-[-.075em] text-slate-100 sm:text-6xl">Have a good problem?<br /><span className="text-indigo-400">Let&apos;s talk about it.</span></h2><p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">I am always interested in thoughtful collaborations, ambitious ideas and conversations about technology.</p><div className="mt-8 flex flex-wrap gap-5 text-[11px] text-slate-400"><a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-indigo-300"><Mail size={17} /> Email</a><a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-indigo-300"><Code2 size={17} /> GitHub</a><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-indigo-300"><Globe size={17} /> LinkedIn</a></div></div><div><form className="flex flex-col gap-5 rounded-xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7" onSubmit={handleSubmit}><Field name="name" label="Name" placeholder="Your name" required /><Field name="email" label="Email" type="email" placeholder="you@example.com" required /><Field name="subject" label="Subject" placeholder="What is on your mind?" required /><label className="flex flex-col gap-2 text-[10px] text-slate-500"><span>Message</span><textarea name="message" className="resize-y border-0 border-b border-slate-700 bg-transparent py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-indigo-400" rows="4" placeholder="Tell me a little about your idea..." required /></label>{error && <p className="text-xs text-red-300">{error}</p>}<button className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send message'} <ArrowUpRight size={16} /></button></form>{history.length > 0 && <div className="mt-6 rounded-xl border border-slate-800 p-5"><h3 className="text-sm font-bold text-slate-200">Your sent messages</h3><div className="mt-4 space-y-3">{history.map((item) => <details key={item.id || item.created_at} className="border-b border-slate-800 pb-3 text-xs text-slate-400"><summary className="cursor-pointer text-slate-300">{item.subject} <span className="float-right text-slate-500">{new Date(item.created_at).toLocaleString()}</span></summary><p className="mt-3 whitespace-pre-wrap leading-5">{item.message}</p></details>)}</div></div>}</div><AnimatePresence>{sent && <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-6 right-6 z-50 rounded-xl border border-emerald-400/30 bg-slate-900/90 px-4 py-3 text-xs text-emerald-300 shadow-2xl backdrop-blur">Message sent successfully.</motion.div>}</AnimatePresence></section>
}

function Field({ name, label, type = 'text', placeholder, required }) { return <label className="flex flex-col gap-2 text-[10px] text-slate-500"><span>{label}</span><input name={name} className="border-0 border-b border-slate-700 bg-transparent py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-[#b6f36b]" type={type} placeholder={placeholder} required={required} /></label> }
