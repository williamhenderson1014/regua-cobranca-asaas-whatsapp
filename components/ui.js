// Ícones em SVG inline, traço único, sem dependência externa.

export function Icone({ nome, tamanho = 16, cor = 'currentColor' }) {
  const comum = {
    width: tamanho,
    height: tamanho,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: cor,
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: false,
  }

  if (nome === 'relogio')
    return (
      <svg {...comum}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    )

  if (nome === 'raio')
    return (
      <svg {...comum}>
        <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
      </svg>
    )

  if (nome === 'documento')
    return (
      <svg {...comum}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    )

  if (nome === 'pix')
    return (
      <svg {...comum}>
        <path d="m12 3 4.2 4.2a2 2 0 0 0 1.4.6H19l2 2-2 2h-1.4a2 2 0 0 0-1.4.6L12 16.6 7.8 12.4a2 2 0 0 0-1.4-.6H5l-2-2 2-2h1.4a2 2 0 0 0 1.4-.6z" />
        <path d="m12 16.6 3 3a2 2 0 0 1-3 1.4 2 2 0 0 1-3-1.4z" />
      </svg>
    )

  if (nome === 'certo')
    return (
      <svg {...comum}>
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12.3 2.4 2.4 4.6-5" />
      </svg>
    )

  if (nome === 'alerta')
    return (
      <svg {...comum}>
        <path d="M12 4.5 3 19.5h18z" />
        <path d="M12 10v4" />
        <path d="M12 17.2h.01" />
      </svg>
    )

  if (nome === 'cadeado')
    return (
      <svg {...comum}>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
        <path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" />
      </svg>
    )

  if (nome === 'cadeadoAberto')
    return (
      <svg {...comum}>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
        <path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 6.7-1.4" />
      </svg>
    )

  if (nome === 'conversa')
    return (
      <svg {...comum}>
        <path d="M21 11.6c0 4-3.9 7.2-8.7 7.2a10 10 0 0 1-2.6-.34L4.5 20.5l1.2-3.5A6.9 6.9 0 0 1 3.6 11.6C3.6 7.6 7.5 4.4 12.3 4.4S21 7.6 21 11.6z" />
      </svg>
    )

  if (nome === 'pausa')
    return (
      <svg {...comum}>
        <rect x="7" y="5" width="3.4" height="14" rx="1" />
        <rect x="13.6" y="5" width="3.4" height="14" rx="1" />
      </svg>
    )

  if (nome === 'pessoas')
    return (
      <svg {...comum}>
        <circle cx="9.5" cy="8.5" r="3.3" />
        <path d="M3.5 20a6 6 0 0 1 12 0" />
        <path d="M16.5 6.2a3.3 3.3 0 0 1 0 6.4" />
        <path d="M18 14.6a6 6 0 0 1 3 5.4" />
      </svg>
    )

  if (nome === 'antena')
    return (
      <svg {...comum}>
        <circle cx="12" cy="12" r="2.4" />
        <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4" />
        <path d="M4.8 4.8a10 10 0 0 0 0 14.4M19.2 19.2a10 10 0 0 0 0-14.4" />
      </svg>
    )

  if (nome === 'setaCirculo')
    return (
      <svg {...comum}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 12h5M12.5 9.5l2.5 2.5-2.5 2.5" />
      </svg>
    )

  if (nome === 'mais')
    return (
      <svg {...comum}>
        <path d="M12 5.5v13M5.5 12h13" />
      </svg>
    )

  if (nome === 'olho')
    return (
      <svg {...comum}>
        <path d="M2.6 12S6.3 5.8 12 5.8 21.4 12 21.4 12 17.7 18.2 12 18.2 2.6 12 2.6 12z" />
        <circle cx="12" cy="12" r="2.7" />
      </svg>
    )

  if (nome === 'telefoneMudo')
    return (
      <svg {...comum}>
        <path d="M4.2 5.6a1.8 1.8 0 0 1 1.8-1.8h2.1l1.5 3.8-1.9 1.4a12 12 0 0 0 5.3 5.3l1.4-1.9 3.8 1.5V18a1.8 1.8 0 0 1-1.8 1.8A15.6 15.6 0 0 1 4.2 5.6z" />
        <path d="m3.4 3.4 17.2 17.2" />
      </svg>
    )

  return null
}

export function Avatar({ nome }) {
  const partes = nome.split(' ')
  const letras = (partes[0][0] + (partes[1] ? partes[1][0] : '')).toUpperCase()
  return (
    <div className="avatar" aria-hidden="true">
      {letras}
    </div>
  )
}

export function Pill({ tom = 'neutro', children }) {
  return (
    <span className={`pill ${tom}`}>
      <i className="ponto" />
      {children}
    </span>
  )
}

export function Numero({ rotulo, valor, nota, tom }) {
  const cor = tom === 'verde' ? 'var(--verde)' : tom === 'coral' ? 'var(--coral)' : 'var(--tinta)'
  return (
    <div className="numero sobe">
      <div className="rotulo">{rotulo}</div>
      <div className="valor" style={{ color: cor }}>
        {valor}
      </div>
      <div className="nota">{nota}</div>
    </div>
  )
}
