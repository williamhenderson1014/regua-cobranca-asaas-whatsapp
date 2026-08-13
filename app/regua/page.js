'use client'

import { useState } from 'react'
import { useEstado } from '../../components/Estado'
import { Icone } from '../../components/ui'
import {
  ALUNOS,
  PIX_COPIA_COLA,
  descricaoOffset,
  preencher,
  reais,
  rotuloOffset,
} from '../../lib/data'

const VARIAVEIS = [
  '{{primeiro_nome}}',
  '{{nome}}',
  '{{curso}}',
  '{{valor}}',
  '{{parcela}}',
  '{{vencimento}}',
  '{{dias}}',
]

const EXEMPLO = ALUNOS.find((a) => a.id === 'marina')

export default function Regua() {
  const { etapas, setEtapas } = useEstado()
  const [previa, setPrevia] = useState('e5')
  const [novoOffset, setNovoOffset] = useState('14')
  const [novoNome, setNovoNome] = useState('')

  const ordenadas = [...etapas].sort((a, b) => a.offset - b.offset)
  const etapaPrevia = etapas.find((e) => e.id === previa) || ordenadas[0]

  function alterar(id, campo, valor) {
    setEtapas((atual) => atual.map((e) => (e.id === id ? { ...e, [campo]: valor } : e)))
  }

  function trocarAnexo(id, anexo) {
    setEtapas((atual) =>
      atual.map((e) =>
        e.id === id
          ? {
              ...e,
              anexos: e.anexos.includes(anexo)
                ? e.anexos.filter((x) => x !== anexo)
                : [...e.anexos, anexo],
            }
          : e
      )
    )
  }

  function remover(id) {
    setEtapas((atual) => atual.filter((e) => e.id !== id))
  }

  function criar() {
    const offset = Number(novoOffset)
    if (!Number.isFinite(offset)) return
    if (etapas.some((e) => e.offset === offset)) return
    const id = `n${offset}-${etapas.length}`
    setEtapas((atual) => [
      ...atual,
      {
        id,
        offset,
        nome: novoNome.trim() || `Etapa ${rotuloOffset(offset)}`,
        texto: '{{primeiro_nome}}, ',
        anexos: [],
      },
    ])
    setNovoNome('')
    setPrevia(id)
  }

  const ocupados = new Set(etapas.map((e) => e.offset))
  const conflito = ocupados.has(Number(novoOffset))

  return (
    <>
      <h1 className="titulo-pagina">Régua e copies</h1>
      <p className="linha-fina">
        As mensagens não moram no código. Cada etapa é um registro com um deslocamento em dias, um
        texto e os anexos que saem junto. A equipe edita, cria etapa nova e apaga etapa sem
        precisar de ninguém.
      </p>

      <div className="regua-grade">
        <div className="cartao sobe">
          <div className="cartao-cabeca">
            <Icone nome="setaCirculo" tamanho={17} />
            <span className="cartao-titulo">Etapas ativas</span>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--fraco)' }}>
              {etapas.length} etapas
            </span>
          </div>

          {ordenadas.map((e) => (
            <div
              className="etapa"
              key={e.id}
              onFocus={() => setPrevia(e.id)}
              onClick={() => setPrevia(e.id)}
            >
              <div className="etapa-cabeca">
                <span
                  className={`etapa-offset ${e.offset < 0 ? 'antes' : ''} ${
                    e.offset > 0 ? 'atraso' : ''
                  }`}
                >
                  {rotuloOffset(e.offset)}
                </span>
                <input
                  className="etapa-nome"
                  value={e.nome}
                  aria-label={`Nome da etapa ${rotuloOffset(e.offset)}`}
                  onChange={(ev) => alterar(e.id, 'nome', ev.target.value)}
                />
                <span style={{ fontSize: 12, color: 'var(--fraco)' }}>
                  {descricaoOffset(e.offset)}
                </span>
                <button
                  type="button"
                  className="botao pequeno"
                  onClick={() => remover(e.id)}
                  aria-label={`Apagar etapa ${e.nome}`}
                >
                  apagar
                </button>
              </div>

              <textarea
                className="etapa-texto"
                value={e.texto}
                aria-label={`Texto da etapa ${e.nome}`}
                onChange={(ev) => alterar(e.id, 'texto', ev.target.value)}
              />

              <div className="variaveis">
                {VARIAVEIS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    className="variavel"
                    onClick={() => alterar(e.id, 'texto', `${e.texto} ${v}`)}
                  >
                    {v}
                  </button>
                ))}
                <button
                  type="button"
                  className={`anexo-escolha ${e.anexos.includes('boleto') ? 'ativo' : ''}`}
                  onClick={() => trocarAnexo(e.id, 'boleto')}
                >
                  <Icone nome="documento" tamanho={12} />
                  boleto em PDF
                </button>
                <button
                  type="button"
                  className={`anexo-escolha ${e.anexos.includes('pix') ? 'ativo' : ''}`}
                  onClick={() => trocarAnexo(e.id, 'pix')}
                >
                  <Icone nome="pix" tamanho={12} />
                  PIX em mensagem separada
                </button>
              </div>
            </div>
          ))}

          <div className="nova-etapa">
            <Icone nome="mais" tamanho={16} cor="var(--fraco)" />
            <span style={{ fontSize: 13, color: 'var(--suave)' }}>Nova etapa em D+</span>
            <input
              className="campo-numero"
              type="number"
              value={novoOffset}
              aria-label="Dias da nova etapa"
              onChange={(ev) => setNovoOffset(ev.target.value)}
            />
            <input
              className="campo-texto"
              placeholder="nome da etapa, por exemplo Último aviso"
              value={novoNome}
              aria-label="Nome da nova etapa"
              onChange={(ev) => setNovoNome(ev.target.value)}
            />
            <button type="button" className="botao forte" onClick={criar} disabled={conflito}>
              criar etapa
            </button>
            {conflito && (
              <span style={{ fontSize: 12, color: 'var(--coral)' }}>
                já existe etapa nesse dia
              </span>
            )}
          </div>
        </div>

        <div className="cartao sobe" style={{ position: 'sticky', top: 84 }}>
          <div className="cartao-cabeca">
            <Icone nome="olho" tamanho={17} />
            <span className="cartao-titulo">Prévia com aluno real</span>
          </div>
          <div style={{ padding: '14px 18px 6px', fontSize: 12.5, color: 'var(--suave)' }}>
            {EXEMPLO.nome}, {EXEMPLO.curso}, parcela {EXEMPLO.parcela} de{' '}
            {reais(EXEMPLO.valor)}, vencida em {EXEMPLO.vencimento}.
          </div>
          <div style={{ padding: '6px 18px 18px' }}>
            {etapaPrevia && (
              <>
                <div className="balao estoura" style={{ alignSelf: 'stretch', maxWidth: '100%' }}>
                  {etapaPrevia.anexos.includes('boleto') && (
                    <div className="anexo-boleto">
                      <Icone nome="documento" tamanho={20} />
                      <div>
                        <div className="anexo-nome">boleto-marina-7.pdf</div>
                        <div className="anexo-meta">
                          PDF, 78 kB, vencimento {EXEMPLO.vencimento}
                        </div>
                      </div>
                    </div>
                  )}
                  {preencher(etapaPrevia.texto, EXEMPLO, etapaPrevia)}
                  <span className="balao-hora">09:00</span>
                </div>
                {etapaPrevia.anexos.includes('pix') && (
                  <div
                    className="balao estoura"
                    style={{ alignSelf: 'stretch', maxWidth: '100%', marginTop: 8 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <Icone nome="pix" tamanho={14} />
                      <strong style={{ fontSize: 11.5 }}>PIX copia e cola</strong>
                    </div>
                    <div className="pix-codigo">{PIX_COPIA_COLA}</div>
                    <span className="balao-hora">09:00</span>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="lista-nota" style={{ fontSize: 12.5, color: 'var(--suave)' }}>
            Toque em qualquer etapa da esquerda para ver como ela chega. O PIX sempre sai numa
            mensagem própria, para o aluno copiar sem selecionar texto no meio de um parágrafo.
          </div>
        </div>
      </div>
    </>
  )
}
