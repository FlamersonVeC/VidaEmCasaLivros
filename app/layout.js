import "./globals.css";

export const metadata = {
  title: 'Livros Vida em Casa',
  description: 'Pagina com todos os livros do vida em casa.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="Pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
