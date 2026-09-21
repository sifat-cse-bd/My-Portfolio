import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Clock3, Layers3, Sparkles } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const tabs = [
  { label: 'To do', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30' },
  { label: 'In Progress', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' },
  { label: 'Approved', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' }
]

const partnerLogos = ['Vercel', 'Grab', 'Apple', 'X', 'Notion']

export default function HeroSection() {
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
    <section className="relative isolate overflow-hidden bg-black pb-16 pt-24 text-white sm:pt-28" id="top">
      <div className="absolute inset-x-0 bottom-[-22%] h-[58vh] min-h-[420px] overflow-hidden">
        <motion.div
          style={{ x: springX, y: springY, left: pointerLeft, top: pointerTop }}
          className="absolute left-1/2 top-[25%] h-[540px] w-[1600px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_center,_rgba(255,120,0,0.95)_0%,_rgba(255,85,0,0.82)_16%,_rgba(255,170,0,0.72)_28%,_rgba(0,0,0,0)_72%)] blur-[10px]"
        />
        <div className="absolute inset-x-0 bottom-[-20%] h-[340px] bg-[radial-gradient(circle_at_center,_rgba(255,120,0,0.55)_0%,_rgba(255,85,0,0.3)_25%,_rgba(0,0,0,0)_75%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-xl pb-12 lg:pb-16">
            <h1 className="text-5xl font-extrabold leading-[0.9] tracking-[-0.07em] text-white sm:text-6xl lg:text-[6.3rem]">
              Design by <br className="hidden sm:block" /> Drag &amp; Drop
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
              Design subscriptions for every brand. Pause or cancel anytime.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-[#e6ff00] px-5 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(230,255,0,0.4)] transition hover:-translate-y-0.5 hover:bg-[#f2ff4d]">
                See Plan
                <ArrowRight size={16} />
              </Link>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-medium text-slate-200 backdrop-blur-sm">
                <span className="inline-flex size-2.5 rounded-full bg-[#e6ff00] shadow-[0_0_12px_rgba(230,255,0,0.8)]" />
                <span>2 spots left</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative z-10 pb-20 lg:pb-28">
            <div className="glass-panel relative mx-auto max-w-[560px] rounded-[28px] p-4 shadow-[0_40px_120px_rgba(255,85,0,0.18)]">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="flex gap-1.5">
                    <i className="block size-2 rounded-full bg-white/60" />
                    <i className="block size-2 rounded-full bg-white/30" />
                    <i className="block size-2 rounded-full bg-white/20" />
                  </span>
                  <span className="ml-2 font-medium">DesignLab Dashboard</span>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                  Live
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2">
                {tabs.map((tab) => (
                  <span key={tab.label} className={`rounded-lg border px-3 py-2 text-[10px] font-medium ${tab.color}`}>
                    {tab.label}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 sm:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span>Brand Identity</span>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[9px] text-emerald-300">Approved</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {['Logo', 'Landing page', 'Brand guidelines'].map((item) => (
                      <div key={item} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                        <div className="flex items-center gap-2 text-[11px] text-slate-300">
                          <span className="grid size-6 place-items-center rounded-md bg-[#e6ff00]/15 text-[#e6ff00]">
                            <Layers3 size={12} />
                          </span>
                          {item}
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.14em] text-slate-500">Ready</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span>Progress</span>
                    <span className="text-[#e6ff00]">68%</span>
                  </div>
                  <div className="mt-4 h-32 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,85,0,0.78),rgba(255,120,0,0.18)_28%,rgba(0,0,0,0)_58%)] p-3">
                    <div className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-black/40 p-3">
                      <div className="flex items-center justify-between text-[10px] text-slate-300">
                        <span>VIP Build</span>
                        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-[9px] text-cyan-300">In Progress</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/10">
                        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#ff5500] via-[#ff8800] to-[#e6ff00]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 mt-10 flex flex-col items-center gap-5 border-t border-white/10 pt-8 text-slate-400 sm:flex-row sm:justify-center sm:gap-10">
          <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Trusted by</span>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-500 sm:gap-10">
            {partnerLogos.map((logo) => (
              <span key={logo} className="inline-flex items-center gap-2">
                {logo === 'X' ? <span className="text-lg text-white">X</span> : logo === 'Apple' ? <span className="text-lg text-white"></span> : <span className="text-base text-white">{logo[0]}</span>}
                {logo}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-slate-300">
            <Sparkles size={14} className="text-[#e6ff00]" />
            How it works
          </div>
          <h2 className="text-3xl font-bold tracking-[-0.05em] text-white sm:text-5xl">How to get started</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
            Conventional design has been shown the door; the design you crave has just made its appearance.
          </p>
          <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#e6ff00] px-5 py-3 text-sm font-semibold text-black shadow-[0_0_28px_rgba(230,255,0,0.32)] transition hover:-translate-y-0.5 hover:bg-[#f2ff4d]">
            See Plan
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
