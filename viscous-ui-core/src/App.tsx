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
        {page === 'home' && (
          <div style={{ maxWidth: '900px', paddingTop: '4rem' }}>
            <h1 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: 'var(--text-main)',
              margin: 0,
              marginBottom: '2rem',
            }}>
              Fábrica<br />De Produtos
            </h1>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.85rem',
              color: 'var(--text-dim)',
              lineHeight: 1.7,
              maxWidth: '480px',
              margin: 0,
            }}>
              Central de inteligência de produtos da Trillia. Navegue pelo catálogo, acompanhe o processo e gerencie a fábrica.
            </p>
          </div>
        )}
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
