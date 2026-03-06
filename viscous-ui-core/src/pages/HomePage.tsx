export function HomePage() {
  return (
    <div>
      <h1 className="page-title mb-8">Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6">
          <span className="label-mono block mb-3">Projetos ativos</span>
          <p className="text-4xl font-black" style={{ color: 'var(--accent)' }}>12</p>
        </div>
        <div className="card p-6">
          <span className="label-mono block mb-3">Squads</span>
          <p className="text-4xl font-black" style={{ color: 'var(--accent)' }}>6</p>
        </div>
        <div className="card p-6">
          <span className="label-mono block mb-3">Membros</span>
          <p className="text-4xl font-black" style={{ color: 'var(--accent)' }}>48</p>
        </div>
      </div>
      <div className="mt-6 card p-6">
        <h2 className="section-title mb-4">Atividade recente</h2>
        <div className="space-y-3">
          {['Pipeline de dados atualizado', 'Novo modelo de governança publicado', 'Dashboard de analytics revisado'].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
              <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
