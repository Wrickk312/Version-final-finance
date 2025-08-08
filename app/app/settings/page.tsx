'use client'
import { getUser, saveUser } from '@/lib/demoStore'
import { useEffect, useState } from 'react'

export default function Settings(){
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  useEffect(()=>{
    const u = getUser()
    if(u){ setCompany(u.company); setEmail(u.email) }
  },[])
  function save(e:React.FormEvent){
    e.preventDefault()
    saveUser({company, email})
    alert('Guardado')
  }
  return (
    <form onSubmit={save} className="max-w-md space-y-3">
      <div className="text-xl font-semibold mb-2">Configuración</div>
      <input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Empresa" className="w-full rounded-xl bg-neutral-900 px-3 py-2" />
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl bg-neutral-900 px-3 py-2" />
      <button className="rounded-xl bg-white text-black px-4 py-2 font-medium">Guardar</button>
      <div className="text-sm text-neutral-400">Aquí verás consumo del plan y límites (demo).</div>
    </form>
  )
}
