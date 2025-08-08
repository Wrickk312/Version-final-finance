'use client'
import { useState } from 'react'

type Parsed = {
  proveedor: string
  base: number
  iva: number
  ivaTipo: number
  retencion?: number
  fecha: string
  vencimiento: string
  total: number
  categoria: string
  alertas: string[]
  archivo: string
}

function parseName(name:string):Parsed{
  // Simple parser demo: AAAMM_PROVEEDOR_CATEGORIA.pdf
  const baseName = name.replace(/\.pdf$/i,'')
  const parts = baseName.split('_')
  let fecha = new Date()
  if(parts[0] && parts[0].length>=6){
    const y = Number(parts[0].slice(0,4))
    const m = Number(parts[0].slice(4,6))-1
    fecha = new Date(y, m, 1)
  }
  const proveedor = parts[1] || 'Desconocido'
  const categoria = (parts[2] || 'otros').replace(/-/g,' ')
  const base = Math.round(100+(Math.random()*900))*1.0
  const ivaTipo = [4,10,21][Math.floor(Math.random()*3)]
  const iva = +(base*ivaTipo/100).toFixed(2)
  const total = +(base + iva).toFixed(2)
  const venc = new Date(fecha); venc.setDate(venc.getDate()+30)
  const alertas:string[] = []
  // Simple rules
  if(![4,10,21].includes(ivaTipo)) alertas.push('IVA fuera de rango')
  return {
    proveedor, base, iva, ivaTipo, fecha: fecha.toISOString().slice(0,10),
    vencimiento: venc.toISOString().slice(0,10), total, categoria, alertas, archivo: name
  }
}

export default function OCRDrop({onParsed}:{onParsed:(rows:Parsed[])=>void}){
  const [drag, setDrag] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const handleFiles = async (files:FileList|null)=>{
    if(!files) return
    const arr:Parsed[] = []
    for(const f of Array.from(files)){
      const p = parseName(f.name)
      // mock: flag mismatch example
      const check = +(p.base * p.ivaTipo / 100).toFixed(2)
      if(check !== p.iva){ p.alertas.push('Descuadre Base/IVA') }
      arr.push(p)
    }
    setLogs(x=>[...x, `Procesados ${arr.length} archivo(s)`])
    onParsed(arr)
  }

  return (
    <div
      onDragOver={(e)=>{e.preventDefault(); setDrag(true)}}
      onDragLeave={()=>setDrag(false)}
      onDrop={(e)=>{e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files)}}
      className={`rounded-2xl border-2 border-dashed p-6 text-center ${drag?'border-white':'border-neutral-700'}`}
    >
      <div className="font-medium mb-2">Sube tus facturas (drag & drop)</div>
      <div className="text-sm text-neutral-400">Para la demo, el nombre del archivo puede ser: <code>202504_PROVEEDOR_servicios.pdf</code></div>
      <input type="file" multiple onChange={(e)=>handleFiles(e.target.files)} className="mt-3" />
      <div className="mt-3 text-left text-xs text-neutral-500 space-y-1">
        {logs.map((l,i)=>(<div key={i}>• {l}</div>))}
      </div>
    </div>
  )
}
