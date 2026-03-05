import { useState, useEffect, useRef } from 'react'
import FactoryManagement from './components/FactoryManagement'
import Portfolio from './components/Portfolio'
import ProcessMatrix from './components/ProcessMatrix'
import Assistant from './components/Assistant'

type Page = 'home' | 'processo' | 'portfolio' | 'gestao'

const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: '// INÍCIO',   page: 'home' },
  { label: '// PROCESSO', page: 'processo' },
  { label: '// CATÁLOGO', page: 'portfolio' },
  { label: '// GESTÃO',   page: 'gestao' },
]

// ─── Home ────────────────────────────────────────────────────────────────────

const FLOW_STEPS = [
  { n: '01', title: 'CAPTAÇÃO',            desc: 'Identificação de gaps de mercado e extração de dados brutos.' },
  { n: '02', title: 'REFRAÇÃO',            desc: 'Decomposição de complexidade em módulos lógicos e funcionais.' },
  { n: '03', title: 'SÍNTESE',             desc: 'Integração de modelos de IA e arquitetura de alta fidelidade.' },
  { n: '04', title: 'MOLDAGEM',            desc: 'Refinamento de interface e acabamento de experiência do usuário.' },
  { n: '05', title: 'ENTENDA O PROCESSO',  desc: 'Metodologia proprietária de desenvolvimento ágil e integração contínua.' },
  { n: '06', title: 'ASSISTENTE',          desc: 'Bruce, a camada de inteligência que orquestra a interação entre artefatos.' },
]

const HORIZONS = [
  { h: 'H1', title: 'EFICIÊNCIA OPERACIONAL', desc: 'Otimização de processos através de automação inteligente.' },
  { h: 'H2', title: 'EXPANSÃO DE CAPACIDADE', desc: 'Criação de novos produtos adjacentes ao core business.' },
  { h: 'H3', title: 'VISÃO DISRUPTIVA',        desc: 'Exploração de novas fronteiras tecnológicas e modelos futuros.' },
]

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: 'Entender o Processo',       page: 'processo' },
  { label: 'Ver Catálogo de Artefatos', page: 'portfolio' },
  { label: 'Acessar Painel de Gestão',  page: 'gestao' },
]

const INTRO_CARDS = [
  {
    n: '01',
    title: 'O Catálogo',
    desc: 'Nossa vitrine de soluções sintetizadas. Cada produto é um artefato de alta fidelidade, moldado para resolver dispersões cognitivas específicas e gaps de mercado.',
    action: { label: '// EXPLORAR_ARTEFATOS', page: 'portfolio' as Page },
  },
  {
    n: '02',
    title: 'A Gestão',
    desc: 'O núcleo operacional de controle. Onde os dados são refratados e transformados em métricas de crescimento, leads qualificados e receita real para o ecossistema.',
    action: { label: '// ACESSAR_PAINEL', page: 'gestao' as Page },
  },
  {
    n: '03',
    title: 'Bruce Assistente',
    desc: 'A interface de inteligência onipresente. Bruce não é apenas um chat; é o sintetizador de dados do catálogo, pronto para traduzir complexidade técnica em clareza estratégica.',
    action: null,
  },
]

function HomeSections({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div style={{ paddingTop: '2rem' }}>

      {/* ── Bloco 1 · Hero ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        marginBottom: '6rem',
      }}>

        {/* Coluna esquerda */}
        <div style={{ paddingRight: '4rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: 'var(--text-main)',
            margin: 0,
          }}>
            Fábrica<br />De<br />Produtos
          </h1>

          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.875rem',
            color: '#808080',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            lineHeight: 1.65,
            margin: 0,
            maxWidth: '420px',
          }}>
            Uma Fábrica de Produtos dedicada à integração viscosa. Nós não apenas construímos; polarizamos ideias em ecossistemas de IA de alta fidelidade.
          </p>

          <button
            className="mold-action"
            onClick={() => onNavigate('gestao')}
            style={{
              alignSelf: 'flex-start',
              padding: '1.25rem 2.5rem',
              background: '#ffffff',
              color: '#050505',
              border: 'none',
              borderRadius: '9999px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              cursor: 'pointer',
            }}
          >
            Inicializar Sequência
          </button>
        </div>

        {/* Coluna direita */}
        <div style={{
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          paddingLeft: '5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
        }}>

          {/* Flow steps */}
          <div>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: '#808080',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              margin: '0 0 1.25rem',
            }}>
              // FLUXO_DE_PRODUÇÃO
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {FLOW_STEPS.map(({ n, title, desc }) => (
                <div key={n} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.3)',
                    paddingTop: '2px',
                    flexShrink: 0,
                    width: '1.5rem',
                  }}>
                    {n}
                  </span>
                  <div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 900,
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                      color: 'var(--text-main)',
                      marginBottom: '0.2rem',
                    }}>
                      {title}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      maxWidth: '280px',
                      lineHeight: 1.5,
                    }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Horizons */}
          <div>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: '#808080',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              margin: '0 0 1rem',
            }}>
              // HORIZONTES_DA_FÁBRICA
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {HORIZONS.map(({ h, title, desc }) => (
                <div key={h} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline' }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '2px',
                    padding: '0.125rem 0.5rem',
                    flexShrink: 0,
                  }}>
                    {h}
                  </span>
                  <div>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.8)',
                      marginRight: '0.5rem',
                    }}>
                      {title}
                    </span>
                    <span style={{
                      fontSize: '0.6rem',
                      color: '#6b7280',
                    }}>
                      {desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {NAV_LINKS.map(({ label, page }) => (
              <NavLink key={page} label={label} onClick={() => onNavigate(page)} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bloco 2 · Intro cards ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '6rem',
      }}>
        {INTRO_CARDS.map(({ n, title, desc, action }) => (
          <IntroCard
            key={n}
            n={n}
            title={title}
            desc={desc}
            action={action}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  )
}

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
      }}
    >
      <span style={{
        display: 'block',
        height: '1px',
        width: hovered ? '3rem' : '2rem',
        background: '#ffffff',
        transition: 'width 0.25s var(--ease)',
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: hovered ? '#ffffff' : 'rgba(255,255,255,0.5)',
        transition: 'color 0.25s var(--ease)',
      }}>
        {label}
      </span>
    </button>
  )
}

