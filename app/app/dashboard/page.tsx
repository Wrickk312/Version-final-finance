'use client'
import KPI from '@/components/KPI'
import { stats } from '@/lib/demoStore'

export default function Dashboard(){
  const s = stats()
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <KPI label="Ingresos del mes" value={s.ingresosMes.toFixed(2)} />
      <KPI label="Ingresos mes anterior" value={s.ingresosMesAnt.toFixed(2)} />
      <KPI label="YTD (ingresos)" value={s.ytd.toFixed(2)} sub={`vs año anterior: ${s.yPrev.toFixed(2)}`} />
      <KPI label="Deuda clientes" value={s.deudaClientes.toFixed(2)} />
      <KPI label="Deuda proveedores" value={s.deudaProv.toFixed(2)} />
      <KPI label="Posición bancaria" value={s.posicionBancaria.toFixed(2)} />
    </div>
  )
}
