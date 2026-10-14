import { useTranslation } from 'react-i18next'
import type { DayForecast } from '@/features/stats/types'

interface ReviewForecastProps {
  forecast: DayForecast[]
}

const DAY_KEYS = ['forecast.sun', 'forecast.mon', 'forecast.tue', 'forecast.wed', 'forecast.thu', 'forecast.fri', 'forecast.sat'] as const

export function ReviewForecast({ forecast }: ReviewForecastProps) {
  const { t } = useTranslation()
  const max = Math.max(...forecast.map((d) => d.count), 1)

  return (
    <div className="flex items-end gap-2 h-32">
      {forecast.map((day, i) => {
        const date = new Date(day.date + 'T00:00:00')
        const isToday = i === 0
        const label = isToday ? t('forecast.today', 'Today') : t(DAY_KEYS[date.getDay()])
        const height = day.count > 0 ? Math.max((day.count / max) * 100, 8) : 4

        return (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs font-semibold text-fg tabular-nums">
              {day.count || ''}
            </span>
            <div className="w-full flex items-end justify-center border-b-2 border-edge" style={{ height: '80px' }}>
              <div
                className={`w-full max-w-[32px] rounded-t-lg ${
                  day.count > 0
                    ? `border-2 border-b-0 border-ink ${isToday ? 'bg-sun' : 'bg-sky'}`
                    : 'bg-line'
                }`}
                style={{ height: `${height}%` }}
                title={t('forecast.dateCards', { date: day.date, count: day.count })}
              />
            </div>
            <span className={`text-xs ${isToday ? 'font-bold text-fg' : 'text-muted'}`}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}
