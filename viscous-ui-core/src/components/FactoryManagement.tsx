import { useState, useEffect, useRef } from 'react'
import { TrendingUp, Users, Target, Layers, BarChart3 } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar,
} from 'recharts'

// ─── Mock data ────────────────────────────────────────────────────────────────

const mockData = [
  { name: 'Market Intelligence Hub',  bu: 'S&M e Inteligência de Mercado', horizon: 'H1', revenue: 120000, leads: 450,  clients: 15,  owner: 'Ana Silva' },
  { name: 'Prospector Pro',           bu: 'S&M e Inteligência de Mercado', horizon: 'H1', revenue: 240000, leads: 1200, clients: 120, owner: 'Bruno Costa' },
  { name: 'Identity Guard AI',        bu: 'Loss Prevention',               horizon: 'H1', revenue: 480000, leads: 300,  clients: 8,   owner: 'Carlos Santos' },
  { name: 'Transactional Shield',     bu: 'Loss Prevention',               horizon: 'H1', revenue: 720000, leads: 150,  clients: 25,  owner: 'Daniela Lima' },
  { name: 'Credit Decision Engine',   bu: 'Crédito e Cobrança',            horizon: 'H1', revenue: 310000, leads: 200,  clients: 12,  owner: 'Eduardo Rocha' },
  { name: 'Recovery Optimizer',       bu: 'Crédito e Cobrança',            horizon: 'H1', revenue: 250000, leads: 400,  clients: 18,  owner: 'Fernanda Oliveira' },
  { name: 'Smart Underwriter',        bu: 'Cotação e Subscrição',          horizon: 'H2', revenue: 180000, leads: 100,  clients: 5,   owner: 'Gabriel Santos' },
  { name: 'Collateral Registry AI',   bu: 'Negócios e Infraestrutura',     horizon: 'H2', revenue: 150000, leads: 120,  clients: 10,  owner: 'Helena Souza' },
  { name: 'Market Data Analytics Hub',bu: 'Capital Markets',               horizon: 'H1', revenue: 540000, leads: 80,   clients: 15,  owner: 'Igor Mendes' },
]

const cumulativeData2026 = [
  { month: 'JAN', actual:   45000, target:   50000 },
  { month: 'FEV', actual:   98000, target:  105000 },
  { month: 'MAR', actual:  165000, target:  170000 },
  { month: 'ABR', actual:  240000, target:  245000 },
  { month: 'MAI', actual:  330000, target:  325000 },
  { month: 'JUN', actual:  425000, target:  415000 },
  { month: 'JUL', actual:  530000, target:  510000 },
  { month: 'AGO', actual:  645000, target:  615000 },
  { month: 'SET', actual:  770000, target:  730000 },
  { month: 'OUT', actual:  910000, target:  860000 },
  { month: 'NOV', actual: 1060000, target: 1000000 },
  { month: 'DEZ', actual: 1250000, target: 1150000 },
]

// ─── Derived data ─────────────────────────────────────────────────────────────

const buMap = new Map<string, number>()
for (const d of mockData) buMap.set(d.bu, (buMap.get(d.bu) ?? 0) + d.revenue)
const buData = Array.from(buMap.entries()).map(([bu, revenue]) => ({ bu, revenue }))

const hzMap = new Map<string, { count: number; revenue: number }>()
for (const d of mockData) {
  const prev = hzMap.get(d.horizon) ?? { count: 0, revenue: 0 }
  hzMap.set(d.horizon, { count: prev.count + 1, revenue: prev.revenue + d.revenue })
}
const horizonBarData = Array.from(hzMap.entries()).map(([horizon, v]) => ({
  horizon,
  count: v.count,
  revenue: parseFloat((v.revenue / 1_000_000).toFixed(1)),
}))

const PIE_COLORS = ['#ffffff', '#888888', '#444444', '#222222', '#ff4d00', '#333333']

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtCurrency = (v: number) =>
  v >= 1_000_000
    ? `$${(v / 1_000_000).toFixed(2)}M`
    : `$${(v / 1_000).toFixed(0)}k`

const HORIZON_STYLE: Record<string, React.CSSProperties> = {
  H1: { borderColor: '#ff4d00', color: '#ff4d00' },
  H2: { borderColor: '#555',    color: '#808080' },
  H3: { borderColor: '#333',    color: '#444' },
}

