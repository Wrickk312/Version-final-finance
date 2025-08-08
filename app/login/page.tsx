'use client'
import { useRouter } from 'next/navigation'
import { saveUser } from '@/lib/demoStore'

export default function Login(){
  const r = useRouter()
  function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = String(data.get('email')||'')
    const company = String(data.get('company')||'')
    if(!email || !company){ alert('Completa email y empresa'); return }
    saveUser({email, company})
    localStorage.setItem('demo_user', JSON.stringify({email, company}))
    r.push('/app/dashboard')
  }
  return (
    <div className="container py-12 max-w-md">
      <div className="rounded-2xl border border-neutral-800 p-6">
        <div className="text-xl font-semibold mb-4">Acceder</div>
        <form onSubmit={submit} className="space-y-3">
          <input name="email" type="email" placeholder="Email" className="w-full rounded-xl bg-neutral-900 px-3 py-2" />
          <input name="company" placeholder="Nombre de tu empresa" className="w-full rounded-xl bg-neutral-900 px-3 py-2" />
          <button className="rounded-xl bg-white text-black px-4 py-2 font-medium w-full">Entrar</button>
        </form>
      </div>
    </div>
  )
}
