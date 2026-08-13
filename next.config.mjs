// Build padrão: Next.js normal, é o que o Vercel importa sem nenhum ajuste.
// Build com PAGES=1: export estático com basePath, para servir no GitHub Pages.
const pages = process.env.PAGES === '1'
const repo = '/regua-cobranca-asaas-whatsapp'

/** @type {import('next').NextConfig} */
const nextConfig = pages
  ? {
      output: 'export',
      trailingSlash: true,
      basePath: repo,
      assetPrefix: repo,
      images: { unoptimized: true },
    }
  : {}

export default nextConfig