type MockRow = typeof mockData[number]

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({
  label, value, Icon, trend,
}: {
  label: string
  value: string
  Icon: React.ElementType
  trend?: string
}) {
  return (
    <div className="molded-card" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          color: '#808080',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}>
          {label}
        </span>
        <div style={{
          padding: '0.5rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.4)',
        }}>
          <Icon size={14} />
        </div>
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 300,
        fontSize: '1.5rem',
        color: '#e0e0e0',
        marginBottom: trend ? '0.4rem' : 0,
      }}>
        {value}
      </div>
      {trend && (
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          color: '#10b981',
        }}>
          {trend}
        </span>
      )}
    </div>
  )
}

// ─── Product modal ────────────────────────────────────────────────────────────

function ProductModal({ product, onClose }: { product: MockRow; onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0a0a0c',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          width: '100%', maxWidth: '28rem',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem 1.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
              padding: '0.2rem 0.5rem', borderRadius: '3px',
              border: '1px solid',
              ...HORIZON_STYLE[product.horizon],
              display: 'inline-block', marginBottom: '0.5rem',
            }}>
              {product.horizon}
            </span>
            <h3 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 900,
              fontSize: '1.25rem', textTransform: 'uppercase',
              letterSpacing: '-0.03em', color: '#e0e0e0', margin: 0,
            }}>
              {product.name}
            </h3>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.1)',
            color: '#808080', width: '1.75rem', height: '1.75rem',
            borderRadius: '50%', cursor: 'pointer',
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            ×
          </button>
        </div>

        {/* Metrics 2×2 */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '1px', background: 'rgba(255,255,255,0.05)',
          margin: '0 1.5rem',
        }}>
          {[
            { label: 'Receita',   value: fmtCurrency(product.revenue) },
            { label: 'Clientes',  value: String(product.clients) },
            { label: 'Leads',     value: String(product.leads) },
            { label: 'BU',        value: product.bu },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: '#141417', padding: '0.85rem 1rem' }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem',
                color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem',
              }}>
                {label}
              </div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: label === 'BU' ? '0.65rem' : '1rem',
                fontWeight: 600, color: '#e0e0e0', lineHeight: 1.2,
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Owner */}
        <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff4d00', flexShrink: 0, display: 'inline-block' }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#808080' }}>
            {product.owner}
          </span>
        </div>

        {/* Orange bar */}
        <div style={{ height: 4, background: '#ff4d00', width: '100%' }} />
      </div>
    </div>
  )
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: {
  active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#141417', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '6px', padding: '0.6rem 0.9rem',
      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
    }}>
      <div style={{ color: '#808080', marginBottom: '0.3rem' }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color || '#e0e0e0' }}>
          {p.name}: {p.name === 'actual' || p.name === 'target' ? `$${(p.value / 1000).toFixed(0)}k` : p.value}
        </div>
      ))}
    </div>
  )
}

// ─── FactoryManagement ────────────────────────────────────────────────────────

