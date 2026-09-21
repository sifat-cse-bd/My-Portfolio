import { ArrowUpRight } from 'lucide-react'
import { experience } from '../../data/portfolio.js'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function ExperienceSection() { return <section id="experience" className="border-b border-white/10 py-24 md:py-36"><SectionHeading kicker="05 / Experience & leadership" title="Always learning in public." text="The most valuable lessons have come from shipping, sharing and working alongside generous people." /><div className="mx-auto max-w-5xl">{experience.map((item) => <article className="grid gap-3 border-t border-slate-800 py-7 md:grid-cols-[160px_1fr_20px] md:gap-7" key={item.title}><span className="font-mono text-[10px] text-[#7990af]">{item.period}</span><div><h3 className="text-base font-bold tracking-tight text-slate-200">{item.title}</h3><p className="mt-2 max-w-xl text-xs leading-6 text-slate-400">{item.detail}</p></div><ArrowUpRight size={18} className="text-slate-500" /></article>)}</div></section> }
