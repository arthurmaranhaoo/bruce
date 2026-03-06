export function DocsPage() {
  const sections = [
    { title: 'Introdução', badge: 'dados', items: ['Visão geral', 'Arquitetura', 'Princípios'] },
    { title: 'Modelagem', badge: 'modelagem', items: ['Data Mesh', 'Contratos de dados', 'Schemas'] },
    { title: 'Governança', badge: 'governanca', items: ['Políticas', 'Qualidade', 'Catálogo'] },
  ]

  return (
    <div>
      <h1 className="page-title mb-8">Docs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sections.map((section) => (
          <div key={section.title} className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="section-title">{section.title}</h2>
              <span className={`badge badge-${section.badge}`}>{section.badge}</span>
            </div>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm hover:underline"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
