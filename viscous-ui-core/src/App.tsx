import { useState } from 'react'
import { Home, BookOpen, BarChart3, GitBranch, MessageSquare } from 'lucide-react'
import { LogoWhite } from './assets/logos/LogoWhite'
import { Assistant } from './components/Assistant'
import { HomePage } from './pages/HomePage'
import { DocsPage } from './pages/DocsPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { ProjectsPage } from './pages/ProjectsPage'
import './App.css'

type Page = 'home' | 'docs' | 'analytics' | 'projects'

const NAV: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home size={18} /> },
  { id: 'docs', label: 'Docs', icon: <BookOpen size={18} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  { id: 'projects', label: 'Projetos', icon: <GitBranch size={18} /> },
]

function App() {
  const [page, setPage] = useState<Page>('home')

  const currentLabel = NAV.find((n) => n.id === page)?.label ?? ''

  function renderPage() {
    switch (page) {
      case 'home': return <HomePage />
      case 'docs': return <DocsPage />
      case 'analytics': return <AnalyticsPage />
      case 'projects': return <ProjectsPage />
    }
  }

  return (
    <>
      {/* Header */}
      <header
        style={{
          height: 56,
          background: 'var(--header)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: logo */}
        <LogoWhite width={100} height={28} />

        {/* Centre: current page name */}
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {currentLabel}
        </span>

        {/* Right: nav buttons */}
        <nav style={{ display: 'flex', gap: 4 }}>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              style={{
                fontSize: 11,
                color: page === n.id ? 'white' : 'rgba(255,255,255,0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '4px 12px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                background: page === n.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                transition: 'color 0.15s, background 0.15s',
                fontFamily: 'Inter, sans-serif',
                fontWeight: page === n.id ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (page !== n.id) (e.currentTarget as HTMLButtonElement).style.color = 'white'
              }}
              onMouseLeave={(e) => {
                if (page !== n.id) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'
              }}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Sidebar */}
      <aside
        style={{
          width: 56,
          position: 'fixed',
          top: 56,
          left: 0,
          bottom: 0,
          background: 'var(--sidebar)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px 0',
          gap: 8,
          zIndex: 40,
        }}
      >
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => setPage(n.id)}
            className={`sidebar-icon${page === n.id ? ' active' : ''}`}
            title={n.label}
          >
            {n.icon}
          </button>
        ))}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bruce icon at bottom */}
        <button
          className="sidebar-icon"
          title="Bruce – Assistente"
        >
          <MessageSquare size={18} />
        </button>
      </aside>

      {/* Main content */}
      <main
        style={{
          marginLeft: 56,
          marginTop: 56,
          minHeight: 'calc(100vh - 56px)',
          background: 'var(--bg)',
          padding: 32,
        }}
      >
        {renderPage()}
      </main>

      {/* Assistant FAB – always rendered outside main */}
      <Assistant />
    </>
  )
}

export default App
