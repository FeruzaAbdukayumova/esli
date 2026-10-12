import { useTranslation } from 'react-i18next'

const RANGES = ['7d', '30d', '90d', '1y', 'all'] as const
const GRANULARITIES = ['day', 'week', 'month'] as const

interface TimeRangeSelectorProps {
  range: string
  granularity: string
  onRangeChange: (range: string) => void
  onGranularityChange: (granularity: string) => void
}

export function TimeRangeSelector({ range, granularity, onRangeChange, onGranularityChange }: TimeRangeSelectorProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
        {RANGES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onRangeChange(r)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
              range === r
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {t(`admin.analytics.range.${r}`)}
          </button>
        ))}
      </div>

      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
        {GRANULARITIES.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => onGranularityChange(g)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
              granularity === g
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {t(`admin.analytics.granularity.${g}`)}
          </button>
        ))}
      </div>
    </div>
  )
}
