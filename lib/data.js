// Dados inventados. Nenhum aluno, valor ou telefone aqui é real.
// A data de referência da demonstração é 13 de agosto de 2026.

export const HOJE = '13 de agosto de 2026'

// offset = dias em relação ao vencimento. Negativo é antes, positivo é atraso.
export const ALUNOS = [
  {
    id: 'marina',
    nome: 'Marina Duarte',
    curso: 'Pós em Nutrição Clínica',
    telefone: '(31) 9 8812-4477',
    valor: 489,
    parcela: '7 de 12',
    vencimento: '10/08',
    offset: 3,
    alcancavel: true,
    acessoBloqueado: true,
  },
  {
    id: 'heitor',
    nome: 'Heitor Vasques',
    curso: 'Técnico em Radiologia',
    telefone: '(31) 9 9410-2035',
    valor: 372,
    parcela: '3 de 18',
    vencimento: '08/08',
    offset: 5,
    alcancavel: true,
    acessoBloqueado: true,
  },
  {
    id: 'juliana',
    nome: 'Juliana Prado',
    curso: 'Pós em Nutrição Clínica',
    telefone: '(31) 9 9187-6602',
    valor: 489,
    parcela: '7 de 12',
    vencimento: '13/08',
    offset: 0,
    alcancavel: true,
    acessoBloqueado: false,
  },
  {
    id: 'wesley',
    nome: 'Wesley Antunes',
    curso: 'MBA em Gestão de Clínicas',
    telefone: '(31) 9 8330-7719',
    valor: 815,
    parcela: '2 de 10',
    vencimento: '13/08',
    offset: 0,
    alcancavel: true,
    acessoBloqueado: false,
  },
  {
    id: 'tarcisio',
    nome: 'Tarcísio Melo',
    curso: 'Técnico em Radiologia',
    telefone: '(31) 9 9008-4451',
    valor: 372,
    parcela: '4 de 18',
    vencimento: '12/08',
    offset: 1,
    alcancavel: true,
    acessoBloqueado: false,
    respondeu: {
      minuto: 428,
      texto: 'Bom dia! Paguei ontem à noite pelo PIX, já mando o comprovante aqui.',
    },
  },
  {
    id: 'bianca',
    nome: 'Bianca Rezende',
    curso: 'MBA em Gestão de Clínicas',
    telefone: '(31) 9 9773-1188',
    valor: 815,
    parcela: '5 de 10',
    vencimento: '14/08',
    offset: -1,
    alcancavel: true,
    acessoBloqueado: false,
  },
  {
    id: 'noemi',
    nome: 'Noemi Barcelos',
    curso: 'Pós em Nutrição Clínica',
    telefone: '(31) 9 9265-3390',
    valor: 489,
    parcela: '6 de 12',
    vencimento: '16/08',
    offset: -3,
    alcancavel: true,
    acessoBloqueado: false,
  },
  {
    id: 'silvio',
    nome: 'Sílvio Camargo',
    curso: 'Técnico em Radiologia',
    telefone: '(31) 9 9622-0714',
    valor: 372,
    parcela: '2 de 18',
    vencimento: '16/08',
    offset: -3,
    alcancavel: true,
    acessoBloqueado: false,
  },
  {
    id: 'renan',
    nome: 'Renan Sobral',
    curso: 'MBA em Gestão de Clínicas',
    telefone: '(31) 9 9500-1846',
    valor: 815,
    parcela: '1 de 10',
    vencimento: '03/08',
    offset: 10,
    alcancavel: false,
    motivoInalcancavel: 'Número não está mais no WhatsApp',
    acessoBloqueado: true,
  },
  {
    id: 'cleusa',
    nome: 'Cleusa Amorim',
    curso: 'Pós em Nutrição Clínica',
    telefone: 'sem telefone no cadastro',
    valor: 489,
    parcela: '4 de 12',
    vencimento: '08/08',
    offset: 5,
    alcancavel: false,
    motivoInalcancavel: 'Cadastro sem telefone',
    acessoBloqueado: true,
  },
]

