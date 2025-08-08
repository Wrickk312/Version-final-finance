'use client'
export type Row = {
  id: string
  tipo: 'ingreso'|'gasto'
  fecha: string
  vencimiento?: string
  contraparte: string
  base: number
  ivaTipo: number
  iva: number
  retencion?: number
  total: number
  categoria: string
  pagado: boolean
  fechaPago?: string
}

const KEY = 'demo_rows_v1'
const KEY_USER = 'demo_user'

export function getUser(){
  const raw = localStorage.getItem(KEY_USER)
  return raw ? JSON.parse(raw) as {company:string, email:string} : null
}

export function saveUser(u:{company:string, email:string}){
  localStorage.setItem(KEY_USER, JSON.stringify(u))
}

export function listRows():Row[]{
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) as Row[] : []
}

export function saveRows(rows:Row[]){
  localStorage.setItem(KEY, JSON.stringify(rows))
}

export function addRows(rows:Row[]){
  const all = listRows()
  all.push(...rows)
  saveRows(all)
}

export function stats(){
  const rows = listRows()
  const now = new Date()
  const m = now.getMonth()
  const y = now.getFullYear()
  const monthRows = rows.filter(r=>{
    const d = new Date(r.fecha)
    return d.getMonth()===m && d.getFullYear()===y
  })
  const prevMonth = (m+11)%12
  const prevYear = prevMonth==11 ? y-1 : y
  const prevRows = rows.filter(r=>{
    const d = new Date(r.fecha)
    return d.getMonth()===prevMonth && d.getFullYear()===prevYear
  })
  const sum = (rs:Row[], tipo:'ingreso'|'gasto')=>rs.filter(r=>r.tipo===tipo).reduce((a,b)=>a+b.total,0)
  const ingresosMes = sum(monthRows,'ingreso')
  const ingresosMesAnt = sum(prevRows,'ingreso')
  const ytd = rows.filter(r=>new Date(r.fecha).getFullYear()===y && r.tipo==='ingreso').reduce((a,b)=>a+b.total,0)
  const yPrev = rows.filter(r=>new Date(r.fecha).getFullYear()===y-1 && r.tipo==='ingreso').reduce((a,b)=>a+b.total,0)
  const deudaClientes = rows.filter(r=>r.tipo==='ingreso' && !r.pagado).reduce((a,b)=>a+b.total,0)
  const deudaProv = rows.filter(r=>r.tipo==='gasto' && !r.pagado).reduce((a,b)=>a+b.total,0)
  const posicionBancaria = 10000 + rows.filter(r=>r.pagado).reduce((a,b)=>a + (b.tipo==='ingreso'?b.total:-b.total),0)
  return { ingresosMes, ingresosMesAnt, ytd, yPrev, deudaClientes, deudaProv, posicionBancaria }
}
