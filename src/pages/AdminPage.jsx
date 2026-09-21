import { LogOut, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import AcademicManager from '../components/sections/AcademicManager.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import ProfileAssetManager from '../components/ui/ProfileAssetManager.jsx'
import ProjectManager from '../components/sections/ProjectManager.jsx'
import { projects as initialProjects } from '../data/portfolio.js'
import { isAdminAuthenticated, signInAdmin, signOutAdmin } from '../services/adminAuth.js'
import { readProfileAssets } from '../services/profileStorage.js'
import { readProjects } from '../services/projectStorage.js'
import { savePortfolioCloud } from '../services/portfolioCloud.js'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated())
  const [syncMessage, setSyncMessage] = useState('')

  async function publishBrowserData() {
    setSyncMessage('Publishing...')
    try {
      await savePortfolioCloud({
        projects: readProjects().length ? readProjects() : initialProjects,
        assets: readProfileAssets(),
      })
      setSyncMessage('Published. Visitors now see this data from the central database.')
    } catch (error) {
      setSyncMessage(`Publish failed: ${error.message}`)
    }
  }

  if (!authenticated) return <AdminLogin onSuccess={() => setAuthenticated(true)} />

  return <section className="py-12 pb-24 md:py-20 md:pb-36"><div className="mb-8 flex items-center justify-between gap-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4"><div className="flex items-center gap-3"><ShieldCheck className="text-emerald-400" size={20} /><div><strong className="block text-sm text-slate-100">Owner workspace</strong><span className="text-[11px] text-slate-400">Only you can see and manage these controls.</span></div></div><button type="button" onClick={() => { signOutAdmin(); setAuthenticated(false) }} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-[10px] text-slate-300 hover:border-red-400 hover:text-red-300"><LogOut size={14} /> Sign out</button></div><SectionHeading kicker="Owner / Admin" title="Manage your public profile." text="Changes made here are the records visitors see on the public website." /><div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-5"><h2 className="text-lg font-bold text-slate-100">Public profile assets</h2><p className="mt-1 text-xs text-slate-400">Only upload here. Visitors can only see the configured photo and signature.</p><ProfileAssetManager /></div><div className="mb-10 rounded-2xl border border-[#b6f36b]/20 bg-[#b6f36b]/5 p-5"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-sm font-bold text-slate-100">Centralize current browser data</h2><p className="mt-1 text-xs leading-5 text-slate-400">Use this once after setup to publish your existing local data for every visitor.</p></div><button type="button" onClick={publishBrowserData} className="rounded-lg bg-[#b6f36b] px-4 py-2.5 text-xs font-bold text-[#09110b]">Publish browser data</button></div>{syncMessage && <p className="mt-3 text-xs text-[#b6f36b]">{syncMessage}</p>}</div><div className="space-y-12"><AcademicManager /><ProjectManager /></div></section>
}

function AdminLogin({ onSuccess }) {
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    signInAdmin(accessCode).then((success) => {
      if (success) onSuccess()
      else setError('Access denied. Check your private admin code and database setup.')
    })
  }

  return <section className="mx-auto max-w-md py-20 pb-36"><div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/20"><div className="mb-6 grid size-12 place-items-center rounded-xl bg-[#b6f36b]/10 text-[#b6f36b]"><ShieldCheck size={23} /></div><p className="font-mono text-[10px] uppercase tracking-[.09em] text-[#7890b1]">Private area</p><h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-100">Owner sign in</h1><p className="mt-3 text-sm leading-6 text-slate-400">This page is for managing academic records. Public visitors only see the read-only portfolio.</p><form onSubmit={submit} className="mt-7 space-y-4"><label className="flex flex-col gap-2 text-[10px] text-slate-500"><span>Admin access code</span><input autoFocus type="password" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-3 text-sm text-slate-100 outline-none focus:border-[#b6f36b]" required /></label>{error && <p className="text-xs text-red-300">{error}</p>}<button className="w-full rounded-lg bg-[#b6f36b] px-4 py-3 text-xs font-bold text-[#09110b] hover:bg-[#d0ff9c]" type="submit">Open owner workspace</button></form></div></section>
}
