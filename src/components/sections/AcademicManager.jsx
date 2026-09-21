import { Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { educationLevels } from '../../data/portfolio.js'
import { useEducation } from '../../hooks/useEducation.js'

const emptyForm = { type: 'psc', period: '', title: '', institution: '', detail: '', current: false }

export default function AcademicManager() {
  const { items, addEducation, updateEducation, removeEducation } = useEducation()
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [open, setOpen] = useState(false)

  function startEdit(item) {
    setForm({ type: item.type || 'graduation', period: item.period, title: item.title, institution: item.institution, detail: item.detail, current: Boolean(item.current) })
    setEditingId(item.id)
    setOpen(true)
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setOpen(false)
  }

  function submit(event) {
    event.preventDefault()
    if (editingId) updateEducation(editingId, form)
    else addEducation(form)
    resetForm()
  }

  return <div className="space-y-8"><div className="flex flex-col justify-between gap-4 rounded-xl border border-[#b6f36b]/20 bg-[#b6f36b]/5 p-5 sm:flex-row sm:items-center"><div><h3 className="font-bold text-slate-100">Manage academic history</h3><p className="mt-1 text-xs leading-6 text-slate-400">Add your university, school, diploma or training details without editing code.</p></div><button type="button" onClick={() => { setForm(emptyForm); setEditingId(null); setOpen(true) }} className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#b6f36b] px-4 py-2.5 text-xs font-bold text-[#09110b] transition hover:bg-[#d0ff9c]"><Plus size={15} /> Add education</button></div>
    {open && <form onSubmit={submit} className="grid gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:grid-cols-2"><label className="flex flex-col gap-2"><span className="text-[10px] text-slate-500">Education level</span><select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-[#b6f36b]">{educationLevels.map((level) => <option key={level.value} value={level.value}>{level.label}</option>)}</select></label><FormField label="Institution" value={form.institution} placeholder="University or school name" onChange={(value) => setForm({ ...form, institution: value })} required /><FormField label="Degree / certificate" value={form.title} placeholder="B.Sc. in Computer Science" onChange={(value) => setForm({ ...form, title: value })} required /><FormField label="Time session" value={form.period} placeholder="2022 — Present" onChange={(value) => setForm({ ...form, period: value })} required /><label className="flex items-center gap-2 self-end pb-2 text-xs text-slate-300"><input type="checkbox" checked={form.current} onChange={(event) => setForm({ ...form, current: event.target.checked })} className="accent-[#b6f36b]" /> Currently studying here</label><label className="flex flex-col gap-2 sm:col-span-2"><span className="text-[10px] text-slate-500">Details</span><textarea value={form.detail} onChange={(event) => setForm({ ...form, detail: event.target.value })} placeholder="Achievements, major, board or relevant coursework" rows="3" className="resize-y rounded-lg border border-slate-700 bg-slate-950/50 p-3 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-[#b6f36b]" /></label><div className="flex gap-2 sm:col-span-2"><button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#b6f36b] px-4 py-2.5 text-xs font-bold text-[#09110b]"><Save size={14} /> {editingId ? 'Save changes' : 'Add record'}</button><button type="button" onClick={resetForm} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-xs text-slate-300"><X size={14} /> Cancel</button></div></form>}
    <div className="space-y-3">{items.length === 0 && <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">No academic records yet. Add your first one above.</div>}{items.map((item) => <article key={item.id || `${item.institution}-${item.period}`} className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5 sm:flex-row sm:items-start sm:justify-between"><div><span className="font-mono text-[10px] text-[#7990af]">{educationLevels.find((level) => level.value === item.type)?.label || 'Education'} · {item.period}</span><h3 className="mt-2 text-lg font-bold text-slate-100">{item.title}</h3><strong className="text-xs text-[#b6f36b]">{item.institution}</strong><p className="mt-2 max-w-2xl text-xs leading-6 text-slate-400">{item.detail}</p>{item.current && <span className="mt-3 inline-flex rounded-full bg-[#b6f36b]/10 px-2 py-1 text-[10px] text-[#b6f36b]">Current</span>}</div><div className="flex shrink-0 gap-2"><button type="button" onClick={() => startEdit(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-[10px] text-slate-300 hover:border-[#b6f36b]/50"><Pencil size={13} /> Edit</button><button type="button" onClick={() => removeEducation(item.id)} disabled={!item.id} className="inline-flex items-center gap-1.5 rounded-lg border border-red-950 px-3 py-2 text-[10px] text-red-300 enabled:hover:border-red-500 disabled:cursor-not-allowed disabled:opacity-40"><Trash2 size={13} /> Delete</button></div></article>)}</div>
  </div>
}

function FormField({ label, value, placeholder, onChange, required }) { return <label className="flex flex-col gap-2"><span className="text-[10px] text-slate-500">{label}</span><input required={required} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-[#b6f36b]" /></label> }
