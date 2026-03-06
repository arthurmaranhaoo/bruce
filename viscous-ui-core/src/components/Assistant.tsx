import { useState } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'

export function Assistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 80,
            right: 24,
            width: 340,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '14px 16px',
              background: 'var(--sidebar)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p className="text-sm font-bold text-white">Bruce</p>
              <p className="label-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>Assistente Trillia</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', padding: 4 }}
            >
              <X size={16} />
            </button>
          </div>
          <div style={{ padding: 16, minHeight: 180, flex: 1 }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Olá! Sou o Bruce, assistente de dados da Trillia. Como posso ajudar?
            </p>
          </div>
          <div
            style={{
              padding: '10px 12px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: 8,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte algo..."
              style={{
                flex: 1,
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '7px 10px',
                fontSize: 13,
                outline: 'none',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
              }}
            />
            <button
              className="btn-primary"
              style={{ padding: '7px 12px' }}
              onClick={() => setInput('')}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'var(--sidebar)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          zIndex: 100,
          transition: 'transform 0.2s var(--ease)',
          color: 'white',
        }}
        title="Bruce – Assistente Trillia"
      >
        <MessageSquare size={20} />
      </button>
    </>
  )
}
