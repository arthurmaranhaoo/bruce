import { useState, useRef, useEffect } from 'react'
import { X, RefreshCw, Loader2, Send } from 'lucide-react'
import { PRODUCTS } from '../data/products'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Você é o Bruce Assistente, agente especializado no catálogo de produtos da Trillia Factory.
Adote uma persona técnica e futurista. Use termos como "dispersão cognitiva", "refração de dados", "sintetização".
Responda sempre em Português do Brasil com formatação Markdown.
Se não encontrar a informação no contexto, informe educadamente.

CATÁLOGO COMPLETO DA TRILLIA FACTORY:
${PRODUCTS.map(p => `
---
Nome: ${p.name}
ID: ${p.id}
Horizonte: ${p.horizon}
BU: ${p.bu}
Mercado: ${p.market}
Responsável: ${p.responsible} (Squad: ${p.squad})
Descrição: ${p.description}
Problema Resolvido: ${p.problemSolved}
Casos de Uso: ${p.useCases.join(', ')}
Soluções: ${p.solutions.join(', ')}
Tecnologias: ${p.techComponents.join(', ')}
Métricas: Receita ${p.metrics.revenue} | Leads ${p.metrics.leads} | Clientes ${p.metrics.clients}
Precificação: ${p.pricing}
Cases de Sucesso: ${p.successCases.join(' | ')}
`).join('')}`

// ─── Initial message ──────────────────────────────────────────────────────────

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: 'Saudações. Sou o Bruce, sua interface de dispersão cognitiva. Como posso refratar seus dados hoje?',
}

// ─── PrismLogo ────────────────────────────────────────────────────────────────

function PrismLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      strokeWidth={2}
      style={{ filter: 'drop-shadow(0 0 5px var(--prism-2))' }}
    >
      <defs>
        <linearGradient id="prismGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="var(--prism-1)" />
          <stop offset="50%"  stopColor="var(--prism-2)" />
          <stop offset="100%" stopColor="var(--prism-3)" />
        </linearGradient>
      </defs>
      <path
        d="M20 5 L35 20 L20 35 L5 20 Z"
        stroke="url(#prismGradient)"
        className="prism-path"
      />
      <path
        d="M20 5 L20 35"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={1}
      />
    </svg>
  )
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isUser ? 'flex-end' : 'flex-start',
      gap: '0.3rem',
    }}>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '10px',
        opacity: 0.5,
        color: '#ffffff',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        {isUser ? 'USER_QUERY' : 'CORE_RESPONSE'}
      </span>
      <div style={{
        maxWidth: '85%',
        padding: '0.75rem 1rem',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        border: '1px solid rgba(255,255,255,0.1)',
        background: isUser
          ? 'linear-gradient(135deg, rgba(112,0,255,0.2), rgba(0,255,240,0.2))'
          : 'rgba(255,255,255,0.03)',
        fontSize: '0.875rem',
        color: '#e0e0e0',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {msg.content}
      </div>
    </div>
  )
}

// ─── Assistant ────────────────────────────────────────────────────────────────

const QUICK_CHIPS = ['H1?', 'Prospector Pro', 'Precificação', 'Tecnologias']

export default function Assistant() {
  const [isOpen, setIsOpen]       = useState(false)
  const [messages, setMessages]   = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput]         = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const clearChat = () => setMessages([INITIAL_MESSAGE])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = { role: 'user', content: text }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    try {
      const apiMessages = nextMessages.map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY ?? '',
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      })

      const data = await res.json()
      const reply: string = data?.content?.[0]?.text ?? 'Erro na dispersão de dados. Tente novamente.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Falha na sintetização. Verifique a conexão e tente refratar novamente.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '2.5rem',
      right: '2.5rem',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    }}>

      {/* ── Chat window ── */}
      <div style={{
        width: '420px',
        height: '600px',
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(10,10,10,0.7)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '32px',
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
        backdropFilter: 'blur(40px)',
        position: 'relative',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
        transition: 'opacity 0.3s var(--ease), transform 0.3s var(--ease)',
      }}>
        {/* Dispersion layer */}
        <div className="dispersion-layer" style={{ zIndex: 0, opacity: 0.15 }} />

        {/* Header */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <PrismLogo size={24} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#ffffff',
            }}>
              Bruce Assistente
            </span>
          </div>
          <button
            onClick={clearChat}
            title="Limpar conversa"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.35rem',
              borderRadius: '6px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Messages area */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          scrollbarWidth: 'none',
        }}>
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}

          {isLoading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--prism-2)',
            }}>
              <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                color: 'var(--prism-2)',
              }}>
                Sintetizando...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: '1rem 1.5rem 1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}>
          {/* Quick chips */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {QUICK_CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => setInput(chip)}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  padding: '0.375rem 0.75rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '9999px',
                  color: '#888',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = '#888'
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '0.75rem 1.25rem',
            transition: 'border-color 0.2s',
          }}
            onFocusCapture={e => (e.currentTarget.style.borderColor = 'rgba(0,255,240,0.5)')}
            onBlurCapture={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
              placeholder="Refratar uma consulta..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              style={{
                background: 'none',
                border: 'none',
                cursor: input.trim() && !isLoading ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                fontSize: '12px',
                color: input.trim() && !isLoading ? 'var(--prism-2)' : '#888',
                opacity: input.trim() && !isLoading ? 1 : 0.5,
                filter: input.trim() && !isLoading ? 'drop-shadow(0 0 10px var(--prism-2))' : 'none',
                transition: 'color 0.2s, opacity 0.2s, filter 0.2s',
                padding: 0,
              }}
            >
              <Send size={14} />
              SEND
            </button>
          </div>
        </div>
      </div>

      {/* ── FAB ── */}
      <button
        onClick={() => setIsOpen(o => !o)}
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          border: '1px solid',
          borderColor: isOpen ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
          background: isOpen ? '#ffffff' : 'rgba(255,255,255,0.03)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 0.3s var(--ease), border-color 0.3s var(--ease)',
        }}
      >
        {isOpen ? (
          <X size={32} color="#000000" />
        ) : (
          <div className="caustic-stage" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PrismLogo size={32} />
          </div>
        )}
      </button>
    </div>
  )
}
