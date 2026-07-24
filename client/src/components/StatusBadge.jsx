const variants = {
  pending: 'bg-amber-500/15 text-amber-400',
  paid: 'bg-emerald-500/15 text-emerald-400',
  failed: 'bg-rose-500/15 text-rose-400',
  attended: 'bg-sky-500/15 text-sky-400',
}

export default function StatusBadge({ status }) {
  const normalized = String(status || '').toLowerCase()
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${variants[normalized] || 'bg-slate-500/15 text-slate-300'}`}>
      {normalized || 'unknown'}
    </span>
  )
}
