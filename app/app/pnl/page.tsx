'use client'
import { listRows } from '@/lib/demoStore'
import { useMemo, useState } from 'react'

const periods = [
  {key:'year', label:'Año completo'},
  {key:'month', label:'Mes actual'},
  {key:'prev-month', label:'Mes anterior'},
  {key:'quarter', label:'Trimestre actual'},
  {key:'prev-quarter', label:'Trimestre anterior'},
]

export default function PnL(){
  const [period, setPeriod] = useState('year')
  const rows = listRows()

  const filtered = useMemo(()=>{
    const now = new Date()
    const y = now.getFullYear()
    const m = now.getMonth()
    function inQuarter(d:Date){
      const q = Math.floor(m/3)
      return Math.floor(d.getMonth()/3)===q && d.getFullYear()===y
    }
    function inPrevQuarter(d:Date){
      const q = Math.floor(m/3)-1
      const targetY = q<0 ? y-1 : y
      const targetQ = (q+4)%4
      return Math.floor(d.getMonth()/3)===targetQ && d.getFullYear()===targetY
    }
    return rows.filter(r=>{
      const d = new Date(r.fecha)
      if(period==='year') return d.getFullYear()===y
      if(period==='month') return d.getMonth()===m && d.getFullYear()===y
      if(period==='prev-month'){
        const pm = (m+11)%12, py = pm===11?y-1:y
        return d.getMonth()===pm && d.getFullYear()===py
      }
      if(period==='quarter') return inQuarter(d)
      if(period==='prev-quarter') return inPrevQuarter(d)
      return true
    })
  }, [period, rows])

    // Tipado explícito para evitar "unknown"
  type PnLCats = {
    ingresos: Record<string, number>;
    gastos: Record<string, number>;
  };

  const cats: PnLCats = {
    ingresos: {
      'ventas servicios': 0,
      'ventas mercadería': 0,
    },
    gastos: {
      'compra mercaderías': 0,
      'servicios a terceros': 0,
      'servicios profesionales': 0,
      'alquileres': 0,
      'seguros': 0,
      'comisiones bancarias': 0,
      'suministros': 0,
      'marketing': 0,
      'otros gastos de explotación': 0
    }
  };
  filtered.forEach(r=>{
    const key = r.categoria.toLowerCase()
    if(r.tipo==='ingreso'){
      const k = (key.includes('mercader') ? 'ventas mercadería' : 'ventas servicios')
      cats.ingresos[k] = (cats.ingresos[k]||0) + r.total
    }else{
      let gk = 'otros gastos de explotación'
      if(key.includes('mercader')) gk='compra mercaderías'
      else if(key.includes('tercer')) gk='servicios a terceros'
      else if(key.includes('profesional')) gk='servicios profesionales'
      else if(key.includes('alquiler')) gk='alquileres'
      else if(key.includes('seguro')) gk='seguros'
      else if(key.includes('comision')||key.includes('banc')) gk='comisiones bancarias'
      else if(key.includes('sumin')) gk='suministros'
      else if(key.includes('market')) gk='marketing'
      cats.gastos[gk] = (cats.gastos[gk]||0) + r.total
    }
  })

  const totalIng = Object.values(cats.ingresos).reduce((a, b) => a + b, 0);
  const totalGas = Object.values(cats.gastos).reduce((a, b) => a + b, 0);
  const resultado = totalIng - totalGas;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div>Periodo:</div>
        <select value={period} onChange={e=>setPeriod(e.target.value)} className="rounded bg-neutral-900 px-3 py-2">
          {periods.map(p=>(<option key={p.key} value={p.key}>{p.label}</option>))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-neutral-800 p-4">
          <div className="font-semibold">Ingresos</div>
          <table className="w-full text-sm mt-2">
            <tbody>
              {Object.entries(cats.ingresos).map(([k,v])=>(
                <tr key={k} className="border-t border-neutral-800">
                  <td className="p-2">{k}</td><td className="p-2 text-right">{(v as number).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-2 font-semibold">Total ingresos: {totalIng.toFixed(2)}</div>
        </div>
        <div className="rounded-2xl border border-neutral-800 p-4">
          <div className="font-semibold">Gastos</div>
          <table className="w-full text-sm mt-2">
            <tbody>
              {Object.entries(cats.gastos).map(([k,v])=>(
                <tr key={k} className="border-t border-neutral-800">
                  <td className="p-2">{k}</td><td className="p-2 text-right">{(v as number).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-2 font-semibold">Total gastos: {totalGas.toFixed(2)}</div>
        </div>
      </div>

      <div className={`rounded-2xl border p-4 ${resultado>=0?'border-green-700':'border-red-700'}`}>
        <div className="font-semibold">Resultado del ejercicio</div>
        <div className="text-2xl">{resultado.toFixed(2)}</div>
      </div>
    </div>
  )
}
