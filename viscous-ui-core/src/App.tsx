import { useState } from 'react'
import { Home, GitBranch, BookOpen, BarChart3 } from 'lucide-react'
import { LogoWhite } from './assets/logos'
import Assistant from './components/Assistant'
import Portfolio from './components/Portfolio'
import FactoryManagement from './components/FactoryManagement'
import ProcessMatrix from './components/ProcessMatrix'
import './App.css'

type Page = 'home' | 'portfolio' | 'gestao' | 'processo'

const NAV: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: 'home',      label: '// INÍCIO',   icon: <Home size={18} /> },
  { id: 'processo',  label: '// PROCESSO', icon: <GitBranch size={18} /> },
  { id: 'portfolio', label: '// CATÁLOGO', icon: <BookOpen size={18} /> },
  { id: 'gestao',    label: '// GESTÃO',   icon: <BarChart3 size={18} /> },
]

function HomePlaceholder() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '1rem',
      color: 'var(--text-muted)',
      fontFamily: 'JetBrains Mono, monospace',
    }}>
      <span style={{ fontSize: '3rem' }}>🏠</span>
      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
        // INÍCIO — em construção
      </p>
    </div>
  )
}

function App() {
  const [page, setPage] = useState<Page>('home')

  const currentLabel = NAV.find((n) => n.id === page)?.label ?? ''

  function renderPage() {
    switch (page) {
      case 'home':      return <HomePlaceholder />
      case 'portfolio': return <Portfolio />
      case 'gestao':    return <FactoryManagement />
      case 'processo':  return <ProcessMatrix />
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
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
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
                fontFamily: 'JetBrains Mono, monospace',
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

      {/* Assistant FAB – always rendered */}
      <Assistant />
    </>
  )
}

export default App
