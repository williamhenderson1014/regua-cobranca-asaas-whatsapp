'use client'

import { useEffect, useRef, useState } from 'react'
import { useEstado } from './Estado'
import { Icone } from './ui'
import { PIX_COPIA_COLA, hhmm, preencher, reais } from '../lib/data'

const MESES = { '07': 'julho', '08': 'agosto', '09': 'setembro' }

function dataDoOffset(vencimento, k) {
  const [d, m] = vencimento.split('/')
  let dia = Number(d) + k
  let mes = m
  if (dia <= 0) {
    dia += 31
    mes = '07'
  } else if (dia > 31) {
    dia -= 31
    mes = '09'
  }
  return `${String(dia).padStart(2, '0')} de ${MESES[mes]}`
}

function BalaoBoleto({ aluno }) {
  return (
    <div className="anexo-boleto">
      <Icone nome="documento" tamanho={20} />
      <div>
        <div className="anexo-nome">boleto-{aluno.id}-{aluno.parcela.split(' ')[0]}.pdf</div>
        <div className="anexo-meta">
          PDF, 78 kB, vencimento {aluno.vencimento}, {reais(aluno.valor)}
        </div>
      </div>
    </div>
  )
}

function BalaoPix({ hora }) {
  const [copiado, setCopiado] = useState(false)
  return (
    <div className="balao estoura">
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <Icone nome="pix" tamanho={14} />
        <strong style={{ fontSize: 11.5 }}>PIX copia e cola</strong>
      </div>
      <div className="pix-codigo">{PIX_COPIA_COLA}</div>
      <button
        type="button"
        className="pix-botao"
        onClick={() => {
          setCopiado(true)
          if (navigator.clipboard) navigator.clipboard.writeText(PIX_COPIA_COLA).catch(() => {})
          setTimeout(() => setCopiado(false), 1800)
        }}
      >
        {copiado ? 'copiado' : 'copiar código'}
      </button>
      <span className="balao-hora">{hora}</span>
    </div>
  )
}

export default function Celular() {
  const {
    alunos,
    selecionado,
    etapas,
    etapaDe,
    hora,
    pagou,
    disparou,
    foraDaFila,
    errouCom,
    pausas,
  } = useEstado()

  const aluno = alunos.find((a) => a.id === selecionado) || alunos[0]
  const etapaHoje = etapaDe(aluno)
  const rolagem = useRef(null)

  const blocos = []

  const anteriores = etapas
    .filter((e) => e.offset < aluno.offset)
    .sort((a, b) => a.offset - b.offset)

  for (const e of anteriores) {
    blocos.push({
      chave: `p-${e.id}`,
      data: dataDoOffset(aluno.vencimento, e.offset),
      hora: '09:00',
      tipo: 'saida',
      texto: preencher(e.texto, aluno, e),
      boleto: e.anexos.includes('boleto'),
      pix: e.anexos.includes('pix'),
    })
  }

  if (aluno.respondeu && hora >= aluno.respondeu.minuto) {
    blocos.push({
      chave: 'resposta',
      data: 'hoje',
      hora: hhmm(aluno.respondeu.minuto),
      tipo: 'entrada',
      texto: aluno.respondeu.texto,
    })
  }

  if (aluno.id === 'marina' && pagou) {
    blocos.push({
      chave: 'confirma',
      data: 'hoje',
      hora: '07:41',
      tipo: 'saida',
      tom: 'verde',
      texto: `Marina, recebemos ${reais(
        aluno.valor
      )} agora. Parcela ${aluno.parcela} quitada, pode ignorar as mensagens anteriores.`,
    })
    blocos.push({
      chave: 'libera',
      data: 'hoje',
      hora: '07:41',
      tipo: 'saida',
      tom: 'verde',
      texto: 'Seu acesso à plataforma já foi liberado, é só entrar normalmente.',
    })
  }

  if (disparou && etapaHoje && aluno.alcancavel && !pausas[aluno.id]) {
    const errado = errouCom.has(aluno.id)
    const suprimido = foraDaFila.has(aluno.id)
    if (!suprimido) {
      blocos.push({
        chave: 'hoje',
        data: 'hoje',
        hora: '09:00',
        tipo: 'saida',
        tom: errado ? 'erro' : undefined,
        erro: errado,
        texto: preencher(etapaHoje.texto, aluno, etapaHoje),
        boleto: etapaHoje.anexos.includes('boleto'),
        pix: etapaHoje.anexos.includes('pix'),
      })
    }
  }

  let dataAtual = null
  const linhas = []
  for (const b of blocos) {
    if (b.data !== dataAtual) {
      dataAtual = b.data
      linhas.push(
        <div className="dia-separador" key={`d-${b.chave}`}>
          {b.data}
        </div>
      )
    }
    linhas.push(
      <div
        className={`balao ${b.tipo === 'entrada' ? 'aluno' : ''} ${b.tom || ''} estoura`}
        key={b.chave}
      >
        {b.erro && (
          <span className="marca-erro">
            <Icone nome="alerta" tamanho={12} />
            cobrança indevida
          </span>
        )}
        {b.boleto && <BalaoBoleto aluno={aluno} />}
        {b.texto}
        <span className="balao-hora">{b.hora}</span>
      </div>
    )
    if (b.pix) {
      linhas.push(<BalaoPix hora={b.hora} key={`${b.chave}-pix`} />)
    }
  }

  useEffect(() => {
    const el = rolagem.current
    if (!el) return
    const t = setTimeout(() => {
      el.scrollTop = el.scrollHeight
    }, 60)
    return () => clearTimeout(t)
  }, [linhas.length, aluno.id, disparou, pagou])

  return (
    <div className="celular">
      <div className="celular-tela">
        <div className="celular-topo">
          <div className="avatar">
            {aluno.nome
              .split(' ')
              .slice(0, 2)
              .map((p) => p[0])
              .join('')
              .toUpperCase()}
          </div>
          <div>
            <div className="celular-nome">{aluno.nome}</div>
            <div className="celular-sub">{aluno.telefone}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Icone nome="conversa" tamanho={17} cor="var(--fraco)" />
          </div>
        </div>
        <div className="conversa" ref={rolagem}>
          {linhas.length ? (
            linhas
          ) : (
            <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--fraco)', fontSize: 12 }}>
              Nenhuma mensagem enviada para este aluno ainda.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
