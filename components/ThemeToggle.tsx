'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    document.documentElement.classList.toggle('dark', saved === 'dark')
    setDark(saved === 'dark')
  }, [])
  const toggle = () => {
    const next = dark ? 'light' : 'dark'
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    setDark(next === 'dark')
  }
  return (
    <button onClick={toggle} className="rounded-2xl border px-3 py-1 text-sm hover:bg-neutral-800">
      {dark ? '☽ Dark' : '☀ Light'}
    </button>
  )
}
