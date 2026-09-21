import { motion } from 'framer-motion'
import { ArrowRight, Check, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEducation } from '../../hooks/useEducation.js'

export default function HomeAcademicFlow() {
  const { items } = useEducation()

  return <section className="border-b border-white/10 py-14 md:py-20"><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.1em] text-indigo-300">Academic journey</p><h2 className="mt-3 text-3xl font-extrabold tracking-[-.055em] text-slate-100 sm:text-4xl">Learning in motion.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">A quick view of the milestones shaping my engineering perspective.</p></div><Link to="/academics" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-300 transition hover:text-indigo-200">View full academic record <ArrowRight size={14} /></Link></div><div className="relative overflow-x-auto pb-3"><div className="absolute left-8 right-8 top-[29px] hidden h-px bg-gradient-to-r from-emerald-400/70 via-indigo-400/70 to-slate-700 md:block" /><div className="relative grid min-w-[620px] grid-cols-2 gap-5 md:grid-cols-4">{items.map((item, index) => <AcademicNode item={item} index={index} key={item.id || `${item.institution}-${item.period}`} />)}</div></div></section>
}

function AcademicNode({ item, index }) {
  const isCurrent = Boolean(item.current)
  return <motion.article initial={{ opacity: 0, x: index % 2 ? 22 : -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .3 }} transition={{ delay: index * .1, duration: .5 }} className="group relative"><div className={`relative z-10 grid size-[58px] place-items-center rounded-full border-4 border-[#090d16] shadow-lg transition duration-300 group-hover:scale-110 ${isCurrent ? 'bg-emerald-400 text-[#07110d] shadow-emerald-400/30' : 'bg-slate-800 text-indigo-300 shadow-indigo-500/10'}`}>{isCurrent ? <span className="relative"><GraduationCap size={21} /><i className="absolute -right-2 -top-2 size-2 rounded-full bg-white shadow-[0_0_8px_white]" /></span> : <Check size={19} />}</div><div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition duration-300 group-hover:-translate-y-1 group-hover:border-indigo-400/40"><div className="flex items-center justify-between gap-2"><span className="font-mono text-[9px] text-indigo-300">{item.period}</span><span className={`rounded-full px-2 py-1 text-[9px] ${isCurrent ? 'bg-emerald-400/10 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>{isCurrent ? 'Current' : 'Completed'}</span></div><h3 className="mt-3 text-sm font-bold leading-5 text-slate-100">{item.title}</h3><p className="mt-2 text-[11px] font-semibold text-slate-400">{item.institution}</p><p className="mt-3 line-clamp-2 text-[11px] leading-5 text-slate-500">{item.detail}</p></div></motion.article>
}
