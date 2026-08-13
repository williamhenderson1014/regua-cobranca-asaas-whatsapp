'use client'

import Celular from '../../components/Celular'
import { useEstado } from '../../components/Estado'
import { Avatar, Icone } from '../../components/ui'
import { reais, rotuloOffset } from '../../lib/data'

export default function Alunos() {
  const {
    alunos,
    etapaDe,
    pausas,
    setPausas,
    pagou,
    selecionado,
    setSelecionado,
    saiuPorResposta,
    pausaNaResposta,
  } = useEstado()

  const respondeu = new Set(pausaNaResposta ? saiuPorResposta.map((a) => a.id) : [])

  function situacao(a) {
    if (a.id === 'marina' && pagou) return { tom: 'verde', texto: 'pago hoje' }
    if (pausas[a.id]) return { tom: 'neutro', texto: 'régua pausada' }
    if (respondeu.has(a.id)) return { tom: 'neutro', texto: 'aguardando o financeiro' }
    if (!a.alcancavel) return { tom: 'neutro', texto: 'fora de alcance' }
    if (a.offset > 0)
      return { tom: 'coral', texto: `${a.offset} ${a.offset === 1 ? 'dia' : 'dias'} em atraso` }
    if (a.offset === 0) return { tom: 'neutro', texto: 'vence hoje' }
    return { tom: 'neutro', texto: 'em dia' }
  }

  function trocarPausa(a) {
    setPausas((atual) => {
      const copia = { ...atual }
      if (copia[a.id]) delete copia[a.id]
      else copia[a.id] = { motivo: 'Pausa manual pelo financeiro', ate: '25/08' }
      return copia
    })
  }

  return (
    <>
      <h1 className="titulo-pagina">Alunos</h1>
      <p className="linha-fina">
        A situação financeira de cada aluno, o acesso à plataforma e a régua em que ele está. A
        pausa manual existe desde o primeiro dia, porque acordo combinado por telefone não passa
        pelo Asaas e a régua não pode continuar por cima dele.
      </p>

      <div className="duas-colunas">
        <div className="cartao sobe">
          <div className="cartao-cabeca">
            <Icone nome="pessoas" tamanho={17} />
            <span className="cartao-titulo">Base de alunos</span>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--fraco)' }}>
              {alunos.length} ativos
            </span>
          </div>
          <div className="rolagem">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>Parcela</th>
                  <th>Situação e etapa de hoje</th>
                  <th>Acesso</th>
                  <th>Régua</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((a) => {
                  const s = situacao(a)
                  const etapa = etapaDe(a)
                  const liberado = a.id === 'marina' && pagou ? true : !a.acessoBloqueado
                  return (
                    <tr
                      key={a.id}
                      onClick={() => setSelecionado(a.id)}
                      style={{
                        cursor: 'pointer',
                        background: selecionado === a.id ? 'var(--leve)' : undefined,
                      }}
                    >
                      <td>
                        <div className="celula-nome">
                          <Avatar nome={a.nome} />
                          <div>
                            <div style={{ fontWeight: 500 }}>{a.nome}</div>
                            <div style={{ fontSize: 12, color: 'var(--fraco)' }}>{a.curso}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        <div>{reais(a.valor)}</div>
                        <div style={{ fontSize: 12, color: 'var(--fraco)' }}>
                          {a.parcela} · vence {a.vencimento}
                        </div>
                      </td>
                      <td>
                        <span className={`pill ${s.tom}`}>
                          <i className="ponto" />
                          {s.texto}
                        </span>
                        <div style={{ fontSize: 12, color: 'var(--fraco)', marginTop: 3 }}>
                          {pausas[a.id] || !a.alcancavel
                            ? 'nenhuma etapa hoje'
                            : etapa
                            ? `${rotuloOffset(a.offset)} · ${etapa.nome}`
                            : 'sem etapa nesse dia'}
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            color: liberado ? 'var(--verde)' : 'var(--coral)',
                            fontSize: 12.5,
                          }}
                        >
                          <Icone nome={liberado ? 'cadeadoAberto' : 'cadeado'} tamanho={15} />
                          {liberado ? 'liberado' : 'bloqueado'}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="botao pequeno"
                          onClick={(ev) => {
                            ev.stopPropagation()
                            trocarPausa(a)
                          }}
                        >
                          {pausas[a.id] ? 'retomar' : 'pausar'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {Object.keys(pausas).length > 0 && (
            <div className="lista-nota">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Icone nome="pausa" tamanho={15} cor="var(--fraco)" />
                <strong style={{ fontSize: 13 }}>Réguas pausadas na mão</strong>
              </div>
              {Object.entries(pausas).map(([id, p]) => {
                const a = alunos.find((x) => x.id === id)
                if (!a) return null
                return (
                  <div className="pausa-caixa" key={id} style={{ marginBottom: 6 }}>
                    {a.nome} · {p.motivo} · volta em {p.ate}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <Celular />
      </div>
    </>
  )
}
