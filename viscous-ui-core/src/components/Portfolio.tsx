import { useState, useMemo } from 'react'
import { LayoutGrid, List, Search } from 'lucide-react'
import { PRODUCTS, type Product } from '../data/products'

type ViewMode = 'grid' | 'list'

const HORIZON_STYLES: Record<string, { bg: string; color: string }> = {
  H1: { bg: 'rgba(255,77,0,0.15)', color: '#ff4d00' },
  H2: { bg: 'rgba(255,255,255,0.07)', color: '#808080' },
  H3: { bg: 'rgba(255,255,255,0.04)', color: '#555' },
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function HorizonBadge({ h }: { h: string }) {
  const s = HORIZON_STYLES[h] ?? HORIZON_STYLES.H3
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.6rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      padding: '0.2rem 0.5rem',
      borderRadius: '4px',
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.color}33`,
    }}>
      {h}
    </span>
  )
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0a0a0c',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '1rem',
          width: '100%',
          maxWidth: '42rem',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <HorizonBadge h={product.horizon} />
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: '1.75rem',
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              color: '#e0e0e0',
              margin: 0,
            }}>
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#808080',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Metrics grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          {[
            { label: 'Revenue', value: product.metrics.revenue },
            { label: 'Leads',   value: product.metrics.leads },
            { label: 'Clientes', value: product.metrics.clients },
            { label: 'BU',      value: product.bu },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: '#141417', padding: '1rem', textAlign: 'center' }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.35rem',
              }}>
                {label}
              </div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: label === 'BU' ? '0.7rem' : '1rem',
                fontWeight: 600,
                color: '#e0e0e0',
                lineHeight: 1.2,
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <ModalSection label="PROBLEMA" text={product.problemSolved} />
        <ModalListSection label="CASOS DE USO" items={product.useCases} />
        <ModalListSection label="SOLUÇÕES" items={product.solutions} />

        {/* Tecnologias */}
        <div>
          <SectionLabel>// TECNOLOGIAS</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {product.techComponents.map(t => (
              <span key={t} style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                color: '#e0e0e0',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <ModalListSection label="CASES DE SUCESSO" items={product.successCases} />
        <ModalSection label="PRECIFICAÇÃO" text={product.pricing} />

        {/* Responsável */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#ff4d00',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: '#808080',
          }}>
            {product.responsible} · {product.squad}
          </span>
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.6rem',
      color: '#ff4d00',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      margin: 0,
    }}>
      {children}
    </p>
  )
}

function ModalSection({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <SectionLabel>// {label}</SectionLabel>
      <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>{text}</p>
    </div>
  )
}

function ModalListSection({ label, items }: { label: string; items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <SectionLabel>// {label}</SectionLabel>
      <ul style={{ margin: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {items.map((item, i) => (
          <li key={i} style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: 1.5 }}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

// ─── Filter bar inputs ────────────────────────────────────────────────────────

const INPUT_STYLE: React.CSSProperties = {
  background: '#0a0a0c',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '8px',
  padding: '0.625rem 1rem',
  color: '#e0e0e0',
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: '0.75rem',
  width: '100%',
  outline: 'none',
  boxSizing: 'border-box',
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ bu: 'All', market: 'All', horizon: 'All' })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const bus      = useMemo(() => ['All', ...Array.from(new Set(PRODUCTS.map(p => p.bu)))], [])
  const markets  = useMemo(() => ['All', ...Array.from(new Set(PRODUCTS.map(p => p.market)))], [])
  const horizons = ['All', 'H1', 'H2', 'H3']

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return PRODUCTS.filter(p => {
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      const matchesBu     = filters.bu === 'All' || p.bu === filters.bu
      const matchesMkt    = filters.market === 'All' || p.market === filters.market
      const matchesHz     = filters.horizon === 'All' || p.horizon === filters.horizon
      return matchesSearch && matchesBu && matchesMkt && matchesHz
    })
  }, [searchQuery, filters])

  const resetFilters = () => {
    setSearchQuery('')
    setFilters({ bu: 'All', market: 'All', horizon: 'All' })
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', maxWidth: '80rem', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: '3rem',
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            color: '#e0e0e0',
            margin: 0,
            lineHeight: 1,
          }}>
            Catálogo de Produtos
          </h1>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: '#808080',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            margin: '0.5rem 0 0',
          }}>
            Catálogo Geral &amp; Deep Dive
          </p>
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', gap: '0.25rem', background: '#141417', padding: '0.25rem', borderRadius: '8px' }}>
          {([['grid', LayoutGrid], ['list', List]] as const).map(([mode, Icon]) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: viewMode === mode ? '#ff4d00' : 'transparent',
                color: viewMode === mode ? '#ffffff' : '#808080',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        background: '#141417',
        padding: '1.5rem',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '12px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#808080',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Buscar produto..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ ...INPUT_STYLE, paddingLeft: '2.25rem' }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,77,0,0.5)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
          />
        </div>

        {/* BU */}
        <select
          value={filters.bu}
          onChange={e => setFilters(f => ({ ...f, bu: e.target.value }))}
          style={INPUT_STYLE}
        >
          {bus.map(b => <option key={b} value={b}>{b === 'All' ? 'Todas as BUs' : b}</option>)}
        </select>

        {/* Market */}
        <select
          value={filters.market}
          onChange={e => setFilters(f => ({ ...f, market: e.target.value }))}
          style={INPUT_STYLE}
        >
          {markets.map(m => <option key={m} value={m}>{m === 'All' ? 'Todos os Mercados' : m}</option>)}
        </select>

        {/* Horizon */}
        <select
          value={filters.horizon}
          onChange={e => setFilters(f => ({ ...f, horizon: e.target.value }))}
          style={INPUT_STYLE}
        >
          {horizons.map(h => <option key={h} value={h}>{h === 'All' ? 'Todos os Horizontes' : h}</option>)}
        </select>
      </div>

      {/* Results count */}
      <p style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.65rem',
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        marginBottom: '1.25rem',
      }}>
        // {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
      </p>

      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', paddingTop: '5rem', paddingBottom: '5rem' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#e0e0e0',
            marginBottom: '0.5rem',
          }}>
            Nenhum produto encontrado
          </p>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: '#555',
            marginBottom: '1.5rem',
          }}>
            Tente ajustar os filtros ou limpar a busca.
          </p>
          <button
            onClick={resetFilters}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0.6rem 1.5rem',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '6px',
              color: '#e0e0e0',
              cursor: 'pointer',
            }}
          >
            Limpar filtros
          </button>
        </div>
      )}

      {/* Grid view */}
      {filteredProducts.length > 0 && viewMode === 'grid' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}>
          {filteredProducts.map(product => (
            <GridCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
          ))}
        </div>
      )}

      {/* List view */}
      {filteredProducts.length > 0 && viewMode === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {filteredProducts.map(product => (
            <ListRow key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}

// ─── Grid card ────────────────────────────────────────────────────────────────

function GridCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0a0a0c',
        border: '1px solid',
        borderColor: hovered ? 'rgba(255,77,0,0.3)' : 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'border-color 0.2s var(--ease)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}
    >
      {/* Top badges */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <HorizonBadge h={product.horizon} />
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.55rem',
          color: '#555',
          letterSpacing: '0.05em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '160px',
        }}>
          {product.bu}
        </span>
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        fontSize: '1.15rem',
        textTransform: 'uppercase',
        letterSpacing: '-0.03em',
        color: hovered ? '#ff4d00' : '#e0e0e0',
        margin: '1rem 0 0.5rem',
        lineHeight: 1.1,
        transition: 'color 0.2s var(--ease)',
      }}>
        {product.name}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.8rem',
        color: '#9ca3af',
        lineHeight: 1.55,
        margin: '0 0 1.25rem',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
        flex: 1,
      }}>
        {product.description}
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '0.75rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          color: '#808080',
        }}>
          {product.responsible}
        </span>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem',
          color: '#e0e0e0',
          fontWeight: 600,
        }}>
          {product.metrics.revenue}
        </span>
      </div>
    </div>
  )
}

// ─── List row ─────────────────────────────────────────────────────────────────

function ListRow({ product, onClick }: { product: Product; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0a0a0c',
        border: '1px solid',
        borderColor: hovered ? 'rgba(255,77,0,0.3)' : 'rgba(255,255,255,0.05)',
        borderRadius: '8px',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'border-color 0.2s var(--ease)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <HorizonBadge h={product.horizon} />
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 900,
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          color: hovered ? '#ff4d00' : '#e0e0e0',
          transition: 'color 0.2s var(--ease)',
        }}>
          {product.name}
        </span>
      </div>
      <span style={{
        fontSize: '0.8rem',
        color: '#6b7280',
        flex: 1,
        textAlign: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        padding: '0 1rem',
      }}>
        {product.bu}
      </span>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.8rem',
        color: '#e0e0e0',
        fontWeight: 600,
        flexShrink: 0,
      }}>
        {product.metrics.revenue}
      </span>
    </div>
  )
}
