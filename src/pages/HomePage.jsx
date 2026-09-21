import { ArrowUpRight, Download, Mail, X } from 'lucide-react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { experience, profile, skills } from '../data/portfolio.js'
import HeroSection from '../components/sections/HeroSection.jsx'
import HomeAcademicFlow from '../components/sections/HomeAcademicFlow.jsx'

const cvEducation = [
  { period: '2021 — Present', title: 'BSc in Computer Science', institution: 'American International University-Bangladesh' },
  { period: '2018 — 2020', title: 'Higher Secondary Certificate', institution: 'Dhaka City College' },
]

export default function HomePage() {
  const [cvOpen, setCvOpen] = useState(false)

  return (
    <>
      <HeroSection />

      <section className="grid gap-8 border-y border-[var(--border)] bg-[color:var(--panel)] py-12 md:grid-cols-[1.2fr_.8fr] md:py-16">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.09em] text-[var(--accent)]">A little about me</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-.05em] text-[var(--text)] sm:text-4xl">Student developer with a research mindset.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">{profile.about}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/about" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--accent)] hover:text-[var(--accent-2)]">Read my story <ArrowUpRight size={14} /></Link>
            <button type="button" onClick={() => setCvOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[color:var(--panel-strong)] px-4 py-2 text-xs font-bold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">View CV</button>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[color:var(--panel-strong)] p-5 shadow-[0_20px_60px_var(--shadow)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text)]">Current focus</span>
            <span className="font-mono text-[10px] text-emerald-500">2025</span>
          </div>
          <FocusBar label="Academic growth" value="88%" width="88%" />
          <FocusBar label="Product thinking" value="76%" width="76%" />
          <FocusBar label="Research & learning" value="92%" width="92%" />
        </div>
      </section>

      <HomeAcademicFlow />

      <section className="border-b border-[var(--border)] py-8">
        <div className="flex flex-wrap items-center justify-between gap-5 font-mono text-[10px] text-[var(--muted)]">
          <span>Explore the portfolio</span>
          <div className="flex flex-wrap gap-4 font-sans text-xs font-bold text-[var(--muted)] sm:gap-6">
            <Link to="/projects" className="inline-flex items-center gap-1 hover:text-[var(--accent)]">Selected work <ArrowUpRight size={13} /></Link>
            <Link to="/contact" className="inline-flex items-center gap-1 hover:text-[var(--accent)]">Contact <ArrowUpRight size={13} /></Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {cvOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm"
            onClick={() => setCvOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_35px_120px_rgba(15,23,42,0.22)]"
            >
              <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff5a1f]">Curriculum Vitae</p>
                  <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.06em] text-slate-900">{profile.name}</h3>
                </div>

                <button type="button" onClick={() => setCvOpen(false)} className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-[#ff5a1f] hover:text-[#ff5a1f]">
                  <X size={16} />
                </button>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Profile</p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{profile.bio}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Education</p>
                    <div className="mt-3 space-y-3">
                      {cvEducation.map((item) => (
                        <div key={item.period} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#ff5a1f]">{item.period}</span>
                            <span className="rounded-full bg-[#e6ff00]/20 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-700">Study</span>
                          </div>
                          <p className="mt-2 text-base font-bold text-slate-900">{item.title}</p>
                          <p className="text-sm text-slate-600">{item.institution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Contact</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-700">
                      <p>{profile.location}</p>
                      <p>{profile.email}</p>
                      <p>{profile.availability}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Experience</p>
                    <div className="mt-3 space-y-3">
                      {experience.map((item) => (
                        <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#ff5a1f]">{item.period}</p>
                          <p className="mt-2 text-base font-bold text-slate-900">{item.title}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 border-t border-slate-200 pt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Skill stack</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.values(skills).flat().slice(0, 18).map((skill) => (
                    <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
                <a href="/resume.pdf" download className="inline-flex items-center gap-2 rounded-full bg-[#ff5a1f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ef4f17]">
                  <Download size={15} /> Download CV
                </a>
                <button type="button" onClick={() => setCvOpen(false)} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function FocusBar({ label, value, width }) { const ref = useRef(null); const visible = useInView(ref, { once: true, amount: .7 }); return <div ref={ref} className="mt-5"><div className="mb-2 flex justify-between text-[10px] text-slate-500"><span>{label}</span><span>{value}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-200"><motion.i initial={{ width: 0 }} animate={{ width: visible ? width : 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="block h-full rounded-full bg-gradient-to-r from-[#ff5a1f] via-[#ff8a3d] to-[#e6ff00]" /></div></div> }
