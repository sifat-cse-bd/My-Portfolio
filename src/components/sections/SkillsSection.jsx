import { ArrowUpRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useState } from 'react'
import { useRef } from 'react'
import { skills } from '../../data/portfolio.js'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function SkillsSection() {
  const [active, setActive] = useState(Object.keys(skills)[0])
  return <section id="skills" className="border-b border-white/10 py-24 md:py-36"><SectionHeading kicker="03 / Technical skills" title="The tools in my workshop." text="A practical, growing toolkit shaped by building real things and learning from every iteration." /><div className="grid gap-10 md:grid-cols-[.75fr_1.25fr] md:gap-20"><div className="grid grid-cols-2 gap-x-5 md:flex md:flex-col">{Object.keys(skills).map((group) => <button key={group} className={`flex items-center justify-between border-b border-slate-800 py-4 text-left text-xs font-semibold transition ${active === group ? 'text-slate-100' : 'text-slate-500 hover:text-slate-200'}`} onClick={() => setActive(group)}>{group}<ArrowUpRight size={15} className={active === group ? 'text-[#b6f36b]' : ''} /></button>)}</div><div className="grid grid-cols-1 gap-8 sm:grid-cols-2">{skills[active].map((skill, index) => <SkillBar key={skill} skill={skill} index={index} />)}</div></div></section>
}

function SkillBar({ skill, index }) { const ref = useRef(null); const visible = useInView(ref, { once: true, amount: .7 }); const width = `${78 + index * 4}%`; return <div ref={ref}><span className="font-mono text-[9px] text-slate-600">0{index + 1}</span><strong className="my-2.5 block text-sm text-slate-200">{skill}</strong><div className="h-0.5 bg-slate-800"><motion.i initial={{ width: 0 }} animate={{ width: visible ? width : 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="block h-full bg-blue-300" /></div></div> }
