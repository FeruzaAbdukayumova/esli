import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  color?: string
  compact?: boolean
  variant?: 'compact' | 'default' | 'bento'
}

export function StatCard({ icon: Icon, value, label, color = 'text-primary-600 dark:text-primary-400', compact = false, variant }: StatCardProps) {
  const resolvedVariant = variant || (compact ? 'compact' : 'default')

  if (resolvedVariant === 'bento') {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 px-4 py-3 min-w-0 transition-shadow duration-200 hover:shadow-elevation-md">
        <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-700 ${color} shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight tabular-nums tracking-tight">{value}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{label}</p>
        </div>
      </div>
    )
  }

  if (resolvedVariant === 'compact') {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-sm">
        <Icon className={`w-3.5 h-3.5 ${color}`} />
        <span className="font-semibold text-slate-800 dark:text-slate-100">{value}</span>
        <span className="text-slate-500 dark:text-slate-400 text-xs hidden sm:inline">{label}</span>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-600 p-4 flex items-center gap-3 transition-shadow duration-200 hover:shadow-elevation-md">
      <div className={`p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight">{value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{label}</p>
      </div>
    </div>
  )
}
