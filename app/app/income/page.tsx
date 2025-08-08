'use client'
import { addRows, listRows, saveRows, type Row } from '@/lib/demoStore'
import { useEffect, useState } from 'react'

export default function Income(){
  const [rows, setRows] = useState<Row[]>([])
  const [form, setForm] = useState({cliente:'', base:'0', ivaTipo:'21'})
  useEffect(()=>{ setRows(listRows().filter(r=>r.tipo==='ingreso')) },[])

  function addManual(e:React.FormEvent){
    e.preventDefault()
    const base = parseFloat(form.base||'0')
    const ivaTipo = parseFloat(form.ivaTipo||'21')
    const iva = +(base*ivaTipo/100).toFixed(2)
    const total = +(base+iva).toFixed(2)
    const row:Row = {
      id: crypto.randomUUID(),
      tipo:'ingreso',
      fecha: new Date().toISOString().slice(0,10),
      contraparte: form.cliente || 'Cliente',
      base, ivaTipo, iva, total, categoria:'ventas servicios', pagado:false
    }
    addRows([row])
    setRows(r=>[...r, row])
  }

  function togglePaid(id:string){
    const all = listRows()
    const idx = all.findIndex(r=>r.id===id)
    if(idx>=0){
      all[idx].pagado = !all[idx].pagado
      all[idx].fechaPago = all[idx].pagado ? new Date().toISOString().slice(0,10) : undefined
      saveRows(all)
      setRows(all.filter(r=>r.tipo==='ingreso'))
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={addManual} className="flex flex-wrap items-end gap-2">
        <input placeholder="Cliente" className="rounded bg-neutral-900 px-3 py-2" value={form.cliente} onChange={e=>setForm({...form, cliente:e.target.value})} />
        <input placeholder="Base" className="rounded bg-neutral-900 px-3 py-2" value={form.base} onChange={e=>setForm({...form, base:e.target.value})} />
        <select className="rounded bg-neutral-900 px-3 py-2" value={form.ivaTipo} onChange={e=>setForm({...form, ivaTipo:e.target.value})}>
          <option value="4">4%</option><option value="10">10%</option><option value="21">21%</option>
        </select>
        <button className="rounded bg-white text-black px-4 py-2">Añadir</button>
      </form>

      <table className="w-full text-sm">
        <thead className="text-neutral-400">
          <tr><th className="text-left p-2">Fecha</th><th className="text-left p-2">Cliente</th><th className="text-right p-2">Base</th><th className="text-right p-2">IVA</th><th className="text-right p-2">Total</th><th className="p-2">Cobrado</th></tr>
        </thead>
        <tbody>
          {rows.map(r=> (
            <tr key={r.id} className="border-t border-neutral-800">
              <td className="p-2">{r.fecha}</td>
              <td className="p-2">{r.contraparte}</td>
              <td className="p-2 text-right">{r.base.toFixed(2)}</td>
              <td className="p-2 text-right">{r.iva.toFixed(2)} ({r.ivaTipo}%)</td>
              <td className="p-2 text-right">{r.total.toFixed(2)}</td>
              <td className="p-2 text-center">
                <button onClick={()=>togglePaid(r.id)} className={`rounded px-2 py-1 text-xs ${r.pagado?'bg-green-700':'bg-neutral-700'}`}>{r.pagado?'Cobrado':'Pendiente'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
