'use client'

import Celular from '../components/Celular'
import { useEstado } from '../components/Estado'
import { Avatar, Icone, Numero, Pill } from '../components/ui'
import {
  EVENTOS,
  HOJE,
  MINUTO_DISPARO,
  MINUTO_FINAL,
  MINUTO_INICIAL,
  MINUTO_PAGAMENTO,
  MINUTO_RESPOSTA,
  hhmm,
  reais,
  rotuloOffset,
} from '../lib/data'

function pct(minuto) {
  return ((minuto - MINUTO_INICIAL) / (MINUTO_FINAL - MINUTO_INICIAL)) * 100
}

function Chave({ ligado, aoTrocar, titulo, texto }) {
  return (
    <div className="chave">
      <button
        type="button"
        role="switch"
        aria-checked={ligado}
        aria-label={titulo}
        className={`interruptor ${ligado ? 'ligado' : ''}`}
        onClick={() => aoTrocar(!ligado)}
      >
        <i />
      </button>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{titulo}</div>
        <div style={{ fontSize: 12, color: 'var(--suave)' }}>{texto}</div>
      </div>
    </div>
  )
}

export default function Painel() {
  const {
    hora,
    setHora,
    pagou,
    disparou,
    checarNoDisparo,
    setChecarNoDisparo,
    pausaNaResposta,
    setPausaNaResposta,
    etapaDe,
    filaMontada,
    filaNoDisparo,
    foraDaFila,
    enviadosErrados,
    errouCom,
    inalcancaveis,
    selecionado,
    setSelecionado,
  } = useEstado()

  const naFila = disparou ? filaNoDisparo.length : filaMontada.length - foraDaFila.size
  const retiradas = filaMontada.length - filaNoDisparo.length

  return (
    <>
      <h1 className="titulo-pagina">Painel do dia</h1>
      <p className="linha-fina">
        A fila do dia é montada às 06:00 com o retrato do Asaas daquele momento, e sai às 09:00.
        Arraste o relógio até o disparo e veja o que acontece com quem pagou ou respondeu no meio
        do caminho.
      </p>

      <div className="grade-numeros">
        <Numero
          rotulo="Na fila do disparo"
          valor={naFila}
          nota={`de ${filaMontada.length} montados às 06:00`}
        />
        <Numero
          rotulo="Saíram da régua"
          valor={retiradas}
          nota={retiradas ? 'pagamento ou resposta' : 'ninguém saiu ainda'}
          tom={retiradas ? 'verde' : undefined}
        />
        <Numero
          rotulo="Recebido hoje"
          valor={pagou ? reais(489) : reais(0)}
          nota={pagou ? 'PIX confirmado às 07:41' : 'nenhum pagamento até agora'}
          tom={pagou ? 'verde' : undefined}
        />
        <Numero
          rotulo="Cobrança indevida"
          valor={enviadosErrados.length}
          nota={
            enviadosErrados.length
              ? 'mensagem que não deveria ter saído'
              : 'nenhuma até agora'
          }
          tom={enviadosErrados.length ? 'coral' : undefined}
        />
      </div>

      <div className="painel">
        <div>
          <div className="cartao sobe">
            <div className="relogio">
              <div className="relogio-topo">
                <div className="relogio-hora">{hhmm(hora)}</div>
                <div style={{ fontSize: 13, color: 'var(--suave)' }}>{HOJE}</div>
                <div style={{ marginLeft: 'auto' }}>
                  {disparou ? (
                    <Pill tom={enviadosErrados.length ? 'coral' : 'verde'}>
                      {enviadosErrados.length ? 'disparo com erro' : 'disparo limpo'}
                    </Pill>
                  ) : (
                    <Pill tom="neutro">aguardando o disparo</Pill>
                  )}
                </div>
              </div>

              <div className="trilha">
                <div className="trilha-base" />
                <div className="trilha-cheia" style={{ width: `${pct(hora)}%` }} />
                {EVENTOS.map((e) => (
                  <span key={e.minuto}>
                    <i
                      className={`marca-evento ${e.tipo === 'asaas' ? 'asaas' : ''} ${
                        e.tipo === 'disparo' ? 'disparo' : ''
                      }`}
                      style={{ left: `${pct(e.minuto)}%` }}
                    />
                    <span
                      className="marca-rotulo"
                      style={{
                        left: `${pct(e.minuto)}%`,
                        transform:
                          e.minuto === MINUTO_INICIAL
                            ? 'translateX(0)'
                            : e.minuto === MINUTO_DISPARO
                            ? 'translateX(-50%)'
                            : 'translateX(-50%)',
                      }}
                    >
                      {hhmm(e.minuto)}
                    </span>
                  </span>
                ))}
                <input
                  className="faixa-slider"
                  type="range"
                  min={MINUTO_INICIAL}
                  max={MINUTO_FINAL}
                  step={1}
                  value={hora}
                  aria-label="Hora do dia"
                  onChange={(ev) => setHora(Number(ev.target.value))}
                />
              </div>

              <div className="botoes-hora">
                <button type="button" className="botao" onClick={() => setHora(MINUTO_INICIAL)}>
                  06:00 fila montada
                </button>
                <button type="button" className="botao" onClick={() => setHora(MINUTO_RESPOSTA)}>
                  07:08 aluno responde
                </button>
                <button type="button" className="botao" onClick={() => setHora(MINUTO_PAGAMENTO)}>
                  07:41 PIX cai no Asaas
                </button>
                <button
                  type="button"
                  className="botao forte"
                  onClick={() => setHora(MINUTO_DISPARO)}
                >
                  09:00 disparar a fila
                </button>
              </div>
            </div>

            <Chave
              ligado={checarNoDisparo}
              aoTrocar={setChecarNoDisparo}
              titulo="Conferir o status no Asaas na hora do disparo"
              texto="Desligado, a régua confia na fila montada às 06:00 e manda mesmo assim."
            />
            <Chave
              ligado={pausaNaResposta}
              aoTrocar={setPausaNaResposta}
              titulo="Resposta do aluno tira ele da régua"
              texto="Quem respondeu sai da fila e cai numa lista para alguém do financeiro ver."
            />
          </div>

          {disparou && enviadosErrados.length > 0 && (
            <div className="aviso-erro sobe">
              <Icone nome="alerta" tamanho={20} cor="var(--coral)" />
              <div className="txt">
                <strong>
                  {enviadosErrados.length === 1
                    ? '1 cobrança saiu para quem não devia receber.'
                    : `${enviadosErrados.length} cobranças saíram para quem não devia receber.`}
                </strong>
                <br />
                {enviadosErrados.map((e) => (
                  <span key={e.aluno.id}>
                    {e.aluno.nome} {e.motivo}, e recebeu a etapa{' '}
                    {rotuloOffset(e.aluno.offset)} às 09:00.{' '}
                  </span>
                ))}
                Abra a conversa dela no celular ao lado, a confirmação e a cobrança ficam uma
                embaixo da outra.
              </div>
            </div>
          )}

          {disparou && enviadosErrados.length === 0 && (
            <div className="aviso-ok sobe">
              <Icone nome="certo" tamanho={20} cor="var(--verde)" />
              <div className="txt">
                <strong>Disparo limpo.</strong>
                <br />
                {retiradas === 0
                  ? 'Ninguém saiu da fila entre a montagem e o disparo.'
                  : `${retiradas} alunos saíram da fila entre 06:00 e 09:00 e não receberam cobrança: quem pagou recebeu confirmação, quem respondeu foi para a fila do atendimento.`}
              </div>
            </div>
          )}

          <div className="cartao sobe" style={{ marginTop: 18 }}>
            <div className="cartao-cabeca">
              <Icone nome="raio" tamanho={17} />
              <span className="cartao-titulo">Fila das 09:00</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--fraco)' }}>
                {filaMontada.length} montados, {filaNoDisparo.length} no disparo
              </span>
            </div>
            {filaMontada.map((a) => {
              const etapa = etapaDe(a)
              const fora = foraDaFila.has(a.id)
              const errado = errouCom.has(a.id)
              return (
                <div
                  key={a.id}
                  className={`fila-linha ${selecionado === a.id ? 'escolhida' : ''} ${
                    fora ? 'removida' : ''
                  } ${errado ? 'errada' : ''}`}
                  onClick={() => setSelecionado(a.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') setSelecionado(a.id)
                  }}
                >
                  <Avatar nome={a.nome} />
                  <div>
                    <div className="fila-nome">{a.nome}</div>
                    <div className="fila-sub">
                      {etapa ? etapa.nome : 'sem etapa'} · vence {a.vencimento}
                    </div>
                  </div>
                  <div className="fila-direita">
                    <span className="fila-valor">{reais(a.valor)}</span>
                    <span
                      className={`pill ${
                        errado ? 'coral' : fora ? 'verde' : a.offset > 0 ? 'coral' : 'neutro'
                      }`}
                    >
                      <i className="ponto" />
                      {errado
                        ? 'cobrança indevida'
                        : fora
                        ? 'fora da fila'
                        : rotuloOffset(a.offset)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="cartao sobe" style={{ marginTop: 18 }}>
            <div className="cartao-cabeca">
              <Icone nome="telefoneMudo" tamanho={17} />
              <span className="cartao-titulo">Fora do alcance da automação</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--fraco)' }}>
                {inalcancaveis.length} alunos
              </span>
            </div>
            {inalcancaveis.map((a) => (
              <div className="fila-linha" key={a.id} style={{ cursor: 'default' }}>
                <Avatar nome={a.nome} />
                <div>
                  <div className="fila-nome">{a.nome}</div>
                  <div className="fila-sub">{a.motivoInalcancavel}</div>
                </div>
                <div className="fila-direita">
                  <span className="fila-valor">{reais(a.valor)}</span>
                  <span className="pill neutro">
                    <i className="ponto" />
                    {rotuloOffset(a.offset)}
                  </span>
                </div>
              </div>
            ))}
            <div className="lista-nota" style={{ color: 'var(--suave)' }}>
              Esta é a lista curta que continua precisando de gente ligando. Hoje ela está
              misturada com todos os outros inadimplentes.
            </div>
          </div>

          <div className="cartao sobe" style={{ marginTop: 18 }}>
            <div className="cartao-cabeca">
              <Icone nome="relogio" tamanho={17} />
              <span className="cartao-titulo">Eventos do dia</span>
            </div>
            {EVENTOS.map((e) => {
              const passou = hora >= e.minuto
              const agora = passou && hora < e.minuto + 20
              return (
                <div
                  key={e.minuto}
                  className={`evento ${passou ? '' : 'futuro'} ${agora ? 'agora' : ''} ${
                    e.tipo === 'disparo' ? 'disparo' : ''
                  }`}
                >
                  <i className="evento-bolinha" />
                  <div>
                    <div className="evento-titulo">
                      {hhmm(e.minuto)} · {e.titulo}
                    </div>
                    <div className="evento-detalhe">{e.detalhe}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <Celular />
      </div>
    </>
  )
}
