import { ArrowUpRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useState } from 'react'
import { useRef } from 'react'
import { skills } from '../../data/portfolio.js'
import SectionHeading from '../ui/SectionHeading.jsx'

const groupDescriptions = {
  Languages: 'The languages I use to reason about problems, build features, and move from idea to implementation.',
  'Frontend & UI': 'Tools for creating responsive interfaces that feel clear, fast, and intentional.',
  'Backend & APIs': 'Server-side foundations for dependable data flows, authentication, and integrations.',
  'Databases & Cloud': 'Storage and platform tools that help applications stay useful beyond the local machine.',
  'Mobile Development': 'A growing mobile toolkit focused on native Android experiences and maintainable architecture.',
  'Tools & Hardware': 'The practical tools I use for prototyping, collaboration, and connected systems.',
  'DevOps & Deployment': 'Delivery tools for shipping, automating, and maintaining projects with confidence.',
  'Professional Skills': 'The habits that help me communicate clearly, learn quickly, and work well with others.',
}

const groupTones = {
  Languages: { label: 'text-amber-400', bar: 'from-amber-600 via-orange-500 to-yellow-300', glow: 'rgba(245,158,11,0.3)' },
  'Frontend & UI': { label: 'text-sky-400', bar: 'from-blue-700 via-sky-500 to-cyan-300', glow: 'rgba(14,165,233,0.3)' },
  'Backend & APIs': { label: 'text-indigo-400', bar: 'from-indigo-700 via-indigo-500 to-violet-300', glow: 'rgba(99,102,241,0.3)' },
  'Databases & Cloud': { label: 'text-emerald-400', bar: 'from-emerald-700 via-green-500 to-lime-300', glow: 'rgba(34,197,94,0.3)' },
  'Mobile Development': { label: 'text-orange-400', bar: 'from-orange-700 via-orange-500 to-amber-300', glow: 'rgba(249,115,22,0.3)' },
  'Tools & Hardware': { label: 'text-cyan-400', bar: 'from-cyan-700 via-teal-500 to-emerald-300', glow: 'rgba(20,184,166,0.3)' },
  'DevOps & Deployment': { label: 'text-violet-400', bar: 'from-violet-700 via-purple-500 to-fuchsia-300', glow: 'rgba(139,92,246,0.3)' },
  'Professional Skills': { label: 'text-rose-400', bar: 'from-rose-700 via-red-500 to-orange-300', glow: 'rgba(244,63,94,0.3)' },
}

export default function SkillsSection() {
  const [active, setActive] = useState(Object.keys(skills)[0])
  return <section id="skills" className="border-b border-white/10 py-24 md:py-36"><SectionHeading kicker="03 / Technical skills" title="The tools in my workshop." text="A practical, growing toolkit shaped by building real things and learning from every iteration." /><div className="grid gap-10 md:grid-cols-[.75fr_1.25fr] md:gap-20"><div className="grid grid-cols-2 gap-x-5 md:flex md:flex-col">{Object.keys(skills).map((group) => <button key={group} className={`flex items-center justify-between border-b border-slate-800 py-4 text-left text-xs font-semibold transition ${active === group ? 'text-[var(--text)]' : 'text-[var(--muted)] hover:text-[var(--text)]'}`} onClick={() => setActive(group)}>{group}<ArrowUpRight size={15} className={active === group ? groupTones[group].label : ''} /></button>)}</div><div><div className="mb-7 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className={`font-mono text-[10px] uppercase tracking-[0.16em] ${groupTones[active].label}`}>Current toolkit</p><h3 className="mt-2 text-xl font-bold tracking-[-0.04em] text-[var(--text)]">{active}</h3></div><span className={`rounded-full border border-current/20 bg-current/10 px-3 py-1.5 font-mono text-[10px] ${groupTones[active].label}`}>{skills[active].length} skills</span></div><p className="mt-3 max-w-2xl text-xs leading-6 text-[var(--muted)]">{groupDescriptions[active]}</p></div><div className="grid grid-cols-1 gap-8 sm:grid-cols-2">{skills[active].map((skill, index) => <SkillBar key={skill} skill={skill} index={index} tone={groupTones[active]} />)}</div></div></div></section>
}

function SkillBar({ skill, index, tone }) { const ref = useRef(null); const visible = useInView(ref, { once: true, amount: .7 }); const width = `${78 + index * 4}%`; return <div ref={ref}><div className="flex items-center justify-between"><span className="font-mono text-[9px] text-[var(--muted)]">0{index + 1}</span><span className={`font-mono text-[9px] ${tone.label}`}>{width}</span></div><strong className="my-2.5 block text-sm text-[var(--text)]">{skill}</strong><div className="h-1 overflow-hidden rounded-full bg-slate-800/70"><motion.i initial={{ width: 0 }} animate={{ width: visible ? width : 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className={`block h-full rounded-full bg-gradient-to-r ${tone.bar}`} style={{ boxShadow: `0 0 12px ${tone.glow}` }} /></div></div> }
