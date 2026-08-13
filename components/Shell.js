'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icone } from './ui'

const PAGINAS = [
  { href: '/', rotulo: 'Painel do dia' },
  { href: '/regua', rotulo: 'Régua e copies' },
  { href: '/alunos', rotulo: 'Alunos' },
]

export default function Shell({ children }) {
  const caminho = usePathname()

  return (
    <div className="casca">
      <header className="topo">
        <div className="topo-dentro">
          <div className="marca">
            <Icone nome="antena" tamanho={20} />
            <div>
              <div>Régua financeira</div>
              <span className="sub">Asaas, WhatsApp e plataforma do aluno</span>
            </div>
          </div>
          <nav className="nav">
            {PAGINAS.map((p) => (
              <Link key={p.href} href={p.href} className={caminho === p.href ? 'ativo' : ''}>
                {p.rotulo}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="corpo">{children}</main>

      <footer className="rodape">
        <div className="rodape-dentro">
          <div className="rodape-aviso">
            Demonstração com dados inventados. Alunos, valores, telefones e códigos PIX desta tela
            não existem, e nenhum preço aqui é orçamento.
          </div>
          <div>Sem backend, sem banco, nada sai daqui.</div>
          <div>2026</div>
        </div>
      </footer>
    </div>
  )
}
