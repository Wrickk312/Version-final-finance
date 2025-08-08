'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  {href:'/app/dashboard', label:'Dashboard'},
  {href:'/app/pnl', label:'Cuenta de Explotación'},
  {href:'/app/taxes', label:'Impuestos'},
  {href:'/app/income', label:'Ingresos'},
  {href:'/app/expenses', label:'Gastos'},
  {href:'/app/bank', label:'Conciliación'},
  {href:'/app/drive', label:'Repositorio'},
  {href:'/app/settings', label:'Configuración'},
]

export default function Tabs(){
  const p = usePathname()
  return (
    <div className="container mt-4 mb-6 flex flex-wrap gap-2">
      {items.map(i => (
        <Link key={i.href} href={i.href} className={`rounded-xl border px-3 py-1 text-sm hover:bg-neutral-800 ${p===i.href?'bg-neutral-800 border-neutral-700':'border-neutral-800'}`}>
          {i.label}
        </Link>
      ))}
    </div>
  )
}
