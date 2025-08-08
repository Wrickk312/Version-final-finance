'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useAuthed(){
  const [ready, setReady] = useState(false)
  const [authed, setAuthed] = useState(false)
  useEffect(() => {
    const u = localStorage.getItem('demo_user')
    setAuthed(!!u)
    setReady(true)
  }, [])
  return {ready, authed}
}

export default function AuthGuard({children}:{children:React.ReactNode}){
  const {ready, authed} = useAuthed()
  const r = useRouter()
  useEffect(()=>{
    if(ready && !authed) r.replace('/login')
  }, [ready, authed, r])
  if(!ready) return <div className="container py-10">Cargando…</div>
  if(!authed) return null
  return <>{children}</>
}
