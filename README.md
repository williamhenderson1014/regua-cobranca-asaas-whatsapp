# Régua financeira, demonstração

Demonstração de uma automação de cobranças ligando Asaas, WhatsApp e a plataforma do aluno.
Next.js, uma base de dados inventada dentro de `lib/data.js`, sem backend, sem banco e sem
chamada externa nenhuma. Nada do que aparece na tela é real: alunos, valores, telefones,
códigos PIX e boletos são todos fictícios.

## O que ela existe para mostrar

Uma régua de cobrança que consulta o Asaas uma vez por dia monta a fila de manhã e dispara
horas depois. Entre um momento e o outro alguém paga, e alguém responde. A demonstração deixa
esses dois eventos acontecerem na frente de quem está olhando.

O painel do dia tem um relógio que vai das 06:00 às 10:00 e duas chaves:

- **Conferir o status no Asaas na hora do disparo.** Desligada, a régua confia na fila montada
  às 06:00. A aluna que pagou às 07:41 recebe a confirmação de pagamento e, oitenta minutos
  depois, a cobrança de atraso. As duas mensagens ficam uma embaixo da outra na conversa.
- **Resposta do aluno tira ele da régua.** Desligada, quem escreveu às 07:08 dizendo que já
  pagou continua recebendo cobrança por cima da própria resposta.

Ligue as duas e o disparo sai limpo. Desligue e o contador de cobrança indevida sobe.

## As três telas

| Rota | O que tem |
|---|---|
| `/` | Painel do dia, relógio, fila do disparo, eventos, conversa do WhatsApp ao lado |
| `/regua` | Etapas da régua com as copies editáveis, variáveis, anexos e criação de etapa nova |
| `/alunos` | Base de alunos, situação financeira, acesso à plataforma e pausa manual da régua |

## Rodar

```
npm install
npm run dev
```

Build de produção com `npm run build`. Sai estático, sem variável de ambiente, e sobe no Vercel
com o preset Next.js sem nenhum ajuste.

## Onde mexer

- `lib/data.js` tem os alunos, as etapas iniciais, os eventos do dia e os formatadores.
- `components/Estado.js` tem toda a regra: quem entra na fila, quem sai, e o que conta como
  cobrança indevida.
- `components/Celular.js` monta a conversa do WhatsApp a partir das etapas.
- `app/globals.css` tem a paleta fechada em quatro cores e as animações. Sem gradiente.
