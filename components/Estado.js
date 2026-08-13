'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import {
  ALUNOS,
  ETAPAS_INICIAIS,
  MINUTO_DISPARO,
  MINUTO_INICIAL,
  MINUTO_PAGAMENTO,
} from '../lib/data'

const Ctx = createContext(null)

export function useEstado() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useEstado precisa estar dentro de Estado')
  return v
}

export default function Estado({ children }) {
  const [hora, setHora] = useState(MINUTO_INICIAL)
  const [checarNoDisparo, setChecarNoDisparo] = useState(true)
  const [pausaNaResposta, setPausaNaResposta] = useState(true)
  const [etapas, setEtapas] = useState(ETAPAS_INICIAIS)
  const [selecionado, setSelecionado] = useState('marina')
  const [pausas, setPausas] = useState({
    heitor: { motivo: 'Acordo de nova data por telefone', ate: '25/08' },
  })

  const pagou = hora >= MINUTO_PAGAMENTO
  const disparou = hora >= MINUTO_DISPARO

  const etapaDe = useMemo(() => {
    const mapa = new Map(etapas.map((e) => [e.offset, e]))
    return (aluno) => mapa.get(aluno.offset) || null
  }, [etapas])

  // A fila é montada às 06:00, a partir do retrato do Asaas daquele momento.
  const filaMontada = useMemo(
    () => ALUNOS.filter((a) => a.alcancavel && etapaDe(a) && !pausas[a.id]),
    [etapaDe, pausas]
  )

  // Quem sai da fila entre a montagem e o disparo, e por quê.
  const saiuPorPagamento = useMemo(
    () => (pagou ? filaMontada.filter((a) => a.id === 'marina') : []),
    [pagou, filaMontada]
  )

  const saiuPorResposta = useMemo(
    () => filaMontada.filter((a) => a.respondeu && hora >= a.respondeu.minuto),
    [filaMontada, hora]
  )

  const foraDaFila = useMemo(() => {
    const ids = new Set()
    if (checarNoDisparo) saiuPorPagamento.forEach((a) => ids.add(a.id))
    if (pausaNaResposta) saiuPorResposta.forEach((a) => ids.add(a.id))
    return ids
  }, [checarNoDisparo, pausaNaResposta, saiuPorPagamento, saiuPorResposta])

  const filaNoDisparo = useMemo(
    () => filaMontada.filter((a) => !foraDaFila.has(a.id)),
    [filaMontada, foraDaFila]
  )

  // Mensagens que não deveriam ter saído, e o motivo de cada uma.
  const enviadosErrados = useMemo(() => {
    if (!disparou) return []
    const lista = []
    if (!checarNoDisparo) {
      saiuPorPagamento.forEach((a) =>
        lista.push({ aluno: a, motivo: 'já tinha pago às 07:41' })
      )
    }
    if (!pausaNaResposta) {
      saiuPorResposta.forEach((a) =>
        lista.push({ aluno: a, motivo: 'tinha respondido às 07:08' })
      )
    }
    return lista
  }, [disparou, checarNoDisparo, pausaNaResposta, saiuPorPagamento, saiuPorResposta])

  const errouCom = useMemo(
    () => new Set(enviadosErrados.map((e) => e.aluno.id)),
    [enviadosErrados]
  )

  const inalcancaveis = useMemo(() => ALUNOS.filter((a) => !a.alcancavel), [])

  const valor = {
    hora,
    setHora,
    pagou,
    disparou,
    checarNoDisparo,
    setChecarNoDisparo,
    pausaNaResposta,
    setPausaNaResposta,
    etapas,
    setEtapas,
    etapaDe,
    filaMontada,
    filaNoDisparo,
    foraDaFila,
    saiuPorPagamento,
    saiuPorResposta,
    enviadosErrados,
    errouCom,
    inalcancaveis,
    selecionado,
    setSelecionado,
    pausas,
    setPausas,
    alunos: ALUNOS,
  }

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}