function IntroCard({
  n, title, desc, action, onNavigate,
}: {
  n: string
  title: string
  desc: string
  action: { label: string; page: Page } | null
  onNavigate: (p: Page) => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2rem',
        background: hovered ? 'rgba(10,10,10,0.6)' : 'rgba(10,10,10,0.3)',
        border: '1px solid',
        borderColor: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transition: 'background 0.3s var(--ease), border-color 0.3s var(--ease)',
      }}
    >
      {/* Number badge */}
      <div style={{
        width: '3rem',
        height: '3rem',
        border: '1px solid',
        borderColor: hovered ? 'transparent' : 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: hovered ? '#ffffff' : 'transparent',
        transition: 'background 0.3s var(--ease), border-color 0.3s var(--ease)',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          color: hovered ? '#000000' : 'rgba(255,255,255,0.6)',
          transition: 'color 0.3s var(--ease)',
        }}>
          {n}
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h3 style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 900,
          fontSize: '1.5rem',
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
          color: 'var(--text-main)',
          margin: 0,
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#9ca3af',
          lineHeight: 1.65,
          fontWeight: 300,
          margin: 0,
        }}>
          {desc}
        </p>
      </div>

      {/* Footer action */}
      <div>
        {action ? (
          <button
            onClick={() => onNavigate(action.page)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.5)',
              transition: 'opacity 0.2s var(--ease)',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
          >
            {action.label}
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              className="status-blink"
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--trillia-green)',
              }}
            />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.5)',
            }}>
              SISTEMA_ONLINE
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const blobRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e
      blobRefs.current.forEach((blob, i) => {
        if (!blob) return
        const shift = (i + 1) * 0.2
        blob.style.transform = `translate(${x * shift}px, ${y * shift}px)`
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const poleNRef = useRef<HTMLDivElement | null>(null)
  const poleSRef = useRef<HTMLDivElement | null>(null)

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    if (poleNRef.current) poleNRef.current.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`
    if (poleSRef.current) poleSRef.current.style.transform = `translate(${dx * -0.3}px, ${dy * -0.3}px)`
  }

  const handleLogoMouseLeave = () => {
    if (poleNRef.current) poleNRef.current.style.transform = ''
    if (poleSRef.current) poleSRef.current.style.transform = ''
  }

  return (
    <>
      {/* Grain overlay */}
      <svg className="grain-overlay" aria-hidden="true">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>

      {/* Goo filter (hidden) */}
      <svg className="goo-filter" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation={12} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Animated blob background */}
      <div
        className="canvas-container"
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      >
        {[
          { size: 400, color: 'var(--trillia-blue)' },
          { size: 300, color: 'var(--trillia-royal)' },
          { size: 500, color: 'var(--trillia-green)' },
        ].map((b, i) => (
          <div
            key={i}
            ref={el => { blobRefs.current[i] = el }}
            className="blob"
            style={{
              width: b.size,
              height: b.size,
              background: b.color,
              opacity: 0.06,
              top: `${20 + i * 20}%`,
              left: `${10 + i * 25}%`,
              transition: 'transform 0.8s var(--ease)',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: '2.5rem',
        left: '2.5rem',
        right: '2.5rem',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div
          className="logo-mark"
          style={{ gap: '0.75rem', cursor: 'default' }}
          onMouseMove={handleLogoMouseMove}
          onMouseLeave={handleLogoMouseLeave}
        >
          <div style={{ display: 'flex', gap: '3px' }}>
            <div
              ref={poleNRef}
              className="logo-pole"
              style={{ height: '22px', transition: 'transform 0.3s var(--ease)' }}
            />
            <div
              ref={poleSRef}
              className="logo-pole"
              style={{ height: '22px', transition: 'transform 0.3s var(--ease)' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}>
              Trillia
            </span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.2em',
              color: 'var(--text-dim)',
              marginTop: '2px',
            }}>
              CORE_01
            </span>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '2rem' }}>
          {NAV_ITEMS.map(({ label, page: p }) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                color: '#ffffff',
                opacity: page === p ? 1 : 0.5,
                transition: 'opacity 0.2s var(--ease)',
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main */}
      <main style={{
        minHeight: '100vh',
        padding: '2.5rem',
        paddingTop: '8rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {page === 'gestao'    && <FactoryManagement />}
        {page === 'portfolio' && <Portfolio />}
        {page === 'processo'  && <ProcessMatrix />}
        {page === 'home' && <HomeSections onNavigate={setPage} />}
      </main>

      {/* Assistant — always rendered */}
      <Assistant />

      {/* Footer */}
      <footer style={{
        position: 'fixed',
        bottom: '2.5rem',
        left: '2.5rem',
        right: '2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        pointerEvents: 'none',
        zIndex: 50,
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          color: '#444',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
        }}>
          COORD: 51.5074° N, 0.1278° W
        </span>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          color: '#444',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
        }}>
          EST. 2024 © TRILLIA_FACTORY_00
        </span>
      </footer>
    </>
  )
}
