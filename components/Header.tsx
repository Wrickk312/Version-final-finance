'use client'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">OCT CFO — Tu CFO in‑house</Link>
        <nav className="flex items-center gap-4">
          <Link href="/#features" className="hover:underline">Funcionalidades</Link>
          <Link href="/#pricing" className="hover:underline">Pricing</Link>
          <Link href="/privacy" className="hover:underline">Privacidad</Link>
          <Link href="/cookies" className="hover:underline">Cookies</Link>
          <Link href="/login" className="rounded-xl bg-white/10 px-3 py-1 hover:bg-white/20">Login</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
