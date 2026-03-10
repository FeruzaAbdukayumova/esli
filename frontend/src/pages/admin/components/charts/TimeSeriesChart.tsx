import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface Series {
  dataKey: string
  name: string
  color: string
}

interface TimeSeriesChartProps {
  data: { date: string; [key: string]: string | number }[]
  series: Series[]
  height?: number
}

export function TimeSeriesChart({ data, series, height = 300 }: TimeSeriesChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-slate-400 dark:text-slate-500 text-sm">
        No data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-slate-200, #e2e8f0)" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickFormatter={(v: string) => {
            const d = new Date(v)
            return `${d.getMonth() + 1}/${d.getDate()}`
          }}
          stroke="#94a3b8"
        />
        <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-slate-800, #1e293b)',
            border: 'none',
            borderRadius: '8px',
            color: '#f1f5f9',
            fontSize: 13,
          }}
          labelFormatter={(v) => new Date(String(v)).toLocaleDateString()}
        />
        {series.length > 1 && <Legend />}
        {series.map((s) => (
          <Line
            key={s.dataKey}
            type="monotone"
            dataKey={s.dataKey}
            name={s.name}
            stroke={s.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
