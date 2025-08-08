'use client'
import { listRows } from '@/lib/demoStore'
import { useMemo } from 'react'

function quarterOf(d:Date){ return Math.floor(d.getMonth()/3)+1 }

export default function Taxes(){
  const rows = listRows()
  const map = useMemo(()=>{
    const acc: Record<string, {ivaDevengado:number, retProf:number, retAlq:number}> = {}
    rows.forEach(r=>{
      const d = new Date(r.fecha)
      const key = `${d.getFullYear()}-Q${quarterOf(d)}`
      acc[key] ||= {ivaDevengado:0, retProf:0, retAlq:0}
      if(r.tipo==='ingreso'){
        acc[key].ivaDevengado += r.iva
      }else{
        // mock: gastos no generan IVA soportado aquí; puedes ampliar lógica
        if(r.categoria.toLowerCase().includes('profesional')) acc[key].retProf += r.base * 0.15
        if(r.categoria.toLowerCase().includes('alquiler')) acc[key].retAlq += r.base * 0.19
      }
    })
    return acc
  }, [rows])

  return (
    <div className="space-y-4">
      <div className="text-sm text-neutral-400">Resumen por trimestre (demo). Exporta para comparar con tu gestor.</div>
      <table className="w-full text-sm">
        <thead className="text-neutral-400">
          <tr><th className="text-left p-2">Periodo</th><th className="text-right p-2">IVA devengado</th><th className="text-right p-2">Ret. profesionales</th><th className="text-right p-2">Ret. alquiler</th></tr>
        </thead>
        <tbody>
          {Object.entries(map).map(([k,v])=>(
            <tr key={k} className="border-t border-neutral-800">
              <td className="p-2">{k}</td>
              <td className="p-2 text-right">{v.ivaDevengado.toFixed(2)}</td>
              <td className="p-2 text-right">{v.retProf.toFixed(2)}</td>
              <td className="p-2 text-right">{v.retAlq.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=>{
        const blob = new Blob([JSON.stringify(map,null,2)], {type:'application/json'})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'impuestos_meta.json'
        a.click()
      }} className="rounded-xl bg-white text-black px-4 py-2">Exportar metadatos</button>
    </div>
  )
}
