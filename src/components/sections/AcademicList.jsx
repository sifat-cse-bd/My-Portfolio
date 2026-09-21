import { Check, GraduationCap } from 'lucide-react'
import { useEducation } from '../../hooks/useEducation.js'

export default function AcademicList() {
  const { items, loading } = useEducation()

  return <div className="space-y-4">{loading && Array.from({ length: 2 }, (_, index) => <AcademicSkeleton key={index} />)}{!loading && items.length === 0 && <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">Academic records will be published here soon.</div>}{!loading && items.map((item) => <article key={item.id || `${item.institution}-${item.period}`} className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5 sm:gap-6"><div className="grid size-10 shrink-0 place-items-center rounded-lg bg-blue-950/60 text-blue-200"><GraduationCap size={19} /></div><div><span className="font-mono text-[10px] text-[#7990af]">{item.period}</span><h3 className="mt-2 text-lg font-bold text-slate-100">{item.title}</h3><strong className="text-xs text-[#b6f36b]">{item.institution}</strong><p className="mt-2 max-w-2xl text-xs leading-6 text-slate-400">{item.detail}</p>{item.current && <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#b6f36b]/10 px-2 py-1 text-[10px] text-[#b6f36b]"><Check size={12} /> Current</span>}</div></article>)}</div>
}

function AcademicSkeleton() { return <article className="flex animate-pulse gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5 sm:gap-6" aria-hidden="true"><div className="size-10 shrink-0 rounded-lg bg-slate-800" /><div className="min-w-0 flex-1 space-y-3"><div className="h-2 w-24 rounded bg-slate-800" /><div className="h-5 w-3/4 rounded bg-slate-800" /><div className="h-3 w-36 rounded bg-slate-800" /><div className="h-3 w-full max-w-xl rounded bg-slate-800" /><div className="h-3 w-2/3 rounded bg-slate-800" /></div></article> }
