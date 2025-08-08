import './globals.css'
import Header from '@/components/Header'
import React from 'react'

export const metadata = {
  title: 'OCT CFO — Gestión financiera',
  description: 'Tu CFO externo in house — demo funcional'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
