'use client'
import { addRows, listRows, saveRows, type Row } from '@/lib/demoStore'
import OCRDrop from '@/components/OCRDrop'
import { useEffect, useState } from 'react'

export default function Expenses(){
  const [rows, setRows] = useState<Row[]>([])
  useEffect(()=>{ setRows(listRows().filter(r=>r.tipo==='gasto')) },[])

  function onParsed(parsed:any[]){
    const mapped:Row[] = parsed.map(p=>({
      id: crypto.randomUUID(),
      tipo: 'gasto',
      fecha: p.fecha,
      vencimiento: p.vencimiento,
      contraparte: p.proveedor,
      base: p.base,
      ivaTipo: p.ivaTipo,
      iva: p.iva,
      total: p.total,
      categoria: p.categoria,
      pagado: false
    }))
    addRows(mapped)
    setRows(r=>[...r, ...mapped])
  }

  function togglePaid(id:string){
    const all = listRows()
    const idx = all.findIndex(r=>r.id===id)
    if(idx>=0){
      all[idx].pagado = !all[idx].pagado
      all[idx].fechaPago = all[idx].pagado ? new Date().toISOString().slice(0,10) : undefined
      saveRows(all)
      setRows(all.filter(r=>r.tipo==='gasto'))
    }
  }

  return (
    <div className="space-y-6">
      <OCRDrop onParsed={onParsed} />
      <table className="w-full text-sm">
        <thead className="text-neutral-400">
          <tr><th className="text-left p-2">Fecha</th><th className="text-left p-2">Proveedor</th><th className="text-right p-2">Base</th><th className="text-right p-2">IVA</th><th className="text-right p-2">Total</th><th className="p-2">Pagado</th></tr>
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
                <button onClick={()=>togglePaid(r.id)} className={`rounded px-2 py-1 text-xs ${r.pagado?'bg-green-700':'bg-neutral-700'}`}>{r.pagado?'Pagado':'Pendiente'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
