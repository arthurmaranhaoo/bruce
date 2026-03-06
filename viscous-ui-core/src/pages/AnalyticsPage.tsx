import { BarChart3 } from 'lucide-react'

export function AnalyticsPage() {
  const metrics = [
    { label: 'Pipelines ativos', value: '34', delta: '+4 esta semana' },
    { label: 'Volume processado', value: '2.1TB', delta: '+12% vs mês anterior' },
    { label: 'SLO cumprido', value: '98.7%', delta: 'Meta: 99%' },
    { label: 'Incidentes abertos', value: '2', delta: '-5 vs semana passada' },
  ]

  return (
    <div>
      <h1 className="page-title mb-8">Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => (
          <div key={m.label} className="card p-5">
            <span className="label-mono block mb-2">{m.label}</span>
            <p className="text-3xl font-black mb-1" style={{ color: 'var(--accent)' }}>{m.value}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{m.delta}</p>
          </div>
        ))}
      </div>
      <div className="card p-6 flex items-center justify-center" style={{ minHeight: 240 }}>
        <div className="text-center" style={{ color: 'var(--text-muted)' }}>
          <BarChart3 size={48} className="mx-auto mb-3 opacity-30" />
          <p className="label-mono">Gráficos em breve</p>
        </div>
      </div>
    </div>
  )
}
