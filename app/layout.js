import { Poppins } from 'next/font/google'
import './globals.css'
import Estado from '../components/Estado'
import Shell from '../components/Shell'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Régua financeira · demonstração',
  description:
    'Automação de cobranças ligando Asaas, WhatsApp e a plataforma do aluno. Demonstração com dados inventados.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>
        <Estado>
          <Shell>{children}</Shell>
        </Estado>
      </body>
    </html>
  )
}
