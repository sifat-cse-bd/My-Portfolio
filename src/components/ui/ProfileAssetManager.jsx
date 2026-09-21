import { Image, PenLine, Upload } from 'lucide-react'
import { useAssetPreview } from '../../hooks/useAssetPreview.js'

export default function ProfileAssetManager() {
  const photo = useAssetPreview('photo')
  const signature = useAssetPreview('signature')
  return <div className="mt-8 grid gap-3 sm:grid-cols-2"><AssetInput label="Profile photo" icon={Image} accept="image/png,image/jpeg,image/webp" preview={photo.preview} loading={photo.loading} onChange={photo.handleFileChange} /><AssetInput label="Signature image" icon={PenLine} accept="image/png,image/jpeg,image/webp" preview={signature.preview} loading={signature.loading} onChange={signature.handleFileChange} /></div>
}

function AssetInput({ label, icon: Icon, accept, preview, loading, onChange }) {
  return <label className="group relative flex min-h-28 cursor-pointer items-center gap-3 overflow-hidden rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-3 transition hover:border-[var(--accent)]/60">{loading || preview === '__loading__' ? <span className="h-20 w-20 animate-pulse rounded-lg bg-slate-800" /> : preview ? <img src={preview} alt={`${label} preview`} className={`h-20 w-20 rounded-lg ${label === 'Signature image' ? 'object-contain' : 'object-cover'}`} /> : <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-slate-800 text-[var(--accent)]"><Icon size={19} /></span>}<span><strong className="block text-xs text-slate-200">{label}</strong><small className="mt-1 block text-[10px] leading-5 text-slate-500">{label === 'Signature image' ? 'PNG, JPG or WEBP · recommended 600 × 180 px' : 'PNG, JPG or WEBP'}<br />Background is allowed · stored locally</small></span><Upload size={15} className="absolute right-3 top-3 text-slate-500 transition group-hover:text-[var(--accent)]" /><input className="sr-only" type="file" accept={accept} onChange={onChange} /></label>
}
