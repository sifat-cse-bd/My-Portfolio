import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { skills } from '../../data/portfolio.js'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function SkillsSection() {
  const [active, setActive] = useState(Object.keys(skills)[0])
  return <section id="skills" className="border-b border-white/10 py-24 md:py-36"><SectionHeading kicker="03 / Technical skills" title="The tools in my workshop." text="A practical, growing toolkit shaped by building real things and learning from every iteration." /><div className="grid gap-10 md:grid-cols-[.75fr_1.25fr] md:gap-20"><div className="grid grid-cols-2 gap-x-5 md:flex md:flex-col">{Object.keys(skills).map((group) => <button key={group} className={`flex items-center justify-between border-b border-slate-800 py-4 text-left text-xs font-semibold transition ${active === group ? 'text-slate-100' : 'text-slate-500 hover:text-slate-200'}`} onClick={() => setActive(group)}>{group}<ArrowUpRight size={15} className={active === group ? 'text-[#b6f36b]' : ''} /></button>)}</div><div className="grid grid-cols-1 gap-8 sm:grid-cols-2">{skills[active].map((skill, index) => <div key={skill}><span className="font-mono text-[9px] text-slate-600">0{index + 1}</span><strong className="my-2.5 block text-sm text-slate-200">{skill}</strong><div className="h-0.5 bg-slate-800"><i className="block h-full bg-blue-300" style={{ width: `${78 + index * 4}%` }} /></div></div>)}</div></div></section>
}
