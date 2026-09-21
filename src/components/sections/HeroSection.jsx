import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, Camera, Sparkles } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../../data/portfolio.js'
import { useAssetPreview } from '../../hooks/useAssetPreview.js'

const metrics = [
  { label: 'Projects', value: '08+' },
  { label: 'Academic focus', value: 'CS' },
  { label: 'Portfolio', value: 'Student' },
]

export default function HeroSection() {
  const photo = useAssetPreview('photo')
  const signature = useAssetPreview('signature')
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 70, damping: 18 })
  const springY = useSpring(pointerY, { stiffness: 70, damping: 18 })
  const pointerLeft = useMotionValue('50%')
  const pointerTop = useMotionValue('50%')

  useEffect(() => {
    const handlePointer = (event) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 28)
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 28)
      pointerLeft.set(`${(event.clientX / window.innerWidth) * 100}%`)
      pointerTop.set(`${(event.clientY / window.innerHeight) * 100}%`)
    }

    window.addEventListener('pointermove', handlePointer, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointer)
  }, [pointerX, pointerY, pointerLeft, pointerTop])

  return (
    <section className="relative isolate overflow-hidden bg-[var(--bg)] pb-16 pt-8 text-[var(--text)] sm:pt-14" id="top">
      <div className="absolute inset-x-0 bottom-[-18%] h-[55vh] min-h-[420px] overflow-hidden">
        <motion.div
          style={{ x: springX, y: springY, left: pointerLeft, top: pointerTop }}
          className="absolute left-1/2 top-[35%] h-[540px] w-[1500px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_center,_rgba(255,122,47,0.7)_0%,_rgba(255,122,47,0.45)_18%,_rgba(255,122,47,0.15)_28%,_rgba(0,0,0,0)_72%)] blur-[10px]"
        />
        <div className="absolute inset-x-0 bottom-[-22%] h-[360px] bg-[radial-gradient(circle_at_center,_rgba(255,122,47,0.42)_0%,_rgba(255,122,47,0.16)_24%,_rgba(0,0,0,0)_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-xl pb-12 lg:pb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)] backdrop-blur-sm">
              <span className="inline-flex size-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(255,122,47,0.9)]" />
              Computer Science Student
            </div>

            <h1 className="text-5xl font-extrabold leading-[0.88] tracking-[-0.08em] text-[var(--text)] sm:text-6xl lg:text-[7rem]">
              {profile.name.split(' ')[0]}<br />{profile.name.split(' ').slice(1).join(' ')}
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-[var(--muted)]">
              I’m a student developer building software, interfaces, and practical ideas with curiosity, discipline, and care for real users.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-button)] px-5 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(248,217,122,0.32)] transition hover:-translate-y-0.5 hover:brightness-110">
                About me
                <ArrowUpRight size={16} />
              </Link>

              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-[11px] font-medium text-[var(--muted)] backdrop-blur-sm">
                <span className="inline-flex size-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.75)]" />
                Available for internships
              </div>
            </div>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
              {metrics.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-3 py-3 text-center">
                  <div className="text-xl font-extrabold tracking-[-0.06em] text-[var(--text)]">{item.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative z-10 pb-10 lg:pb-16">
            <div className="glass-panel relative mx-auto max-w-[620px] rounded-[28px] p-4 shadow-[0_40px_120px_rgba(255,122,47,0.12)]">
              <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-black/20 px-4 py-3 text-[11px] text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <span className="flex gap-1.5">
                    <i className="block size-2 rounded-full bg-white/60" />
                    <i className="block size-2 rounded-full bg-white/30" />
                    <i className="block size-2 rounded-full bg-white/20" />
                  </span>
                  <span className="ml-2 font-medium text-[var(--muted-strong)]">Student Portfolio Dashboard</span>
                </div>
                <span className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--text)]">
                  Live
                </span>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="rounded-[22px] border border-[var(--border)] bg-[var(--panel)] p-4">
                  <div className="flex items-center justify-between pb-3 text-[10px] text-[var(--muted)]">
                    <span>Profile snapshot</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-emerald-500">Open</span>
                  </div>

                  <div className="relative mx-auto flex max-w-[220px] justify-center">
                    <div className="relative grid size-44 place-items-center overflow-hidden rounded-full border border-[var(--border)] bg-[radial-gradient(circle_at_top,_rgba(255,122,47,0.22),_rgba(255,255,255,0.02)_60%)] shadow-[0_20px_50px_rgba(15,23,42,0.17)]">
                      {photo.loading || photo.preview === '__loading__' ? (
                        <div className="relative flex size-full items-center justify-center bg-[var(--accent-soft)]">
                          <span className="absolute size-32 animate-spin rounded-full border-2 border-[var(--accent)]/20 border-t-[var(--accent)]" />
                          <span className="absolute size-24 animate-pulse rounded-full border border-[var(--accent-2)]/50" />
                          <span className="size-3 animate-pulse rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]" />
                        </div>
                      ) : photo.preview ? (
                        <img src={photo.preview} alt={profile.name} className="size-full object-cover" />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-[linear-gradient(135deg,#f8d97a_0%,#ffb36b_45%,#ff7a2f_100%)] text-5xl font-bold text-slate-900">
                          {profile.initials}
                        </div>
                      )}
                    </div>
                    <span className="absolute -bottom-2 right-2 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 text-[10px] font-medium text-[var(--text)] backdrop-blur-sm">
                      <Camera size={12} className="text-[var(--accent)]" />
                      Student profile
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl border border-[var(--border)] bg-black/10 px-3 py-3">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">Signature</div>
                    {signature.preview && signature.preview !== '__loading__' ? (
                      <img src={signature.preview} alt="Signature" className="mx-auto mt-2 block max-h-12 max-w-full object-contain opacity-90" />
                    ) : (
                      <div className="mt-2 font-mono text-[11px] tracking-[0.24em] text-[var(--muted-strong)]">FAS</div>
                    )}
                  </div>
                </div>

                <div className="rounded-[22px] border border-[var(--border)] bg-[var(--panel)] p-4">
                  <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
                    <span>Portfolio status</span>
                    <span className="rounded-full bg-[#ff7a2f]/10 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-[var(--accent)]">Student</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      ['Academic profile', 'Ready'],
                      ['Projects', 'Curated'],
                      ['Experience', 'Growing'],
                    ].map(([label, state], index) => (
                      <div key={label} className="rounded-2xl border border-[var(--border)] bg-black/10 px-3 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[12px] text-[var(--text)]">{label}</span>
                          <span className={`rounded-full px-2 py-1 text-[9px] font-medium uppercase tracking-[0.12em] ${index === 0 ? 'bg-emerald-500/10 text-emerald-500' : index === 1 ? 'bg-amber-500/10 text-amber-500' : 'bg-sky-500/10 text-sky-500'}`}>
                            {state}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[linear-gradient(135deg,rgba(255,122,47,0.12),rgba(255,255,255,0.04))] p-3">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">Focus</div>
                    <div className="mt-3 text-sm leading-6 text-[var(--text)]">Web development, product thinking, research, and software engineering fundamentals.</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