export default function FactoryManagement() {
  const [selectedProduct, setSelectedProduct] = useState<MockRow | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const rx = (e.clientY - cy) * 0.005
      const ry = (e.clientX - cx) * -0.005
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`
    }
    const handleMouseLeave = () => { el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)' }
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* 1 · Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
        <StatCard label="Receita Total"   value="$1.25M"  Icon={TrendingUp} trend="↑ +12.5%" />
        <StatCard label="Clientes Ativos" value="1.242"   Icon={Users}      trend="↑ +5.4%"  />
        <StatCard label="Total de Leads"  value="3.450"   Icon={Users}      trend="↑ +8.2%"  />
        <StatCard label="Produtos Ativos" value="42"      Icon={Target} />
        <StatCard label="Eficiência"      value="94.2%"   Icon={Layers} />
      </div>

      {/* 2 · Dashboard strata */}
      <div
        ref={containerRef}
        className="dashboard-strata-container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '2px',
          background: '#2b2b31',
          transition: 'transform 0.1s linear',
        }}
      >
        {/* Left — area chart */}
        <div style={{ background: '#0a0a0c', padding: '4rem' }}>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
            color: '#808080', textTransform: 'uppercase', letterSpacing: '0.2em',
            margin: '0 0 1rem',
          }}>
            // Estratos de Performance
          </p>
          <h2 style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            textTransform: 'uppercase', letterSpacing: '-0.04em',
            lineHeight: 0.9, color: '#e0e0e0', margin: '0 0 0.5rem',
          }}>
            Acúmulo de<br />Receita
          </h2>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
            color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em',
            margin: '0 0 2.5rem',
          }}>
            Ano Fiscal 2026 // Delta Cumulativo
          </p>

          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={cumulativeData2026} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="sedimentaryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#4a4a52" stopOpacity={0.8} />
                  <stop offset="50%" stopColor="#383840" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0a0a0c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="month"
                stroke="#808080" fontSize={10}
                fontFamily="JetBrains Mono, monospace"
                tickLine={false} axisLine={false}
              />
              <YAxis
                stroke="#808080" fontSize={10}
                fontFamily="JetBrains Mono, monospace"
                tickLine={false} axisLine={false}
                tickFormatter={v => `$${v / 1000}k`}
                width={55}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone" dataKey="actual" name="actual"
                fill="url(#sedimentaryGradient)" stroke="#e0e0e0" strokeWidth={2}
              />
              <Area
                type="monotone" dataKey="target" name="target"
                fill="none" stroke="#444444" strokeWidth={1} strokeDasharray="4 4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Right — 3 stacked cells */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>

          {/* Cell 1 — Pie BU */}
          <div style={{ background: '#0a0a0c', padding: '2rem', flex: '0 0 auto' }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
              color: '#808080', textTransform: 'uppercase', letterSpacing: '0.15em',
              margin: '0 0 1rem',
            }}>
              // DISTRIBUIÇÃO_POR_BU
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <PieChart width={110} height={110}>
                <Pie data={buData} dataKey="revenue" cx={55} cy={55} innerRadius={28} outerRadius={50}>
                  {buData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', overflow: 'hidden' }}>
                {buData.map((d, i) => (
                  <div key={d.bu} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: PIE_COLORS[i % PIE_COLORS.length],
                      flexShrink: 0, display: 'inline-block',
                    }} />
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem',
                      color: '#808080', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {d.bu.split(' ')[0]} — {fmtCurrency(d.revenue)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cell 2 — Bar horizons */}
          <div style={{ background: '#0a0a0c', padding: '2rem', flex: '0 0 auto' }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
              color: '#808080', textTransform: 'uppercase', letterSpacing: '0.15em',
              margin: '0 0 1rem',
            }}>
              // HORIZONTES
            </p>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={horizonBarData} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category" dataKey="horizon"
                  stroke="#555" fontSize={9}
                  fontFamily="JetBrains Mono, monospace"
                  tickLine={false} axisLine={false} width={24}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="revenue" fill="#ff4d00" barSize={12} radius={[0, 2, 2, 0]} name="revenue" />
                <Bar dataKey="count"   fill="#4a4a52" barSize={12} radius={[0, 2, 2, 0]} name="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cell 3 — Efficiency */}
          <div style={{
            background: '#0a0a0c', padding: '2rem',
            flex: 1,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', textAlign: 'center',
            gap: '0.75rem',
          }}>
            <div style={{
              padding: '0.75rem',
              background: 'rgba(255,77,0,0.1)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BarChart3 size={20} color="#ff4d00" />
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 900,
              fontSize: '3rem', letterSpacing: '-0.04em', color: '#e0e0e0', lineHeight: 1,
            }}>
              94.2%
            </div>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem',
              color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em',
            }}>
              Eficiência Operacional
            </span>
          </div>
        </div>
      </div>

      {/* 3 · Product table */}
      <div style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', padding: '2rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
            color: '#ff4d00', textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0 0 0.25rem',
          }}>
            // Inventário de Produtos
          </p>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem',
            color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0,
          }}>
            Matriz de Gestão
          </p>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Produto', 'BU', 'Horizonte', 'Receita', 'Leads'].map(col => (
                <th key={col} style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                  color: '#808080', textTransform: 'uppercase', letterSpacing: '0.15em',
                  textAlign: 'left', padding: '0 0.75rem 0.75rem',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  fontWeight: 400,
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <TableRow key={i} row={row} onClick={() => setSelectedProduct(row)} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}

// ─── Table row ────────────────────────────────────────────────────────────────

function TableRow({ row, onClick }: { row: MockRow; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const hs = HORIZON_STYLE[row.horizon]
  return (
    <tr
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        cursor: 'pointer',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        transition: 'background 0.15s',
      }}
    >
      <td style={{ padding: '0.85rem 0.75rem' }}>
        <span style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 700,
          fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '-0.02em',
          color: hovered ? '#ff4d00' : '#e0e0e0',
          transition: 'color 0.15s',
        }}>
          {row.name}
        </span>
      </td>
      <td style={{ padding: '0.85rem 0.75rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6b7280' }}>
        {row.bu}
      </td>
      <td style={{ padding: '0.85rem 0.75rem' }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
          padding: '0.15rem 0.45rem', borderRadius: '3px',
          border: '1px solid', ...hs,
        }}>
          {row.horizon}
        </span>
      </td>
      <td style={{ padding: '0.85rem 0.75rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#e0e0e0', fontWeight: 600 }}>
        {fmtCurrency(row.revenue)}
      </td>
      <td style={{ padding: '0.85rem 0.75rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#808080' }}>
        {row.leads}
      </td>
    </tr>
  )
}
