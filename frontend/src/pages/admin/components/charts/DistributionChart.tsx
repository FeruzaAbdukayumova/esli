import { useTranslation } from 'react-i18next'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

interface DistributionChartProps {
  data: { name: string; value: number; color: string }[]
  height?: number
}

export function DistributionChart({ data, height = 300 }: DistributionChartProps) {
  const { t } = useTranslation()
  const total = data.reduce((sum, d) => sum + d.value, 0)

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-slate-400 dark:text-slate-500 text-sm">
        {t('admin.analytics.noData', 'No data available')}
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-slate-800, #1e293b)',
            border: 'none',
            borderRadius: '8px',
            color: '#f1f5f9',
            fontSize: 13,
          }}
          formatter={(value) => [`${value ?? 0} (${total > 0 ? Math.round(((Number(value) || 0) / total) * 100) : 0}%)`, '']}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
