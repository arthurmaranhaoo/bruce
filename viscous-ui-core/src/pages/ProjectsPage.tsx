export function ProjectsPage() {
  const projects = [
    { name: 'Data Mesh Core', status: 'h1', squad: 'Plataforma', tags: ['dados', 'modelagem'] },
    { name: 'Governança 2.0', status: 'h2', squad: 'Governança', tags: ['governanca'] },
    { name: 'Analytics Hub', status: 'h1', squad: 'Analytics', tags: ['analytics'] },
    { name: 'Catálogo Central', status: 'h3', squad: 'Produto', tags: ['produto', 'dados'] },
    { name: 'Pipeline Monitor', status: 'h2', squad: 'Plataforma', tags: ['suporte'] },
    { name: 'Modelo de Qualidade', status: 'h1', squad: 'Governança', tags: ['modelagem', 'governanca'] },
  ]

  return (
    <div>
      <h1 className="page-title mb-8">Projetos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.name} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{p.name}</h3>
              <span className={`badge badge-${p.status}`}>{p.status.toUpperCase()}</span>
            </div>
            <p className="label-mono mb-3">{p.squad}</p>
            <div className="flex flex-wrap gap-1">
              {p.tags.map((tag) => (
                <span key={tag} className={`badge badge-${tag}`}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
