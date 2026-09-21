import { Check, ChevronDown, GraduationCap, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useEducation } from '../../hooks/useEducation.js'

export default function AcademicList() {
  const { items, loading } = useEducation()

  const fallbackItems = [
    {
      id: 'aiub',
      period: '2021 — 2025',
      title: 'BSc in Computer Science',
      institution: 'American International University-Bangladesh',
      detail: 'Focused on software engineering, problem solving, web systems, product thinking, and applied research with a strong emphasis on building practical digital solutions.',
      current: true,
    },
    {
      id: 'college',
      period: '2018 — 2020',
      title: 'Higher Secondary Certificate',
      institution: 'Dhaka City College',
      detail: 'Built a strong foundation in mathematics, science, and analytical reasoning while developing a growing interest in technology and system design.',
    },
  ]

  const data = loading ? [] : items.length > 0 ? items : fallbackItems

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">Education record</p>
          <p className="mt-2 text-sm text-[var(--muted)]">A quick overview first. Open a card when you want the full context.</p>
        </div>
        <span className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{data.length || 0} milestones</span>
      </div>

      {loading && Array.from({ length: 4 }, (_, index) => <AcademicSkeleton key={index} />)}

      {!loading && data.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--panel)] p-10 text-center text-sm text-[var(--muted)] shadow-sm">
          Academic records will be published here soon.
        </div>
      )}

      {!loading && data.length > 0 && <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{data.map((item) => <AcademicCard item={item} key={item.id || `${item.institution}-${item.period}`} />)}</div>}
    </div>
  )
}

function AcademicCard({ item }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="group flex self-start flex-col rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-[0_18px_55px_var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/45 hover:bg-[var(--panel-strong)]">
      <div className="flex items-start justify-between gap-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <GraduationCap size={20} />
        </div>
        {item.current && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-500"><Check size={11} /> Current</span>}
      </div>

      <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">{item.period}</span>
      <h3 className="mt-2 text-lg font-extrabold leading-6 tracking-[-0.04em] text-[var(--text)]">{item.title}</h3>
      <div className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-[var(--muted-strong)]"><MapPin size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" /><span>{item.institution}</span></div>

      <div className="mt-auto pt-5">
        <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] transition hover:text-[var(--accent-2)]">
          {expanded ? 'Show less' : 'Show more'}
          <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        {expanded && <p className="mt-3 border-t border-[var(--border)] pt-3 text-xs leading-6 text-[var(--muted)]">{item.detail}</p>}
      </div>
    </article>
  )
}

function AcademicSkeleton() {
  return (
    <article className="flex min-h-56 animate-pulse gap-4 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm" aria-hidden="true">
      <div className="size-11 shrink-0 rounded-xl bg-[var(--panel-strong)]" />
      <div className="min-w-0 flex-1 space-y-3">
        <div className="h-2 w-24 rounded bg-[var(--panel-strong)]" />
        <div className="h-5 w-3/4 rounded bg-[var(--panel-strong)]" />
        <div className="h-3 w-40 rounded bg-[var(--panel-strong)]" />
        <div className="mt-10 h-3 w-20 rounded bg-[var(--panel-strong)]" />
      </div>
    </article>
  )
}
