import { useState } from 'react'
import { processStages, type ProcessStage } from '../data/processStages'

// ─── Horizon config ───────────────────────────────────────────────────────────

const HORIZON_COLOR: Record<string, string> = {
  'H3: VALIDAÇÃO':  '#808080',
  'H2: CRESCIMENTO': 'rgba(255,77,0,0.7)',
  'H1: ESCALA':     '#ff4d00',
}

// Group stages by horizon preserving order
const HORIZON_ORDER = ['H3: VALIDAÇÃO', 'H2: CRESCIMENTO', 'H1: ESCALA']
const groupedStages = HORIZON_ORDER.map(hz => ({
  horizon: hz,
  color: HORIZON_COLOR[hz],
  stages: processStages.filter(s => s.horizon === hz),
}))

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.6rem',
      color: '#ff4d00',
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      margin: '0 0 0.75rem',
    }}>
      {children}
    </p>
  )
}

function InfoCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: '#141417',
      borderRadius: '8px',
      padding: '1.5rem',
      border: '1px solid rgba(255,255,255,0.05)',
    }}>
      <SectionLabel>// {label}</SectionLabel>
      {children}
    </div>
  )
}

function StageCanvas({ stage }: { stage: ProcessStage }) {
  const hzColor = HORIZON_COLOR[stage.horizon] ?? '#808080'

  return (
    <div style={{
      background: '#0a0a0c',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '12px',
      padding: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
    }}>
      {/* Top */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          color: hzColor,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          border: `1px solid ${hzColor}55`,
          padding: '0.2rem 0.6rem',
          borderRadius: '3px',
          display: 'inline-block',
          marginBottom: '1rem',
        }}>
          {stage.horizon}
        </span>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: '#555',
          }}>
            {stage.id}
          </span>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            color: '#e0e0e0',
            margin: 0,
            lineHeight: 1,
          }}>
            {stage.title}
          </h2>
        </div>

        <p style={{
          fontSize: '0.875rem',
          color: '#9ca3af',
          lineHeight: 1.65,
          maxWidth: '42rem',
          margin: '0 0 1rem',
        }}>
          {stage.description}
        </p>

        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          color: '#808080',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '9999px',
          padding: '0.25rem 0.75rem',
          display: 'inline-block',
        }}>
          {stage.canvas.duration}
        </span>
      </div>

      {/* 2×2 grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
        marginBottom: '1.5rem',
      }}>
        <InfoCell label="OBJETIVO">
          <p style={{ fontSize: '0.875rem', color: '#d1d5db', margin: 0, lineHeight: 1.6 }}>
            {stage.canvas.objective}
          </p>
        </InfoCell>

        <InfoCell label="ENTRADA">
          <p style={{ fontSize: '0.875rem', color: '#d1d5db', margin: 0, lineHeight: 1.6 }}>
            {stage.canvas.entryGate}
          </p>
        </InfoCell>

        <InfoCell label="SAÍDA">
          <p style={{ fontSize: '0.875rem', color: '#d1d5db', margin: 0, lineHeight: 1.6 }}>
            {stage.canvas.exitGate}
          </p>
        </InfoCell>

        <InfoCell label="DURAÇÃO + TIME">
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: '1.5rem',
            color: '#ffffff',
            letterSpacing: '-0.03em',
            marginBottom: '0.75rem',
          }}>
            {stage.canvas.duration}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {stage.canvas.team.map(member => (
              <span key={member} style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                padding: '0.2rem 0.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                color: '#d1d5db',
              }}>
                {member}
              </span>
            ))}
          </div>
        </InfoCell>
      </div>

      {/* Full-width sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <InfoCell label="ARTEFATOS">
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {stage.canvas.artifacts.map(a => (
              <li key={a} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#ff4d00', flexShrink: 0, lineHeight: 1.6 }}>▸</span>
                <span style={{ fontSize: '0.875rem', color: '#d1d5db', lineHeight: 1.5 }}>{a}</span>
              </li>
            ))}
          </ul>
        </InfoCell>

        <InfoCell label="CRITÉRIOS DE GATE">
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {stage.canvas.gateCriteria.map(c => (
              <li key={c} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#10b981', flexShrink: 0, lineHeight: 1.6 }}>✓</span>
                <span style={{ fontSize: '0.875rem', color: '#d1d5db', lineHeight: 1.5 }}>{c}</span>
              </li>
            ))}
          </ul>
        </InfoCell>
      </div>

      {/* Gate badge */}
      <div>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          color: '#ff4d00',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          border: '1px solid rgba(255,77,0,0.3)',
          borderRadius: '2px',
          padding: '0.5rem 1rem',
          display: 'inline-block',
        }}>
          {stage.gate}
        </span>
      </div>
    </div>
  )
}

// ─── ProcessMatrix ────────────────────────────────────────────────────────────

export default function ProcessMatrix() {
  const [selectedStage, setSelectedStage] = useState<ProcessStage | null>(processStages[0])

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', maxWidth: '80rem', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem',
          color: '#808080',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          margin: '0 0 0.75rem',
        }}>
          // METODOLOGIA_PROPRIETÁRIA
        </p>
        <h1 style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 900,
          fontSize: '3rem',
          textTransform: 'uppercase',
          letterSpacing: '-0.04em',
          color: '#e0e0e0',
          margin: '0 0 0.75rem',
          lineHeight: 1,
        }}>
          Processo<br />de Produto
        </h1>
        <p style={{
          fontSize: '0.875rem',
          color: '#9ca3af',
          maxWidth: '36rem',
          margin: 0,
          lineHeight: 1.6,
        }}>
          Da tese ao escalonamento. Cada etapa tem entradas, saídas, artefatos e critérios de gate definidos.
        </p>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem' }}>

        {/* Left — stage list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {groupedStages.map(({ horizon, color, stages }) => (
            <div key={horizon}>
              {/* Horizon label */}
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color,
                margin: '0 0 0.75rem',
              }}>
                {horizon}
              </p>

              {/* Stages with vertical line */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ width: '2px', background: color, borderRadius: '1px', flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {stages.map(stage => {
                    const isActive = selectedStage?.id === stage.id
                    return (
                      <button
                        key={stage.id}
                        onClick={() => setSelectedStage(stage)}
                        style={{
                          textAlign: 'left',
                          cursor: 'pointer',
                          padding: '1rem',
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: isActive ? 'rgba(255,77,0,0.3)' : 'transparent',
                          background: isActive ? 'rgba(255,77,0,0.05)' : 'transparent',
                          transition: 'border-color 0.2s var(--ease), background 0.2s var(--ease)',
                          width: '100%',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            e.currentTarget.style.borderColor = 'transparent'
                            e.currentTarget.style.background = 'transparent'
                          }
                        }}
                      >
                        <span style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.6rem',
                          color: '#808080',
                          display: 'block',
                          marginBottom: '0.25rem',
                        }}>
                          {stage.id}
                        </span>
                        <span style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          textTransform: 'uppercase',
                          letterSpacing: '-0.02em',
                          color: isActive ? '#ff4d00' : '#e0e0e0',
                          display: 'block',
                          transition: 'color 0.2s var(--ease)',
                        }}>
                          {stage.title}
                        </span>
                        <span style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.6rem',
                          color: '#6b7280',
                          marginTop: '0.25rem',
                          display: 'block',
                        }}>
                          {stage.focus}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right — canvas */}
        <div>
          {selectedStage
            ? <StageCanvas stage={selectedStage} />
            : (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '400px', color: '#555',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem',
              }}>
                // Selecione um estágio
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