export const ETAPAS_INICIAIS = [
  {
    id: 'e1',
    offset: -3,
    nome: 'Lembrete amigável',
    texto:
      'Oi {{primeiro_nome}}, tudo certo? Sua parcela de {{curso}} vence em {{dias}} dias, dia {{vencimento}}, no valor de {{valor}}. Se quiser adiantar, é só me responder aqui que eu mando o boleto e o PIX.',
    anexos: [],
  },
  {
    id: 'e2',
    offset: -1,
    nome: 'Véspera do vencimento',
    texto:
      '{{primeiro_nome}}, amanhã vence a parcela {{parcela}} de {{curso}}, {{valor}}. Já deixo aqui o boleto e a chave PIX pra você não precisar pedir.',
    anexos: ['boleto', 'pix'],
  },
  {
    id: 'e3',
    offset: 0,
    nome: 'Cobrança do dia',
    texto:
      '{{primeiro_nome}}, hoje é o vencimento da parcela {{parcela}}, {{valor}}. Segue o boleto em PDF, e logo abaixo o PIX copia e cola numa mensagem separada, é só tocar e copiar.',
    anexos: ['boleto', 'pix'],
  },
  {
    id: 'e4',
    offset: 1,
    nome: 'Primeiro aviso de atraso',
    texto:
      '{{primeiro_nome}}, a parcela de ontem ({{valor}}) ainda não caiu aqui. Pode ser só o banco demorando. Se já pagou, me responde que eu confiro e encerro.',
    anexos: ['pix'],
  },
  {
    id: 'e5',
    offset: 3,
    nome: 'Aviso de pendência',
    texto:
      '{{primeiro_nome}}, sua parcela venceu em {{vencimento}} e segue em aberto, {{valor}}. Consigo reemitir com a data de hoje se ficar melhor, é só responder.',
    anexos: ['boleto', 'pix'],
  },
  {
    id: 'e6',
    offset: 5,
    nome: 'Aviso de bloqueio de acesso',
    texto:
      '{{primeiro_nome}}, com {{dias}} dias de atraso o acesso à plataforma entra em bloqueio automático. Quitando hoje, a liberação é na hora, sem precisar falar com ninguém.',
    anexos: ['pix'],
  },
  {
    id: 'e7',
    offset: 7,
    nome: 'Tentativa de negociação',
    texto:
      '{{primeiro_nome}}, prefiro resolver isso junto. Consigo dividir em duas ou empurrar o vencimento. Me diz o que cabe no seu mês que eu monto.',
    anexos: [],
  },
  {
    id: 'e8',
    offset: 10,
    nome: 'Direcionamento para atendimento humano',
    texto:
      '{{primeiro_nome}}, vou passar seu caso para a Ariana, do financeiro, que fala com você direto ainda hoje. Se preferir adiantar, responde aqui.',
    anexos: [],
  },
]

export const EVENTOS = [
  {
    minuto: 360,
    tipo: 'fila',
    titulo: 'Fila do dia montada',
    detalhe: 'Retrato do Asaas às 06:00, 7 alunos com etapa correspondente hoje.',
  },
  {
    minuto: 428,
    tipo: 'resposta',
    titulo: 'Tarcísio Melo respondeu no WhatsApp',
    detalhe: 'Mensagem recebida fora da régua, ainda sem ninguém do financeiro ter visto.',
  },
  {
    minuto: 461,
    tipo: 'asaas',
    titulo: 'Asaas: PAYMENT_RECEIVED',
    detalhe: 'Marina Duarte, R$ 489,00, PIX. Cobrança pay_8842K1.',
  },
  {
    minuto: 540,
    tipo: 'disparo',
    titulo: 'Disparo da fila',
    detalhe: 'Horário configurado de envio das etapas do dia.',
  },
]

export const MINUTO_INICIAL = 360
export const MINUTO_FINAL = 600
export const MINUTO_RESPOSTA = 428
export const MINUTO_PAGAMENTO = 461
export const MINUTO_DISPARO = 540

export const PIX_COPIA_COLA =
  '00020126580014BR.GOV.BCB.PIX0136f4c1a9e2-5b70-4d31-9a88-2c0e7d5104b95204000053039865802BR5921INSTITUTO MERIDIANO6009BELO HORIZ62070503***6304A1F2'

export function hhmm(minuto) {
  const h = Math.floor(minuto / 60)
  const m = minuto % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function reais(v) {
  return `R$ ${v.toFixed(2).replace('.', ',')}`
}

export function primeiroNome(nome) {
  return nome.split(' ')[0]
}

export function iniciais(nome) {
  const p = nome.split(' ')
  return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase()
}

export function preencher(texto, aluno, etapa) {
  return texto
    .replaceAll('{{primeiro_nome}}', primeiroNome(aluno.nome))
    .replaceAll('{{nome}}', aluno.nome)
    .replaceAll('{{curso}}', aluno.curso)
    .replaceAll('{{valor}}', reais(aluno.valor))
    .replaceAll('{{parcela}}', aluno.parcela)
    .replaceAll('{{vencimento}}', aluno.vencimento)
    .replaceAll('{{dias}}', String(Math.abs(etapa ? etapa.offset : aluno.offset)))
}

export function rotuloOffset(offset) {
  if (offset < 0) return `D${offset}`
  if (offset === 0) return 'D0'
  return `D+${offset}`
}

export function descricaoOffset(offset) {
  const d = Math.abs(offset)
  const palavra = d === 1 ? 'dia' : 'dias'
  if (offset < 0) return `${d} ${palavra} antes do vencimento`
  if (offset === 0) return 'no dia do vencimento'
  return `${d} ${palavra} de atraso`
}
