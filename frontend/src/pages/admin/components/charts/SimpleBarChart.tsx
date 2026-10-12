import { useTranslation } from 'react-i18next'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface SimpleBarChartProps {
  data: { name: string; value: number }[]
  color?: string
  height?: number
}

export function SimpleBarChart({ data, color = '#7c3aed', height = 300 }: SimpleBarChartProps) {
  const { t } = useTranslation()
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-slate-400 dark:text-slate-500 text-sm">
        {t('admin.analytics.noData', 'No data available')}
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-slate-200, #e2e8f0)" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-slate-800, #1e293b)',
            border: 'none',
            borderRadius: '8px',
            color: '#f1f5f9',
            fontSize: 13,
          }}
        />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
